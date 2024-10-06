import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import data from '../data/facts.json';
import '../CardCarousel.css';

// Define the type for the item
interface CarouselItem {
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
            <p>{item.text}</p>
            {item.image && <img src={item.image} alt={`Slide ${index}`} className='rounded-lg w-[30rem]' />}

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardCarousel;