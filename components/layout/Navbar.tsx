'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'SERVICES', href: '/services' },
        { label: 'BLOG', href: '/blog' },
        { label: 'PORTFOLIO', href: '/portfolio' },
        { label: 'CONTACT US', href: '/contact' },
    ];

    const isAlwaysBlackBg = pathname.startsWith('/blog/') || pathname.startsWith('/portfolio/');

    useEffect(() => {
        if (isAlwaysBlackBg) {
            setScrolled(true);
            return;
        }
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAlwaysBlackBg]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 flex justify-between items-center max-w-[1920px]">

                {/* Logo */}
                <div className="flex-none ml-2 sm:ml-3 md:ml-4 lg:ml-5 xl:ml-6 2xl:ml-8 w-[31px] h-[35px] relative">
                    <Link href="/" className="z-50 flex items-center">
                        <Image
                            src="/images/log.svg"
                            alt="Logo"
                            width={31}
                            height={35}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2 gap-[8px] mr-2 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-6 2xl:mr-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-[Sharp Grotesk] font-medium text-[16px] leading-[100%] tracking-[0] uppercase transition-colors hover:text-white/70 ${
                                pathname === link.href ? 'text-white' : 'text-white/80'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-[60] text-white flex-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                <AnimatedMobileMenu isOpen={isMenuOpen} links={navLinks} pathname={pathname} />
            </div>
        </header>
    );
}

function AnimatedMobileMenu({
                                isOpen,
                                links,
                                pathname,
                            }: {
    isOpen: boolean;
    links: { label: string; href: string }[];
    pathname: string;
}) {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 bg-black/95 z-[50] md:hidden transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{ height: '100vh' }}
            />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 z-[55] flex items-center justify-center md:hidden transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ height: '100vh' }}
            >
                <nav className="flex flex-col items-center justify-center space-y-8 px-4 w-full">
                    {links.map((link, i) => (
                        <div
                            key={link.href}
                            className={`transition-all duration-300 ${
                                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{
                                transitionDelay: isOpen ? `${i * 75}ms` : '0ms',
                            }}
                        >
                            <Link
                                href={link.href}
                                className={`text-3xl font-bold ${
                                    pathname === link.href ? 'text-white' : 'text-white/80'
                                } hover:text-white transition-colors`}
                            >
                                {link.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
}