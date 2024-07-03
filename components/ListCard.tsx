import getIcon from '@/lib/icons';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

function ListCardBody({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-4 text-left">
      {icon ? (
        <div className="shrink-0 overflow-hidden rounded-full bg-primary-50 p-3">
          <Image src={getIcon(icon)} alt={title} width={40} height={40} />
        </div>
      ) : (
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100" />
      )}
      <div>
        <h4>{title}</h4>
        {description && <p className="p2 text-textSubtle">{description}</p>}
      </div>
    </div>
  );
}

export default function ListCard({
  title,
  description,
  icon,
  href,
  onClick,
  external,
  externalBlankTarget,
}: {
  title: string;
  description?: string;
  icon?: string;
  href: string;
  onClick?: () => void;
  external?: boolean;
  externalBlankTarget?: boolean;
}) {
  const buttonClass =
    'appearance-none flex items-center justify-between gap-4 rounded-lg border-2 border-neutral-200 p-4 transition hover:border-black active:border-neutral-300';
  if (onClick) {
    return (
      <button onClick={onClick} className={classNames(buttonClass)}>
        <ListCardBody title={title} description={description} icon={icon} />
        <span className="material-icons text-2xl">chevron_right</span>
      </button>
    );
  }

  const target = externalBlankTarget ? '_blank' : '_self';

  if (external) {
    return (
      <a
        className={classNames(buttonClass)}
        href={href}
        rel="noreferrer noopener nofollow"
        target={target}
      >
        <ListCardBody title={title} description={description} icon={icon} />
        <span className="material-icons text-2xl">open_in_new</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classNames(buttonClass)}>
      <ListCardBody title={title} description={description} icon={icon} />
      <span className="material-icons text-2xl">chevron_right</span>
    </Link>
  );
}
