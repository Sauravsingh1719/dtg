'use client';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastContainer } from '@/components/ToastContainer';

interface AddTestimonialProps {
  onSuccess: () => void; // Callback for successful submission
}

export default function AddTestimonial({ onSuccess }: AddTestimonialProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, review, designation }),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your review has been added successfully.',
          type: 'success',
        });
        onSuccess();
      } else {
        toast({
          title: 'Error!',
          description: 'Error in submitting review.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error!',
        description: 'An unexpected error occurred.',
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        className='text-black my-2'
      />
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='text-black my-2'
      />
      <Input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        required
        className='text-black my-2'
      />
      <Button type="submit" className='my-3'>Add Testimonial</Button>
    </form>
  );
}
