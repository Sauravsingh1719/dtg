import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Subscriber from '@/model/Subscribers'; // MongoDB model for storing subscriber emails

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request data (email from the form)
    const { email } = await req.json();

    // Connect to the database
    await dbConnect();

    // Check if email already exists in the database
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email is already subscribed!' }, { status: 400 });
    }

    // Create a new subscriber and save to MongoDB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Email content for the user
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Subscription Confirmation',
      text: `Thank you for subscribing to our newsletter! We are excited to share updates with you.`,
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Subscription successful and confirmation email sent!' }, { status: 201 });
  } catch (error) {
    console.error('Error handling subscription:', error);
    return NextResponse.json({ error: 'Failed to handle subscription' }, { status: 500 });
  }
}
