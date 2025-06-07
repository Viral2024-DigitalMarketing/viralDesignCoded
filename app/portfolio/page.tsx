import { Metadata } from 'next';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CaseStudies from '@/components/portfolio/CaseStudies';

export const metadata: Metadata = {
    title: 'Our Portfolio | ViralBug Digital Marketing',
    description: 'Explore our successful client case studies and projects that showcase our expertise in digital marketing and web development.',
};
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <CaseStudies />

    </>
  );
}