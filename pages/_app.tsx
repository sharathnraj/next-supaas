import '@/styles/globals.css';
import '@/styles/icons.css';
import type { AppProps } from 'next/app';
import 'slick-carousel/slick/slick.css';
import 'yet-another-react-lightbox/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
