import InputText from '@/components/forms/InputText';
import RootLayout from '@/containers/RootLayout';
import Head from 'next/head';

export default function TypographyPage() {
  return (
    <RootLayout className="px-4 py-5 md:px-10 md:py-8">
      <Head>
        <title>Forms</title>
      </Head>

      <h1 className="mb-5">Forms</h1>

      <div className="flex flex-col gap-10">
        <InputText
          label="Label"
          placeholder="Text"
          type="text"
          info="Helper text"
        />

        <InputText
          label="Label"
          placeholder="Text"
          type="text"
          info="Helper text"
          disabled
        />

        <InputText
          label="Label"
          placeholder="Text"
          type="text"
          info="Helper text"
          errors={{ type: 'server', message: 'Error message' }}
        />
      </div>
    </RootLayout>
  );
}
