import React from 'react';
import Card from './Cards';
const Services = () => {
  // Sample JSON data for the services
  const servicesData = [
    {
      image: '/images/onec.webp',
      title: 'Data Collection and Preparation',
      description: 'Seamlessly integrate data from various sources into a unified database, ensuring accuracy through rigorous cleaning and validation.',
    },
    {
      image: '/images/cc.webp',
      title: 'Business Insights and Reporting',
      description: 'Evaluate business performance through key performance indicators (KPIs), and provide regular and real-time reports tailored to your needs.',
    },
    {
      image: '/images/ccc.webp',
      title: 'Customer and Product Analysis',
      description: 'Segment customers based on behavior and demographics, analyze retention patterns, and assess product performance to optimize strategies.',
    },
    {
      image: '/images/cccc.webp',
      title: 'Data Analysis',
      description: 'Utilize descriptive, predictive, and prescriptive analytics to derive insights and forecast trends from historical and real-time data.',
    },
    {
      image: '/images/ccccc.webp',
      title: 'Strategic Consulting',
      description: 'Develop data-driven strategies, optimize business processes, and provide training and ongoing support to maximize the use of analytics tools.',
    },
    {
      image: '/images/ccccc.webp',
      title: 'Dashboard Creation & Maintenance',
      description: 'Design and maintain custom dashboards that provide interactive visualizations and real-time updates of critical metrics.',
    },
  ];

  return (
    <div className='flex flex-col items-center justify-center gap-10 mt-20 px-[20%] my-20'>
      <div>
        <h1 className='font-semibold text-xl text-orange-400'>Our Services</h1>
      </div>
      <div>
        <h1 className='font-extrabold text-5xl text-black'>We Provide Best Services</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
        {servicesData.map((service, index) => (
          <Card
            key={index}
            image={service.image}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Services;
