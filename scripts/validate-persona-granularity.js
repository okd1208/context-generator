#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'samples', 'personas');

function read(file){ try{ return fs.readFileSync(file,'utf8'); }catch{ return null; } }
function exists(p){ try{ fs.accessSync(p); return true; }catch{ return false; } }
function countLines(s){ return (s.match(/\n/g)||[]).length + 1; }

const requiredHeadings = [
  '## 基本情報',
  '## 生い立ち・人生経験',
  '## 性格・人格特性',
  '## コミュニケーションスタイル',
  '## 価値観・思想・信念',
  '## 興味・関心・趣味',
  '## ライフスタイル・日常習慣',
  '## 日常生活',
  '## 感情・心理的特徴',
  '## 知識・専門性',
  '## 未来への展望',
  '## 応答時の注意点',
  '## 応答例'
];

function headingsOK(content){
  const missing = requiredHeadings.filter(h => !content.includes(h));
  return { ok: missing.length===0, missing };
}

function measure(file, ref){
  const content = read(file)||'';
  const lines = countLines(content);
  const head = headingsOK(content);
  const ratio = lines/ref;
  return { lines, ratio, ok: head.ok, missing: head.missing };
}

function main(){
  const refP = read(path.join(baseDir,'sato-kanon','profile.md'));
  const refR = read(path.join(baseDir,'sato-kanon','prompt.md'));
  if(!refP||!refR){ console.error('sato-kanon reference not found'); process.exit(1); }
  const refPL = countLines(refP), refRL = countLines(refR);
  const dirs = fs.readdirSync(baseDir).filter(d=>fs.statSync(path.join(baseDir,d)).isDirectory());
  let pass=0, fail=0; const fails=[];
  for(const d of dirs){
    const p = path.join(baseDir,d,'profile.md');
    const r = path.join(baseDir,d,'prompt.md');
    if(!exists(p)||!exists(r)) continue;
    const mp = measure(p, refPL);
    const mr = measure(r, refRL);
    const ok = mp.ok && mr.ok && mp.ratio>=0.9 && mr.ratio>=0.9; // 厳しめ: 90% 以上
    if(ok) pass++; else { fail++; fails.push({d, mp, mr}); }
  }
  console.log(`Ref profile: ${refPL} lines, prompt: ${refRL} lines`);
  console.log(`PASS ${pass}, FAIL ${fail}`);
  fails.slice(0,30).forEach(f=>{
    console.log(`- ${f.d} :: profile ${f.mp.lines} (${(f.mp.ratio*100).toFixed(0)}%), prompt ${f.mr.lines} (${(f.mr.ratio*100).toFixed(0)}%), missing: ${[...new Set([...f.mp.missing,...f.mr.missing])].join(' / ')}`);
  });
}

main();

