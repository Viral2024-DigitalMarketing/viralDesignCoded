import { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesCards from '@/components/services/ServicesCards';
import TransformationSystem from '@/components/services/TransformationSystem';
import TogetherWeMadeItHappen from "@/components/home/TogetherWeMadeItHappen";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
    title: 'Our Services | ViralBug Digital Marketing',
    description: 'Explore a wide range of digital marketing services designed to grow your business and boost your online presence.',
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