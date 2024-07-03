//  This is a component that will be used to display the content of the card
// This will have an image and a title and description

import TertiaryButton from '@/components/buttons/TertiaryButton';
import { LearnSlideType } from '@/components/carousel/types';
import { LearnDataArticle, LearnDataGuide, LearnDataVideo } from '@/lib/types';
import Image from 'next/image';

export default function LearnContentSlide({
  slide,
}: {
  slide: LearnDataVideo | LearnDataGuide | LearnDataArticle;
}) {
  return (
    <div className="ml-4 md:ml-5 lg:ml-6">
      <TertiaryButton href={slide.slug}>
        <div className="flex max-w-[252px] cursor-pointer flex-col gap-2.5 overflow-hidden bg-white">
          <div className="relative h-[142px] w-[252px]">
            <Image
              src={slide.thumbnailImage?.[0]?.url ?? ''}
              alt={slide.title}
              fill
              className="block rounded-lg object-cover"
            />
          </div>
          <div className="space-y-1">
            <h5 className="line-clamp-2 text-left text-textDefault">
              {slide.title}
            </h5>
            <label className="small flex flex-row items-center text-textSubtle">
              <span className="material-icons-outlined mr-1 text-xl">
                {slide.__typename === 'learningVideo_Entry'
                  ? LearnSlideType.video
                  : LearnSlideType.article}
              </span>
              {`${slide.__typename === 'learningVideo_Entry' ? slide.videoDuration : slide.readTime} min`}
            </label>
          </div>
        </div>
      </TertiaryButton>
    </div>
  );
}
