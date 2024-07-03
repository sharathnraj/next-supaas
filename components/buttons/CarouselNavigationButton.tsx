import { ButtonProps } from '@/components/buttons/type';
import classNames from 'classnames';

interface CarouselNavigationButtonProps extends ButtonProps {
  direction: string;
}

export default function CarouselNavigationButton(
  props: CarouselNavigationButtonProps,
) {
  const {
    direction,
    buttonSize = 'medium',
    className,
    type,
    children,
    loading,
    disabled = false,
    title,
    width = 'auto',
    ...buttonProps
  } = props;

  const style = classNames(
    'flex items-center justify-center w-10 h-10',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black',
    'transition duration-200',
    disabled
      ? 'bg-neutral-200 text-neutral-400'
      : 'text-white bg-reeceBlue active:bg-buttonBlue hover:bg-buttonBlueHover',
    className,
  );

  return (
    <button {...buttonProps} type={type} className={style} disabled={disabled}>
      {loading ? (
        <div className="loader">&nbsp;</div>
      ) : direction === 'right' ? (
        <span className="material-icons text-2xl text-white">
          arrow_forward
        </span>
      ) : (
        <span className="material-icons text-2xl text-white">arrow_back</span>
      )}
    </button>
  );
}
