import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SplashScreen from '@/components/SplashScreen';
import { Suspense, lazy } from 'react';

const Chatbot = lazy(() => import("@/components/Chatbot"));

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: false
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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
                {/* Optional Splash screen */}
                {/* <SplashScreen /> */}

                <Navbar />

                <main className="flex-grow">
                    {children}
                </main>

                <Footer />

                <Suspense fallback={null}>
                    <Chatbot />
                </Suspense>

                <Toaster />
            </body>
        </html>
    );
}
