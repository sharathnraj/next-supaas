import useAmplitudeContext from '@/lib/amplitude/hooks/useAmplitude';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';

export default function ProductImageWithLightbox({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="relative h-20 w-20 appearance-none border border-neutral-200"
        onClick={() => {
          setIsOpen(true);
          trackAmplitudeEvent('Product image clicked', {
            productTitle: name,
          });
        }}
      >
        <Image src={image} alt={name} fill className="object-contain p-1.5" />
        <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center bg-reeceBlue">
          <span className="material-icons-outlined text-sm text-white">
            zoom_in
          </span>
        </div>
      </button>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src: image }]}
        plugins={[Zoom]}
        carousel={{
          finite: true,
        }}
      />
    </>
  );
}
