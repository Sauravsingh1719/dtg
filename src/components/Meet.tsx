"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"; 
import { ToastContainer } from "@/components/ToastContainer";
import { z } from "zod";
import { formSchema } from '@/schemas/Schemas'; 
import countries from '@/json/Countries.json';
import Loading from '@/components/loading';

const Meet = () => {
  const { toast, toasts, removeToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      workMail: '',
      phoneNumber: '',
      companyName: '',
      jobTitle: '',
      industry: '',
      country: '',
      howDidYouHear: '',
      message: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Form Data: ", data);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to send request');
      }
      const saveResponse = await fetch('/api/save-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!saveResponse.ok) throw new Error('Failed to save meeting request');

      toast({
        title: 'Success!',
        description: 'Your meeting request has been sent successfully.',
        type: 'success',
      });
      form.reset();
    } catch (error) {
      const errorToast = {
        title: 'Error!',
        description: 'There was an error sending your request. Please try again.',
        type: 'error',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-[20%] my-20'>
      <div className='grid grid-cols-12'>
        {/* Left Side Div */}
        <div className='col-span-12 sm:col-span-5 flex flex-col gap-5'>
          <h1 className='font-extrabold text-black text-5xl '>Transform Data into Success</h1>
          <h3 className='font-bold text-black text-3xl'>Book a meeting</h3>
          <h5 className='text-black text-xl'>Let’s discuss how Data driven insight can help to grow your business</h5>
          <div className='flex flex-row items-center gap-2'>
            <p className='font-bold text-black text-xl'>⦿</p>
            <h1>Discover how our data analytics solutions tackle strategic business challenges</h1>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <p className='font-bold text-black text-xl'>⦿</p>
            <h1>Get expert advice on enhancing your business strategy using data-driven insights.</h1>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <p className='font-bold text-black text-xl'>⦿</p>
            <h1>Explore our comprehensive Data Analytics platform designed to transform your raw data into powerful insights for sustainable growth</h1>
          </div>
        </div>
        
        {/* Right Side Form Div */}
        <div className='col-span-12 sm:col-span-5 flex flex-col gap-2'>
          {loading ? (
            <Loading /> // Show loading component inside the form area when loading
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Use flex-col on small screens and grid on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="workMail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="example@company.com" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Job Title" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Industry" {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country <span className='text-red-700 text-xl'>*</span></FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                              <option key={country.country} value={country.country}>
                                {country.country}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="howDidYouHear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about us?</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input placeholder="Your message" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
                    type="submit"
                  >
                    Book a Meeting
                  </button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Meet;
