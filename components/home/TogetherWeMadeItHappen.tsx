"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

const TogetherWeMadeItHappen: React.FC = () => {
    const [isWhiteBackground] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const partnerImages = [
        { default: "/images/deca-nor.svg", color: "/images/deca-color.webp" },
        { default: "/images/sri-nor.svg", color: "/images/sri-col.svg" },
        { default: "/images/lyf-nor.svg", color: "/images/lyf-col.svg" },
        { default: "/images/jun-nor.svg", color: "/images/jun-col.svg" },
        { default: "/images/sv-nor.svg", color: "/images/pro-col.svg" },
        { default: "/images/sp-nor.svg", color: "/images/spi-col.svg" },
        { default: "/images/arya-nor.svg", color: "/images/arya-col.svg" },
        { default: "/images/roast-nor.svg", color: "/images/roast-col.svg" },
        { default: "/images/neha-nor.svg", color: "/images/neha-col.svg" },
        { default: "/images/mile-nor.svg", color: "/images/mil-col.svg" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setTimeout(() => setShowLine(true), 600);
                    setTimeout(() => setShowImages(true), 1000);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Helper function to determine if image should be larger on mobile
    const isLargerOnMobile = (index: number) => {
        return [5, 6, 8, 9].includes(index); // 6th, 7th, 9th, 10th (0-indexed)
    };

    // Helper function to determine if image should be even larger on desktop (lg+)
    const isExtraLargeOnDesktop = (index: number) => {
        return [6, 9].includes(index); // 7th and 10th (0-indexed)
    };

    return (
        <div
            ref={sectionRef}
            className="flex items-center justify-center relative w-full py-8 xs:py-10 sm:py-12 px-4 lg:px-20"
            style={{
                minHeight: "auto",
                overflow: "hidden",
                backgroundColor: isWhiteBackground ? "#FFFFFF" : "#000000",
            }}
        >
            <div className="container mx-auto px-0 max-w-screen-2xl">
                {/* Mobile Layout (below md) */}
                <div className="block md:hidden">
                    <div className="relative flex flex-col">
                        {/* Title and Description Container */}
                        <div className="relative w-full mb-4 xs:mb-6 sm:mb-8">
                            {/* Title */}
                            <div
                                className={`w-full transition-all duration-800 ease-out ${
                                    isVisible
                                        ? 'transform translate-y-0 opacity-100'
                                        : 'transform translate-y-12 opacity-0'
                                }`}
                            >
                                <h2
                                    className="font-helvetica font-bold text-[1.125rem] xs:text-[1.25rem] sm:text-[1.5rem] tracking-tight leading-[1.2] text-left"
                                    style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                                >
                                    <span className="block">Together,</span>
                                    <span className="block whitespace-nowrap">We've Made It Happen</span>
                                </h2>
                            </div>

                            {/* Description - positioned at the level of "Happen" and aligned right */}
                            <div
                                className={`absolute top-[1.6rem] xs:top-[1.55rem] sm:top-[1.8rem] w-[50%] transition-all duration-800 delay-300 ease-out ${
                                    isVisible
                                        ? 'transform translate-y-0 opacity-100'
                                        : 'transform translate-y-8 opacity-0'
                                }`}
                                style={{ right: '-60px' }}
                            >
                                <div
                                    className="font-helvetica text-left text-[0.43rem] xs:text-[0.4rem] sm:text-[0.4rem] leading-tight"
                                    style={{
                                        color: isWhiteBackground ? "#000000" : "#FFFFFF",
                                    }}
                                >
                                    <span className="block">From bold ideas to measurable impact,</span>
                                    <span className="block">these are the brands we've</span>
                                    <span className="block">partnered with to turn vision into reality.</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`transition-all duration-1000 mt-[-40px] ease-out mb-4 xs:mb-6 sm:mb-8 ${
                                showLine ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                            }`}
                            style={{
                                height: "1px",
                                background: isWhiteBackground
                                    ? "linear-gradient(to right, transparent, #999999, #666666, #000000)"
                                    : "linear-gradient(to right, transparent, #A7A7A7, #666666, #FFFFFF)",
                                width: "100%",
                                transformOrigin: "left center",
                            }}
                        />
                    </div>

                    <div className="h-6 xs:h-8 sm:h-10"></div>
                </div>

                {/* Desktop Layout (md and above) */}
                <div className="hidden md:block">
                    <div
                        className="flex flex-row items-start justify-between mb-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20"
                    >
                        <div
                            className={`w-2/3 transition-all duration-800 ease-out ${
                                isVisible
                                    ? 'transform translate-y-0 opacity-100'
                                    : 'transform translate-y-16 opacity-0'
                            }`}
                        >
                            <h2
                                className="font-helvetica font-bold text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.5rem] 3xl:text-[6rem] tracking-tight leading-[1.1] md:leading-[1.05] lg:leading-[1.05] xl:leading-[1.05] 2xl:leading-[1.05] 3xl:leading-[1.05]"
                                style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                            >
                                <span className="block mb-0 md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1 3xl:mb-2">Together,</span>
                                <div
                                    className={`transition-all duration-1000 ease-out mb-2 ${
                                        showLine ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                    }`}
                                    style={{
                                        height: "2px",
                                        background: isWhiteBackground
                                            ? "linear-gradient(to right, transparent, #999999, #666666, #000000)"
                                            : "linear-gradient(to right, transparent, #A7A7A7, #666666, #FFFFFF)",
                                        width: "150%",
                                        transformOrigin: "left center",
                                    }}
                                />
                                <span className="block">We've Made It Happen</span>
                            </h2>
                        </div>
                        <div
                            className={`w-1/3 mt-28 md:ml-auto lg:ml-auto xl:ml-auto md:w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/5 3xl:w-1/5 transition-all duration-800 delay-200 ease-out ${
                                isVisible
                                    ? 'transform translate-y-0 opacity-100'
                                    : 'transform translate-y-12 opacity-0'
                            }`}
                        >
                            <p
                                className="font-helvetica text-[12px] md:text-[13px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] 3xl:text-[19px] leading-relaxed text-left"
                                style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                            >
                                From bold ideas to measurable impact, these are the brands we've partnered with
                                to turn vision into reality.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Partner Images Grid */}
                <div
                    className="grid grid-cols-5 gap-x-1 xs:gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 gap-y-6 xs:gap-y-8 sm:gap-y-10 md:gap-y-8 lg:gap-y-10 xl:gap-y-12 2xl:gap-y-14 mt-4 xs:mt-6 sm:mt-8 md:mt-6 lg:mt-8"
                >
                    {partnerImages.map((image, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-center relative group bg-transparent cursor-pointer ${
                                isLargerOnMobile(index) ? 'md:transform-none md:scale-100' : ''
                            }`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '2.5 / 1',
                                transitionDelay: `${index * 100}ms`,
                                transform: isExtraLargeOnDesktop(index)
                                    ? 'scale(1.5)'
                                    : isLargerOnMobile(index)
                                        ? 'scale(1.3)'
                                        : 'scale(1)',
                                transformOrigin: 'center',
                                zIndex: isLargerOnMobile(index) || isExtraLargeOnDesktop(index) ? 100 : 50,
                            }}
                        >
                            {/* Container for both images with proper positioning */}
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                {/* Default image - visible by default on desktop, hidden on mobile */}
                                <img
                                    src={image.default || "/placeholder.svg"}
                                    alt={`Partner ${index + 1} default`}
                                    className={`absolute w-full h-full max-w-[90%] max-h-[90%] object-contain transition-all duration-300 ease-in-out ${
                                        showImages
                                            ? 'hidden md:block md:opacity-100 md:group-hover:opacity-0 md:group-hover:scale-105'
                                            : 'opacity-0'
                                    }`}
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 60
                                    }}
                                />

                                {/* Color image - visible on mobile, hidden by default on desktop but shows on hover */}
                                <img
                                    src={image.color || "/placeholder_color.svg"}
                                    alt={`Partner ${index + 1} color`}
                                    className={`absolute w-full h-full max-w-[90%] max-h-[90%] object-contain transition-all duration-300 ease-in-out ${
                                        showImages
                                            ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-105'
                                            : 'opacity-0'
                                    }`}
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 80
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TogetherWeMadeItHappen;
