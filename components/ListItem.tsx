import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

function ListItemBody({
  title,
  description,
  image,
  rounded,
}: {
  title: string;
  description?: string;
  image?: string;
  rounded: boolean;
}) {
  return (
    <div className="flex items-center justify-start gap-4 text-left">
      {image && (
        <div
          className={classNames(
            'relative h-16 w-16 shrink-0 overflow-hidden border border-neutral-200',
            rounded ? 'rounded-full' : '',
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            className={classNames('object-contain', rounded ? '' : 'p-1.5')}
          />
        </div>
      )}
      <div className="flex flex-col items-start justify-center">
        <h5>{title}</h5>
        {description && <p className="p2 text-textSubtle">{description}</p>}
      </div>
    </div>
  );
}

export default function ListItem({
  title,
  description,
  image,
  href,
  rounded = false,
  onClick,
  className,
}: {
  title: string;
  description?: string;
  image?: string;
  href: string;
  rounded?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const buttonClass =
    'appearance-none flex items-center justify-between gap-4 border-b border-neutral-200 py-4 w-full';

  if (onClick) {
    return (
      <button onClick={onClick} className={classNames(buttonClass, className)}>
        <ListItemBody
          title={title}
          description={description}
          image={image}
          rounded={rounded}
        />
        <span className="material-icons text-2xl">chevron_right</span>
      </button>
    );
  }

  return (
    <Link href={href} className={classNames(buttonClass, className)}>
      <ListItemBody
        title={title}
        description={description}
        image={image}
        rounded={rounded}
      />
      <span className="material-icons text-2xl">chevron_right</span>
    </Link>
  );
}
