import PrimaryButton from '@/components/buttons/PrimaryButton';
import { GeneralContactInformationData } from '@/lib/types';

interface ContactInfoProps extends GeneralContactInformationData {
  info?: string;
}

interface GeneralContactInformationProps extends GeneralContactInformationData {
  setIsIssueUnresolved: (value: boolean) => void;
}

export function ContactInfo({
  info,
  title,
  roleOrPosition,
  businessName,
  contactHours,
  contactLink,
}: ContactInfoProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Info */}
      {info && <p>{info}</p>}

      {/* Contact */}
      <div>
        <h5>{title}</h5>
        <p>{roleOrPosition}</p>
        <p>{businessName}</p>
      </div>

      {/* Information */}
      <PrimaryButton href={contactLink} external className="w-full md:w-auto">
        <span className="material-icons-outlined text-2xl">
          {contactLink.includes('tel:')
            ? 'call'
            : contactLink.includes('mailto:')
              ? 'mail'
              : ''}
        </span>
        <span>{`${
          contactLink.includes('tel:')
            ? 'Call '
            : contactLink.includes('mailto:')
              ? 'Mail '
              : ''
        }${contactLink.replace('tel:', '').replace('mailto:', '')}`}</span>
      </PrimaryButton>
      <p className="small text-textSubtle">{contactHours}</p>
    </div>
  );
}

export default function GeneralContactInformation({
  setIsIssueUnresolved,
  ...props
}: GeneralContactInformationProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-3 border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200"
          onClick={() => {
            setIsIssueUnresolved(false);

            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="material-icons text-base">arrow_back</span>
        </button>
        <h3>Contact support</h3>
      </div>
      <div className="px-4 py-5 md:p-8">
        <ContactInfo
          {...props}
          info="If you’re unable to resolve this issue, please contact product support:"
        />
      </div>
    </div>
  );
}
