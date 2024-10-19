'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog"; 
import AddTestimonial from '../add-testimonial/page'; 
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ToastContainer';

export default function TestimonialList() {
  const { toast, toasts, removeToast } = useToast();
  const [testimonial, setTestimonial] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog open/close

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch('/api/testimonial');
        const data = await response.json();
        setTestimonial(data);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };

    fetchTestimonial();
  }, []);

  const handleTestimonialAdded = async () => {
    const response = await fetch('/api/testimonial');
    const data = await response.json();
    setTestimonial(data); // Update the testimonial list
    setIsOpen(false); // Close the dialog
  };

  return (
    <div>
      <p className='mb-5'>
        Engage with your customers! View, manage, and add reviews to gather valuable feedback and showcase testimonials that highlight your service excellence.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonial.map((testimonial: any) => (
          <Card key={testimonial._id}>
            <CardHeader>
              <CardTitle>{testimonial.review}</CardTitle>
              <CardDescription>By: {testimonial.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Designation: {testimonial.designation}</p>
            </CardContent>
            <CardFooter>
              <a href={`/admin/testimonial/${testimonial._id}`} className="text-blue-500 hover:underline">View Details</a>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className='my-5'>Add New</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new testimonial.
            </DialogDescription>
          </DialogHeader>
          <AddTestimonial onSuccess={handleTestimonialAdded} />
          <DialogClose asChild>
            <Button variant="outline" className="mt-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
