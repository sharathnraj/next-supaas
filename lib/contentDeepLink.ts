import fetchData from '@/lib/craftcms_client';
import { ProductData } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function contentDeepLink({
  __typename,
  slug,
}: {
  __typename: string;
  slug: string;
}) {
  const [productData, setProductData] = useState<null | ProductData[]>(null);

  useEffect(() => {
    fetchData(`
      query {
        productEntries(orderBy: "title") {
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
    `).then(data => {
      setProductData(data.productEntries);
    });
  }, []);

  if (__typename === 'productLanding_Entry') return `/`;

  if (__typename === 'product_Entry') {
    if (!productData) return `/${slug}`;

    const product = productData.find(product => product.slug === slug);

    return `/product-support/${product?.productBrand[0].slug}/${product?.productCategories[0].slug}/${product?.slug}`;
  }

  if (__typename === 'learnLanding_Entry') return `/learn/`;

  if (__typename === 'learnSeries_Entry') return `/learn/series/${slug}`;

  if (
    __typename === 'learningVideo_Entry' ||
    __typename === 'learningGuide_Entry' ||
    __typename === 'learningArticle_Entry'
  ) {
    return `/learn/${slug}`;
  }

  return `/${slug}`;
}
