'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ToastContainer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export default function TestimonialDetail() {
  const { toast, toasts, removeToast } = useToast();
  const [testimonial, setTestimonial] = useState<any>(null);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [designation, setDesignation] = useState('');
  const router = useRouter();
  const { id } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false);  // For Edit dialog
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);  // For Delete confirmation dialog

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/testimonial/${id}`);
        const data = await response.json();
        setTestimonial(data);
        // Initialize state with fetched data
        setName(data.name || '');
        setReview(data.review || '');
        setDesignation(data.designation || '');
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Deleted Successfully',
          type: 'success',
        });
        setIsDeleteOpen(false); // Close the delete dialog
        router.push('/admin/testimonial');
      } else {
        toast({
          title: 'Error!',
          description: 'Error deleting review',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/testimonial/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, review, designation }),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Testimonial updated successfully!',
          type: 'success',
        });
        setIsEditOpen(false); // Close the edit dialog
        router.push('/admin/testimonial');
      } else {
        toast({
          title: 'Error!',
          description: 'Error updating review',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  return (
    <div>
      <div className='px-[20%] py-10'>
        {testimonial && (
          <>
            <h1>{testimonial.name}</h1>
            <p>{testimonial.review}</p>
            <p>Designation: {testimonial.designation}</p>

            {/* Edit Button with Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsEditOpen(true)} className="mt-4 mr-3">Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Testimonial</DialogTitle>
                  <DialogDescription>Update the details of this testimonial below.</DialogDescription>
                </DialogHeader>
                <form>
                  <input
                    className="w-full p-2 my-2 border"
                    type="text"
                    value={name}  // Controlled input, bound to state
                    onChange={(e) => setName(e.target.value)}  // Update state on change
                    placeholder="Name"
                    required
                  />
                  <textarea
                    className="w-full p-2 my-2 border"
                    value={review}  // Controlled textarea, bound to state
                    onChange={(e) => setReview(e.target.value)}  // Update state on change
                    placeholder="Review"
                    required
                  />
                  <input
                    className="w-full p-2 my-2 border"
                    type="text"
                    value={designation}  // Controlled input, bound to state
                    onChange={(e) => setDesignation(e.target.value)}  // Update state on change
                    placeholder="Designation"
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
                <Button variant="destructive" className="mt-4">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this testimonial? This action cannot be undone.
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
