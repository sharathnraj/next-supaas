import SecondaryButton from '@/components/buttons/SecondaryButton';
import parse from 'html-react-parser';
import { ReactNode } from 'react';

export default function GuideSection({
  id,
  title,
  description,
  href,
  children,
  showButton = true,
  buttonText = 'View in Installer’s Manual',
}: {
  id: string;
  title: string;
  description?: string;
  href: string;
  children?: ReactNode;
  showButton?: boolean;
  buttonText?: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white" id={id}>
      <div className="border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
        <h3>{title}</h3>
      </div>
      <div className="space-y-6 p-5 md:p-8">
        {description && <div className="rich-text">{parse(description)}</div>}

        {children}

        {showButton && (
          <SecondaryButton
            href={href}
            externalBlankTarget
            buttonSize="large"
            className="w-full md:w-max"
          >
            <span className="material-icons-outlined text-xl">description</span>
            <span>{buttonText}</span>
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}
