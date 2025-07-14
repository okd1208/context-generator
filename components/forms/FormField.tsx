import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { FormField as FormFieldType, FormData } from '@/types/form';
import {
  Input,
  TextArea,
  Select,
  Checkbox,
  MultiSelect
} from '@/components/ui/FormElements';

interface FormFieldProps<T extends FieldValues> {
  field: FormFieldType;
  register: UseFormRegister<T>;
  watch: (name: keyof T) => any;
  setValue: (name: keyof T, value: any) => void;
  errors: any;
  excludedFields: string[];
  onToggleExclude: (fieldId: string) => void;
}

export function FormField<T extends FieldValues>({
  field,
  register,
  watch,
  setValue,
  errors,
  excludedFields,
  onToggleExclude
}: FormFieldProps<T>) {
  const isExcluded = excludedFields.includes(field.id);
  const fieldValue = watch(field.id as keyof T);
  const error = errors[field.id]?.message;

  const handleCustomInputChange = (customValue: string) => {
    if (field.id === 'occupation' && customValue) {
      setValue('customOccupation' as keyof T, customValue);
    } else if (field.id === 'skills' && customValue) {
      setValue('customSkills' as keyof T, customValue);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            {...register(field.id as Path<T>, { required: field.required })}
            label={field.label}
            description={field.description}
            placeholder={field.placeholder}
            error={error}
            disabled={isExcluded}
          />
        );

      case 'textarea':
        return (
          <TextArea
            {...register(field.id as Path<T>, { required: field.required })}
            label={field.label}
            description={field.description}
            placeholder={field.placeholder}
            error={error}
            disabled={isExcluded}
          />
        );

      case 'select':
        return (
          <div className="space-y-3">
            <Select
              {...register(field.id as Path<T>, { required: field.required })}
              label={field.label}
              description={field.description}
              options={field.options || []}
              error={error}
              disabled={isExcluded}
            />
            {field.allowCustom && fieldValue === 'other' && (
              <Input
                placeholder="具体的に入力してください"
                onChange={(e) => handleCustomInputChange(e.target.value)}
                disabled={isExcluded}
              />
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            <MultiSelect
              label={field.label}
              description={field.description}
              options={field.options || []}
              value={fieldValue || []}
              onChange={(value) => setValue(field.id as keyof T, value)}
              error={error}
            />
            {field.allowCustom && (
              <Input
                placeholder="その他のスキル・専門分野（カンマ区切り）"
                onChange={(e) => handleCustomInputChange(e.target.value)}
                disabled={isExcluded}
              />
            )}
          </div>
        );

      case 'checkbox':
        return (
          <Checkbox
            {...register(field.id as Path<T>)}
            label={field.label}
            description={field.description}
            disabled={isExcluded}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            <label className="field-label">{field.label}</label>
            {field.description && (
              <p className="field-description">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    {...register(field.id as Path<T>, { required: field.required })}
                    type="radio"
                    value={option.value}
                    className="form-checkbox"
                    disabled={isExcluded}
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-2 ${isExcluded ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {renderField()}
        </div>
        {field.canExclude && (
          <button
            type="button"
            onClick={() => onToggleExclude(field.id)}
            className="ml-3 mt-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title={isExcluded ? 'コンテキストに含める' : 'コンテキストから除外'}
          >
            {isExcluded ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {isExcluded && (
        <p className="text-xs text-gray-500 italic">
          この項目はコンテキストに含まれません
        </p>
      )}
    </div>
  );
}

interface FormSectionProps<T extends FieldValues> {
  section: {
    id: string;
    title: string;
    description?: string;
    fields: FormFieldType[];
    showIf?: (data: Partial<FormData>) => boolean;
  };
  register: UseFormRegister<T>;
  watch: (name: keyof T) => any;
  setValue: (name: keyof T, value: any) => void;
  errors: any;
  mode: 'simple' | 'detailed';
  excludedFields: string[];
  onToggleExclude: (fieldId: string) => void;
  formData: Partial<FormData>;
}

export function FormSection<T extends FieldValues>({
  section,
  register,
  watch,
  setValue,
  errors,
  mode,
  excludedFields,
  onToggleExclude,
  formData
}: FormSectionProps<T>) {
  // セクションの表示条件をチェック
  if (section.showIf && !section.showIf(formData)) {
    return null;
  }

  // モードに応じてフィールドをフィルタリング
  const visibleFields = section.fields.filter(field => {
    if (mode === 'simple') {
      return field.showInSimpleMode;
    }
    return true;
  });

  if (visibleFields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="section-title">{section.title}</h3>
        {section.description && (
          <p className="text-gray-600 text-sm">{section.description}</p>
        )}
      </div>
      <div className="space-y-4">
        {visibleFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            excludedFields={excludedFields}
            onToggleExclude={onToggleExclude}
          />
        ))}
      </div>
    </div>
  );
}
