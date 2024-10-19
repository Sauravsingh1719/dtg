'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  Breadcrumba,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function PostDetail() {
  const [post, setPost] = useState<any>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => { 
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="w-full bg-[url('/images/blog-back.jpg')] bg-center bg-cover py-[6%] bg-no-repeat">
        <h1 className="text-8xl font-bold text-center text-white">Blogs</h1>
      </div>
      <div>
      <div className="relative overflow-hidden mx-auto">
        {/* Full-Width Background Image with Low Opacity */}
        <div className="absolute inset-0 w-full h-full bg-[url('/images/vision.webp')] bg-cover bg-center opacity-20"></div>
        {/* Content Container */}
        <div className="relative z-10 container mx-auto"></div>

        <div className='px-[15%] py-10'>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Breadcrumba href="/">Home</Breadcrumba>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Breadcrumba href="/posts">Blogs</Breadcrumba>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {post ? (
                    <BreadcrumbPage>{post.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbPage>Loading...</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {post && (
            <div>
              <h1 className='font-bold text-4xl text-black py-5'>{post.title}</h1>
              <hr />
              <p className='font-medium text-black text-lg py-5'>{post.message}</p>
              <p className='py-2'>By: {post.author}</p>
              <p>Created at: {formatDate(post.createdAt)}</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
