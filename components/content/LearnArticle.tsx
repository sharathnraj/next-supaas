import ImageSlide from '@/components/carousel/ImageSlide';
import { ImageData, LearnDataArticle } from '@/lib/types';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';

export default function LearnArticle({
  title,
  leadText,
  heroImage,
  modularArticleTable,
}: LearnDataArticle) {
  // Lightbox props
  const [isOpen, setIsOpen] = useState<null | ImageData[]>(null);

  return (
    <div>
      {/* Hero */}
      <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-left">{title}</h1>
          {leadText && <p className="large text-left">{leadText}</p>}
        </div>
      </div>

      {/* Image */}
      {heroImage && heroImage[0] && (
        <div className="relative mx-auto flex h-[211px] max-w-3xl flex-col gap-4 md:h-[432px]">
          <Image
            src={heroImage[0].url}
            alt={heroImage[0].title}
            fill
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="px-4 pb-8 pt-4 md:px-10 md:pb-10">
        <div className="mx-auto max-w-3xl space-y-6">
          {modularArticleTable.map((module, index) => (
            <div key={index}>
              {module.__typename === 'articleBodyTextComponent_Entry' && (
                <div className="rich-text">{parse(module.bodyText)}</div>
              )}

              {module.__typename === 'articleImageComponent_Entry' && (
                <>
                  <ImageSlide
                    slide={module.featuredImage[0]}
                    setIsOpen={() => {
                      setIsOpen(module.featuredImage);
                    }}
                    className=""
                  />
                </>
              )}
            </div>
          ))}

          {isOpen !== null && (
            <Lightbox
              open={isOpen !== null}
              close={() => setIsOpen(null)}
              slides={isOpen.map(slide => ({
                src: slide.url,
                alt: slide.title,
              }))}
              plugins={[Zoom]}
              carousel={{
                finite: true,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
