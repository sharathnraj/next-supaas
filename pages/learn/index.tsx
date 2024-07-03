import ContentCard from '@/components/ContentCard';
import LearnSeriesContentItem from '@/components/LearnSeriesContentItem';
import TertiaryButton from '@/components/buttons/TertiaryButton';
import Carousel from '@/components/carousel/Carousel';
import { SlideType } from '@/components/carousel/types';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import {
  FeaturedLinksData,
  LearnDataArticle,
  LearnDataGuide,
  LearnDataVideo,
  LearnLandingData,
  LearnSeriesData,
} from '@/lib/types';
import Head from 'next/head';

export default function Learn({
  learnLanding,
  learnSeries,
  learnEntries,
  featuredLinks,
}: {
  learnLanding: LearnLandingData;
  learnSeries: LearnSeriesData[];
  learnEntries: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
  featuredLinks: FeaturedLinksData[];
}) {
  return (
    <RootLayout>
      <Head>
        <title>Learn</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto grid max-w-3xl justify-items-center gap-1">
            <h4>Learn</h4>
            <h1>{learnLanding.title}</h1>
          </div>
        </div>

        {/* Series */}
        <div className="p-4 pb-6 md:px-10">
          <div className="mx-auto flex flex-col gap-8">
            {learnLanding.featuredSeries.map(item => {
              const series = learnSeries.find(
                series => series.slug === item.slug,
              );

              if (!series) return null;

              return (
                <LearnSeriesContentItem
                  key={series.title}
                  {...series}
                  learnContentList={learnEntries.filter(entry =>
                    series.learnContentList
                      .map(learnContent => learnContent.id)
                      .includes(entry.id),
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Series Content */}
        {learnLanding.allSeries && learnLanding.allSeries.length > 0 && (
          <div className="p-4 pb-8 md:px-10">
            <div className="mx-auto flex flex-col gap-8">
              <div>
                <div className="flex flex-row items-center justify-between space-x-4 overflow-hidden">
                  <h2>More series</h2>
                  <TertiaryButton href="/learn/series/" className="shrink-0">
                    <span>See all</span>
                    <span className="material-icons text-2xl">
                      chevron_right
                    </span>
                  </TertiaryButton>
                </div>
                <div className="learn-carousel mt-4">
                  <Carousel
                    slides={learnLanding.allSeries.map(item => {
                      const series = learnSeries.find(
                        series => series.slug === item.slug,
                      );

                      return {
                        ...item,
                        slug: `/learn/series/${item.slug}`,
                        ...(series?.thumbnailImage && {
                          thumbnailImage: series.thumbnailImage,
                        }),
                        learnContentList: series?.learnContentList || [],
                      };
                    })}
                    slideType={SlideType.LearnSeries}
                    arrows={false}
                    infinite={false}
                    dots={false}
                    draggable
                    variableWidth
                    wrapperClass="-mx-4 md:-mx-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of content cards */}
        {learnLanding.globalFeaturedLinkCardList &&
          learnLanding.globalFeaturedLinkCardList.length > 0 && (
            <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-5 md:mb-6 md:text-center">
                  {learnLanding.globalFeaturedLinkCardList[0].title}
                </h2>

                <div className="flex flex-col gap-5 md:gap-6">
                  {featuredLinks
                    .find(
                      featuredLink =>
                        featuredLink.slug ===
                        learnLanding.globalFeaturedLinkCardList[0].slug,
                    )
                    ?.featuredLinkCardList.map(card => (
                      <ContentCard
                        key={card.id}
                        {...card}
                        title={card.title}
                        image={card.thumbnailImage[0].url}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </RootLayout>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const response = await fetchData(`
    query {
      learnLandingEntries {
        ... on learnLanding_Entry {
          id: uid
          title
          slug
          featuredSeries {
            id: uid
            title
            slug
          }
          allSeries {
            id: uid
            title
            slug
          }
          globalFeaturedLinkCardList {
            id: uid
            title
            slug
          }
        }
      }
      learnSeriesEntries {
        __typename
        ... on learnSeries_Entry {
          id: uid
          title
          slug
          thumbnailImage {
            id: uid
            title
            url
          }
          learnContentList {
            __typename
            id: uid
            title
            slug
          }
        }
      }
      learnEntries {
        __typename
        ... on learningVideo_Entry {
          id: uid
          title
          videoDuration
          slug
          thumbnailImage {
            id: uid
            title
            url
          }
        }
        ... on learningGuide_Entry {
          id: uid
          title
          readTime
          slug
          thumbnailImage {
            id: uid
            title
            url
          }
        }
        ... on learningArticle_Entry {
          id: uid
          title
          readTime
          slug
          thumbnailImage {
            id: uid
            title
            url
          }
        }
      }
      featuredLinksEntries {
        ... on featuredLinkCardsComponent_Entry {
          id: uid
          title
          slug
          featuredLinkCardList {
            __typename
            ... on featuredLinkCard_Entry {
              id: uid
              title
              slug
              plainTextDescription
              thumbnailImage {
                id: uid
                title
                url
              }
              primaryLink {
                __typename
                id: uid
                title
                slug
              }
              secondaryLinkListTitle
              secondaryLinkList {
                __typename
                id: uid
                title
                slug
              }
            }
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      learnLanding: response.learnLandingEntries[0],
      learnSeries: response.learnSeriesEntries,
      learnEntries: response.learnEntries,
      featuredLinks: response.featuredLinksEntries,
    },
  };
}
