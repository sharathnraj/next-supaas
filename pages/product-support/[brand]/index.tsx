import ListItem from '@/components/ListItem';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { BrandData, ProductData, ProductLandingData } from '@/lib/types';
import Head from 'next/head';

export default function BrandPage({
  productLanding,
  brandData,
  products,
}: {
  productLanding: ProductLandingData;
  brandData: BrandData;
  products: ProductData[];
}) {
  return (
    <RootLayout>
      <Head>
        <title>{brandData.title}</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h1 className="m-0">{brandData.title}</h1>
          </div>
        </div>

        {/* List of items */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-4">Choose product</h3>

            <div className="border-t border-neutral-200">
              {productLanding?.productSupportGroupList
                ?.find(item => item.slug === brandData.slug)
                ?.productCategories.map((category, index) => {
                  const product = products.find(
                    product =>
                      product.productCategories[0].slug === category.slug,
                  );

                  return (
                    <ListItem
                      key={index}
                      title={`${brandData.title} ${category.title}`}
                      image={product?.productImage[0].url}
                      href={`/product-support/${brandData.slug}/${category.slug}`}
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = (await fetchData(`
    query {
      brandEntries {
        ... on brand_Entry {
          id: uid
          slug
        }
      }
    }
  `)) as unknown as { brandEntries: BrandData[] };

  const paths = response.brandEntries.map((brand: BrandData) => ({
    params: { brand: brand.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { brand: string };
}) {
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
              productCategories {
                id: uid
                title
                slug
              }
            }
          }
        }
      }
      brandEntries(slug: "${params.brand}") {
        ... on brand_Entry {
          id: uid
          title
          slug
        }
      }
      productEntries(
        orderBy: "title"
        relatedToEntries: {section: "brand", slug: "${params.brand}"}
      ) {
        ... on product_Entry {
          productBrand {
            slug
          }
          productCategories {
            slug
          }
          productImage {
            url
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      productLanding: response.productLandingEntries[0],
      brandData: response.brandEntries[0],
      products: response.productEntries,
    },
  };
}
