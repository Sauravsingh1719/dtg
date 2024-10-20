
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='relative w-full'>
      {/* Full-Width Background Image with Low Opacity */}
      <div className='absolute inset-0 w-full h-full bg-[url("/images/footer.webp")] bg-cover bg-center opacity-20'></div>

      <hr className='border border-gray-300 z-10 relative' /> {/* Ensure hr is above background */}

      {/* Footer Content */}
      <div className='relative z-10 py-5'>
        <div className='flex flex-row justify-between px-[20%]'>
          <div>
            <ul>
              <a href='/'><li>Home</li></a>
              <a href='/admin'><li>Admin</li></a>
              <a href='/posts'><li>Posts</li></a>
            </ul>
          </div>
          <div>
            <ul className='flex flex-row gap-5'>
              <li><img src='/images/insta.png' alt="Instagram" /></li>
              <li><img src='/images/aedin.png' alt="aedIn" /></li>
              <li><img src='/images/facebook.png' alt="Facebook" /></li>
            </ul>
          </div>
        </div>
        <div className='flex justify-center'>
          <p className='text-black'>Copyright © {currentYear} Data to Grow, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
