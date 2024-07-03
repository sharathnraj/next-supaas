import SecondaryButton from '@/components/buttons/SecondaryButton';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useRouter } from 'next/router';

export default function ResolvedDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
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
            <h3>Glad to hear! What’s next?</h3>
            <div className="mt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <SecondaryButton
                  onClick={() => {
                    setIsOpen(false);
                    router.reload();
                  }}
                  buttonSize="large"
                >
                  Troubleshoot another issue
                </SecondaryButton>
                <SecondaryButton
                  onClick={() => {
                    setIsOpen(false);
                    router.back();
                  }}
                  buttonSize="large"
                >
                  Exit troubleshooting
                </SecondaryButton>
              </div>
              {/* FIXME: Hidden for MVP */}
              {/* <div className="flex flex-col gap-4 rounded-lg bg-neutral-100 p-4">
                <p>How can we improve your troubleshooting experience?</p>
                <SecondaryButton
                  // onClick={() => {
                  //   setIsOpen(false);
                  //   router.push('/contact');
                  // }}
                  href="mailto:reece@shadowboxer.co"
                  buttonSize="large"
                >
                  <span className="material-icons-outlined text-xl">
                    chat_bubble_outline
                  </span>
                  <span>Provide feedback</span>
                </SecondaryButton>
              </div> */}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
