import classNames from 'classnames';

interface NavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'next' | 'prev';
  disabled?: boolean;
  customClass?: string;
}

export default function NavigationButton({
  direction,
  disabled,
  customClass,
  onClick,
}: NavigationButtonProps) {
  const style = classNames(
    'absolute z-10 appearance-none p-2 w-10 h-10',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black',
    'transition',
    'top-1/2 transform -translate-y-[40px]',
    direction === 'next' ? 'right-0' : 'left-0',
    disabled
      ? 'bg-neutral-200 text-neutral-400'
      : 'text-white bg-reeceBlue active:bg-buttonBlue hover:bg-buttonBlueHover',
    customClass,
  );

  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {direction === 'next' ? (
        <span className="material-icons text-2xl text-white">
          arrow_forward
        </span>
      ) : (
        <span className="material-icons text-2xl text-white">arrow_back</span>
      )}
    </button>
  );
}
