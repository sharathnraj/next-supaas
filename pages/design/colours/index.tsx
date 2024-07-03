import RootLayout from '@/containers/RootLayout';
import classNames from 'classnames';
import Head from 'next/head';

function Swatch({ name, bg }: { name: string; bg: string }) {
  return (
    <div>
      <div className={classNames('h-16 w-24 rounded ', bg)}></div>
      <p className="text-center">{name}</p>
    </div>
  );
}

export default function ColourPage() {
  return (
    <RootLayout className="px-4 py-5 md:px-10 md:py-8">
      <Head>
        <title>Colours</title>
      </Head>

      <h1 className="mb-5">Color Swatches</h1>
      <h3 className="mb-2">Brand</h3>
      <ul className="mb-4 flex gap-4 p-0">
        <Swatch name="Reece blue" bg="bg-reeceBlue" />
        <Swatch name="Max light blue" bg="bg-maxLightBlue" />
      </ul>
      <h3 className="mb-2">Brand accent</h3>
      <ul className="mb-4 flex gap-4 p-0">
        <Swatch name="True blue" bg="bg-trueBlue" />
        <Swatch name="Steel cap grey" bg="bg-steelCapGrey" />
      </ul>
      <h3 className="mb-2">Buttons</h3>
      <ul className="mb-4 flex gap-4 p-0">
        <Swatch name="Normal" bg="bg-buttonBlue" />
        <Swatch name="Hover" bg="bg-buttonBlueHover" />
      </ul>
      <h3 className="mb-2">Brand primary</h3>
      <ul className="flex flex-wrap gap-4 p-0">
        <Swatch name="950" bg="bg-primary-950" />
        <Swatch name="900" bg="bg-primary-900" />
        <Swatch name="800" bg="bg-primary-800" />
        <Swatch name="700" bg="bg-primary-700" />
        <Swatch name="600" bg="bg-primary-600" />
        <Swatch name="500" bg="bg-primary-500" />
        <Swatch name="400" bg="bg-primary-400" />
        <Swatch name="300" bg="bg-primary-300" />
        <Swatch name="200" bg="bg-primary-200" />
        <Swatch name="100" bg="bg-primary-100" />
        <Swatch name="50" bg="bg-primary-50" />
      </ul>
    </RootLayout>
  );
}
