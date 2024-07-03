import FormFieldInfoLabel from '@/components/forms/FormFieldInfoLabel';
import FormInputError from '@/components/forms/FormInputError';
import classNames from 'classnames';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  invalid?: boolean;
  errors?: FieldError;
  children?: React.ReactNode;
  info?: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (props, ref) => {
    const {
      label,
      subLabel,
      children,
      invalid,
      errors,
      info,
      type,
      placeholder,
      disabled,
      ...inputProps
    } = props;

    const isPassword = type === 'password';
    const [passwordShown, setPasswordShown] = useState<boolean>(false);

    const showPassword = () => {
      setPasswordShown(!passwordShown);
    };

    const hasErrors = invalid ?? errors;

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

        <div
          className={classNames(
            'relative flex h-full w-full flex-row rounded border bg-white focus-within:ring-2',
            disabled ? 'bg-buttonDisabled' : 'bg-white',
            hasErrors
              ? 'border-feedbackError focus-within:ring-feedbackError'
              : 'border-neutral-200 focus-within:ring-buttonBlue',
          )}
        >
          <input
            {...inputProps}
            ref={ref}
            className="peer block h-full w-full appearance-none border-transparent bg-transparent p-3.5 text-base leading-tight text-textDefault placeholder-textPlaceholder outline-none focus:border-transparent focus:ring-0"
            placeholder={placeholder}
            type={isPassword ? (passwordShown ? 'text' : 'password') : type}
            disabled={disabled}
          />

          {isPassword && (
            <button
              className="px-4 font-sans-bold text-sm text-textDefault underline"
              type="button"
              onClick={showPassword}
            >
              {passwordShown ? 'Hide' : 'Show'}
            </button>
          )}
        </div>

        <FormInputError errors={errors} />
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
