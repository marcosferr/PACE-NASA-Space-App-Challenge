import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import data from '../data/facts.json';
import '../CardCarousel.css';

interface CarouselItem {
  title: string;
  text: string;
  image?: string;
}

const CardCarousel = () => {
  return (
    <Swiper
      direction="vertical"
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="swiper-container"
    >
      {data.map((item: CarouselItem, index: number) => (
        <SwiperSlide key={index}>
          <div className="swiper-slide-content gap-y-10">
            <h1 className='text-5xl font-bold tracking-tight text-zinc-600'>{item.title}</h1>
            <p className='text-2xl text-zinc-900 font-normal tracking-tighter text-pretty leading-relaxed'>{item.text}</p>
            {item.image && <img src={item.image} alt={`Slide ${index}`} className='rounded-lg w-[30rem]' />}

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardCarousel;