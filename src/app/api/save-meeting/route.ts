import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';  
import Meeting from '@/model/Meeting';

export async function POST(req: Request) {
  try {
    await dbConnect(); 
    
    const { firstName, lastName, workMail, phoneNumber, companyName } = await req.json(); // Parse JSON from request body

    
    const newMeeting = new Meeting({
      firstName,
      lastName,
      workMail,
      phoneNumber,
      companyName,
    });

    
    await newMeeting.save();

    return NextResponse.json({ message: 'Meeting request saved successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error saving meeting request:', error);
    return NextResponse.json({ error: 'Failed to save meeting request' }, { status: 500 });
  }
}
