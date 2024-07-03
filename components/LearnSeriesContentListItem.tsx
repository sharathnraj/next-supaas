import TertiaryButton from '@/components/buttons/TertiaryButton';
import { LearnSlideType } from '@/components/carousel/types';
import { LearnDataArticle, LearnDataGuide, LearnDataVideo } from '@/lib/types';
import classNames from 'classnames';
import Image from 'next/image';

export default function LearnSeriesContentListItem({
  data,
  border = true,
}: {
  data: LearnDataVideo | LearnDataGuide | LearnDataArticle;
  border?: boolean;
}) {
  return (
    <TertiaryButton
      href={data.slug}
      className={classNames(
        '200 py-4',
        border ? 'border-b border-neutral-200' : '',
      )}
    >
      <div className="flex w-full min-w-[103px] cursor-pointer flex-row gap-4 overflow-hidden bg-white">
        <div className="relative h-[78px] w-[103px] min-w-[103px]">
          <Image
            src={data.thumbnailImage?.[0]?.url ?? ''}
            alt={data.title}
            fill
            className="block rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h5 className="text-left text-textDefault">{data.title}</h5>
          <label className="small flex flex-row items-center text-textSubtle">
            <span className="material-icons-outlined mr-1">
              {data.__typename === 'learningVideo_Entry'
                ? LearnSlideType.video
                : LearnSlideType.article}
            </span>
            <label className="text-sm text-textSubtle">{`${data.__typename === 'learningVideo_Entry' ? data.videoDuration : data.readTime} min`}</label>
          </label>
        </div>
      </div>
    </TertiaryButton>
  );
}
