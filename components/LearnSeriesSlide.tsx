//  This is a component that will be used to display the content of the card
// This will have an image and a title and description

import TertiaryButton from '@/components/buttons/TertiaryButton';
import { LearnSeriesData } from '@/lib/types';
import classNames from 'classnames';
import Image from 'next/image';

export default function LearnSeriesSlide({
  index,
  slide,
}: {
  index: number;
  slide: LearnSeriesData;
}) {
  return (
    <div className="ml-4 md:ml-5 lg:ml-6">
      <TertiaryButton href={slide.slug}>
        <div
          className={classNames(
            'flex max-w-[223px] cursor-pointer flex-col overflow-hidden',
            'relative rounded-lg',
            index % 2 == 0 ? 'bg-maxLightBlue' : 'bg-reeceBlue',
          )}
        >
          <div className="h-[223px] w-[223px]">
            <div className="relative m-[25px] h-[173px] w-[173px] overflow-hidden rounded-full">
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
              {/* Count */}
              <label className="small">{slide.learnContentList?.length}</label>
            </div>
          </div>
          <div className="flex h-[68px] items-start bg-neutral-800">
            <h5 className="m-2.5 text-left text-white">{slide.title}</h5>
          </div>
        </div>
      </TertiaryButton>
    </div>
  );
}
