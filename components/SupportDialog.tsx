import { ContactInfo } from '@/components/GeneralContactInformation';
import { GeneralContactInformationData } from '@/lib/types';
import { Dialog, DialogPanel } from '@headlessui/react';

interface SupportDialogProps extends GeneralContactInformationData {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function SupportDialog({
  isOpen,
  setIsOpen,
  ...props
}: SupportDialogProps) {
  return (
    <Dialog
      open={isOpen !== null}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/20 p-4">
        <DialogPanel className="min-w-80 max-w-96 rounded-lg bg-white shadow-lg">
          <div className="flex items-center justify-end pl-4">
            <button
              className="relative block h-14 appearance-none p-4"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span className="material-icons text-2xl">close</span>
            </button>
          </div>
          <div className="px-5 pb-8 md:px-8">
            <ContactInfo {...props} />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
