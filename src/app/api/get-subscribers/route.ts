import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Subscriber from '@/model/Subscribers'; // Mongoose model for subscribers

export async function GET() {
  try {
    await dbConnect();
    
    const subscribers = await Subscriber.find({}, 'email'); // Only fetching the email field

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
