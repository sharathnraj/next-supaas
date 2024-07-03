import { LearnDataVideo } from '@/lib/types';
import parse from 'html-react-parser';

export default function LearnVideo({
  __typename,
  title,
  leadText,
  bodyText,
  youtubeUrl,
}: LearnDataVideo) {
  return (
    <div>
      {/* Video */}
      {__typename === 'learningVideo_Entry' && youtubeUrl && (
        <div className="pt-6">
          <div className="relative h-0 w-full bg-black pb-[56.25%] md:h-[433px] md:pb-0">
            <iframe
              src={youtubeUrl}
              className="absolute left-0 top-0 h-full w-full md:left-1/2 md:h-[433px] md:w-[770px] md:-translate-x-1/2 md:transform"
            />
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-left">{title}</h1>
          {leadText && <p className="large text-left">{leadText}</p>}
          {bodyText && (
            <div className="rich-text text-left">{parse(bodyText)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
