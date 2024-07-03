import Breadcrumbs from '@/components/Breadcrumbs';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NavItems = [
  { href: '/', title: 'Heat pump support' },
  { href: '/learn', title: 'Learn' },
];

function NavItem({ href, title }: { href: string; title: string }) {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <li
      className={classNames(
        'border-b border-primary-900 p-4 md:border-b-2 md:p-0',
        isActive ? 'md:border-primary-900' : 'md:border-transparent',
      )}
    >
      <Link href={href} className="block md:px-0 md:py-4">
        <label htmlFor="" className="font-sans-bold">
          {title}
        </label>
      </Link>
    </li>
  );
}

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="relative z-10 w-full">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 md:px-10 md:py-4">
        {/* Contact us button */}
        <SecondaryButton
          href="/contact"
          className="md:hidden"
          buttonSize="small"
        >
          Contact
        </SecondaryButton>
        <div className="flex items-center gap-5">
          {/* Nav menu trigger button */}

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 flex-col items-center justify-center gap-1 md:flex-row md:gap-2.5"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={58.6}
              height={21.61}
              className="md:hidden"
              priority
            />
            <Image
              src="/support.svg"
              alt="Logo"
              width={58.6}
              height={14}
              className="md:hidden"
              priority
            />
            <Image
              src="/logo.svg"
              alt="Logo"
              width={74}
              height={27.3}
              className="hidden md:block"
              priority
            />
            <Image
              src="/support.svg"
              alt="Logo"
              width={62}
              height={15}
              className="hidden md:block"
              priority
            />
          </Link>
        </div>

        {/* Contact us button */}
        <SecondaryButton
          href="/contact"
          className="hidden md:flex"
          buttonSize="small"
        >
          Contact
        </SecondaryButton>

        <div className="flex w-[83px] flex-row items-center justify-end md:hidden">
          <button className="h-6 w-6" onClick={() => setIsNavOpen(!isNavOpen)}>
            <span className="material-icons text-2xl">menu</span>
          </button>
        </div>
      </div>

      {/* Nav menu */}
      <nav
        className={classNames(
          `fixed top-0 z-10 h-dvh w-full border-b border-neutral-200 bg-reeceBlue transition-[right] duration-300 md:static md:flex md:h-auto md:items-center md:bg-transparent md:bg-white md:px-10`,
          isNavOpen ? 'right-0' : '-right-full',
        )}
      >
        <div className="flex items-center justify-end border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex h-10 items-center"
          >
            <span className="material-icons text-2xl">close</span>
          </button>
        </div>

        <ul className="m-0 flex list-none flex-col text-white md:flex-row md:gap-4 md:p-0 md:text-textDefault">
          {NavItems.map((item, index) => (
            <NavItem key={index} href={item.href} title={item.title} />
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 px-4 py-6 md:hidden">
          <label className="small text-white">Need help?</label>
          <SecondaryButton reversed href="/contact">
            Contact support
          </SecondaryButton>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <Breadcrumbs />
    </header>
  );
}
