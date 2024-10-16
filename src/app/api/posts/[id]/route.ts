// app/api/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Posts from '@/model/Posts';

export async function GET(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const post = await Posts.findById(params.id);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const { title, message, author } = await request.json();
    const postToUpdate = await Posts.findById(params.id);

    if (!postToUpdate) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    postToUpdate.title = title;
    postToUpdate.message = message;
    postToUpdate.author = author;

    await postToUpdate.save();

    return NextResponse.json(postToUpdate);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: any, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const postToDelete = await Posts.findById(params.id);

    if (!postToDelete) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    await postToDelete.deleteOne();
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
