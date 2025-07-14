import { FormData, GeneratedPrompt } from '@/types/form';

export function generatePrompt(data: FormData, mode: 'simple' | 'detailed' = 'detailed'): GeneratedPrompt {
  const sections: string[] = [];
  
  // 基本情報セクション
  if (!data.excludedFields.includes('occupation') && data.occupation) {
    const occupationText = data.customOccupation || data.occupation;
    const experienceText = data.experienceLevel ? ` (${data.experienceLevel})` : '';
    sections.push(`**職業・役職**: ${occupationText}${experienceText}`);
  }
  
  // 専門分野・スキル
  if (!data.excludedFields.includes('skills') && data.skills.length > 0) {
    const skillsText = [...data.skills, data.customSkills].filter(Boolean).join(', ');
    sections.push(`**専門分野・スキル**: ${skillsText}`);
  }
  
  // エンジニア関連情報
  if (data.isEngineer && !data.excludedFields.includes('isEngineer')) {
    const engineerSections: string[] = [];
    
    if (data.programmingLanguages && data.programmingLanguages.length > 0) {
      engineerSections.push(`プログラミング言語: ${data.programmingLanguages.join(', ')}`);
    }
    
    if (data.developmentFields && data.developmentFields.length > 0) {
      engineerSections.push(`開発分野: ${data.developmentFields.join(', ')}`);
    }
    
    if (data.frameworks && data.frameworks.length > 0) {
      engineerSections.push(`フレームワーク・ツール: ${data.frameworks.join(', ')}`);
    }
    
    if (data.developmentEnvironment) {
      engineerSections.push(`開発環境: ${data.developmentEnvironment}`);
    }
    
    if (data.architecturePreference) {
      engineerSections.push(`アーキテクチャ の好み: ${data.architecturePreference}`);
    }
    
    if (engineerSections.length > 0) {
      sections.push(`**技術スタック**\n- ${engineerSections.join('\n- ')}`);
    }
  }
  
  // コミュニケーションスタイル
  if (!data.excludedFields.includes('communicationStyle') && data.communicationStyle) {
    const styleTexts: string[] = [data.communicationStyle];
    if (data.responseStyle) {
      styleTexts.push(data.responseStyle);
    }
    sections.push(`**コミュニケーションスタイル**: ${styleTexts.join(', ')}`);
  }
  
  // 学習・思考スタイル（詳細モードのみ）
  if (mode === 'detailed') {
    const learningTexts: string[] = [];
    if (!data.excludedFields.includes('learningStyle') && data.learningStyle) {
      learningTexts.push(`学習スタイル: ${data.learningStyle}`);
    }
    if (!data.excludedFields.includes('thinkingStyle') && data.thinkingStyle) {
      learningTexts.push(`思考スタイル: ${data.thinkingStyle}`);
    }
    if (!data.excludedFields.includes('mbtiType') && data.mbtiType) {
      learningTexts.push(`MBTI性格タイプ: ${data.mbtiType}`);
    }
    if (learningTexts.length > 0) {
      sections.push(`**学習・思考の特徴**\n- ${learningTexts.join('\n- ')}`);
    }
  }
  
  // 関心事・興味（詳細モードのみ）
  if (mode === 'detailed' && !data.excludedFields.includes('interests') && data.interests.length > 0) {
    sections.push(`**関心事・興味**: ${data.interests.join(', ')}`);
  }
  
  // 作業環境・好み（詳細モードのみ）
  if (mode === 'detailed' && !data.excludedFields.includes('workEnvironment') && data.workEnvironment) {
    sections.push(`**作業環境・好み**: ${data.workEnvironment}`);
  }
  
  // 利用目的
  if (!data.excludedFields.includes('purposes') && data.purposes.length > 0) {
    sections.push(`**利用目的**: ${data.purposes.join(', ')}`);
  }
  
  // 自由記述
  if (!data.excludedFields.includes('freeText') && data.freeText) {
    sections.push(`**その他の特徴・要望**\n${data.freeText}`);
  }
  
  // 地域情報（詳細モードかつ個人情報含む場合）
  if (mode === 'detailed' && data.includePersonalInfo && !data.excludedFields.includes('location') && data.location) {
    sections.push(`**地域・文化的背景**: ${data.location}`);
  }
  
  const basicPrompt = generateBasicPrompt(sections);
  const detailedPrompt = generateDetailedPrompt(sections);
  const jsonFormat = generateJsonFormat(data);
  
  return {
    basicPrompt,
    detailedPrompt,
    jsonFormat
  };
}

function generateBasicPrompt(sections: string[]): string {
  if (sections.length === 0) {
    return "あなたの回答をお願いします。";
  }
  
  return `以下の背景を持つ人として回答してください：

${sections.join('\n\n')}

このコンテキストを踏まえて、適切な回答をお願いします。`;
}

function generateDetailedPrompt(sections: string[]): string {
  if (sections.length === 0) {
    return "あなたの回答をお願いします。";
  }
  
  return `# あなたのコンテキスト情報

あなたは以下の背景・特徴を持つ人として、質問に回答してください。

${sections.join('\n\n')}

## 回答時の注意点
- 上記のコンテキストに基づいて、あなたの立場から回答してください
- 専門知識がある分野については、その専門性を活かした具体的で実用的な回答を心がけてください
- 不明な点については推測せず、「わからない」と正直に答えても構いません
- 必要に応じて、追加の情報や詳細な説明を求めることもできます`;
}

function generateJsonFormat(data: FormData): string {
  const contextObject = {
    basic_info: {
      occupation: data.customOccupation || data.occupation,
      experience_level: data.experienceLevel,
      location: data.includePersonalInfo ? data.location : undefined
    },
    skills: [...data.skills, data.customSkills].filter(Boolean),
    engineering: data.isEngineer ? {
      programming_languages: data.programmingLanguages,
      development_fields: data.developmentFields,
      frameworks: data.frameworks,
      development_environment: data.developmentEnvironment,
      architecture_preference: data.architecturePreference
    } : undefined,
    communication: {
      style: data.communicationStyle,
      response_style: data.responseStyle
    },
    learning: {
      learning_style: data.learningStyle,
      thinking_style: data.thinkingStyle,
      mbti_type: data.mbtiType
    },
    interests: data.interests,
    work_environment: data.workEnvironment,
    purposes: data.purposes,
    additional_notes: data.freeText
  };
  
  // undefined の値を削除
  const cleanObject = JSON.parse(JSON.stringify(contextObject));
  
  return JSON.stringify(cleanObject, null, 2);
}

export function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true);
    } else {
      // フォールバック: テキストエリアを使用
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(result);
    }
  } catch (error) {
    console.error('クリップボードへのコピーに失敗しました:', error);
    return Promise.resolve(false);
  }
}
