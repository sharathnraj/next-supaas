import LearnContentSlide from '@/components/LearnContentSlide';
import LearnSeriesSlide from '@/components/LearnSeriesSlide';
import ImageSlide from '@/components/carousel/ImageSlide';
import NavigationButton from '@/components/carousel/NavigationButton';
import ProductSlide from '@/components/carousel/ProductSlide';
import { SlideType } from '@/components/carousel/types';
import {
  ImageData,
  LearnData,
  LearnDataArticle,
  LearnDataGuide,
  LearnDataVideo,
  LearnSeriesData,
  ProductData,
} from '@/lib/types';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox, { ControllerRef } from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';

const DEFAULT_RESPONSIVE = [
  {
    breakpoint: 768,
    settings: {
      arrows: false,
      nextArrow: undefined,
      prevArrow: undefined,
    },
  },
];

export default function Carousel({
  slides,
  slideType,
  arrows = true,
  dots = true,
  infinite = true,
  draggable = false,
  slidesToShow = 1,
  variableWidth = false,
  responsive = DEFAULT_RESPONSIVE,
  wrapperClass = '-mx-5 md:-mx-8',
}: {
  slides: (
    | ImageData
    | { products: ProductData[] }
    | LearnData
    | LearnSeriesData
  )[];
  slideType: SlideType;
  arrows?: boolean;
  dots?: boolean;
  infinite?: boolean;
  draggable?: boolean;
  slidesToShow?: number;
  variableWidth?: boolean;
  responsive?: {
    breakpoint: number;
    settings: {
      arrows?: boolean;
      nextArrow?: undefined;
      prevArrow?: undefined;
      slidesToShow?: number;
    };
  }[];
  wrapperClass?: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  var settings = {
    dots: dots && slides.length > 1,
    customPaging: (i: number) => (
      <div
        className={classNames(
          'material-icons size-2.5 text-[10px] transition',
          i === activeSlide ? 'text-reeceBlue' : 'text-pageIndicatorGray',
        )}
      >
        circle
      </div>
    ),
    infinite,
    speed: 500,
    slidesToScroll: 1,
    draggable,
    arrows: arrows && slides.length > 1,
    nextArrow: <NavigationButton direction="next" customClass="right-8" />,
    prevArrow: <NavigationButton direction="prev" customClass="left-8" />,
    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
    },
    afterChange: (current: number) => setActiveSlide(current),
    slidesToShow,
    variableWidth,
    responsive,
  };

  // Lightbox props
  const ref = useRef<ControllerRef>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames(wrapperClass)}>
      <Slider {...settings}>
        {slides.map((slide, index) => {
          if (slideType === SlideType.Product) {
            return (
              <ProductSlide
                key={index}
                slide={slide as { products: ProductData[] }}
              />
            );
          }

          if (slideType === SlideType.Learn) {
            return (
              <LearnContentSlide
                key={index}
                slide={
                  slide as LearnDataVideo | LearnDataGuide | LearnDataArticle
                }
              />
            );
          }

          if (slideType === SlideType.LearnSeries) {
            return (
              <LearnSeriesSlide
                key={index}
                index={index}
                slide={slide as LearnSeriesData}
              />
            );
          }

          return (
            <ImageSlide
              key={index}
              slide={slide as ImageData}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </Slider>

      {slideType === SlideType.Image && (
        <Lightbox
          index={activeSlide}
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={(slides as ImageData[]).map(slide => ({
            src: slide.url,
            alt: slide.title,
          }))}
          plugins={[Zoom]}
          carousel={{
            finite: true,
          }}
          controller={{ ref }}
          on={{
            view: ({ index: currentIndex }) => setActiveSlide(currentIndex),
          }}
          render={{
            buttonPrev:
              slides.length <= 1
                ? () => null
                : () => (
                    <NavigationButton
                      direction="prev"
                      onClick={() => {
                        ref.current?.prev();
                      }}
                    />
                  ),
            buttonNext:
              slides.length <= 1
                ? () => null
                : () => (
                    <NavigationButton
                      direction="next"
                      onClick={() => {
                        ref.current?.next();
                      }}
                    />
                  ),
          }}
        />
      )}
    </div>
  );
}
