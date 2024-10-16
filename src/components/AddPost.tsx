// AddPost.tsx
"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type AddPostProps = {
  onSuccess: () => void;
};

export default function AddPost({ onSuccess }: AddPostProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

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
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();
    const finalCategory = newCategory ? newCategory : category;

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message, author, createdAt, category: finalCategory }),
      });

      if (response.ok) {
        alert('Post added successfully!');
        onSuccess();
      } else {
        alert('Error adding post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required className='text-black my-3' />
      <Textarea placeholder="Write your message here..." value={message} onChange={(e) => setMessage(e.target.value)} required className='text-black my-3' />
      <Input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} required className='text-black my-3' />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)} className='text-black my-3'>
        <option value="" disabled>Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
        <option value="new">Add New Category</option>
      </select>

      {category === "new" && (
        <Input type="text" placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className='text-black my-3' />
      )}

      <Button type="submit">Add Post</Button>
    </form>
  );
}
