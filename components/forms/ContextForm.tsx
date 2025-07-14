import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { FormData } from '@/types/form';
import { formSections } from '@/utils/formData';
import { generatePrompt } from '@/utils/promptGenerator';
import { Button, Card, ProgressBar } from '@/components/ui/FormElements';
import { FormSection } from './FormField';

interface ContextFormProps {
  mode: 'simple' | 'detailed';
  onBack: () => void;
  onComplete: (prompt: any) => void;
}

export const ContextForm: React.FC<ContextFormProps> = ({
  mode,
  onBack,
  onComplete
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [excludedFields, setExcludedFields] = useState<string[]>([]);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [savedData, setSavedData] = useState<Partial<FormData>>({});
  
  // useFormを先に宣言
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      occupation: '',
      customOccupation: '',
      experienceLevel: '',
      location: '',
      skills: [],
      customSkills: '',
      isEngineer: false,
      programmingLanguages: [],
      developmentFields: [],
      frameworks: [],
      developmentEnvironment: '',
      architecturePreference: '',
      mbtiType: '',
      communicationStyle: '',
      responseStyle: '',
      learningStyle: '',
      thinkingStyle: '',
      interests: [],
      workEnvironment: '',
      purposes: [],
      freeText: '',
      includePersonalInfo: false,
      excludedFields: []
    }
  });
  
  // ローカルストレージから保存されたデータを読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`context-form-${mode}`);
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setSavedData(parsedData);
          setExcludedFields(parsedData.excludedFields || []);
        } catch (e) {
          console.error('保存データの読み込みに失敗しました:', e);
        }
      }
    }
  }, [mode]);
  
  // 保存データが読み込まれたらフォームをリセット
  useEffect(() => {
    if (Object.keys(savedData).length > 0) {
      reset({
        occupation: savedData.occupation || '',
        customOccupation: savedData.customOccupation || '',
        experienceLevel: savedData.experienceLevel || '',
        location: savedData.location || '',
        skills: savedData.skills || [],
        customSkills: savedData.customSkills || '',
        isEngineer: savedData.isEngineer || false,
        programmingLanguages: savedData.programmingLanguages || [],
        developmentFields: savedData.developmentFields || [],
        frameworks: savedData.frameworks || [],
        developmentEnvironment: savedData.developmentEnvironment || '',
        architecturePreference: savedData.architecturePreference || '',
        mbtiType: savedData.mbtiType || '',
        communicationStyle: savedData.communicationStyle || '',
        responseStyle: savedData.responseStyle || '',
        learningStyle: savedData.learningStyle || '',
        thinkingStyle: savedData.thinkingStyle || '',
        interests: savedData.interests || [],
        workEnvironment: savedData.workEnvironment || '',
        purposes: savedData.purposes || [],
        freeText: savedData.freeText || '',
        includePersonalInfo: savedData.includePersonalInfo || false,
        excludedFields: []
      });
    }
  }, [savedData, reset]);

  const formData = watch();
  
  // フォームデータをローカルストレージに保存
  const saveFormData = useCallback((data: Partial<FormData>, excludedFields: string[]) => {
    if (typeof window !== 'undefined') {
      const dataToSave = { ...data, excludedFields };
      localStorage.setItem(`context-form-${mode}`, JSON.stringify(dataToSave));
    }
  }, [mode]);
  
  // フォームデータが変更されたときに保存（ページ離脱時のみ）
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Object.keys(formData).length > 0) {
        saveFormData(formData, excludedFields);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // コンポーネントがアンマウントされるときに保存
      if (Object.keys(formData).length > 0) {
        saveFormData(formData, excludedFields);
      }
    };
  }, [formData, excludedFields, saveFormData]);

  // モードに応じて表示するセクションをフィルタリング
  const getVisibleSections = () => {
    return formSections.filter(section => {
      // セクションの表示条件をチェック
      if (section.showIf && !section.showIf(formData)) {
        return false;
      }

      // モードに応じてセクションをフィルタリング
      const hasVisibleFields = section.fields.some(field => {
        if (mode === 'simple') {
          return field.showInSimpleMode;
        }
        return true;
      });

      return hasVisibleFields;
    });
  };

  const visibleSections = getVisibleSections();
  const currentSection = visibleSections[currentSectionIndex];

  const handleNext = () => {
    // ナビゲーション時に保存
    saveFormData(formData, excludedFields);
    if (currentSectionIndex < visibleSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    // ナビゲーション時に保存
    saveFormData(formData, excludedFields);
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleToggleExclude = (fieldId: string) => {
    setExcludedFields(prev => {
      if (prev.includes(fieldId)) {
        return prev.filter(id => id !== fieldId);
      } else {
        return [...prev, fieldId];
      }
    });
  };

  const onSubmit = (data: FormData) => {
    const finalData = { ...data, excludedFields };
    // 提出時に保存
    saveFormData(finalData, excludedFields);
    const prompt = generatePrompt(finalData, mode);
    onComplete(prompt);
  };
  
  const handleBackToModeSelection = () => {
    // 戻る時に保存
    saveFormData(formData, excludedFields);
    onBack();
  };

  const isLastSection = currentSectionIndex === visibleSections.length - 1;

  // セクション変更時にスクロールを上に戻す
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIndex]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBackToModeSelection} className="flex items-center space-x-2">
          <ChevronLeft className="w-4 h-4" />
          <span>モード選択に戻る</span>
        </Button>
        <div className="text-sm text-gray-600">
          {mode === 'simple' ? '簡易コンテキスト' : '詳細コンテキスト'}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPrivacySettings(!showPrivacySettings)}
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>プライバシー設定</span>
        </Button>
      </div>

      {/* プライバシー設定 */}
      {showPrivacySettings && (
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">プライバシー設定</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={watch('includePersonalInfo')}
                onChange={(e) => setValue('includePersonalInfo', e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-sm text-blue-800">
                個人情報（地域など）をコンテキストに含める
              </span>
            </label>
            <p className="text-xs text-blue-700">
              各項目の横にある👁️アイコンをクリックすることで、個別に項目をコンテキストから除外できます。
            </p>
            {excludedFields.length > 0 && (
              <div>
                <p className="text-sm font-medium text-blue-800 mb-2">除外される項目:</p>
                <div className="flex flex-wrap gap-1">
                  {excludedFields.map(fieldId => (
                    <span
                      key={fieldId}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-200 text-blue-800"
                    >
                      {fieldId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* プログレスバー */}
      <ProgressBar
        current={currentSectionIndex + 1}
        total={visibleSections.length}
      />

      {/* フォームセクション */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentSection && (
            <FormSection
              section={currentSection}
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              mode={mode}
              excludedFields={excludedFields}
              onToggleExclude={handleToggleExclude}
              formData={formData}
            />
          )}

          {/* ナビゲーションボタン */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>前へ</span>
            </Button>

            <div className="text-sm text-gray-500">
              {currentSectionIndex + 1} / {visibleSections.length}
            </div>

            {isLastSection ? (
              <Button type="submit" className="flex items-center space-x-2">
                <span>コンテキストを生成</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>次へ</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* ヒント */}
      <Card className="bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">💡 ヒント</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 項目は空欄でも構いません。入力した内容に基づいてコンテキストが生成されます</li>
          <li>• エンジニアにチェックを入れると、技術関連の詳細な質問が追加されます</li>
          <li>• プライバシー設定で個人情報の含有をコントロールできます</li>
          <li>• 各項目の👁️アイコンで個別にコンテキストから除外可能です</li>
        </ul>
      </Card>
    </div>
  );
};
