import ContentCard from '@/components/ContentCard';
import ContentSeriesCard from '@/components/ContentSeriesCard';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import {
  FeaturedLinksData,
  LearnLandingData,
  LearnSeriesData,
} from '@/lib/types';
import Head from 'next/head';

export default function LearnBrowseSeries({
  learnSeries,
  learnLanding,
  featuredLinks,
}: {
  learnSeries: LearnSeriesData[];
  learnLanding: LearnLandingData;
  featuredLinks: FeaturedLinksData[];
}) {
  return (
    <RootLayout>
      <Head>
        <title>Browse series</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto grid max-w-3xl justify-items-center gap-4">
            <h1>Browse series</h1>
            <p className="text-center">
              Whether you're getting started or a heat pump pro, level up your
              expertise.
            </p>
          </div>
        </div>

        {/* Series */}
        <div className="px-4 pb-8 pt-4 md:px-10 md:pb-10">
          <div className="mx-auto">
            <div className="flex flex-wrap gap-6">
              {learnSeries.map((series, index) => (
                <ContentSeriesCard
                  key={series.id}
                  index={index}
                  slide={series}
                />
              ))}
            </div>
          </div>
        </div>

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
            id: uid
          }
        }
      }
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
      learnSeries: response.learnSeriesEntries,
      learnLanding: response.learnLandingEntries[0],
      featuredLinks: response.featuredLinksEntries,
    },
  };
}
