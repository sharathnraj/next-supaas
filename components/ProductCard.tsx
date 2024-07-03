import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description?: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 transition hover:border-black active:border-neutral-300"
    >
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        className="block"
      />
      <div>
        <label className="font-sans-bold">{title}</label>
        {description && <p className="small text-textSubtle">{description}</p>}
      </div>
    </Link>
  );
}
