import React from 'react';
import { motion, useInView } from 'framer-motion';

const Work = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 }); 

  return (
    <div className='relative mt-20'>
      {/* Background Image */}
      <div className='absolute inset-0 bg-[url("/images/vision.webp")] bg-cover bg-center opacity-10 pointer-events-none'></div>
      
      <div className='relative grid sm:grid-cols-10 lg:grid-cols-12 items-center justify-center h-100 gap-10 px-5 sm:px-10 lg:px-20'>
        
        <div className='col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-3 flex flex-col gap-5 rounded-lg'>
          <div className='w-max'>
            <h1 className='font-semibold text-orange-400'>Working Process</h1>
            <hr className='border-orange-400 mt-2'/>
          </div>
          <h1 className='font-extrabold text-5xl text-black'>How it works</h1>
          <p className='text-lg'>
            At Data To Grow, we specialize in transforming complex data into actionable insights. Leveraging advanced analytics and cutting-edge technologies, we deliver valuable insights that empower your organization to make informed decisions and achieve business success.
          </p>
          <p className='text-lg'>
            We simplify the path to data-driven success with three straightforward steps:
          </p>
          <button className="bg-blue-500 text-white p-2 rounded-xl w-max hover:scale-110 hover:bg-black transition duration-300 ease-in-out shadow-md shadow-slate-800 mt-5">
            Let's Talk
          </button>
        </div>

        <motion.div
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
          className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-7 flex flex-col gap-5 rounded-lg'
        >
          <img src='/images/work.webp' className='rounded-xl' alt="Work Process" />
        </motion.div>

      </div>

      <div className='relative grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 items-start justify-center px-5 sm:px-10 lg:px-[20%] my-10'>
        <motion.div
        ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
           className='flex flex-col rounded-xl shadow-lg shadow-gray-400 p-10 h-full hover:scale-110 hover:bg-cyan-100 transition duration-300 ease-in-out'>
          <h1 className='font-bold text-xl mb-3'>Data Integration & Preparation</h1>
          <p className='flex-grow'>
            Seamlessly integrate data from diverse sources and ensure accuracy through meticulous cleaning and validation processes.
          </p>
        </motion.div>
        <motion.div
        ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
           className='flex flex-col rounded-xl shadow-lg shadow-gray-400 p-10 h-full hover:scale-110 hover:bg-cyan-100 transition duration-300 ease-in-out'>
          <h1 className='font-bold text-xl mb-3'>Advanced Analysis & Insights</h1>
          <p className='flex-grow'>
            Utilize state-of-the-art analytics to perform descriptive, predictive, and prescriptive analysis, uncovering valuable insights from your data.
          </p>
        </motion.div>
        <motion.div
        ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
           className='flex flex-col rounded-xl shadow-lg shadow-gray-400 p-10 h-full hover:scale-110 hover:bg-cyan-100 transition duration-300 ease-in-out'>
          <h1 className='font-bold text-xl mb-3'>Actionable Recommendations</h1>
          <p className='flex-grow'>
            Receive customized recommendations based on data insights, empowering informed decision-making and driving business growth.
          </p>
        </motion.div>
      </div>
    </div>
    
  );
};

export default Work;
