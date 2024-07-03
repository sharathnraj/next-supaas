import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TertiaryButton from '@/components/buttons/TertiaryButton';
import RootLayout from '@/containers/RootLayout';
import Head from 'next/head';

export default function ButtonsPage() {
  return (
    <RootLayout className="px-4 py-5 md:px-10 md:py-8">
      <Head>
        <title>Buttons</title>
      </Head>

      <h1 className="mb-5">Buttons</h1>
      <div className="flex flex-col items-start gap-4">
        <h3>Primary Button</h3>
        <div className="flex flex-row items-center gap-4">
          <PrimaryButton buttonSize="small">Small</PrimaryButton>
          <PrimaryButton>Medium</PrimaryButton>
          <PrimaryButton buttonSize="large">Large</PrimaryButton>
        </div>
        <h3>Secondary Button</h3>
        <div className="flex flex-row items-center gap-4">
          <SecondaryButton buttonSize="small">Small</SecondaryButton>
          <SecondaryButton>Medium</SecondaryButton>
          <SecondaryButton buttonSize="large">Large</SecondaryButton>
        </div>
        <h3>Tertiary Button</h3>
        <div className="flex flex-row items-center gap-4">
          <TertiaryButton buttonSize="small">Small</TertiaryButton>
          <TertiaryButton>Medium</TertiaryButton>
          <TertiaryButton buttonSize="large">Large</TertiaryButton>
        </div>
      </div>
    </RootLayout>
  );
}
