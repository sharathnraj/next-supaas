import FormFieldInfoLabel from '@/components/forms/FormFieldInfoLabel';
import FormInputError from '@/components/forms/FormInputError';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface PostcodeOrSuburbData {
  id: number;
  name: string;
  postcode: string;
  state: string;
}

interface PostcodeAutocompleteProps {
  label?: string;
  placeholder?: string;
  invalid?: boolean;
  errors?: Merge<FieldError, FieldErrorsImpl<PostcodeOrSuburbData>>;
  children?: React.ReactNode;
  info?: string;
  value: PostcodeOrSuburbData;
  onChange: any;
  onBlur: any;
}

const PostcodeAutocomplete = React.forwardRef<
  HTMLInputElement,
  PostcodeAutocompleteProps
>((props, ref) => {
  const { label, placeholder, invalid, errors, info, value, onChange, onBlur } =
    props;

  const [query, setQuery] = useState('');

  const hasErrors = invalid ?? errors;

  const [options, setOptions] = useState<PostcodeOrSuburbData[]>([]);

  useEffect(() => {
    fetch(
      `https://www.reece.com.au/hwu-rebate-estimator/data/suburbs?query=${query}`,
    )
      .then(response => response.json())
      .then(data => {
        setOptions(data as PostcodeOrSuburbData[]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [query]);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="font-sans-bold">{label}</label>}

      {info && <FormFieldInfoLabel>{info}</FormFieldInfoLabel>}

      <Combobox value={value} onChange={onChange} nullable>
        <div className="relative">
          <div
            className={classNames(
              'relative flex h-full w-full flex-row rounded border bg-white focus-within:ring-2',
              hasErrors
                ? 'border-feedbackError focus-within:ring-feedbackError'
                : 'border-neutral-200 focus-within:ring-buttonBlue',
            )}
          >
            <ComboboxInput
              ref={ref}
              className="block h-full w-full appearance-none border-transparent bg-transparent p-3.5 text-base leading-tight text-textDefault placeholder-textPlaceholder outline-none focus:border-transparent focus:ring-0"
              displayValue={() => value?.name ?? ''}
              onChange={event => setQuery(event.target.value)}
              placeholder={placeholder}
              onBlur={onBlur}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-neutral-200 bg-white">
              {options.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-3.5 py-2.5">
                  Nothing found.
                </div>
              ) : (
                options.map(option => (
                  <ComboboxOption
                    key={option.postcode}
                    className={({ selected }) =>
                      classNames(
                        'cursor-pointer px-3.5 py-2.5 hover:bg-neutral-100',
                        selected ? 'bg-neutral-100' : '',
                      )
                    }
                    value={option}
                  >
                    <span className={`block truncate`}>{option.name}</span>
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>

      <FormInputError errors={errors?.postcode as FieldError} />
    </div>
  );
});

PostcodeAutocomplete.displayName = 'PostcodeAutocomplete';

export default PostcodeAutocomplete;
