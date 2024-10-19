'use client';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  _id: string;
  title: string;
  author: string;
  message: string;
  createdAt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); // Adjust the API endpoint as needed
        const data = await response.json();
        setPosts(data.slice(0, 3)); // Get the latest 3 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateMessage = (message: string) => {
    return message.length > 50 ? message.slice(0, 50) + '...' : message;
  };

  const shortMessage = (message: string) => {
    return message.length > 300 ? message.slice(0, 300) + '...' : message;
  };

  return (
    <div className=' md:px-[10%]  items-center justify-center h-100 my-20 gap-10 px-5 sm:px-10 lg:px-[20%]'>
      <div className='flex flex-col gap-5 items-center justify-center'>
        <h1 className='font-extrabold text-5xl text-black'>Our Blogs</h1>
        <h2 className='font-medium text-2xl'>Explore Expert Insights, In-Depth Case Studies, and Thoughtful Reflections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.length > 0 && (
            <>
              {/* First blog card taking full width */}
              <div className="md:col-span-2 relative flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 p-6 overflow-hidden hover:scale-105 hover:bg-cyan-100 transition duration-300 ease-in-out">
                <div className='absolute inset-0 bg-[url(../../public/images/vision.webp)] bg-cover bg-center opacity-10'></div>
                <div className='relative z-10'>
                  <Card className="bg-transparent rounded-xl">
                    <CardHeader>
                      <CardTitle className="font-semibold text-2xl">{posts[0].title}</CardTitle>
                      <CardDescription>{posts[0].author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{shortMessage(posts[0].message)}</p>
                    </CardContent>
                    <CardFooter>
                      <div className='flex flex-col gap-3'>
                        <div>
                          <p>{formatDate(posts[0].createdAt)}</p>
                        </div>
                        <div>
                          <a href={`/posts/${posts[0]._id}`} key={posts[0]._id}>Read more</a>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Second blog card */}
              <div className="relative flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 p-6 overflow-hidden hover:scale-105 hover:bg-cyan-100 transition duration-300 ease-in-out">
                <div className='absolute inset-0 bg-[url(../../public/images/vision.webp)] bg-cover bg-center opacity-10'></div>
                <div className='relative z-10'>
                  <Card className="bg-transparent rounded-xl">
                    <CardHeader>
                      <CardTitle className="font-semibold text-2xl">{posts[1].title}</CardTitle>
                      <CardDescription>{posts[1].author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{truncateMessage(posts[1].message)}</p>
                    </CardContent>
                    <CardFooter>
                      <div className='flex flex-col gap-3'>
                        <div>
                          <p>{formatDate(posts[1].createdAt)}</p>
                        </div>
                        <div>
                          <a href={`/posts/${posts[1]._id}`} key={posts[1]._id}>Read more</a>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Third blog card */}
              <div className="relative flex flex-col gap-5 rounded-lg shadow-xl shadow-gray-400 p-6 overflow-hidden hover:scale-105 hover:bg-cyan-100 transition duration-300 ease-in-out">
                <div className='absolute inset-0 bg-[url(../../public/images/vision.webp)] bg-cover bg-center opacity-10'></div>
                <div className='relative z-10'>
                  <Card className="bg-transparent rounded-xl">
                    <CardHeader>
                      <CardTitle className="font-semibold text-2xl">{posts[2].title}</CardTitle>
                      <CardDescription>{posts[2].author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{truncateMessage(posts[2].message)}</p>
                    </CardContent>
                    <CardFooter>
                      <div className='flex flex-col gap-3'>
                        <div>
                          <p>{formatDate(posts[2].createdAt)}</p>
                        </div>
                        <div>
                          <a href={`/posts/${posts[2]._id}`} key={posts[2]._id}>Read more</a>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
        <a href='/posts'>
          <button className="bg-blue-500 text-white p-2 rounded-xl w-max hover:scale-110 hover:bg-black transition duration-300 ease-in-out shadow-md shadow-slate-800 mt-5">
            View more
          </button>
        </a>
      </div>
    </div>
  );
};

export default Blog;
