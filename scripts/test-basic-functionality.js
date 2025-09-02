#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'commonjs' } });

// カラーコード
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { 
      stdio: 'pipe', 
      ...options 
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject({ code, stdout, stderr });
      }
    });
  });
}

async function testFileStructure() {
  log('📁 ファイル構造のチェック...', 'blue');
  
  const requiredFiles = [
    'package.json',
    'pages/index.tsx',
    'utils/formData.ts',
    'utils/promptGenerator.ts',
    'types/form.ts',
    'components/forms/ContextForm.tsx',
    'components/forms/ModeSelection.tsx',
    'components/forms/PromptResult.tsx'
  ];
  
  let allExists = true;
  
  for (const file of requiredFiles) {
    if (checkFileExists(file)) {
      log(`  ✓ ${file}`, 'green');
    } else {
      log(`  ✗ ${file} が見つかりません`, 'red');
      allExists = false;
    }
  }
  
  return allExists;
}

async function testTypeScriptCompilation() {
  log('🔧 TypeScript コンパイルチェック...', 'blue');
  
  try {
    const result = await runCommand('npx', ['tsc', '--noEmit']);
    log('  ✓ TypeScript コンパイルが正常に完了しました', 'green');
    return true;
  } catch (error) {
    log('  ✗ TypeScript コンパイルエラー:', 'red');
    log(error.stderr, 'red');
    return false;
  }
}

async function testFormDataStructure() {
  log('📋 フォームデータ構造のチェック...', 'blue');
  
  try {
    const formDataPath = path.join(__dirname, '../utils/formData.ts');
    const formDataContent = fs.readFileSync(formDataPath, 'utf-8');
    
    const requiredSections = [
      'basic',
      'identity',
      'background', 
      'values',
      'skills',
      'engineer_check',
      'engineering',
      'communication',
      'learning',
      'interests',
      'context_enhancement',
      'purpose',
      'additional'
    ];
    
    let allSectionsFound = true;
    
    for (const section of requiredSections) {
      if (formDataContent.includes(`id: '${section}'`)) {
        log(`  ✓ ${section} セクションが見つかりました`, 'green');
      } else {
        log(`  ✗ ${section} セクションが見つかりません`, 'red');
        allSectionsFound = false;
      }
    }
    
    return allSectionsFound;
  } catch (error) {
    log('  ✗ フォームデータ構造のチェックに失敗しました', 'red');
    log(error.message, 'red');
    return false;
  }
}

async function testPromptGeneratorImport() {
  log('💬 プロンプト生成機能のテスト...', 'blue');
  
  try {
    // プロンプト生成機能を単純にファイルの存在確認とビルドの成功で代替
    const promptGenPath = path.join(__dirname, '../utils/promptGenerator.ts');
    const promptGenContent = fs.readFileSync(promptGenPath, 'utf-8');
    
    // 新しい項目が含まれているかチェック
    const requiredPatterns = [
      'personalityTraits',
      'strengths',
      'coreValues',
      'workPriorities',
      'educationLevel',
      'majorField',
      'professionalTerms',
      'assumedKnowledge',
      '個人の特徴',
      '背景・経歴',
      '価値観・信念',
      'コンテキスト情報'
    ];
    
    let allPatternsFound = true;
    
    for (const pattern of requiredPatterns) {
      if (promptGenContent.includes(pattern)) {
        log(`  ✓ ${pattern} が見つかりました`, 'green');
      } else {
        log(`  ✗ ${pattern} が見つかりません`, 'red');
        allPatternsFound = false;
      }
    }
    
    if (allPatternsFound) {
      log('  ✓ プロンプト生成機能の更新が確認できました', 'green');
      return true;
    } else {
      log('  ✗ プロンプト生成機能の更新が不完全です', 'red');
      return false;
    }
    
  } catch (error) {
    log('  ✗ プロンプト生成機能のテストに失敗しました', 'red');
    log(error.message, 'red');
    return false;
  }
}

// copyToClipboard のエラーハンドリングを確認
async function testClipboardFallback() {
  log('📋 クリップボードコピーのエラーハンドリングチェック...', 'blue');

  // モダンAPIが失敗する状況をシミュレート
  global.window = { isSecureContext: true };
  global.navigator = {
    clipboard: {
      writeText: () => Promise.reject(new Error('denied'))
    }
  };
  // フォールバックで使用する最小限の document をモック
  global.document = {
    createElement: () => ({
      value: '',
      style: {},
      focus: () => {},
      select: () => {}
    }),
    body: {
      appendChild: () => {},
      removeChild: () => {}
    },
    execCommand: () => false
  };

  try {
    const { copyToClipboard } = require('../utils/promptGenerator');
    const result = await copyToClipboard('test');
    if (result === false) {
      log('  ✓ 失敗時に false が返されました', 'green');
      return true;
    } else {
      log('  ✗ 失敗時に正しい値が返されません', 'red');
      return false;
    }
  } catch (error) {
    log('  ✗ copyToClipboard が例外を投げました', 'red');
    log(error.message, 'red');
    return false;
  }
}

async function testBuild() {
  log('🏗️ ビルドテスト...', 'blue');
  
  try {
    const result = await runCommand('npm', ['run', 'build'], { 
      env: { ...process.env, NODE_ENV: 'production' } 
    });
    log('  ✓ ビルドが正常に完了しました', 'green');
    return true;
  } catch (error) {
    log('  ✗ ビルドエラー:', 'red');
    log(error.stderr, 'red');
    return false;
  }
}

async function main() {
  log('🚀 Context Generator 動作確認テスト開始\\n', 'blue');
  
  const tests = [
    { name: 'ファイル構造', fn: testFileStructure },
    { name: 'フォームデータ構造', fn: testFormDataStructure },
    { name: 'TypeScript コンパイル', fn: testTypeScriptCompilation },
    { name: 'プロンプト生成機能', fn: testPromptGeneratorImport },
    { name: 'クリップボードコピー', fn: testClipboardFallback },
    { name: 'ビルド', fn: testBuild }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const startTime = Date.now();
    const result = await test.fn();
    const endTime = Date.now();
    
    results.push({
      name: test.name,
      passed: result,
      duration: endTime - startTime
    });
    
    log(''); // 空行
  }
  
  // 結果サマリー
  log('📊 テスト結果サマリー', 'blue');
  log('================================', 'blue');
  
  const passedTests = results.filter(r => r.passed);
  const failedTests = results.filter(r => !r.passed);
  
  results.forEach(result => {
    const status = result.passed ? '✓' : '✗';
    const color = result.passed ? 'green' : 'red';
    const duration = result.duration + 'ms';
    
    log(`${status} ${result.name} (${duration})`, color);
  });
  
  log(''); // 空行
  log(`合計: ${results.length} テスト`, 'blue');
  log(`成功: ${passedTests.length} テスト`, 'green');
  log(`失敗: ${failedTests.length} テスト`, 'red');
  
  if (failedTests.length > 0) {
    log('\\n❌ 一部のテストが失敗しました', 'red');
    process.exit(1);
  } else {
    log('\\n✅ すべてのテストが成功しました！', 'green');
    process.exit(0);
  }
}

main().catch(error => {
  log('予期しないエラーが発生しました:', 'red');
  log(error.message, 'red');
  process.exit(1);
});
