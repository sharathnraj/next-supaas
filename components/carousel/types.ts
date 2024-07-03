export enum SlideType {
  Image = 'image',
  Product = 'product',
  Learn = 'learn',
  LearnSeries = 'learnSeries',
}

export interface ImageSlideProps {
  href: string;
  image: string;
  title: string;
}

export interface ProductProps {
  href: string;
  image: string;
  title: string;
  description: string;
}

export interface ProductSlideProps {
  products: ProductProps[];
}

export enum LearnSlideType {
  article = 'article',
  video = 'smart_display',
}

export interface LearnContentSlideProps {
  title: string;
  image: string;
  href: string;
  duration: string;
  type: LearnSlideType;
}

export interface LearnSeriesSlideProps {
  title: string;
  image: string;
  href: string;
  count: number;
}
