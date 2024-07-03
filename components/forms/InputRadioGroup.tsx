import FormFieldInfoLabel from '@/components/forms/FormFieldInfoLabel';
import FormInputError from '@/components/forms/FormInputError';
import { Radio, RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputRadioGroupProps {
  label?: string;
  subLabel?: string;
  info?: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  errors?: FieldError;
}

const InputRadioGroup = React.forwardRef<
  HTMLInputElement,
  InputRadioGroupProps
>((props, ref) => {
  const { label, subLabel, info, options, value, onChange, onBlur, errors } =
    props;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans-bold">
          {label}
          {subLabel && (
            <span className="font-sans text-sm text-textSubtle">
              {' '}
              {subLabel}
            </span>
          )}
        </label>
      )}

      {info && <FormFieldInfoLabel>{info}</FormFieldInfoLabel>}

      <RadioGroup
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="items-center space-y-3 py-2"
      >
        {options.map(option => (
          <Radio
            key={option.value}
            value={option.value}
            aria-label={option.label}
            className="flex gap-3 text-left"
          >
            {({ checked }) => (
              <>
                <span
                  className={classNames(
                    'flex h-5 w-5 items-center justify-center rounded-full border transition',
                    checked
                      ? 'border-buttonBlue bg-buttonBlue'
                      : 'border-neutral-200 bg-white',
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <label>{option.label}</label>
              </>
            )}
          </Radio>
        ))}
      </RadioGroup>

      <FormInputError errors={errors} />
    </div>
  );
});

InputRadioGroup.displayName = 'InputRadioGroup';

export default InputRadioGroup;
