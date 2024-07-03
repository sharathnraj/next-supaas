import CheckedList from '@/components/CheckedList';
import DownloadCard from '@/components/DownloadCard';
import GuideSection from '@/components/GuideSection';
import ProductCard from '@/components/ProductCard';
import Table from '@/components/Table';
import Carousel from '@/components/carousel/Carousel';
import { SlideType } from '@/components/carousel/types';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { ProductData } from '@/lib/types';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import classNames from 'classnames';
import isMobile from 'is-mobile';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductContentSectionPage({
  product,
}: {
  product: ProductData;
}) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const { productContentSectionTable } = product;

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  // Needs a better fix
  if (
    productContentSectionTable[0].__typename ===
    'productTroubleshootingSection_Entry'
  ) {
    return null;
  }

  return (
    <RootLayout>
      <Head>
        <title>{productContentSectionTable[0].title}</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <h1 className="m-0">{productContentSectionTable[0].title}</h1>
            {productContentSectionTable[0].description && (
              <p className="large">
                {productContentSectionTable[0].description}
              </p>
            )}
          </div>
        </div>

        {/* Accordion */}
        {productContentSectionTable[0].accordionList &&
          productContentSectionTable[0].accordionList.length > 0 && (
            <div className="px-4 pb-8 md:px-10 md:pb-10">
              <div className="mx-auto flex max-w-3xl flex-col">
                {productContentSectionTable[0].accordionList.map(
                  (item, index) => (
                    <Disclosure
                      as="div"
                      className={classNames(
                        'relative border-b border-neutral-200',
                        index === 0 ? 'border-t' : '',
                      )}
                      key={item.id}
                    >
                      {({ open }) => (
                        <>
                          <DisclosureButton
                            as="h4"
                            className="relative w-full cursor-pointer py-4 text-left"
                          >
                            {item.title}
                            <span
                              className={classNames(
                                'material-icons absolute right-0 top-5 h-6 w-6 text-2xl transition-transform',
                                open ? 'rotate-180' : '',
                              )}
                            >
                              expand_more
                            </span>
                          </DisclosureButton>
                          <div className="overflow-hidden">
                            <Transition
                              enter="duration-200 ease-out"
                              enterFrom="opacity-0 -translate-y-6"
                              enterTo="opacity-100 translate-y-0"
                              leave="duration-300 ease-out"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 -translate-y-6"
                            >
                              <DisclosurePanel className="origin-top pb-4 transition">
                                <Table data={item.specificationsTable} />
                              </DisclosurePanel>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Disclosure>
                  ),
                )}
              </div>
            </div>
          )}

        {/* Download card list */}
        {productContentSectionTable[0].downloadableResourceList &&
          productContentSectionTable[0].downloadableResourceList.length > 0 && (
            <div className="px-4 pb-8 md:px-10 md:pb-10">
              <div className="mx-auto flex max-w-3xl flex-col gap-3.5">
                {productContentSectionTable[0].downloadableResourceList.map(
                  item => (
                    <DownloadCard
                      key={item.id}
                      title={item.title}
                      description={item.resourceDescription}
                      image={item.resourceImage[0].url}
                      href={item.resourceFile[0].url}
                    />
                  ),
                )}
              </div>
            </div>
          )}

        {/* Product card */}
        {productContentSectionTable[0].showMaxProductInformation && (
          <div className="px-4 pb-8 md:px-10 md:pb-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              <div className="space-y-3">
                <h6>Relevant for</h6>
                <ProductCard
                  title={product.title}
                  description={`Product code: ${product.productCode}`}
                  image={product.productImage[0].url}
                  href={product.maxLink || ''}
                />
              </div>
            </div>
          </div>
        )}

        {/* In this guide */}
        {productContentSectionTable[0].showModuleTableNavigation && (
          <div className="px-4 pb-8 md:px-10 md:pb-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              <div className="space-y-4">
                <h6>Jump to</h6>
                <ul className="ml-4 list-outside list-disc space-y-3 text-buttonBlue">
                  {productContentSectionTable[0].modularContentTable.map(
                    item => (
                      <li key={item.slug}>
                        <Link href={`#${item.slug}`} className="font-sans-bold">
                          {item.title}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* In this guide items */}
        <div className="bg-primary-50 px-4 py-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <div className="space-y-4">
              {productContentSectionTable[0].modularContentTable.map(item => (
                <div key={item.slug}>
                  <GuideSection
                    id={item.slug}
                    href={
                      item.__typename !==
                        'downloadableResourcesComponent_Entry' &&
                      item.downloadableResourceList &&
                      item.downloadableResourceList.length > 0
                        ? `${item.downloadableResourceList[0].resourceFile[0].url}${isMobileDevice ? `#page${item.downloadableResourceList[0].openAtPage}` : `#page=${item.downloadableResourceList[0].openAtPage}`}`
                        : `#${item.slug}`
                    }
                    title={item.title}
                    showButton={
                      !!(
                        item.downloadableResourceList &&
                        item.downloadableResourceList.length > 0 &&
                        item.__typename !==
                          'downloadableResourcesComponent_Entry'
                      )
                    }
                    description={item.description}
                  >
                    {item.__typename === 'checklistComponent_Entry' && (
                      <CheckedList list={item.checklist} />
                    )}

                    {item.__typename === 'imageAndSpecsComponent_Entry' &&
                      item.specificationsTable && (
                        <Table data={item.specificationsTable} />
                      )}

                    {item.__typename === 'imageAndSpecsComponent_Entry' &&
                      item.imageCarousel && (
                        <Carousel
                          slides={item.imageCarousel}
                          slideType={SlideType.Image}
                          infinite={item.imageCarousel.length > 1}
                        />
                      )}

                    {item.__typename === 'relatedProductsComponent_Entry' &&
                      item.productAndPartsList && (
                        <Carousel
                          slides={item.productAndPartsList
                            .reduce((acc: any[], curr, index) => {
                              if (index % 3 === 0) acc.push([]);
                              if (acc[acc.length - 1])
                                acc[acc.length - 1].push(curr);
                              return acc;
                            }, [])
                            .map(group => ({ products: group }))}
                          slideType={SlideType.Product}
                          infinite={item.productAndPartsList.length > 3}
                        />
                      )}

                    {item.__typename ===
                      'downloadableResourcesComponent_Entry' &&
                      item.downloadableResourceList && (
                        <div className="space-y-3">
                          {item.downloadableResourceList.map(item => (
                            <DownloadCard
                              key={item.id}
                              title={item.title}
                              description={item.resourceDescription}
                              image={item.resourceImage[0].url}
                              href={item.resourceFile[0].url}
                            />
                          ))}
                        </div>
                      )}
                  </GuideSection>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticPaths() {
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
          productContentSectionTable {
            __typename
            ... on productContentSection_Entry {
              id: uid
              title
              slug
            }
            ... on productTroubleshootingSection_Entry {
              id: uid
              title
              slug
            }
          }
        }
      }
    }
  `)) as unknown as { productEntries: ProductData[] };

  const paths = response.productEntries.flatMap(product => {
    if (
      product.productContentSectionTable &&
      product.productContentSectionTable.length === 0
    ) {
      return [];
    }

    return product.productContentSectionTable
      .filter(item => {
        return item.__typename === 'productContentSection_Entry';
      })
      .map(item => {
        return {
          params: {
            brand: product.productBrand[0].slug,
            category: product.productCategories[0].slug,
            product: product.slug,
            contentsection: item.slug,
          },
        };
      });
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { product: string; contentsection: string };
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
          productContentSectionTable(slug: "${params.contentsection}") {
            ... on productContentSection_Entry {
              id: uid
              title
              slug
              description
              sectionIcon
              showMaxProductInformation
              accordionList {
                __typename
                ... on accordion_Entry {
                  id: uid
                  title
                  slug
                  bodyText
                  specificationsTable {
                    key
                    value
                    header
                  }
                  relatedResources {
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
            }
            ... on productTroubleshootingSection_Entry {
              id: uid
              title
              slug
              issueTypes {
                ... on issueType_Entry {
                  id: uid
                  title
                  slug
                  issueTypeIcon
                  issueGroups {
                    ... on issueGroup_Entry {
                      id: uid
                      title
                      slug
                      roundedImage {
                        id: uid
                        title
                        url
                      }
                      issueList {
                        ... on issueDetail_Entry {
                          id: uid
                          title
                          slug
                          issueDescription
                          possibleCause
                          information
                          actionsToTake
                          contactInformation {
                            id: uid
                            title
                            slug
                          }
                          showAsQuickLink
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: { product: response.productEntries[0] },
  };
}
