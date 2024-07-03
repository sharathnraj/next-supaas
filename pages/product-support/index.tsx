import ListItem from '@/components/ListItem';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { BrandData, ProductLandingData } from '@/lib/types';
import Head from 'next/head';

export default function ProductSupport({
  brandEntries,
  productLanding,
}: {
  brandEntries: BrandData[];
  productLanding: ProductLandingData;
}) {
  return (
    <RootLayout>
      <Head>
        <title>Product support</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h1 className="m-0">Product support</h1>
          </div>
        </div>

        {/* List of items */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-4">Choose brand</h3>

            <div className="border-t border-neutral-200">
              {productLanding.productSupportGroupList.map(group => {
                const brand = brandEntries.find(
                  brand => brand.slug === group.slug,
                );

                if (!brand) return null;

                return (
                  <ListItem
                    key={brand.id}
                    title={brand.title}
                    image={brand.roundedLogo[0].url}
                    href={`/product-support/${brand.slug}`}
                    rounded
                  />
                );
              })}
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
          productSupportGroupList {
            ... on productSupportGroup_Entry {
              id: uid
              title
              slug
            }
          }
        }
      }
      brandEntries {
        __typename
        ... on brand_Entry {
          id: uid
          slug
          title
          roundedLogo {
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
      brandEntries: response.brandEntries,
      productLanding: response.productLandingEntries[0],
    },
  };
}
