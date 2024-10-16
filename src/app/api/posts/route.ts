import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Posts from '@/model/Posts';

export async function GET(request: any) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category"); 
    const filter = category ? { category } : {};
    const posts = await Posts.find(filter);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(request: any) {
  await dbConnect();
  try {
    const { title, message, author, category, createdAt } = await request.json();
    const newPost = await Posts.create({ title, message, author, category, createdAt });
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
