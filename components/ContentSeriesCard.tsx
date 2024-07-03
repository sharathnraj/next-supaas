import TertiaryButton from '@/components/buttons/TertiaryButton';
import { LearnSeriesData } from '@/lib/types';
import classNames from 'classnames';
import Image from 'next/image';

export default function ContentSeriesCard({
  index,
  slide,
}: {
  index: number;
  slide: LearnSeriesData;
}) {
  return (
    <div>
      <TertiaryButton href={`/learn/series/${slide.slug}`}>
        <div
          className={classNames(
            'flex w-[163px] cursor-pointer flex-col overflow-hidden md:w-[221px] xl:w-[282px]',
            'relative rounded-lg',
            index % 2 == 0 ? 'bg-maxLightBlue' : 'bg-reeceBlue',
          )}
        >
          <div>
            <div className="relative m-5 h-[124px] w-[124px] overflow-hidden rounded-full md:h-[173px] md:w-[173px] xl:m-8 xl:h-[219px] xl:w-[219px]">
              <Image
                src={slide.thumbnailImage?.[0].url}
                alt={slide.title}
                fill
                className="block object-cover"
              />
            </div>
            <div className="absolute bottom-[79px] left-2.5 flex items-center gap-1 rounded bg-neutral-800 px-1.5 py-0.5 text-white">
              <span className="material-icons-outlined mr-1 text-base">
                library_books
              </span>
              <label className="small">{slide.learnContentList.length}</label>
            </div>
          </div>
          <div className="flex min-h-[68px] w-full bg-neutral-800">
            <h5 className="m-2.5 line-clamp-2 text-start text-white">
              {slide.title}
            </h5>
          </div>
        </div>
      </TertiaryButton>
    </div>
  );
}
