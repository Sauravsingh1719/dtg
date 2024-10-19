
import React from 'react';

const Client = () => {
  return (
    <div className='relative mb[10%]'>
      {/* Background Image */}
      <div className='absolute inset-0 bg-[url("/images/map.webp")] bg-contain bg-center opacity-30 pointer-events-none'></div>
      
      <div className='flex flex-col items-center justify-center px-[20%] py-[6%] gap-10 relative'>
        <div >
          <h1 className='font-semibold text-orange-400 text-xl'>Our Clients</h1>
        </div>
        <div>
          <h1 className='font-extrabold text-5xl text-black'>Trusted by Forward-Thinking Businesses</h1>
        </div>
        <div className='flex flex-row justify-between w-full '>
          <a href='https://greenworldsolarwares.com/index.html'><img src='/images/greenworld.webp'  /></a>
          <a href='https://www.facebook.com/provitafeeds/'><img src='/images/thoo.webp'  /></a>
          <a href='https://www.instagram.com/ds_menshairsalon/'><img src='/images/Ds.webp'  /></a>
          <a href='https://netiatis.com/#intro'><img src='/images/swet.webp'  /></a>
        </div>
      </div>
    </div>
  );
};

export default Client;
