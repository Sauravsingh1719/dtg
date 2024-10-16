import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/model/Testimonial';

export async function GET(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const testimonials = await Testimonial.findById(params.id);

    if (!testimonials) {
      return NextResponse.json({ message: 'testimonials not found' }, { status: 404 });
    }

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { title, message, author } = await request.json();
    const testimonialsToUpdate = await Testimonial.findById(params.id);

    if (!testimonialsToUpdate) {
      return NextResponse.json({ message: 'testimonials not found' }, { status: 404 });
    }

    testimonialsToUpdate.title = title;
    testimonialsToUpdate.message = message;
    testimonialsToUpdate.author = author;

    await testimonialsToUpdate.save();

    return NextResponse.json(testimonialsToUpdate);
  } catch (error) {
    console.error('Error updating testimonials:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const testimonialsToDelete = await Testimonial.findById(params.id);

    if (!testimonialsToDelete) {
      return NextResponse.json({ message: 'testimonials not found' }, { status: 404 });
    }

    await testimonialsToDelete.deleteOne();
    return NextResponse.json({ message: 'testimonials deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonials:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
