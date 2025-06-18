import { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesCards from '@/components/services/ServicesCards';
import TransformationSystem from '@/components/services/TransformationSystem';
import TogetherWeMadeItHappen from "@/components/home/TogetherWeMadeItHappen";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
    title: 'Our Services | ViralBug Digital Marketing',
    description: 'Explore SEO, PPC, content & social media marketing services in Hyderabad. ViralBug Digital helps brands grow with data-driven digital strategies',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesCards />
      <TransformationSystem />
        <TogetherWeMadeItHappen />
        <CTASection />

    </>
  );
}