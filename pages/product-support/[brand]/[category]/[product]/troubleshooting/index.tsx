import GeneralContactInformation from '@/components/GeneralContactInformation';
import ListCard from '@/components/ListCard';
import ListItem from '@/components/ListItem';
import ResolvedDialog from '@/components/ResolvedDialog';
import SupportDialog from '@/components/SupportDialog';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import { GeneralContactInformationData, ProductData } from '@/lib/types';
import classNames from 'classnames';
import parse from 'html-react-parser';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function IssueDetail({
  issue,
  setIssue,
  resolution,
  setResolution,
  isIssueUnresolved,
  setIsIssueUnresolved,
  id,
  index,
  length,
  title,
  description,
  image,
  possibleCause,
  resolutionInformation,
  actionsToTake,
  relevantContact,
}: {
  issue: null | string;
  setIssue: (value: null | string) => void;
  resolution: number;
  setResolution: (value: number) => void;
  isIssueUnresolved: boolean;
  setIsIssueUnresolved: (value: boolean) => void;
  index: number;
  length: number;
  id: string;
  title: string;
  description?: string;
  image: string;
  possibleCause: string;
  resolutionInformation: string;
  actionsToTake: string;
  relevantContact?: GeneralContactInformationData;
}) {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [isResolvedDialogOpen, setIsResolvedDialogOpen] = useState(false);

  return (
    <div
      id={id}
      className={classNames(
        'top-0 min-h-dvh w-full transform bg-primary-50 px-4 py-6 transition-transform duration-300 ease-in-out md:px-10 md:py-8',
        issue !== null && resolution === index && !isIssueUnresolved
          ? 'relative'
          : 'absolute',
        index <= (resolution ?? 0) ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="rounded-lg border border-neutral-200 bg-white">
          <div className="flex flex-row items-center gap-3 border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200"
              onClick={() => {
                if (index === 0) {
                  setIssue(null);
                  setResolution(-1);
                } else {
                  setResolution((resolution ?? 0) - 1);
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="material-icons text-base">arrow_back</span>
            </button>
            <h3>Troubleshoot</h3>
          </div>
          <div className="px-4 py-5 md:p-8">
            <div className="flex flex-col gap-6">
              {/* Info */}
              {index === 0 && (
                <div>
                  {image && (
                    <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full border border-neutral-200">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h2>{title}</h2>
                  {description && (
                    <p className="mt-1 text-textSubtle">{description}</p>
                  )}
                </div>
              )}

              {/* Cause */}
              <div className="flex flex-col gap-3">
                <h4 className="flex items-center gap-2">
                  <span>Possible cause</span>
                  {length > 1 && (
                    <label className="small rounded bg-blue-100 px-1.5 py-0.5">{`${index + 1} of ${length}`}</label>
                  )}
                </h4>
                <p>{possibleCause}</p>
              </div>

              {/* Information */}
              {resolutionInformation && (
                <div className="flex flex-col gap-3">
                  <h4>Information</h4>
                  <div className="rich-text">
                    {parse(resolutionInformation)}
                  </div>
                </div>
              )}

              {/* Actions to take */}
              <div className="flex flex-col gap-3">
                <h4>Actions to take</h4>
                {actionsToTake ? (
                  <div className="rich-text">{parse(actionsToTake)}</div>
                ) : null}
                {relevantContact && (
                  <ul className="ml-4 list-outside list-disc space-y-3">
                    <li>
                      <button
                        className="appearance-none"
                        onClick={() => setIsSupportDialogOpen(true)}
                      >
                        <label className="text-buttonBlue underline">
                          Contact support
                        </label>
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-neutral-200" />

              {/* Buttons */}
              {index === length - 1 && <h4>Has the issue been resolved?</h4>}
              <div className="flex flex-col gap-3 md:flex-row">
                {index === length - 1 ? (
                  <SecondaryButton
                    stacked
                    className="flex-1"
                    onClick={() => {
                      setIsIssueUnresolved(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="material-icons text-xl">close</span>
                    <span>Not resolved</span>
                  </SecondaryButton>
                ) : (
                  <SecondaryButton
                    stacked
                    className="flex-1"
                    onClick={() => {
                      setResolution((resolution ?? 0) + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="material-icons text-xl">
                      arrow_forward
                    </span>
                    <span>Next possible cause</span>
                  </SecondaryButton>
                )}
                <SecondaryButton
                  stacked
                  className="flex-1"
                  onClick={() => {
                    setIsResolvedDialogOpen(true);
                  }}
                >
                  <span className="material-icons text-xl">check</span>
                  <span>Issue resolved</span>
                </SecondaryButton>
              </div>

              {/* Support dialog */}
              {relevantContact && (
                <SupportDialog
                  {...relevantContact}
                  isOpen={isSupportDialogOpen}
                  setIsOpen={setIsSupportDialogOpen}
                />
              )}

              {/* Resolved dialog */}
              <ResolvedDialog
                isOpen={isResolvedDialogOpen}
                setIsOpen={setIsResolvedDialogOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Troubleshooting({
  product,
  contactInformationEntries,
}: {
  product: ProductData;
  contactInformationEntries: GeneralContactInformationData[];
}) {
  const router = useRouter();
  const [issueType, setIssueType] = useState<null | string>(null);
  const [issueGroup, setIssueGroup] = useState<null | string>(null);
  const [issue, setIssue] = useState<null | string>(null);
  const [resolution, setResolution] = useState<number>(-1);
  const [isIssueUnresolved, setIsIssueUnresolved] = useState<boolean>(false);

  const productContentSectionTable = product.productContentSectionTable.find(
    item => item.__typename === 'productTroubleshootingSection_Entry',
  );

  // Needs a better fix
  if (
    !productContentSectionTable ||
    productContentSectionTable.__typename !==
      'productTroubleshootingSection_Entry'
  ) {
    return null;
  }

  const selectedIssueType = productContentSectionTable.issueTypes.find(
    item => item.id === issueType,
  );
  const selectedIssueGroup = selectedIssueType?.issueGroups.find(
    item => item.id === issueGroup,
  );
  const selectedIssue = selectedIssueGroup?.issueList.find(
    item => item.id === issue,
  );

  const contactInformation = contactInformationEntries.find(
    item =>
      item.slug ===
      productContentSectionTable.generalContactInformation[0].slug,
  );

  useEffect(() => {
    const { issueType, issueGroup, issue } = router.query;
    if (issueType) {
      setIssueType(issueType as string);
    }
    if (issueGroup) {
      setIssueGroup(issueGroup as string);
    }
    if (issue) {
      setIssue(issue as string);
      setTimeout(() => {
        setResolution(0);
      }, 10);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RootLayout
      className="relative flex min-h-dvh flex-col bg-primary-50"
      showHeader={false}
      showFooter={false}
    >
      <Head>
        <title>{productContentSectionTable.title}</title>
      </Head>
      {/* Header */}
      <div className="sticky top-0 z-10 flex w-full items-center gap-4 border-b border-neutral-200 bg-white px-4 py-3">
        <button
          className="h-6 appearance-none"
          onClick={() => {
            router.back();

            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="material-icons text-2xl">close</span>
        </button>
        <div className="h-10 w-px bg-neutral-200" />
        <div className="flex flex-col truncate">
          <label className="small font-sans-bold">Troubleshoot</label>
          <label className="small truncate text-textSubtle">
            {product.title}
          </label>
        </div>
      </div>

      {/* Body */}
      <div className="relative overflow-hidden">
        {/* Issue types */}
        <div
          className={classNames(
            'min-h-dvh w-full px-4 py-6 md:px-10 md:py-8',
            issueType !== null ? 'absolute' : 'relative',
          )}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="rounded-lg border border-neutral-200 bg-white">
              <div className="border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
                <h3>What are you seeing?</h3>
              </div>
              <div className="px-4 py-5 md:p-8">
                <div className="flex flex-col gap-3">
                  {productContentSectionTable.issueTypes.map(
                    (issueType, index) => (
                      <ListCard
                        key={index}
                        title={issueType.title}
                        icon={issueType.issueTypeIcon}
                        href=""
                        onClick={() => {
                          setIssueType(issueType.id);

                          // If there is only one group, go directly to the issues
                          if (issueType.issueGroups?.length === 1) {
                            setIssueGroup(issueType.issueGroups[0].id);
                          }

                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue group */}
        <div
          className={classNames(
            'top-0 min-h-dvh w-full transform bg-primary-50 px-4 py-6 transition-transform duration-300 ease-in-out md:px-10 md:py-8',
            issueType !== null ? 'translate-x-0' : 'translate-x-full',
            issueGroup !== null ? 'translate-x-0' : '',
            issueType !== null && issueGroup === null ? 'relative' : 'absolute',
          )}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="rounded-lg border border-neutral-200 bg-white">
              <div className="flex flex-row items-center gap-3 border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200"
                  onClick={() => {
                    setIssueType(null);

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="material-icons text-base">arrow_back</span>
                </button>
                <h3>{selectedIssueType?.issueGroupsHeading}</h3>
              </div>
              <div className="px-4 py-5 md:p-8">
                <div className="flex flex-col gap-3">
                  {selectedIssueType?.issueGroups?.map((group, index) => (
                    <ListItem
                      key={index}
                      title={group.title}
                      description={group.issueDescription}
                      image={group.roundedImage?.[0]?.url || ''}
                      href=""
                      onClick={() => {
                        setIssueGroup(group.id);

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      rounded
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue list */}
        <div
          className={classNames(
            'top-0 min-h-dvh w-full transform bg-primary-50 px-4 py-6 transition-transform duration-300 ease-in-out md:px-10 md:py-8',
            issueGroup !== null ? 'translate-x-0' : 'translate-x-full',
            issue !== null ? 'translate-x-0' : '',
            issueGroup !== null && issue === null ? 'relative' : 'absolute',
          )}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="rounded-lg border border-neutral-200 bg-white">
              <div className="flex flex-row items-center gap-3 border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200"
                  onClick={() => {
                    setIssueGroup(null);

                    // If there is only one group, go directly to the issue types
                    if (selectedIssueType?.issueGroups?.length === 1) {
                      setIssueType(null);
                    }

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="material-icons text-base">arrow_back</span>
                </button>
                <h3>{selectedIssueGroup?.issueListHeading}</h3>
              </div>
              <div className="px-4 py-5 md:p-8">
                <div className="flex flex-col gap-3">
                  {selectedIssueGroup?.issueList?.map((issue, index) => (
                    <ListItem
                      key={index}
                      title={issue.title}
                      description={issue.issueDescription}
                      image=""
                      href=""
                      onClick={() => {
                        setIssue(issue.id);
                        setTimeout(() => {
                          setResolution(0);
                        }, 10);

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshoot */}
        {selectedIssue?.issueResolutions?.map((item, index) => {
          const relevantContact = item.relevantContact?.[0]?.slug
            ? contactInformationEntries.find(
                contact => contact.slug === item.relevantContact[0].slug,
              )
            : undefined;

          return (
            <IssueDetail
              key={index}
              issue={issue}
              setIssue={setIssue}
              resolution={resolution}
              setResolution={setResolution}
              isIssueUnresolved={isIssueUnresolved}
              setIsIssueUnresolved={setIsIssueUnresolved}
              {...item}
              relevantContact={relevantContact}
              title={
                selectedIssueType && selectedIssueType.issueGroups?.length > 1
                  ? `${selectedIssueGroup?.title}, ${selectedIssue?.title}`
                  : selectedIssue?.title
              }
              description={selectedIssue?.issueDescription}
              image={selectedIssueGroup?.roundedImage?.[0]?.url ?? ''}
              index={index}
              length={selectedIssue?.issueResolutions?.length ?? 0}
            />
          );
        })}

        {/* Issue unresolved */}
        <div
          className={classNames(
            'top-0 min-h-dvh w-full transform bg-primary-50 px-4 py-6 transition-transform duration-300 ease-in-out md:px-10 md:py-8',
            isIssueUnresolved ? 'relative' : 'absolute',
            isIssueUnresolved ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {productContentSectionTable.generalContactInformation &&
              productContentSectionTable.generalContactInformation.length > 0 &&
              contactInformation && (
                <GeneralContactInformation
                  {...contactInformation}
                  slug={
                    productContentSectionTable.generalContactInformation[0].slug
                  }
                  setIsIssueUnresolved={setIsIssueUnresolved}
                />
              )}

            <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 md:flex-row">
              <SecondaryButton
                onClick={() => {
                  router.reload();
                }}
                buttonSize="large"
                className="flex-1"
              >
                Troubleshoot another issue
              </SecondaryButton>
              <SecondaryButton
                onClick={() => {
                  router.back();
                }}
                buttonSize="large"
                className="flex-1"
              >
                Exit troubleshooting
              </SecondaryButton>
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
            ... on productContentSection_Entry {
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

    return product.productContentSectionTable.map(() => ({
      params: {
        brand: product.productBrand[0].slug,
        category: product.productCategories[0].slug,
        product: product.slug,
      },
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
              issueTypes {
                ... on issueType_Entry {
                  id: uid
                  title
                  slug
                  issueTypeIcon
                  issueGroupsHeading
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
                      issueDescription
                      issueListHeading
                      issueList {
                        ... on issueDetail_Entry {
                          id: uid
                          title
                          slug
                          issueDescription
                          issueResolutions {
                            ... on issueResolution_Entry {
                              id: uid
                              possibleCause:title
                              slug
                              resolutionInformation
                              actionsToTake
                              relevantContact {
                                id: uid
                                title
                                slug
                              }
                            }
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
      contactInformationEntries {
        ... on contactInformation_Entry {
          id: uid
          title
          slug
          roleOrPosition
          businessName
          contactHours
          contactLink
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      product: response.productEntries[0],
      contactInformationEntries: response.contactInformationEntries,
    },
  };
}
