import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SplashScreen from '@/components/SplashScreen';
import { Suspense, lazy } from 'react';

// ✅ Lazy load the chatbot to prevent blocking initial render
const Chatbot = lazy(() => import("@/components/Chatbot"));

const inter = Inter({
    subsets: ['latin'],
    display: 'swap', // ✅ Improves font loading performance
    preload: false   // ✅ Don't preload if not critical
});

export const metadata: Metadata = {
    title: 'ViralBug - Digital Marketing Agency | Transform Your Business Online',
    description: 'Transform your business with our digital agency services. We help brands go viral and achieve measurable results through innovative digital marketing strategies.',
    icons: {
        icon: 'logo.svg',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <meta name="description" content="Transform your business with our digital agency services." />
            {/* ✅ Preconnect to external font service */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {/* ✅ Load critical content first */}
        {/*<SplashScreen />*/}
        <Navbar />

        {/* ✅ Main content loads immediately */}
        <main>{children}</main>

        <Footer />

        {/* ✅ Load chatbot LAST with lazy loading and suspense */}
        <Suspense fallback={null}>
            <Chatbot />
        </Suspense>

        <Toaster />
        </body>
        </html>
    );
}