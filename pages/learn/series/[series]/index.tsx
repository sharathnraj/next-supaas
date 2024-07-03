import ContentCard from '@/components/ContentCard';
import LearnSeriesContentListItem from '@/components/LearnSeriesContentListItem';
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
  LearnSeriesData,
} from '@/lib/types';
import Head from 'next/head';

const SliderResponsiveSettings = [
  {
    breakpoint: 1536,
    settings: {
      slidesToShow: 1,
    },
  },
];

export default function LearnSeries({
  series,
  learnSeries,
  learnEntries,
  featuredLinks,
}: {
  series: string;
  learnSeries: LearnSeriesData[];
  learnEntries: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
  featuredLinks: FeaturedLinksData[];
}) {
  const currentSeries = learnSeries.find(
    learnSeries => learnSeries.slug === series,
  );

  if (!currentSeries) {
    return null;
  }

  return (
    <RootLayout>
      <Head>
        <title>Learn</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto grid max-w-3xl gap-4">
            <h1 className="text-center">{currentSeries.title}</h1>
            <p className="large text-center">
              Get up to speed on heat pumps, including how they're different and
              things to know.
            </p>
          </div>
        </div>

        {/* Series */}
        <div className="px-4 pb-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col">
            {learnEntries
              .filter(entry =>
                currentSeries.learnContentList
                  .map(learnContent => learnContent.id)
                  .includes(entry.id),
              )
              .map(data => (
                <LearnSeriesContentListItem
                  key={data.id}
                  data={
                    {
                      ...data,
                      slug: `/learn/${data.slug}`,
                    } as LearnDataVideo | LearnDataGuide | LearnDataArticle
                  }
                />
              ))}
          </div>

          {/* Related series */}
          {currentSeries.relatedSeries &&
            currentSeries.relatedSeries.length > 0 && (
              <div className="mx-auto flex flex-col gap-8 pb-8 pt-4">
                <div>
                  <div className="flex flex-row items-center justify-between space-x-4 overflow-hidden">
                    <h2>You might also like</h2>
                    <TertiaryButton href="/learn/series/" className="shrink-0">
                      <span>See all</span>
                      <span className="material-icons text-2xl">
                        chevron_right
                      </span>
                    </TertiaryButton>
                  </div>
                  <div className="learn-carousel mt-4">
                    <Carousel
                      slides={currentSeries.relatedSeries.map(item => {
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
                      slidesToShow={3}
                      draggable
                      variableWidth
                      responsive={SliderResponsiveSettings}
                      wrapperClass="-mx-4 md:-mx-10"
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* List of content cards */}
      {currentSeries.globalFeaturedLinkCardList &&
        currentSeries.globalFeaturedLinkCardList.length > 0 && (
          <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-5 md:mb-6 md:text-center">
                {currentSeries.globalFeaturedLinkCardList[0].title}
              </h2>

              <div className="flex flex-col gap-5 md:gap-6">
                {featuredLinks
                  .find(
                    featuredLink =>
                      featuredLink.slug ===
                      currentSeries.globalFeaturedLinkCardList[0].slug,
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
    </RootLayout>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = (await fetchData(`
    query {
      learnSeriesEntries {
        ... on learnSeries_Entry {
          id: uid
          slug
        }
      }
    }
  `)) as unknown as { learnSeriesEntries: LearnSeriesData[] };

  const paths = response.learnSeriesEntries.map(
    (learnSeries: LearnSeriesData) => ({
      params: { series: learnSeries.slug },
    }),
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { series: string };
}) {
  const response = await fetchData(`
    query {
      learnSeriesEntries {
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
          relatedSeries {
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
      learnEntries {
        __typename
        ... on learningVideo_Entry {
          id: uid
          title
          slug
          videoDuration
          thumbnailImage {
            id: uid
            title
            url
          }
        }
        ... on learningGuide_Entry {
          id: uid
          title
          slug
          readTime
          thumbnailImage {
            id: uid
            title
            url
          }
        }
        ... on learningArticle_Entry {
          id: uid
          title
          slug
          readTime
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
      series: params.series,
      learnSeries: response.learnSeriesEntries,
      learnEntries: response.learnEntries,
      featuredLinks: response.featuredLinksEntries,
    },
  };
}
