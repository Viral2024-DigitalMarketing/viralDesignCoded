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
    title: 'ViralBug | Digital Marketing Agency for Business Growth',
    description: 'Top digital marketing agency in Hyderabad—boost your brand with expert SEO, paid ads, and social media strategies. Get results with ViralBug.',
    icons: {
        icon: '/images/log.svg',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
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