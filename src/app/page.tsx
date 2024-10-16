"use client";
import Choose from "@/components/Choose";
import { TextGenerateEffectDemo } from "@/components/Text/Text";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Vision from "@/components/Vision";
import Whoweare from "@/components/Whoweare";
import Work from "@/components/Work";
import React from "react";
import { motion, useInView } from 'framer-motion';
import Client from "@/components/Client";
import Services from "@/components/Services";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Meet from "@/components/Meet";
import TestimonialsList from "@/components/Testimonials";
import Blog from "@/components/Blog";



const words = [
  {
    text: "Data Analytics",
    className: "text-blue-500 dark:text-blue-500",
  },
];

const Page = () => {
  const ref = React.useRef(null); 
  const meetRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleScrollToMeet = () => {
    if (meetRef.current) {
      meetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="main">
        <div className="grid sm:grid-cols-10 lg:grid-cols-12 items-center justify-center h-[88vh] gap-x-10 px-5 sm:px-10 lg:px-20 sm:gap-5">
          <div className="col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-5 lg:col-start-2 flex flex-col gap-2">
            <div>
              <h1 className="font-extrabold text-5xl">Empower your Business<br/> Journey with </h1>
              <TypewriterEffectSmooth words={words} />
              <TextGenerateEffectDemo />
            </div>

            <button
              onClick={handleScrollToMeet} // Scroll to Meet section on click
              className="bg-blue-500 text-white p-2 rounded-xl w-max hover:scale-110 hover:bg-black transition duration-300 ease-in-out shadow-md shadow-slate-800 mt-5"
            >
              Let's Talk
            </button>
          </div>

          <motion.div
            ref={ref}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.6 }}
            className='relative col-span-10 sm:col-start-1 sm:col-end-11 lg:col-span-4 lg:col-start-7 flex flex-col gap-5 rounded-lg'
          >
            <img src="/images/hero.webp" alt="Hero Image" />
          </motion.div>
        </div>
      </div>
      <Whoweare />
      <Vision />
      <Blog />
      <Choose />
      <Work />
      <Client />
      <Services />
      <TestimonialsList />
      <News />
      <Contact />
      <div ref={meetRef}>
        <Meet />
      </div>
    </div>
  );
};

export default Page;
