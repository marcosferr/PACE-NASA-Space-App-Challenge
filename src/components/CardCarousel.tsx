import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import '../CardCarousel.css';
import data from '../data/facts.json';


interface CarouselItem {
  title: string;
  text: string;
  image?: string;
}

const CardCarousel = () => {
  const lightGalleryRef = useRef<any>(null);

  const openGallery = (index: number) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  return (
    <>
      <Swiper
        direction="vertical"
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Keyboard, Mousewheel]}
        className="swiper-container"
        keyboard={true}
        mousewheel={true}
      >
        {data.map((item: CarouselItem, index: number) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide-content gap-y-1 bg-white">
              <h1 className='text-6xl font-bold tracking-tight text-zinc-600'>{item.title}</h1>
              <p className='text-3xl text-zinc-900 font-normal tracking-tighter text-pretty leading-relaxed'>{item.text}</p>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={`Slide ${index}`} 
                  className='rounded-lg w-[30rem] cursor-pointer hover:brightness-90 transform transition duration-300 ease-in-out' 
                  onClick={() => openGallery(index)} 
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <LightGallery
        onInit={(detail) => (lightGalleryRef.current = detail.instance)}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={data.map((item: CarouselItem) => ({
          src: item.image,
          thumb: item.image,
          subHtml: `<h4>${item.title}</h4><p>${item.text}</p>`,
        }))}
      />
    </>
  );
};

export default CardCarousel;
