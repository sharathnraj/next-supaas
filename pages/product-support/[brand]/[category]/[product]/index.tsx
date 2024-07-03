import ContentCard from '@/components/ContentCard';
import ListCard from '@/components/ListCard';
import ListItem from '@/components/ListItem';
import ProductImageWithLightbox from '@/components/ProductImageWithLightbox';
import TertiaryButton from '@/components/buttons/TertiaryButton';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import {
  FeaturedLinksData,
  ProductData,
  ProductTroubleshootingSectionData,
} from '@/lib/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ModelDetailPage({
  product,
  featuredLinks,
}: {
  product: ProductData;
  featuredLinks: FeaturedLinksData[];
}) {
  const router = useRouter();

  const quickLinks = (
    product.productContentSectionTable.find(
      section => section.__typename === 'productTroubleshootingSection_Entry',
    ) as ProductTroubleshootingSectionData
  )?.issueTypes.flatMap(issueType =>
    issueType.issueGroups.flatMap(issueGroup =>
      issueGroup.issueList.filter(issue => issue.showAsQuickLink),
    ),
  );

  return (
    <RootLayout>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <ProductImageWithLightbox
              image={product.productImage[0].url}
              name={product.title}
            />
            <h1>{product.title}</h1>
            <div className="flex justify-between">
              <label className="small text-textSubtle">{`Product code: ${product.productCode}`}</label>
              <TertiaryButton
                external
                externalBlankTarget
                href={product.maxLink}
              >
                <span>View in maX</span>
                <span className="material-icons text-base">open_in_new</span>
              </TertiaryButton>
            </div>
          </div>
        </div>

        {/* List of cards */}
        <div className="px-4 pb-8 md:px-10 md:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {product.productContentSectionTable.map(section => (
              <ListCard
                key={section.id}
                title={
                  section.__typename === 'productTroubleshootingSection_Entry'
                    ? 'Troubleshooting'
                    : section.title
                }
                icon={
                  section.__typename === 'productTroubleshootingSection_Entry'
                    ? 'troubleshooting'
                    : section.sectionIcon
                }
                href={`/product-support/${product.productBrand[0].slug}/${product.productCategories[0].slug}/${product.slug}/${section.__typename === 'productTroubleshootingSection_Entry' ? 'troubleshooting' : section.slug}`}
              />
            ))}
          </div>
        </div>

        {/* List of quick links */}
        {quickLinks && quickLinks.length > 0 && (
          <div className="px-4 pb-8 md:px-10 md:pb-10">
            <div className="mx-auto max-w-3xl">
              <h3 className="mb-4">Quick links</h3>

              <div className="rounded-md border-2 border-neutral-200 px-4">
                {(
                  product.productContentSectionTable.find(
                    section =>
                      section.__typename ===
                      'productTroubleshootingSection_Entry',
                  ) as ProductTroubleshootingSectionData
                )?.issueTypes.flatMap(issueType =>
                  issueType.issueGroups.flatMap(issueGroup =>
                    issueGroup.issueList.flatMap(issue => {
                      if (issue.showAsQuickLink) {
                        return (
                          <ListItem
                            key={issue.id}
                            title={
                              issueType && issueType.issueGroups?.length > 1
                                ? `${issueGroup?.title}, ${issue?.title}`
                                : issue?.title
                            }
                            description={
                              issue.issueDescription ??
                              issueGroup.issueDescription
                            }
                            href=""
                            onClick={() => {
                              router.push(
                                `/product-support/${product.productBrand[0].slug}/${product.productCategories[0].slug}/${product.slug}/troubleshooting/?issueType=${issueType.id}&issueGroup=${issueGroup.id}&issue=${issue.id}`,
                              );
                            }}
                            className="last:border-b-0"
                          />
                        );
                      }
                    }),
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {/* List of content cards */}
        {product.globalFeaturedLinkCardList &&
          product.globalFeaturedLinkCardList.length > 0 && (
            <div className="bg-neutral-100 px-4 py-8 md:px-10 md:py-10">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-5 md:mb-6 md:text-center">
                  {product.globalFeaturedLinkCardList[0].title}
                </h2>

                <div className="flex flex-col gap-5 md:gap-6">
                  {featuredLinks
                    .find(
                      featuredLink =>
                        featuredLink.slug ===
                        product.globalFeaturedLinkCardList[0].slug,
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
      brand: product.productBrand[0].slug,
      category: product.productCategories[0].slug,
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
            ... on productContentSection_Entry {
              id: uid
              title
              slug
              sectionIcon
            }
            ... on productTroubleshootingSection_Entry {
              id: uid
              title
              slug
              issueTypes {
                ... on issueType_Entry {
                  id: uid
                  issueGroups {
                    ... on issueGroup_Entry {
                      id: uid
                      title
                      issueDescription
                      issueList {
                        ... on issueDetail_Entry {
                          id: uid
                          title
                          issueDescription
                          showAsQuickLink
                        }
                      }
                    }
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
      product: response.productEntries[0],
      featuredLinks: response.featuredLinksEntries,
    },
  };
}
