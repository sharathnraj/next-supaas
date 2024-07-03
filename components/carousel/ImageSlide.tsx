import { ImageData } from '@/lib/types';
import classNames from 'classnames';
import Image from 'next/image';

export default function ImageSlide({
  slide,
  setIsOpen,
  className = 'px-5 md:px-8',
}: {
  slide: ImageData;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
}) {
  return (
    <div className={classNames(className)}>
      <button
        className="relative h-60 w-full border border-neutral-200 md:h-96"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Image
          src={slide.url}
          alt={slide.title}
          fill
          className="object-contain"
        />
        <div className="absolute bottom-0 left-0 flex w-full items-center bg-neutral-200 px-4 py-2.5 pr-14">
          <p className="small text-left">{slide.title}</p>
        </div>
        <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center bg-reeceBlue">
          <span className="material-icons-outlined text-2xl text-white">
            zoom_in
          </span>
        </div>
      </button>
    </div>
  );
}
