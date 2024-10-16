import React from 'react';
import { Card } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,} from '@/components/ui/carousel';

export function CarouselSize() {
  const jsonData = [
    { message: 'Message 1', name: 'Name 1', designation: 'Designation 1' },
    { message: 'Message 2', name: 'Name 2', designation: 'Designation 2' },
    // ... more data
  ];

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className=" max-w-sm "
    >
      <CarouselContent>
        {jsonData.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card
                message={item.message}
                name={item.name}
                designation={item.designation}
              >
                <div className="card-content flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}