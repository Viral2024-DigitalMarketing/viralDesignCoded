'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface StrategyCardProps {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    index: number;
}

const StrategyCard = ({ title, paragraphs, imageSrc, index }: StrategyCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // Scroll handler for card animation
    useEffect(() => {
        const handleScroll = () => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const isInView =
                rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            setIsActive(isInView);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="px-4 sm:px-8 md:px-12 xl:px-16 2xl:px-20">
            <div
                ref={cardRef}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-2xl shadow-md p-3 sm:p-4 md:p-6 xl:p-8 2xl:p-10 transition-all duration-500"
                style={{
                    minHeight: '300px sm:360px md:400px xl:460px 2xl:500px',
                    opacity: isActive ? 1 : 0.6,
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                }}
            >
                <div className="w-full md:w-1/4 mb-4 sm:mb-5 md:mb-0">
                    <h3 className="font-bold uppercase text-black text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl tracking-tight leading-tight">
                        {title}
                    </h3>
                </div>

                <div className="w-full md:w-auto mx-0 md:mx-6 xl:mx-8 2xl:mx-10 mb-4 sm:mb-5 md:mb-0">
                    <div className="rounded-xl overflow-hidden shadow-md w-full md:w-[200px] xl:w-[300px] 2xl:w-[350px] h-[180px] sm:h-[200px] md:h-[360px] xl:h-[420px] 2xl:h-[460px]">
                        <Image
                            src={imageSrc || '/placeholder.svg'}
                            alt={title}
                            width={250}
                            height={380}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 xl:w-3/5 2xl:w-3/5">
                    <div className="space-y-3 sm:space-y-4 md:space-y-5 xl:space-y-6 2xl:space-y-7">
                        {paragraphs.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-black font-normal leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategyCard;