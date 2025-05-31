import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import VisibilityToConversion from '@/components/home/VisibilityToConversion';
import FromHelloToResults from '@/components/home/ProcessSection';
import TogetherWeMadeItHappen from '@/components/home/TogetherWeMadeItHappen';
import CTASection from '@/components/home/CTASection';
import JoinOurTeamSection from '@/components/home/JoinOurTeamSection';
import PartnersSection from "@/components/home/TogetherWeMadeItHappen";
import ProcessSection from "@/components/home/ProcessSection";

export const metadata: Metadata = {
  title: 'Digital Agency | Home',
  description: 'Transform your business with our digital agency services',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <VisibilityToConversion />
      <ProcessSection />
        <TogetherWeMadeItHappen />
      <CTASection />
      <JoinOurTeamSection />
    </>
  );
}