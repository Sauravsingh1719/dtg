import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-[15%] my-10">
      <div className="grid grid-cols-12 gap-4 mx-[10%]">
        
      <div className="col-span-10 sm:col-span-10 md:col-span-4 lg:col-span-3 p-10 shadow-md shadow-gray-400 flex flex-col items-center justify-center gap-5 border border-transparent hover:border-2 hover:border-orange-400 transition duration-300 ease-in-out">

            <img src='/images/location.png' className='transition-transform duration-300 ease-in-out transform hover:-translate-y-2'/>
            <h1 className='font-bold text-2xl text-black'>Location</h1>
            <h4 className='font-medium text-xl text-gray-700'>Cyprus</h4>
        </div>
        <div className="col-span-10 sm:col-span-10 md:col-span-4 lg:col-span-3 p-10 shadow-md shadow-gray-400 flex flex-col items-center justify-center gap-5 border border-transparent hover:border-2 hover:border-orange-400 transition duration-300 ease-in-out ">

            <img src='/images/mail.png' className='transition-transform duration-300 ease-in-out transform hover:-translate-y-2'/>
            <h1 className='font-bold text-2xl text-black'>Email Address</h1>
            <h4 className='font-medium lg:text-xl text-gray-700 sm:text-lg'>contact@datatogrow.com</h4>
        </div>
        <div className="col-span-10 sm:col-span-10 md:col-span-4 lg:col-span-3 p-10 shadow-md shadow-gray-400 flex flex-col items-center justify-center gap-5 border border-transparent hover:border-2 hover:border-orange-400 transition duration-300 ease-in-out">

            <img src='/images/phone.png' className='transition-transform duration-300 ease-in-out transform hover:-translate-y-2'/>
            <h1 className='font-bold text-2xl text-black'>Phone</h1>
            <h4 className='font-medium text-xl text-gray-700'>(+357)99942880</h4>
        </div>
      </div>
    </div>
  );
};

export default Contact;
