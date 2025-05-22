"use client";

import type React from "react";
import { useState } from "react";

const TogetherWeMadeItHappen: React.FC = () => {
    // State to control background and line gradient (set to true for white background)
    const [isWhiteBackground] = useState(true);

    // Array of objects containing default and colorful image paths for the partner logos
    const partnerImages = [
        { default: "/images/dec.svg", color: "/images/deca.png" },
        { default: "/images/aks.svg", color: "/images/aksc.png" },
        { default: "/images/lif.svg", color: "/images/life.jpg" },
        { default: "/images/vsl.svg", color: "/images/vsl.png" },
        { default: "/images/sv.svg", color: "/images/sv.png" },
        { default: "/images/spi.svg", color: "/images/sp.png" },
        { default: "/images/arya.svg", color: "/images/arya.png" },
        { default: "/images/ur.svg", color: "/images/urban.png" },
        { default: "/images/melo.svg", color: "/images/melo.png" },
        { default: "/images/mile.svg", color: "/images/mile.png" },
    ];

    return (
        <div
            className="flex items-center justify-center relative w-full"
            style={{
                minHeight: "auto",
                padding: "20px 0",
                overflow: "hidden",
                backgroundColor: isWhiteBackground ? "#FFFFFF" : "#000000",
            }}
        >
            <div
                className="container mx-auto px-0 sm:px-0 md:px-6 lg:px-20 xl:px-20 pr-px sm:pr-px max-w-screen-2xl"
            >
                <div className="flex flex-col md:hidden">
                    <div className="relative">
                        <div className="w-full">
                            <h1
                                className="font-helvetica font-bold text-[1.25rem] sm:text-[1.4rem] tracking-tight leading-none pl-4"
                                style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                            >
                                <span className="block">Together,</span>
                                <span className="block mt-1">We've Made It Happen</span>
                            </h1>
                        </div>
                        <div
                            className="absolute"
                            style={{
                                top: "1.1rem",
                                left: "4.5rem",
                                right: "0",
                                height: "0.2px",
                                background: isWhiteBackground
                                    ? "linear-gradient(to right, #000000, #666666, #CCCCCC, #FFFFFF)"
                                    : "linear-gradient(to right, #FFFFFF, #A7A7A7, #666666, #000000)",
                            }}
                        />
                        <div className="absolute right-0 top-7 w-full">
                            <p
                                className="font-helvetica text-right pr-4 sm:pr-4 whitespace-nowrap"
                                style={{
                                    color: isWhiteBackground ? "#000000" : "#FFFFFF",
                                    fontSize: "0.375rem",
                                    lineHeight: "0.55rem",
                                }}
                            >
                                From bold ideas to measurable impact, these future are the brands we've partnered with to turn vision into reality.
                            </p>
                        </div>
                    </div>
                    <div className="h-12"></div>
                </div>

                {/* Medium and larger screens: Original layout */}
                <div className="hidden md:block">
                    <div
                        className="absolute"
                        style={{
                            top: "4.5rem",
                            left: "35%",
                            height: "1px",
                            background: isWhiteBackground
                                ? "linear-gradient(to right, #FFFFFF, #CCCCCC, #666666, #000000)"
                                : "linear-gradient(to right, #000000, #666666, #A7A7A7, #FFFFFF)",
                            width: "60%",
                        }}
                    />
                    <div className="flex flex-row items-start justify-between mb-12 gap-8 lg:gap-0 xl:gap-0">
                        <div className="w-2/3 md:pl-2 lg:pl-4 xl:pl-4">
                            <h1
                                className="font-helvetica font-bold text-4xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5rem] tracking-tight leading-[1.15] lg:leading-[0.9] xl:leading-[0.9] 2xl:leading-[0.9]"
                                style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                            >
                                <span className="block mb-1 lg:mb-2 xl:mb-2 2xl:mb-2">Together,</span>
                                <span className="block">We've Made It Happen</span>
                            </h1>
                        </div>
                        <div className="w-1/3 mt-24 md:ml-auto lg:ml-auto xl:ml-auto md:w-1/4 lg:w-1/4 xl:w-1/4">
                            <p
                                className="font-helvetica text-xs lg:text-sm xl:text-sm 2xl:text-sm leading-snug text-left"
                                style={{ color: isWhiteBackground ? "#000000" : "#FFFFFF" }}
                            >
                                From bold ideas to measurable impact, these future are the brands we've partnered with to turn vision into reality.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Partners Images Grid with hover effect */}
                <div
                    className="grid grid-cols-5 gap-x-1 sm:gap-x-2 md:gap-x-4 lg:gap-x-6 xl:gap-x-8 gap-y-2 md:gap-y-4 lg:gap-y-6 xl:gap-y-8 mt-0 md:mt-6 lg:mt-8 pr-2 sm:pr-4 md:pr-6 lg:pr-0 xl:pr-0"
                >
                    {partnerImages.map((image, index) => (
                        <div key={index} className="flex items-center justify-center p-1 md:p-2 lg:p-3 relative group">
                            <img
                                src={image.default || "/placeholder.svg"}
                                alt={`Partner ${index + 1} default`}
                                className="w-9/12 sm:w-10/12 md:w-11/12 lg:w-9/12 xl:w-8/12 max-w-full h-auto object-contain group-hover:hidden"
                            />
                            <img
                                src={image.color || "/placeholder_color.svg"}
                                alt={`Partner ${index + 1} color`}
                                className="w-9/12 sm:w-10/12 md:w-11/12 lg:w-9/12 xl:w-8/12 max-w-full h-auto object-contain hidden group-hover:block"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TogetherWeMadeItHappen;