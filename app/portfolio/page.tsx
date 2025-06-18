import { Metadata } from 'next';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CaseStudies from '@/components/portfolio/CaseStudies';

export const metadata: Metadata = {
    title: 'Our Portfolio | ViralBug Digital Marketing',
    description: 'See how we helped brands grow online—explore real client success stories in SEO, ads & content. ViralBug\'s portfolio proves the results.',
};
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <CaseStudies />

    </>
  );
}