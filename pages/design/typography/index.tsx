import RootLayout from '@/containers/RootLayout';
import Head from 'next/head';

export default function TypographyPage() {
  return (
    <RootLayout className="px-4 py-5 md:px-10 md:py-8">
      <Head>
        <title>Typography</title>
      </Head>

      <h1 className="mb-5">Typography</h1>
      <h1 className="mb-4">H1: The quick brown fox jumps over the lazy dog.</h1>
      <h2 className="mb-4">H2: The quick brown fox jumps over the lazy dog.</h2>
      <h3 className="mb-4">H3: The quick brown fox jumps over the lazy dog.</h3>
      <h4 className="mb-4">H4: The quick brown fox jumps over the lazy dog.</h4>
      <h5 className="mb-4">H5: The quick brown fox jumps over the lazy dog.</h5>
      <h6 className="mb-4">H6: The quick brown fox jumps over the lazy dog.</h6>
      <p className="mb-4">P1: The quick brown fox jumps over the lazy dog.</p>
      <p className="p2 mb-4">
        P2: The quick brown fox jumps over the lazy dog.
      </p>
      <label className="mb-4">
        Label: The quick brown fox jumps over the lazy dog.
      </label>
      <label className="small mb-4">
        Label small: The quick brown fox jumps over the lazy dog.
      </label>
    </RootLayout>
  );
}
