import React from 'react';

const Vision = () => {
  return (
    <div>
      <div className='grid sm:grid-cols-10 lg:grid-cols-12 items-center justify-center h-100 my-20 gap-10 px-5 sm:px-10 lg:px-20'>
        
        {/* Vision Card */}
        <div className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-3 flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 p-6 overflow-hidden hover:scale-105 hover:bg-cyan-100 transition duration-300 ease-in-out'>
          <div className='absolute inset-0 bg-[url(../../public/images/vision.webp)] bg-cover bg-center opacity-10'></div>
          <div className='relative z-10 w-max'>
            <h1 className='font-semibold text-2xl'>Our Vision</h1>
            <hr className='border-orange-400 mt-4'/>
          </div>
          <p className='relative z-10'>Empowering small and medium-sized businesses to unlock their full potential through data-driven insights and innovative analytics solutions. We envision a future where businesses of all sizes can harness the power of data to make informed decisions, overcome challenges, and achieve sustainable growth.</p>
        </div>

        {/* Mission Card */}
        <div className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-7 flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 p-6 overflow-hidden hover:scale-105 hover:bg-cyan-100 transition duration-300 ease-in-out'>
          <div className='absolute inset-0 bg-[url(../../public/images/vision.webp)] bg-cover bg-center opacity-10'></div>
          <div className='relative z-10 w-max'>
            <h1 className='font-semibold text-2xl'>Our Mission</h1>
            <hr className='border-orange-400 mt-4'/>
          </div>
          <p className='relative z-10'>Our mission is to deliver actionable insights and tailored solutions that drive strategic growth, enhance operational efficiency, and foster a culture of informed decision-making. We are committed to making advanced data analytics accessible, affordable, and impactful for businesses looking to thrive in a data-driven world.</p>
        </div>
        
      </div>
    </div>
  );
}

export default Vision;
