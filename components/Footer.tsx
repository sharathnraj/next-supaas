import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const onScrollTop = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full">
      <div className="flex flex-col gap-4 bg-neutral-800 p-6 px-4 md:px-10">
        <h3 className="text-white md:text-center">Need help?</h3>

        <div className="flex flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="flex flex-1 flex-col gap-3 rounded-md bg-white bg-opacity-10 p-4 md:max-w-80 md:flex-row md:items-center"
          >
            <span className="material-icons-outlined text-3xl text-textSubtleReverse">
              call
            </span>
            <label className="font-sans-bold text-white">
              Call a product specialist
            </label>
          </Link>
          <a
            href="https://www.reece.com.au/storefinder/"
            rel="noreferrer noopener nofollow"
            target="_blank"
            className="flex flex-1 flex-col gap-3 rounded-md bg-white bg-opacity-10 p-4 md:max-w-80 md:flex-row md:items-center"
          >
            <span className="material-icons-outlined text-3xl text-textSubtleReverse">
              location_on
            </span>
            <label className="font-sans-bold text-white">Find a branch</label>
          </a>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between px-4 py-5 md:px-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={74}
            height={27.3}
            className="m-0"
          />
        </Link>
        <button
          className="-mt-5 h-16 w-16 appearance-none bg-reeceBlue p-5"
          onClick={onScrollTop}
        >
          <span className="material-icons text-2xl text-white">
            expand_less
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-6 border-b border-t border-neutral-200 px-4 py-6 md:flex-row md:px-10 md:py-8">
        <div className="flex flex-1 flex-col gap-4">
          <h5 className="text-reeceBlue">Reece Support</h5>
          <ul className="list-none">
            {/* <li>
              <Link href="/">
                <label className="small text-textSubtle">About Us</label>
              </Link>
            </li> */}
            <li>
              <Link href="/contact">
                <label className="small text-textSubtle">Contact Us</label>
              </Link>
            </li>
            {/* <li>
              <Link href="/">
                <label className="small text-textSubtle">FAQ</label>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="flex flex-1 flex-col items-start gap-4">
          {/* FIXME: Hidden for MVP */}
          {/* <h5 className="text-reeceBlue">Help improve the Reece Support</h5>
          <SecondaryButton href="mailto:reece@shadowboxer.co">
            <span className="material-icons-outlined text-xl">
              chat_bubble_outline
            </span>
            <span>Provide feedback</span>
          </SecondaryButton> */}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between px-4 py-5 md:flex-row md:items-center md:px-10">
        <label className="small text-textSubtle">{`Copyright © ${new Date().getFullYear()}, Reece Ltd.`}</label>
        <ul className="flex list-none flex-row gap-5">
          {/* <li>
            <Link href="/">
              <label className="small text-textSubtle">
                Terms and Conditions
              </label>
            </Link>
          </li>
          <li>
            <Link href="/">
              <label className="small text-textSubtle">Privacy</label>
            </Link>
          </li>
          <li>
            <Link href="/">
              <label className="small text-textSubtle">Warranty</label>
            </Link>
          </li> */}
        </ul>
      </div>
    </footer>
  );
}
