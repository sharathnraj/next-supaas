import ListItem from '@/components/ListItem';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { BrandData, CategoryData, ProductData } from '@/lib/types';
import Head from 'next/head';

export default function ProductPage({
  brand,
  category,
  products,
}: {
  brand: BrandData;
  category: CategoryData;
  products: ProductData[];
}) {
  return (
    <RootLayout>
      <Head>
        <title>{`${brand.title} ${category.title}`}</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h1 className="m-0">{`${brand.title} ${category.title}`}</h1>
          </div>
        </div>

        {/* List of items */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          {products.length === 0 ? (
            <div className="mx-auto max-w-3xl">
              <h3>No products found.</h3>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <h3 className="mb-4">Choose model</h3>

              <div className="border-t border-neutral-200">
                {products?.map((product, index) => (
                  <ListItem
                    key={index}
                    title={product.title}
                    image={product.productImage[0].url}
                    href={`/product-support/${product.productBrand[0].slug}/${product.productCategories[0].slug}/${product.slug}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // FIXME: Fetch categories data
  const response = (await fetchData(`
    query {
      categories(descendantOf: 42) {
        id: uid
        slug
      }
      brandEntries {
        ... on brand_Entry {
          id: uid
          slug
        }
      }
    }
  `)) as unknown as { categories: CategoryData[]; brandEntries: BrandData[] };

  const paths = response.categories.flatMap(category => {
    return response.brandEntries.map(brand => ({
      params: { brand: brand.slug, category: category.slug },
    }));
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { category: string; brand: string };
}) {
  const response = await fetchData(`
    query {
      brandEntries(slug: "${params.brand}") {
        ... on brand_Entry {
          id: uid
          title
          slug
        }
      }
      categories(slug: "${params.category}") {
        id: uid
        title
        slug
      }
      productEntries(
        orderBy: "title"
        relatedToEntries: {section: "brand", slug: "${params.brand}"}
        relatedToCategories: [{slug: "${params.category}"}]
      ) {
        __typename
        ... on product_Entry {
          id: uid
          title
          slug
          productImage {
            id: uid
            title
            url
          }
          productBrand {
            id: uid
            title
            slug
          }
          productCategories {
            id: uid
            title
            slug
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      brand: response.brandEntries[0],
      category: response.categories[0],
      products: response.productEntries,
    },
  };
}
