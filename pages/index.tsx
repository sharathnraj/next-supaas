import ContentCard from '@/components/ContentCard';
import ListCard from '@/components/ListCard';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { ProductLandingData } from '@/lib/types';
import Head from 'next/head';
import Image from 'next/image';

export default function Home({
  productLanding,
}: {
  productLanding: ProductLandingData;
}) {
  return (
    <RootLayout>
      <Head>
        <title>Reece Support</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <Image
              src={productLanding.landingPageImage[0].url}
              alt={productLanding.landingPageImage[0].title}
              width={80}
              height={80}
              className="m-0"
            />
            <h1 className="m-0">{productLanding.title}</h1>
          </div>
        </div>

        {/* List of cards */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            <ListCard
              title="Product support"
              description="Technical info, guides & support"
              icon="support"
              href="/product-support"
            />
            <ListCard
              title="Rebates"
              description="Estimate and process government rebates"
              icon="rebate"
              href="/rebates"
            />
          </div>
        </div>

        {/* List of content cards */}
        <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 md:mb-6 md:text-center">
              {productLanding.FeaturedLinkCardSectionHeading}
            </h2>

            <div className="flex flex-col gap-5 md:gap-6">
              {productLanding.featuredLinkCardList.map(card => (
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
      productLandingEntries {
        ... on productLanding_Entry {
          id: uid
          title
          slug
          landingPageImage {
            id: uid
            title
            url
          }
          FeaturedLinkCardSectionHeading
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
    props: { productLanding: response.productLandingEntries[0] },
  };
}
