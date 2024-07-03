import { ProductData } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductSlide({
  slide,
}: {
  slide: { products: ProductData[] };
}) {
  return (
    <div className="px-5 md:px-22">
      <div className="space-y-3.5">
        {slide.products.map(product => (
          <Link
            key={product.title}
            href={product.maxLink ?? '/'}
            className="flex w-full overflow-hidden rounded-lg border border-neutral-200 transition hover:border-black active:border-neutral-300"
            download
          >
            <div className="flex items-center">
              <Image
                src={product.productImage[0].url}
                alt={product.title}
                width={112}
                height={112}
                className="block"
              />
              <div className="p-3">
                <label className="font-sans-bold">{product.title}</label>
                <p className="small text-textSubtle">{`Product code: ${product.productCode}`}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
