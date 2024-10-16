import React from 'react';

const Whoweare = () => {
  return (
    <div>
      <div className='grid sm:grid-cols-10 lg:grid-cols-12 items-center justify-center h-100 my-20 gap-4 px-5 sm:px-10 lg:px-20'>
        <div className='col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-3 flex flex-col gap-5'>
          <div className='flex flex-col gap-5'>
            <h4 className='font-bold text-orange-400'>Who We Are</h4>
            <h1 className='font-extrabold text-4xl'>Transforming Data into Growth</h1>
            <p>
              At Data To Grow, we are a team of passionate data experts dedicated to helping businesses harness the power of their data. With a wealth of experience in data collection, analysis, and strategic consulting, we provide tailored solutions that drive informed decision-making and business success. Our commitment to excellence and innovation ensures that we deliver the highest quality services, empowering our clients to achieve their goals and thrive in a data-driven world.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-1">
            <p className="col-span-1">◉ Data Analysis</p>
            <p className="col-span-1">◉ Business & Reporting</p>
            <p className="col-span-2 md:col-span-1">◉ Technology & Tools Setup</p>
          </div>
          <div className='w-max'>
          <button className='text-orange-400 cursor-pointer'>See All Services ➧</button>
          <hr />
          </div>
        </div>

        {/* Adjusting the column span and gap for better alignment */}
        <div className='col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-7 flex justify-center'>
          <iframe
            width="100%" // Set to 100% to fill the column
            height="315"
            src="https://www.youtube.com/embed/CH50zuS8DD0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='rounded-lg shadow-lg shadow-gray-600'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Whoweare;
