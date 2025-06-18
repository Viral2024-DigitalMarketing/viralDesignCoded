import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata: Metadata = {
  title: 'Blog | ViralBug Digital Marketing',
    description: 'Read our expert blog on SEO, paid ads, social media & content tips. Stay ahead in digital marketing with ViralBug Digital’s latest updates.'

};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}