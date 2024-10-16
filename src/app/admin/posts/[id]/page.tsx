'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export default function PostDetail() {
  const [post, setPost] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const { id } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false); // To manage the Edit dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // To manage the Delete confirmation dialog

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setMessage(data.message);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        setIsDeleteOpen(false); // Close the delete confirmation dialog
        router.push('/admin/posts');
      } else {
        alert('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message, author }),
      });

      if (response.ok) {
        alert('Post updated successfully!');
        setIsEditOpen(false); // Close the dialog after saving
        setEditMode(false);
        router.push('/admin/posts');
      } else {
        alert('Error updating post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className='mx-[20%] py-10'>
      {post && (
        <>
          <h1 className='font-extrabold text-2xl'>{post.title}</h1>
          <p className='font-medium text-xl'>{post.message}</p>
          <p>By: {post.author}</p>
          <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>

          {/* Edit Button */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4" onClick={() => setIsEditOpen(true)}>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>Update the details of the post below.</DialogDescription>
              </DialogHeader>
              
              <form>
                <input
                  className='w-full p-2 my-2 border'
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
                <textarea
                  className='w-full p-2 my-2 border'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  required
                />
                <input
                  className='w-full p-2 my-2 border'
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author"
                  required
                />
              </form>

              <Button className="mt-4" onClick={handleSaveEdit}>Save Changes</Button>
              <DialogClose asChild>
                <Button variant="outline" className="mt-4">Cancel</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* Delete Button with Confirmation Dialog */}
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 mx-3" variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this post? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <Button className="mt-4 w-max" variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="mt-4 w-max">Cancel</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
