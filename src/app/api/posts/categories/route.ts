import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Posts from '@/model/Posts';

export async function GET() {
  await dbConnect();
  try {
    const categories = await Posts.distinct("category");
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
