'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


// Define the type for a single post
interface Post {
  _id: string;
  title: string;
  author: string;
  message: string;
  createdAt: string; // Assuming this is in ISO format
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type for posts

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

  const formatDate = (dateString: string) => { // Specify the type for dateString
    const options: Intl.DateTimeFormatOptions = { // Specify the type for options
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateMessage = (message: string) => { // Specify the type for message
    return message.length > 50 ? message.slice(0, 50) + '...' : message;
  };

  const shortMessage = (message: string) => { // Specify the type for message
    return message.length > 300 ? message.slice(0, 300) + '...' : message;
  };

  return (
    <div className='lg:px-[20%] sm:px-[10%]'>
      <div className='flex flex-col gap-5 items-center justify-center'>
        <h1 className='font-extrabold text-5xl text-black'>Our Blogs</h1>
        <h2 className='font-medium text-2xl'>Explore Expert Insights, In-Depth Case Studies, and Thoughtful Reflections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.length > 0 && (
            <>
              {/* First blog card taking full width */}
              <div className="md:col-span-2">
                <Card className="shadow-lg shadow-gray-300 rounded-xl">
                  <CardHeader>
                    <CardTitle>{posts[0].title}</CardTitle>
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
                        <Link href={`/posts/${posts[0]._id}`} key={posts[0]._id}>Read more</Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Second blog card */}
              <Card className="shadow-lg shadow-gray-300 rounded-xl">
                <CardHeader>
                  <CardTitle>{posts[1].title}</CardTitle>
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
                      <Link href={`/posts/${posts[1]._id}`} key={posts[1]._id}>Read more</Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Third blog card */}
              <Card className="shadow-lg shadow-gray-300 rounded-xl">
                <CardHeader>
                  <CardTitle>{posts[2].title}</CardTitle>
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
                      <Link href={`/posts/${posts[2]._id}`} key={posts[2]._id}>Read more</Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
        <Link href='/posts'><button className="bg-blue-500 text-white p-2 rounded-xl w-max hover:scale-110 hover:bg-black transition duration-300 ease-in-out shadow-md shadow-slate-800 mt-5">View more</button></Link>
      </div>
    </div>
  );
};

export default Blog;
