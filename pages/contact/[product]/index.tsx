import { ContactInfo } from '@/components/GeneralContactInformation';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import {
  BrandData,
  GeneralContactInformationData,
  ProductData,
  ProductTroubleshootingSectionData,
} from '@/lib/types';
import Head from 'next/head';
import Image from 'next/image';

export default function ContactDetail({
  brands,
  product,
  contactInformationEntries,
}: {
  brands: BrandData[];
  product: ProductData;
  contactInformationEntries: GeneralContactInformationData[];
}) {
  const brand = brands.find(brand => brand.id === product.productBrand[0].id);
  const productContactInformation = (
    product.productContentSectionTable.find(
      section => section.__typename === 'productTroubleshootingSection_Entry',
    ) as ProductTroubleshootingSectionData
  )?.generalContactInformation?.[0];
  const contactInformation = productContactInformation
    ? contactInformationEntries.find(
        contactInformation =>
          contactInformation.id === productContactInformation?.id,
      )
    : contactInformationEntries[0];

  return (
    <RootLayout>
      <Head>
        <title>Contact {product.productBrand[0].title} support</title>
      </Head>

      <div className="flex flex-col gap-5 md:gap-8">
        {/* Hero */}
        <div className="px-4 pt-6 md:px-10 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {brand && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-neutral-200">
                <Image src={brand.roundedLogo[0].url} alt={brand.title} fill />
              </div>
            )}
            <h1 className="pb-5">Contact {product.title} support</h1>
            {contactInformation && (
              <div className="pb-8">
                <ContactInfo {...contactInformation} />
              </div>
            )}
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
      productEntries(orderBy: "title") {
        __typename
        ... on product_Entry {
          id: uid
          slug
          productBrand {
            id: uid
            slug
          }
          productCategories {
            id: uid
            slug
          }
        }
      }
    }
  `)) as unknown as { productEntries: ProductData[] };

  const paths = response.productEntries.map(product => ({
    params: {
      product: product.slug,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const response = await fetchData(`
    query {
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
      productEntries(slug: "${params.product}") {
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
          productCode
          maxLink
          productContentSectionTable {
            __typename
            ... on productTroubleshootingSection_Entry {
              id: uid
              title
              slug
              generalContactInformation {
                id: uid
                title
                slug
              }
            }
          }
        }
      }
      contactInformationEntries {
        ... on contactInformation_Entry {
          id: uid
          title
          slug
          roleOrPosition
          businessName
          contactLink
          contactHours
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      brands: response.brandEntries,
      product: response.productEntries[0],
      contactInformationEntries: response.contactInformationEntries,
    },
  };
}
