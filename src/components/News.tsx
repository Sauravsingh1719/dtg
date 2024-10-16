import React, { useState } from 'react';

const News = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/subscribe-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setMessage(result.message);
      setEmail(''); // Clear the email input
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[url(../../public/images/news.webp)] bg-cover bg-center bg-no-repeat my-10'>
      <div className='flex flex-row items-center justify-between h-full p-10 px-[20%] flex-wrap'>
        <div className='font-extrabold text-4xl text-white'>Sign up for Newsletter</div>
        <div className='flex flex-row gap-5 flex-wrap'>
          <input
            placeholder='Email Address'
            className='p-4 rounded-2xl shadow-sm shadow-gray-400 lg:w-96 sm:w-50'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className='px-8 py-4 bg-blue-500 rounded-3xl'
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {message && <p className="text-white mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default News;
