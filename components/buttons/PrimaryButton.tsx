import { ButtonProps } from '@/components/buttons/type';
import classNames from 'classnames';
import Link from 'next/link';

export default function PrimaryButton(props: ButtonProps) {
  const {
    buttonSize = 'medium',
    className,
    type,
    children,
    loading,
    disabled = false,
    title,
    width = 'auto',
    href,
    target,
    external,
    externalBlankTarget,
    onClick,
    ...buttonProps
  } = props;

  const style = classNames(
    'flex flex-row items-center justify-center gap-2 rounded',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black',
    'transition duration-200',
    'w-auto',
    'font-sans-bold text-center',
    disabled
      ? 'bg-neutral-200 text-neutral-400'
      : 'text-white bg-buttonBlue active:bg-buttonBlue hover:bg-buttonBlueHover',
    { 'w-full': width === 'full' },
    { 'px-3.5 py-2 text-sm leading-tight': buttonSize === 'small' },
    { 'px-4 py-2.5 text-base leading-tight': buttonSize === 'medium' },
    { 'px-6 py-3.5 text-base leading-tight': buttonSize === 'large' },
    className,
  );

  if (href && !onClick) {
    const target = externalBlankTarget ? '_blank' : '_self';

    if (external) {
      return (
        <a
          className={style}
          href={href}
          rel="noreferrer noopener nofollow"
          target={target}
        >
          {loading ? (
            <div className="loader">
              &nbsp;
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            children
          )}
        </a>
      );
    }

    return (
      <Link
        href={href}
        rel="noreferrer noopener nofollow"
        target={target}
        className={style}
      >
        {loading ? (
          <div className="loader">
            &nbsp;
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      onClick={onClick}
      type={type}
      className={style}
      disabled={disabled}
    >
      {loading ? (
        <div className="loader">
          &nbsp;
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
