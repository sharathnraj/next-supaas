import { ReactNode } from 'react';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonSize?: 'small' | 'medium' | 'large';
  width?: 'auto' | 'full';
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading?: boolean;
  stacked?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  external?: boolean;
  externalBlankTarget?: boolean;
}
