import ContentCard from '@/components/ContentCard';
import LearnSeriesContentItem from '@/components/LearnSeriesContentItem';
import ListCard from '@/components/ListCard';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import {
  LearnDataArticle,
  LearnDataGuide,
  LearnDataVideo,
  RebatesLandingData,
} from '@/lib/types';
import parse from 'html-react-parser';
import Head from 'next/head';

export default function RebatesLandingPage({
  rebatesLanding,
  learnEntries,
}: {
  rebatesLanding: RebatesLandingData;
  learnEntries: (LearnDataVideo | LearnDataGuide | LearnDataArticle)[];
}) {
  return (
    <RootLayout>
      <Head>
        <title>Rebates</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h1 className="m-0">{rebatesLanding.title}</h1>
            {rebatesLanding.description && (
              <div className="rich-text">
                {parse(rebatesLanding.description)}
              </div>
            )}
          </div>
        </div>

        {/* List of cards */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {rebatesLanding.rebatesContentSections.map(section => (
              <ListCard
                key={section.id}
                title={section.title}
                description={section.sectionDescription}
                icon={section.sectionIcon}
                href={
                  section.__typename === 'rebatesExternalContentSection_Entry'
                    ? section.externalLink
                    : section.learnContent?.[0]
                      ? `/learn/${section.learnContent[0].slug}/`
                      : '/learn/'
                }
                external={
                  section.__typename === 'rebatesExternalContentSection_Entry'
                }
                externalBlankTarget
              />
            ))}
          </div>
        </div>

        {learnEntries.filter(entry =>
          rebatesLanding.relatedLearning
            .map(related => related.id)
            .includes(entry.id),
        ).length > 0 && (
          <div className="p-4 pb-6 md:px-10">
            <div className="mx-auto flex flex-col gap-8">
              <LearnSeriesContentItem
                title="Learn tips & tricks"
                learnContentList={learnEntries.filter(entry =>
                  rebatesLanding.relatedLearning
                    .map(related => related.id)
                    .includes(entry.id),
                )}
              />
            </div>
          </div>
        )}

        {/* List of content cards */}
        <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 md:mb-6 md:text-center">Get more support</h2>

            <div className="flex flex-col gap-5 md:gap-6">
              {rebatesLanding.featuredLinkCardList.map(card => (
                <ContentCard
                  key={card.id}
                  {...card}
                  plainTextDescription={card.plainTextDescription}
                  image={card.thumbnailImage[0].url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const response = await fetchData(`
    query {
      rebatesLandingEntries {
        ... on rebatesLanding_Entry {
          id: uid
          title
          slug
          description
          rebatesContentSections {
            __typename
            ... on rebatesInternalContentSection_Entry {
              id: uid
              title
              slug
              sectionIcon
              sectionDescription
              learnContent {
                id: uid
                title
                slug
              }
            }
            ... on rebatesExternalContentSection_Entry {
              id: uid
              title
              slug
              sectionIcon
              sectionDescription
              externalLink
            }
          }
          relatedLearning {
            id: uid
            title
            slug
          }
          featuredLinkCardList {
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
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      rebatesLanding: response.rebatesLandingEntries[0],
      learnEntries: response.learnEntries,
    },
  };
}
