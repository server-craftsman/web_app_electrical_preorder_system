import React from 'react';
import { Carousel } from 'antd';
import Caurousel1 from '../../../assets/Carousel_1.jpg';
import Caurousel2 from '../../../assets/Carousel_2.jpg';
import Caurousel3 from '../../../assets/Carousel_3.jpg';
import Caurousel4 from '../../../assets/Carousel_4.jpg';

const cover = () => {
  const carouselImages = [Caurousel1, Caurousel2, Caurousel3, Caurousel4];

  return (
    <div className="w-full max-w-10xl mx-auto">
      <Carousel autoplay>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Carousel ${index + 1}`}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default cover;
