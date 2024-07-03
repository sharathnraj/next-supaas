import ContentCard from '@/components/ContentCard';
import LearnSeriesContentListItem from '@/components/LearnSeriesContentListItem';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TertiaryButton from '@/components/buttons/TertiaryButton';
import Carousel from '@/components/carousel/Carousel';
import { SlideType } from '@/components/carousel/types';
import LearnArticle from '@/components/content/LearnArticle';
import LearnGuide from '@/components/content/LearnGuide';
import LearnVideo from '@/components/content/LearnVideo';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import getIcon from '@/lib/icons';
import {
  FeaturedLinksData,
  LearnData,
  LearnDataArticle,
  LearnDataGuide,
  LearnDataVideo,
  LearnSeriesData,
} from '@/lib/types';
import Head from 'next/head';
import Image from 'next/image';

const SliderResponsiveSettings = [
  {
    breakpoint: 1536,
    settings: {
      slidesToShow: 1,
    },
  },
];

export default function LearnSeriesContentPage({
  learnEntries,
  slug,
  learnSeries,
  featuredLinks,
}: {
  learnEntries: LearnDataVideo[] | LearnDataArticle[] | LearnDataGuide[];
  slug: string;
  learnSeries: LearnSeriesData[];
  featuredLinks: FeaturedLinksData[];
}) {
  const content = learnEntries.find(content => content.slug === slug);

  if (!content) {
    return null;
  }

  // The first series that this content belongs to
  const belongsToSeries = learnSeries.find(series =>
    series.learnContentList.map(content => content.id).includes(content.id),
  );
  const relatedSeries = learnSeries.filter(
    item => belongsToSeries && item.id !== belongsToSeries.id,
  );

  return (
    <RootLayout>
      <Head>
        <title>{content.title}</title>
      </Head>

      {/* Video */}
      {content.__typename === 'learningVideo_Entry' && (
        <LearnVideo {...content} />
      )}

      {/* Article */}
      {content.__typename === 'learningArticle_Entry' && (
        <LearnArticle {...content} />
      )}

      {/* Guide */}
      {content.__typename === 'learningGuide_Entry' && (
        <LearnGuide {...content} />
      )}

      {/* Series */}
      {belongsToSeries && (
        <div className="px-4 pb-8 pt-4 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h2 className="text-start">More in this series</h2>
            <div className="divide-y divide-neutral-200 rounded-lg border">
              <h3 className="p-5 text-start">{belongsToSeries.title}</h3>
              <div className="flex justify-center px-5">
                <div className="flex w-full max-w-3xl flex-col divide-y divide-neutral-200">
                  {/* Filter the learnContentList of the series that this content belongs to so that it doesn't include the current content */}
                  {learnEntries
                    .filter(entry =>
                      belongsToSeries?.learnContentList
                        .filter(learnContent => learnContent.id !== content.id)
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
                          } as
                            | LearnDataVideo
                            | LearnDataGuide
                            | LearnDataArticle
                        }
                        border={false}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related series */}
      {relatedSeries && relatedSeries.length > 0 && (
        <div className="mx-auto flex flex-col gap-8 px-4 pb-8 pt-4 md:px-10 md:pb-10">
          <div>
            <div className="flex flex-row items-center justify-between space-x-4 overflow-hidden">
              <h2>You might also like</h2>
              <TertiaryButton href="/learn/series/" className="shrink-0">
                <span>See all</span>
                <span className="material-icons text-2xl">chevron_right</span>
              </TertiaryButton>
            </div>
            <div className="learn-carousel mt-4">
              <Carousel
                slides={relatedSeries.map(item => {
                  return {
                    ...item,
                    slug: `/learn/series/${item.slug}`,
                    learnContentList: item?.learnContentList || [],
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

      {/* List of content cards */}
      {content.globalFeaturedLinkCardList &&
        content.globalFeaturedLinkCardList.length > 0 && (
          <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-5 md:mb-6 md:text-center">
                {content.globalFeaturedLinkCardList[0].title}
              </h2>

              <div className="flex flex-col gap-5 md:gap-6">
                {featuredLinks
                  .find(
                    featuredLink =>
                      featuredLink.slug ===
                      content.globalFeaturedLinkCardList[0].slug,
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

      {/* FIXME: Hardcoding CMS block for MVP */}
      {(content.slug === 'register-with-greenbank' ||
        content.slug === 'greenbank-mobile-app') && (
        <div className="bg-neutral-100 px-4 py-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
              <div className="h-16 w-16 rounded-full bg-primary-50 p-3">
                <Image
                  src={getIcon('calculator')}
                  alt="Calculator"
                  width={40}
                  height={40}
                />
              </div>
              <h3>Quoting a job with a rebate?</h3>
              <p>
                Use the rebate calculator to quickly estimate the Government
                rebate amount.
              </p>
              <SecondaryButton
                buttonSize="large"
                className="w-full md:w-max"
                href="https://www.reece.com.au/greenbank#calculate_savings"
                external
                externalBlankTarget
              >
                <span>Calculate rebates</span>
                <span className="material-icons text-2xl">open_in_new</span>
              </SecondaryButton>
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
      learnEntries {
        __typename
        ... on learningVideo_Entry {
          id: uid
          title
          slug
        }
        ... on learningGuide_Entry {
          id: uid
          title
          slug
        }
        ... on learningArticle_Entry {
          id: uid
          title
          slug
        }
      }
    }
  `)) as unknown as { learnEntries: LearnData[] };

  const paths = response.learnEntries.map((learnSeries: LearnData) => ({
    params: { content: learnSeries.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { content: string };
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
        }
      }
      learnEntries {
        __typename
        ... on learningVideo_Entry {
          id: uid
          title
          slug
          youtubeUrl
          videoDuration
          leadText
          bodyText
          thumbnailImage {
            id: uid
            title
            url
          }
          globalFeaturedLinkCardList {
            id: uid
            title
            slug
          }
        }
        ... on learningGuide_Entry {
          id: uid
          title
          slug
          pageDescription
          readTime
          thumbnailImage {
            id: uid
            title
            url
          }
          codeEmbed
          showModuleTableNavigation
          modularContentTable {
            __typename
            ... on checklistComponent_Entry {
              id: uid
              title
              slug
              checklist {
                checklistText
                checklistHyperlinkText
                checklistHyperlink
              }
            }
            ... on textComponent_Entry {
              id: uid
              title
              slug
              description
            }
            ... on videoComponent_Entry {
              id: uid
              title
              slug
              description
              youtubeUrl
            }
            ... on imageAndSpecsComponent_Entry {
              id: uid
              title
              slug
              description
              specificationsTable {
                key
                value
                header
              }
              imageCarousel {
                id: uid
                title
                slug
                url
              }
              downloadableResourceList {
                __typename
                ... on downloadableResource_Entry {
                  id: uid
                  title
                  slug
                  resourceImage {
                    id: uid
                    title
                    url
                  }
                  resourceDescription
                  resourceFile {
                    id: uid
                    title
                    url
                  }
                  openAtPage
                }
              }
            }
            ... on relatedProductsComponent_Entry {
              id: uid
              title
              slug
              productAndPartsList {
                id: uid
                title
                slug
                ... on part_Entry {
                  productImage {
                    id: uid
                    title
                    url
                  }
                  productCode
                  maxLink
                }
                ... on product_Entry {
                  productImage {
                    id: uid
                    title
                    url
                  }
                  productCode
                  maxLink
                }
              }
            }
            ... on downloadableResourcesComponent_Entry {
              id: uid
              title
              slug
              downloadableResourceList {
                __typename
                ... on downloadableResource_Entry {
                  id: uid
                  title
                  slug
                  resourceDescription
                  resourceFile {
                    id: uid
                    title
                    url
                  }
                  resourceImage {
                    id: uid
                    title
                    url
                  }
                }
              }
            }
          }
          globalFeaturedLinkCardList {
            id: uid
            title
            slug
          }
        }
        ... on learningArticle_Entry {
          id: uid
          title
          slug
          leadText
          heroImage {
            id: uid
            title
            url
          }
          thumbnailImage {
            id: uid
            title
            url
          }
          readTime
          modularArticleTable {
            __typename
            ... on articleBodyTextComponent_Entry {
              id: uid
              title
              slug
              bodyText
            }
            ... on articleImageComponent_Entry {
              id: uid
              title
              slug
              featuredImage {
                id: uid
                title
                url
              }
            }
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
            }
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      learnEntries: response.learnEntries,
      learnSeries: response.learnSeriesEntries,
      featuredLinks: response.featuredLinksEntries,
      slug: params.content,
    },
  };
}
