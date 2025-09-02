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
  
  // 個人の特徴・アイデンティティ
  const identityTexts: string[] = [];
  if (!data.excludedFields.includes('personalityTraits') && data.personalityTraits && data.personalityTraits.length > 0) {
    identityTexts.push(`性格的特徴: ${data.personalityTraits.join(', ')}`);
  }
  if (!data.excludedFields.includes('strengths') && data.strengths) {
    identityTexts.push(`主な強み: ${data.strengths}`);
  }
  if (!data.excludedFields.includes('weaknesses') && data.weaknesses) {
    identityTexts.push(`改善したい点: ${data.weaknesses}`);
  }
  if (!data.excludedFields.includes('roleModel') && data.roleModel) {
    identityTexts.push(`ロールモデル: ${data.roleModel}`);
  }
  if (!data.excludedFields.includes('selfDescription') && data.selfDescription) {
    identityTexts.push(`自己紹介: ${data.selfDescription}`);
  }
  if (identityTexts.length > 0) {
    sections.push(`**個人の特徴**\n- ${identityTexts.join('\n- ')}`);
  }
  
  // 背景・経歴・人生経験
  const backgroundTexts: string[] = [];
  if (!data.excludedFields.includes('educationLevel') && data.educationLevel) {
    backgroundTexts.push(`学歴: ${data.educationLevel}`);
  }
  if (!data.excludedFields.includes('majorField') && data.majorField) {
    const majorText = data.customMajorField || data.majorField;
    backgroundTexts.push(`専攻分野: ${majorText}`);
  }
  if (!data.excludedFields.includes('careerStage') && data.careerStage) {
    backgroundTexts.push(`キャリアステージ: ${data.careerStage}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('careerTransition') && data.careerTransition) {
    backgroundTexts.push(`キャリアの変遷: ${data.careerTransition}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('majorAchievement') && data.majorAchievement) {
    backgroundTexts.push(`主要な成果: ${data.majorAchievement}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('learningFromFailure') && data.learningFromFailure) {
    backgroundTexts.push(`失敗から学んだ教訓: ${data.learningFromFailure}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('lifeChangingEvent') && data.lifeChangingEvent) {
    backgroundTexts.push(`人生に影響を与えた出来事: ${data.lifeChangingEvent}`);
  }
  if (backgroundTexts.length > 0) {
    sections.push(`**背景・経歴**\n- ${backgroundTexts.join('\n- ')}`);
  }
  
  // 価値観・信念
  const valuesTexts: string[] = [];
  if (!data.excludedFields.includes('coreValues') && data.coreValues && data.coreValues.length > 0) {
    valuesTexts.push(`大切にしている価値観: ${data.coreValues.join(', ')}`);
  }
  if (!data.excludedFields.includes('workPriorities') && data.workPriorities && data.workPriorities.length > 0) {
    valuesTexts.push(`仕事で重視すること: ${data.workPriorities.join(', ')}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('decisionStyle') && data.decisionStyle) {
    valuesTexts.push(`意思決定スタイル: ${data.decisionStyle}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('avoidanceFactors') && data.avoidanceFactors) {
    valuesTexts.push(`避けたいこと: ${data.avoidanceFactors}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('idealWorkStyle') && data.idealWorkStyle) {
    valuesTexts.push(`理想の働き方: ${data.idealWorkStyle}`);
  }
  if (mode === 'detailed' && !data.excludedFields.includes('socialContribution') && data.socialContribution) {
    valuesTexts.push(`社会貢献に対する考え: ${data.socialContribution}`);
  }
  if (valuesTexts.length > 0) {
    sections.push(`**価値観・信念**\n- ${valuesTexts.join('\n- ')}`);
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
  
  // コンテキスト理解強化（詳細モードのみ）
  if (mode === 'detailed') {
    const contextTexts: string[] = [];
    if (!data.excludedFields.includes('professionalTerms') && data.professionalTerms) {
      contextTexts.push(`よく使う専門用語: ${data.professionalTerms}`);
    }
    if (!data.excludedFields.includes('assumedKnowledge') && data.assumedKnowledge) {
      contextTexts.push(`前提知識: ${data.assumedKnowledge}`);
    }
    if (!data.excludedFields.includes('noExplanationNeeded') && data.noExplanationNeeded) {
      contextTexts.push(`説明不要な概念: ${data.noExplanationNeeded}`);
    }
    if (!data.excludedFields.includes('detailedInterest') && data.detailedInterest) {
      contextTexts.push(`詳しく知りたい分野: ${data.detailedInterest}`);
    }
    if (!data.excludedFields.includes('preferredExamples') && data.preferredExamples) {
      contextTexts.push(`理解しやすい例: ${data.preferredExamples}`);
    }
    if (contextTexts.length > 0) {
      sections.push(`**コンテキスト情報**\n- ${contextTexts.join('\n- ')}`);
    }
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
    identity: {
      personality_traits: data.personalityTraits,
      strengths: data.strengths,
      weaknesses: data.weaknesses,
      role_model: data.roleModel,
      self_description: data.selfDescription
    },
    background: {
      education_level: data.educationLevel,
      major_field: data.customMajorField || data.majorField,
      career_stage: data.careerStage,
      career_transition: data.careerTransition,
      major_achievement: data.majorAchievement,
      learning_from_failure: data.learningFromFailure,
      life_changing_event: data.lifeChangingEvent
    },
    values: {
      core_values: data.coreValues,
      work_priorities: data.workPriorities,
      decision_style: data.decisionStyle,
      avoidance_factors: data.avoidanceFactors,
      ideal_work_style: data.idealWorkStyle,
      social_contribution: data.socialContribution
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
    context_enhancement: {
      professional_terms: data.professionalTerms,
      assumed_knowledge: data.assumedKnowledge,
      no_explanation_needed: data.noExplanationNeeded,
      detailed_interest: data.detailedInterest,
      preferred_examples: data.preferredExamples
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

export async function copyToClipboard(text: string): Promise<boolean> {
  // モダンなクリップボードAPIが利用できる場合
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // 失敗した場合はフォールバックに移行
      console.error('クリップボードAPIの使用に失敗しました:', error);
    }
  }

  // フォールバック: テキストエリアを使用したコピー
  try {
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
    return result;
  } catch (error) {
    console.error('クリップボードへのコピーに失敗しました:', error);
    return false;
  }
}
