//  This is a component that will be used to display the content of the card
// This will have an image and a title and description

import TertiaryButton from '@/components/buttons/TertiaryButton';
import contentDeepLink from '@/lib/contentDeepLink';
import { FeaturedLinkCardData } from '@/lib/types';
import Image from 'next/image';

interface ContentCardProps extends FeaturedLinkCardData {
  image: string;
}

export default function ContentCard({
  title,
  plainTextDescription,
  image,
  primaryLink,
  secondaryLinkListTitle,
  secondaryLinkList,
}: ContentCardProps) {
  return (
    <div className="flex cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-sm">
      <div className="relative h-44 md:h-64">
        <Image src={image} alt={title} fill className="block object-cover" />
      </div>

      <div className="flex flex-col items-start gap-1 p-5">
        <h3 className="m-0">{title}</h3>
        <p className="m-0 text-textSubtle">{plainTextDescription}</p>
        {primaryLink && primaryLink.length > 0 && (
          <TertiaryButton
            className="mt-2"
            href={contentDeepLink({
              __typename: primaryLink[0].__typename,
              slug: primaryLink[0].slug,
            })}
          >
            <span>{primaryLink[0].title}</span>
            <span className="material-icons text-xl">chevron_right</span>
          </TertiaryButton>
        )}
      </div>

      {/* Secondary links */}
      {(secondaryLinkListTitle ||
        (secondaryLinkList && secondaryLinkList.length > 0)) && (
        <div className="flex flex-col items-start gap-3 border-t border-neutral-200 p-5">
          <h6>{secondaryLinkListTitle}</h6>
          {secondaryLinkList?.map(link => (
            <TertiaryButton
              key={link.id}
              href={contentDeepLink({
                __typename: link.__typename,
                slug: link.slug,
              })}
            >
              {link.title}
            </TertiaryButton>
          ))}
        </div>
      )}
    </div>
  );
}
