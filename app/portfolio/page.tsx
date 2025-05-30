import { Metadata } from 'next';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CaseStudies from '@/components/portfolio/CaseStudies';

export const metadata: Metadata = {
  title: 'Portfolio | Digital Agency',
  description: 'Explore our successful client case studies and projects',
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <CaseStudies />

    </>
  );
}