// layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SplashScreen from '@/components/SplashScreen';
import ChatbaseEmbed from '@/components/ChatbaseEmbed'; // ✅ import your Chatbot

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Digital Agency | Empowering Your Business in the Digital Age',
    description: 'We help businesses transform their online presence with cutting-edge digital solutions',
    keywords: 'digital agency, web development, digital marketing, SEO, business growth',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {/*<SplashScreen />*/}
        <Navbar />
        <ChatbaseEmbed />
        <main>{children}</main>
        <Footer />
        <Toaster />

        </body>
        </html>
    );
}
