import { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesCards from '@/components/services/ServicesCards';
import TransformationSystem from '@/components/services/TransformationSystem';
import TogetherWeMadeItHappen from "@/components/home/TogetherWeMadeItHappen";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: 'Our Services | Digital Agency',
  description: 'Explore our comprehensive range of digital services designed to grow your business',
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