import React from 'react';

const Choose = () => {
  return (
    <div>
      <div className='grid sm:grid-cols-10 lg:grid-cols-12 items-center justify-center h-100 gap-10 px-5 sm:px-10 lg:px-5'>
        
        {/* Image Div */}
        <div className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-3 flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 h-[70%]'>
          <img 
            src='/images/hands.webp' 
            className='rounded-xl shadow-lg shadow-gray-400 h-[100%]' 
            alt='Description of hands image' 
          />
        </div>
        
        {/* Text Div */}
        <div className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-7 flex flex-col gap-5 rounded-lg   p-6'>
            <div className='w-max '>
          <h1 className='font-semibold text-orange-400'>Why Choose Us</h1>
          <hr className='border-orange-400 mt-2'/>
          </div>
          <div className='lg:mx-[-25%] bg-white p-10'>
          <h1 className='font-extrabold text-5xl text-black'>Unlock Your Business Potential with Data</h1>
          <p>Choose Data To Grow for unparalleled expertise in transforming data into actionable insights that drive your business forward. Our commitment to innovation, precision, and delivering measurable results ensures that you have a trusted partner for achieving your strategic goals.</p>
          </div>
          <div className='ml-10 flex flex-col gap-5'>
            <div className='flex flex-row gap-5 items-center justify-center'>
                <img src='/images/rating.png' alt='logo' className='hover:scale-110  transition duration-300 ease-in-out' />
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl'>Expertise and Experience</h1>
            <p>Rely on our vast expertise in data collection, analysis, and strategic consulting, tailored precisely to meet your business requirements.</p>
          </div>
          </div>
          <div className='flex flex-row gap-5 items-center justify-center'>
            <img src='/images/idea.png' alt='logo' className='hover:scale-110  transition duration-300 ease-in-out' />
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl'>Innovative Solutions</h1>
            <p>Utilize advanced AI and machine learning technologies to convert intricate data into actionable insights, significantly enhancing decision-making efficiency.</p>
          </div>
          </div>
          <div className='flex flex-row gap-5 items-center justify-center'>
            <img src='/images/partnership.png' alt='logo' className='hover:scale-110  transition duration-300 ease-in-out' />
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl'>Commitment to Excellence</h1>
            <p>Count on our dedication to delivering top-tier, dependable services, ensuring personalized solutions that drive measurable business success.</p>
          </div>
          </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Choose;
