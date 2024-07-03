import FormFieldInfoLabel from '@/components/forms/FormFieldInfoLabel';
import FormInputError from '@/components/forms/FormInputError';
import classNames from 'classnames';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface InputSelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  invalid?: boolean;
  errors?: FieldError;
  children?: React.ReactNode;
  info?: string;
}

const InputSelect = React.forwardRef<HTMLSelectElement, InputSelectProps>(
  (props, ref) => {
    const {
      label,
      children,
      invalid,
      errors,
      info,
      type,
      placeholder,
      disabled,
      ...inputProps
    } = props;

    const hasErrors = invalid ?? errors;

    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="font-sans-bold">{label}</label>}

        {info && <FormFieldInfoLabel>{info}</FormFieldInfoLabel>}

        <div
          className={classNames(
            'relative flex h-full w-full flex-row rounded border bg-white focus-within:ring-2',
            disabled ? 'bg-buttonDisabled' : 'bg-white',
            hasErrors
              ? 'border-feedbackError focus-within:ring-feedbackError'
              : 'border-neutral-200 focus-within:ring-buttonBlue',
          )}
        >
          <select
            {...inputProps}
            ref={ref}
            className="block h-full w-full appearance-none truncate border-transparent bg-transparent p-3.5 pr-8 text-base leading-tight text-textDefault placeholder-textPlaceholder outline-none focus:border-transparent focus:ring-0"
            disabled={disabled}
          >
            {children}
          </select>
        </div>

        <FormInputError errors={errors} />
      </div>
    );
  },
);

InputSelect.displayName = 'InputSelect';

export default InputSelect;
