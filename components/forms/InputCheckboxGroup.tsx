import FormFieldInfoLabel from '@/components/forms/FormFieldInfoLabel';
import FormInputError from '@/components/forms/FormInputError';
import { Checkbox } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputCheckboxGroupProps {
  label?: string;
  subLabel?: string;
  info?: string;
  options: {
    value: string;
    label: string;
  }[];
  value: (string | undefined)[] | null | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  errors?: FieldError;
}

const InputCheckboxGroup = React.forwardRef<
  HTMLInputElement,
  InputCheckboxGroupProps
>((props, ref) => {
  const {
    label,
    subLabel,
    info,
    options,
    // value,
    // onChange,
    // onBlur,
    errors,
  } = props;

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
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

      {options.map(option => (
        <Checkbox
          key={option.value}
          value={option.value}
          aria-label={option.label}
          className="flex gap-3 text-left"
        >
          {({ checked }) => (
            <>
              <span
                className={classNames(
                  'flex h-5 w-5 items-center justify-center rounded border transition',
                  checked
                    ? 'border-buttonBlue bg-buttonBlue'
                    : 'border-neutral-200 bg-white',
                )}
              >
                <span className="material-icons text-white">check</span>
              </span>
              <label>{option.label}</label>
            </>
          )}
        </Checkbox>
      ))}

      <FormInputError errors={errors} />
    </div>
  );
});

InputCheckboxGroup.displayName = 'InputCheckboxGroup';

export default InputCheckboxGroup;
