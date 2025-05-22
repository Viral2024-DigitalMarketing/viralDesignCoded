import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata: Metadata = {
  title: 'Blog | Digital Agency',
  description: 'Insights, trends, and tips on digital marketing and web development',
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}