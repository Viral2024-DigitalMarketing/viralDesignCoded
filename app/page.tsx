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
    description: 'Get more leads, sales & growth with ViralBug – your trusted digital marketing agency. We help brands go viral and achieve results through SEO, ads & innovative strategies.',
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