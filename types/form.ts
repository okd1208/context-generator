export interface FormData {
  // 基本情報
  occupation: string;
  customOccupation?: string;
  experienceLevel: string;
  location: string;
  
  // 専門分野
  skills: string[];
  customSkills?: string;
  
  // エンジニア関連（条件分岐）
  isEngineer: boolean;
  programmingLanguages?: string[];
  developmentFields?: string[];
  frameworks?: string[];
  developmentEnvironment?: string;
  architecturePreference?: string;
  mbtiType?: string;
  
  // コミュニケーション
  communicationStyle: string;
  responseStyle: string;
  
  // 学習・思考スタイル
  learningStyle: string;
  thinkingStyle: string;
  
  // その他
  interests: string[];
  workEnvironment: string;
  purposes: string[];
  freeText?: string;
  
  // プライバシー設定
  includePersonalInfo: boolean;
  excludedFields: string[];
}

export interface FormMode {
  type: 'simple' | 'detailed';
  label: string;
  description: string;
  estimatedTime: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  showIf?: (data: Partial<FormData>) => boolean;
}

export interface FormField {
  id: keyof FormData;
  type: 'text' | 'select' | 'multiselect' | 'checkbox' | 'textarea' | 'radio';
  label: string;
  description?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  allowCustom?: boolean;
  showInSimpleMode?: boolean;
  canExclude?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface GeneratedPrompt {
  basicPrompt: string;
  detailedPrompt: string;
  jsonFormat: string;
}
