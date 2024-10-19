'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { WobbleCard } from '@/components/ui/bobble-card';
import { Button } from '@/components/ui/button';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts${selectedCategory ? `?category=${selectedCategory}` : ''}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/posts/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchPosts();
  }, [selectedCategory]);

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="w-full bg-[url('/images/blog-back.jpg')] bg-center bg-cover py-[6%] bg-no-repeat">
        <h1 className="text-8xl font-bold text-center text-white">Blogs</h1>
      </div>
      <div className='mx-[15%]'>
      <div className="relative overflow-hidden ">
        {/* Full-Width Background Image with Low Opacity */}
        <div className="absolute inset-0 w-full h-full bg-[url('/images/vision.webp')] bg-cover bg-center opacity-20"></div>
        {/* Content Container */}
        <div className="relative z-10 container ">
          <div className="py-10 flex flex-col gap-5">
            <h1 className="font-extrabold text-5xl">Welcome to Our Knowledge Hub</h1>
            <hr className="border-gray-300" />
            <h3 className="font-bold text-2xl">
              Explore Expert Insights, In-Depth Case Studies, and Thoughtful Reflections
            </h3>
            <p className="text-lg">
              At Data to Grow, we believe in the power of knowledge and sharing insights that inspire innovation. Whether it's a deep dive into real-world case studies, reflections on industry trends, or a spark of an idea, our blog is a place where thoughts turn into action.
              
              Explore posts from our team, designed to give you fresh perspectives, innovative ideas, and practical insights you can use. From in-depth research and case studies to casual thought pieces, each post is crafted to inform, engage, and challenge the status quo.
              Whether you're looking for expert advice, real-world examples, or just a thought to ponder over coffee, our collection of blogs is here for you.
            </p>
          </div>
          {/* Category Buttons */}
          <div className="my-5">
            <Button onClick={() => handleCategoryClick('')}>All</Button>
            {categories.map((category, index) => (
              <Button key={index} onClick={() => handleCategoryClick(category)} className="mx-3">
                {category}
              </Button>
            ))}
          </div>

          {/* Centered Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 my-10 mx-auto">
            {posts.map((post: any) => (
              <a href={`/posts/${post._id}`} key={post._id}>
                <WobbleCard
                  containerClassName="h-full bg-gray-900 text-white p-6 rounded-xl shadow-lg"
                  className="relative shadow-md shadow-gray-400"
                >
                  <div className="flex flex-col justify-between h-full">
                    {/* Post Title */}
                    <h2 className="text-4xl font-semibold mb-2">{post.title}</h2>

                    {/* Post Excerpt */}
                    <p className="mb-4 text-xl">{truncateMessage(post.message)}</p>

                    {/* Post Metadata */}
                    <div className="text-sm">
                      <p>By: {post.author}</p>
                      <p>Created at: {formatDate(post.createdAt)}</p>
                    </div>
                  </div>

                  {/* Optional Image for Aesthetic */}
                  <Image
                    src="/images/dtg.webp" // Replace with any relevant image source or post-specific image if available
                    width={400}
                    height={400}
                    alt="Post Image"
                    className="absolute right-4 bottom-4 object-cover rounded-xl opacity-50"
                  />
                </WobbleCard>
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
