'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonial');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

 

  return (
    <div className='px-[20%] my-[5%]'>
      <h1 className="text-5xl font-extrabold text-center my-6">User Testimonials</h1>

      <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
        <CarouselContent>
          {testimonials.map((testimonial: any) => (
            <CarouselItem 
              key={testimonial._id} 
              className="md:basis-1/2 lg:basis-1/3 flex flex-col justify-between background" 
            >
              <div className="p-6 bg-white rounded-lg flex flex-col justify-between h-full shadow-md shadow-gray-300" style={{
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(136, 230, 232, 1) 100%)',
      }}>
              <p className="my-5 text-md text-gray-600">
                  {testimonial.review}
                </p>
                <h2 className="text-md font-semibold">{testimonial.name}</h2>
                <p className=" text-sm text-gray-500">
                  Designation: {testimonial.designation}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
