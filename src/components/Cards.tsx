import React from 'react';

interface CardProps {
    image: string; // Specify that 'image' should be a string
    title: string; // Specify that 'title' should be a string
    description: string; // Specify that 'description' should be a string
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div 
      className='flex flex-col rounded-lg shadow-lg shadow-gray-400 overflow-hidden w-full transition-transform duration-300 ease-in-out transform hover:-translate-y-2'
      style={{
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(136, 230, 232, 1) 100%)',
      }}
    >
      <img src={image} alt={title} className='w-full' />
      <div className='p-9 flex flex-col flex-grow items-center justify-center'>
        <h1 className='font-bold text-xl mb-2'>{title}</h1>
        <p className='text-gray-600'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
