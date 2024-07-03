import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AmplitudeContextProvider from '@/lib/amplitude/context/AmplitudeContext';
import classNames from 'classnames';
import Head from 'next/head';

export default function RootLayout({
  children,
  className = '',
  showHeader = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Combining a Japanese and Australian engineering, The Thermann X Split Heat pump is a flexible, quiet, and highly efficient hot water solution for any climate. By extracting heat from the air, this clever system uses a naturally occurring gas to heat water making it up to 80% more efficient than that of a standard electric storage system."
        />
        <meta property="og:image" content="/opengraph.jpg" />
        <meta property="og:image:type" content="jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.jpg" type="image/jpg" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/icon.jpg"
          type="image/jpg"
          sizes="any"
        />
      </Head>
      {showHeader && <Header />}
      <AmplitudeContextProvider>
        <main className={classNames(className)}>{children}</main>
      </AmplitudeContextProvider>
      {showFooter && <Footer />}
    </>
  );
}
