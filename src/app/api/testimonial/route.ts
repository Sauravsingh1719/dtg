import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/model/Testimonial';

export async function GET() {
  await dbConnect();
  try {
    const testimonial = await Testimonial.find();
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(request: any) {
  await dbConnect();
  try {
    const { name, review, designation } = await request.json();
    const newTestimonial = await Testimonial.create({ name, review, designation });
    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}