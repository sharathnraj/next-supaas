import { ButtonProps } from '@/components/buttons/type';
import classNames from 'classnames';
import Link from 'next/link';

export default function SecondaryButton(props: ButtonProps) {
  const {
    buttonSize = 'medium',
    className,
    type,
    children,
    loading,
    stacked = false,
    disabled = false,
    title,
    width = 'auto',
    reversed,
    href,
    target,
    external,
    externalBlankTarget,
    onClick,
    ...buttonProps
  } = props;

  const style = classNames(
    'flex flex-row items-center justify-center gap-2 rounded',
    stacked ? 'flex-col' : 'flex-row',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black',
    'transition duration-200',
    'border-2 border-neutral-300',
    'w-auto',
    'font-sans-bold text-center',
    disabled ? 'text-neutral-400' : 'text-neutral-900 hover:border-neutral-900',
    reversed
      ? 'border-white border-opacity-40 text-white hover:border-white hover:border-opacity-100'
      : '',
    { 'w-full': width === 'full' },
    { 'px-3 py-1.5 text-sm leading-tight': buttonSize === 'small' },
    { 'px-3.5 py-2 text-base leading-tight': buttonSize === 'medium' },
    { 'px-5.5 py-3 text-base leading-tight': buttonSize === 'large' },
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
