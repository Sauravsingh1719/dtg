"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import AddPost from '@/components/AddPost';


type PostType = {
  _id: string;
  title: string;
  message: string;
  author: string;
  category: string;
  createdAt: string;
};

export default function PostsList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchPosts = async (category = '') => {
    try {
      const response = await fetch(`/api/posts?category=${category}`);
      const data: PostType[] = await response.json(); // Specify the expected type here
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
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
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchPosts(category);
  };

  const handlePostSuccess = () => {
    fetchPosts(selectedCategory);
  };

  return (
    <div>
      {/* Category Buttons */}
      <div className="my-5">
        <Button onClick={() => handleCategoryClick('')}>All</Button>
        {categories.map((category, index) => (
          <Button key={index} onClick={() => handleCategoryClick(category)} className='mx-3'>{category}</Button>
        ))}
      </div>

      {/* Add New Post Button */}
      <div className="my-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <AddPost onSuccess={handlePostSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Display Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded-md shadow-md">
            <h2>{post.title}</h2>
            <p>{post.message.length > 50 ? `${post.message.slice(0, 50)}...` : post.message}</p>
            <Link href={`/admin/posts/${post._id}`}>View Post</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
