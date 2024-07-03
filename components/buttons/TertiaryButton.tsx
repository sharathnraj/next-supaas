import { ButtonProps } from '@/components/buttons/type';
import classNames from 'classnames';
import Link from 'next/link';

export default function TertiaryButton(props: ButtonProps) {
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
    'flex flex-row items-center justify-center gap-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black',
    'transition duration-200',
    'w-auto',
    'font-sans-bold text-center',
    disabled
      ? 'text-neutral-400'
      : 'text-buttonBlue hover:text-buttonBlueHover',
    { 'w-full': width === 'full' },
    { 'text-sm leading-tight': buttonSize === 'small' },
    { 'text-base leading-tight': buttonSize === 'medium' },
    { 'text-base leading-tight': buttonSize === 'large' },
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
