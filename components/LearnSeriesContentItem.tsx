import TertiaryButton from '@/components/buttons/TertiaryButton';
import Carousel from '@/components/carousel/Carousel';
import { SlideType } from '@/components/carousel/types';
import { LearnSeriesData } from '@/lib/types';

export default function LearnSeriesContentItem({
  title,
  slug,
  learnContentList,
}: {
  title: string;
  slug?: string;
  learnContentList: LearnSeriesData['learnContentList'];
}) {
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-4 overflow-hidden">
        <h3>{title}</h3>
        <TertiaryButton
          href={slug ? `/learn/series/${slug}` : '/learn/'}
          className="shrink-0"
        >
          <span>See all</span>
          <span className="material-icons text-2xl">chevron_right</span>
        </TertiaryButton>
      </div>
      <div className="learn-carousel mt-4">
        <Carousel
          slides={learnContentList.map(content => ({
            ...content,
            slug: `/learn/${content.slug}`,
          }))}
          slideType={SlideType.Learn}
          arrows={false}
          infinite={false}
          dots={false}
          draggable
          variableWidth
          wrapperClass="-mx-4 md:-mx-10"
        />
      </div>
    </div>
  );
}
