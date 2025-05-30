import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug);

  return {
    title: post ? `${post.title} | Digital Agency Blog` : 'Blog Post | Digital Agency',
    description: post?.excerpt || 'Read our latest blog post on digital marketing and web development',
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(post => post.slug === params.slug);

  if (!post) {
    return (
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-black">Post not found</h1>
          <Link href="/blog" className="mt-4 inline-flex items-center text-black hover:text-black/80 transition">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
    );
  }

  return (
      <div className="pb-20 bg-white w-full overflow-hidden">
        <div className="w-full pt-28 pb-12">
          <div className="container mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center text-black/80 hover:text-black transition mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Heading and description at the top - aligned left */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">{post.title}</h1>
              <p className="text-xl text-black/80 mb-2">{post.excerpt}</p>
              <p className="text-black/70">{post.date}</p>
            </div>
          </div>

          {/* First description image - Full width with optimizations */}
          <div className="w-full relative mb-12 overflow-hidden">
            <div className="w-screen max-w-[100vw] bg-gray-100 min-h-[400px] md:min-h-[600px] flex items-center justify-center">
              <Image
                  src={post.descImage1 || "https://images.unsplash.com/photo-1516321310768-61d7c7b85f0b?auto=format&fit=crop&w=1920&q=80"}
                  alt={`${post.title} - Description Image 1`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover transition-opacity duration-300"
                  priority={true}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="100vw"
                  quality={85}
                  loading="eager"
              />
            </div>
          </div>

          <div className="container mx-auto px-4">
            {/* Introduction Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Introduction:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[0] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Strategy Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Strategy:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[1] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Implementation Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Implementation:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[2] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>
          </div>

          {/* Second description image - Full width with optimizations */}
          <div className="w-full relative mb-12 overflow-hidden">
            <div className="w-screen max-w-[100vw] bg-gray-100 min-h-[400px] md:min-h-[600px] flex items-center justify-center">
              <Image
                  src={post.descImage2 || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1920&q=80"}
                  alt={`${post.title} - Description Image 2`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover transition-opacity duration-300"
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="100vw"
                  quality={85}
                  loading="lazy"
              />
            </div>
          </div>

          <div className="container mx-auto px-4">
            {/* Results Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Results:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[3] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Analysis Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Analysis:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[4] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Conclusion Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-6">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Conclusion:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[5] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-white shadow-lg rounded-2xl mb-12">
              <div className="p-6 flex flex-col md:flex-row md:items-start">
                <h3 className="font-bold text-2xl text-black mb-4 md:mb-0 md:w-1/4">
                  Next Steps:
                </h3>
                <p className="text-lg text-black md:w-3/4">
                  {post.content[6] || "A leading tech hub, Hyderabad emphasizes digital marketing. Agencies deliver data-driven, regional-focused strategies with global reach."}
                </p>
              </div>
            </div>

            {/* Remaining content */}
            {post.content.length > 7 && (
                <article className="bg-white p-8 rounded-2xl shadow-lg mb-12">
                  <div className="prose prose-lg max-w-none">
                    {post.content.slice(7).map((paragraph, i) => (
                        <p key={i} className="mb-6">{paragraph}</p>
                    ))}
                  </div>
                </article>
            )}
          </div>
        </div>
      </div>
  );
}