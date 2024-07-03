import Image from 'next/image';
import Link from 'next/link';

export default function DownloadCard({
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
      className="flex items-center justify-between gap-0.5 overflow-hidden rounded-lg border border-neutral-200 pr-3 transition hover:border-black active:border-neutral-300"
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center">
        <div className="relative h-24 w-20 shrink-0">
          <Image src={image} alt={title} className="object-contain" fill />
        </div>
        <div className="p-3 pr-0">
          <label className="font-sans-bold">{title}</label>
          {description && (
            <p className="small text-textSubtle">{description}</p>
          )}
        </div>
      </div>
      <span className="material-icons-outlined text-2xl">file_download</span>
    </Link>
  );
}
