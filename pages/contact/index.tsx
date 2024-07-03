import PrimaryButton from '@/components/buttons/PrimaryButton';
import InputSelect from '@/components/forms/InputSelect';
import RootLayout from '@/containers/RootLayout';
import fetchData from '@/lib/craftcms_client';
import getIcon from '@/lib/icons';
import { BrandData, ProductData, ProductLandingData } from '@/lib/types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact({
  brands,
  productLanding,
  products,
}: {
  brands: BrandData[];
  productLanding: ProductLandingData;
  products: ProductData[];
}) {
  const [brand, setBrand] = useState('1');
  const [product, setProduct] = useState('1');

  return (
    <RootLayout>
      <Head>
        <title>Contact support</title>
      </Head>

      <div className="flex flex-col gap-5 md:gap-8">
        {/* Hero */}
        <div className="px-4 pt-6 md:px-10 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h1>Contact support</h1>
            <p className="large">
              Speak to a product support specialist or find your nearest Reece
              branch.
            </p>
          </div>
        </div>

        <div className="px-4 pb-6 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col">
            <div className="flex flex-col justify-start gap-4 rounded-lg border border-neutral-200 p-5">
              <div className="h-16 w-16 rounded-full bg-primary-50 p-[7px]">
                <Image
                  src={getIcon('call')}
                  alt="Contact"
                  width={50}
                  height={50}
                />
              </div>
              <h3>Call product support</h3>
              <p>Tell us which product you need support for.</p>
              <InputSelect
                onChange={e => setBrand(e.target.value)}
                className="w-full"
                value={brand}
              >
                <option value="1" disabled>
                  Select Brand
                </option>
                {productLanding.productSupportGroupList.map(group => {
                  const brand = brands.find(brand => brand.slug === group.slug);

                  if (!brand) return null;

                  return (
                    <option key={brand.slug} value={brand.slug}>
                      {brand.title}
                    </option>
                  );
                })}
              </InputSelect>
              {brand !== '1' && (
                <InputSelect
                  onChange={e => setProduct(e.target.value)}
                  className="w-full"
                  value={product}
                >
                  <option value="1" disabled>
                    Select Product
                  </option>
                  {products
                    .filter(p => p.productBrand[0].slug === brand)
                    .map(product => (
                      <option key={product.slug} value={product.slug}>
                        {product.title}
                      </option>
                    ))}
                </InputSelect>
              )}
              <PrimaryButton
                disabled={brand === '1' || product === '1'}
                href={`/contact/${product}`}
                buttonSize="large"
                className="w-full md:w-max"
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="px-4 pb-6 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col">
            <div className="space-y-4 rounded-lg border border-neutral-200 p-5">
              <div className="h-16 w-16 rounded-full bg-primary-50 p-[7px]">
                <Image
                  src={getIcon('locationOn')}
                  alt="Location"
                  width={50}
                  height={50}
                />
              </div>
              <h3>Contact a branch</h3>
              <p>Find your nearest Reece branch</p>
              <PrimaryButton
                buttonSize="large"
                className="w-full md:w-max"
                href="https://www.reece.com.au/storefinder/"
                external
                externalBlankTarget
              >
                Branch finder
              </PrimaryButton>
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
      productEntries(orderBy: "title") {
        ... on product_Entry {
          id: uid
          title
          slug
          productBrand {
            id: uid
            slug
          }
        }
      }
    }
  `);

  // Pass post data to the page via props
  return {
    props: {
      brands: response.brandEntries,
      productLanding: response.productLandingEntries[0],
      products: response.productEntries,
    },
  };
}
