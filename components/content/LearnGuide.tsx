import CheckedList from '@/components/CheckedList';
import DownloadCard from '@/components/DownloadCard';
import GuideSection from '@/components/GuideSection';
import Table from '@/components/Table';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Carousel from '@/components/carousel/Carousel';
import { SlideType } from '@/components/carousel/types';
import { LearnDataGuide } from '@/lib/types';
import parse from 'html-react-parser';
import isMobile from 'is-mobile';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LearnGuide({
  title,
  pageDescription,
  showModuleTableNavigation,
  codeEmbed,
  modularContentTable,
}: LearnDataGuide) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-left">{title}</h1>
          {pageDescription && (
            <p className="large text-left">{pageDescription}</p>
          )}
        </div>
      </div>

      {/* Code embed */}
      {codeEmbed && (
        <div className="px-4 pb-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <SecondaryButton
              href={codeEmbed?.split('src="')[1].split('"')[0]}
              external
              externalBlankTarget
              className="w-max"
            >
              <span>Open in new window</span>
              <span className="material-icons text-base">open_in_new</span>
            </SecondaryButton>
            <div className="rounded-lg border border-neutral-200 bg-white">
              <div className="md:p-8">{parse(codeEmbed)}</div>
            </div>
          </div>
        </div>
      )}

      {/* In this guide */}
      {showModuleTableNavigation && modularContentTable.length > 0 && (
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <div className="space-y-4">
              <h6>Jump to</h6>
              <ul className="ml-4 list-outside list-disc space-y-3 text-buttonBlue">
                {modularContentTable.map(item => (
                  <li key={item.slug}>
                    <Link href={`#${item.slug}`} className="font-sans-bold">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* In this guide items */}
      {modularContentTable.length > 0 && (
        <div className="bg-primary-50 px-4 py-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <div className="space-y-4">
              {modularContentTable.map(item => (
                <div key={item.slug}>
                  <GuideSection
                    id={item.slug}
                    href={
                      item.__typename !==
                        'downloadableResourcesComponent_Entry' &&
                      item.downloadableResourceList &&
                      item.downloadableResourceList.length > 0
                        ? `${item.downloadableResourceList[0].resourceFile[0].url}${isMobileDevice ? `#page${item.downloadableResourceList[0].openAtPage}` : `#page=${item.downloadableResourceList[0].openAtPage}`}`
                        : `#${item.slug}`
                    }
                    title={item.title}
                    showButton={
                      !!(
                        item.downloadableResourceList &&
                        item.downloadableResourceList.length > 0
                      )
                    }
                    description={item.description}
                  >
                    {item.__typename === 'checklistComponent_Entry' && (
                      <CheckedList list={item.checklist} />
                    )}

                    {item.__typename === 'imageAndSpecsComponent_Entry' &&
                      item.specificationsTable && (
                        <Table data={item.specificationsTable} />
                      )}

                    {item.__typename === 'imageAndSpecsComponent_Entry' &&
                      item.imageCarousel && (
                        <Carousel
                          slides={item.imageCarousel}
                          slideType={SlideType.Image}
                          infinite={item.imageCarousel.length > 1}
                        />
                      )}

                    {item.__typename === 'videoComponent_Entry' &&
                      item.youtubeUrl && (
                        <div className="relative h-0 w-full bg-black pb-[56.25%]">
                          <iframe
                            src={item.youtubeUrl}
                            className="absolute left-0 top-0 h-full w-full"
                          />
                        </div>
                      )}

                    {item.__typename === 'relatedProductsComponent_Entry' &&
                      item.productAndPartsList && (
                        <Carousel
                          slides={item.productAndPartsList
                            .reduce((acc: any[], curr, index) => {
                              if (index % 3 === 0) acc.push([]);
                              if (acc[acc.length - 1])
                                acc[acc.length - 1].push(curr);
                              return acc;
                            }, [])
                            .map(group => ({ products: group }))}
                          slideType={SlideType.Product}
                          infinite={item.productAndPartsList.length > 3}
                        />
                      )}

                    {item.__typename ===
                      'downloadableResourcesComponent_Entry' &&
                      item.downloadableResourceList && (
                        <div className="space-y-3">
                          {item.downloadableResourceList.map(item => (
                            <DownloadCard
                              key={item.id}
                              title={item.title}
                              description={item.resourceDescription}
                              image={item.resourceImage[0].url}
                              href={item.resourceFile[0].url}
                            />
                          ))}
                        </div>
                      )}
                  </GuideSection>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
