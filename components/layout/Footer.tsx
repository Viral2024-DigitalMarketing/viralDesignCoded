"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Footer = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.9, // Trigger when 90% of the footer is in view
    });

    useEffect(() => {
        if (inView) {
            controls.start("animate");
        } else {
            controls.start("initial"); // Reset to initial state when out of view
        }
    }, [controls, inView]);

    const viralBugText = "viral bug".split("").map((char, index) => (
        <motion.span
            key={index}
            className="viral-letter"
            initial={{ color: "#ffffff" }}
            animate={controls}
            style={{ color: "#ffffff" }}
            variants={{
                animate: {
                    color: ["#ffffff", "#F21E1D", "#ffffff"],
                    transition: {
                        duration: 0.8,
                        times: [0, 0.5, 1],
                        delay: index * 0.15,
                        ease: "easeInOut",
                    },
                },
            }}
        >
            {char}
        </motion.span>
    ));

    return (
        <footer className="bg-black text-white" ref={ref} style={{ overflow: "hidden", margin: 0 }}>
            {/* Navigation and Contact Info */}
            <div className="border-t border-white/10 backdrop-blur-md py-3">
                <div className="w-full flex flex-row justify-between items-center px-2 lg:px-10 overflow-x-auto">
                    {/* Left Side - Navigation Links */}
                    <div className="flex flex-row flex-nowrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-4 lg:gap-5 max-w-[45%] xs:max-w-[48%] items-center">
                        {["Home", "Services", "Portfolio", "Careers", "Contact"].map((text, i) => (
                            <Link
                                key={i}
                                href={
                                    text === "Home"
                                        ? "/"
                                        : text === "Careers"
                                            ? "/contact"
                                            : `/${text.toLowerCase().replace(" ", "")}`
                                }
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="text-[9px] xs:text-[8px] sm:text-[12px] md:text-sm lg:text-lg xl:text-xl whitespace-nowrap">
                                    {text}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Email and Social Links */}
                    <div className="flex flex-row flex-nowrap items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-4 lg:gap-5 max-w-[52%] xs:max-w-[50%] mt-1">
                        <Link
                            href="mailto:hello@viralbug.in"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[8px] sm:text-[12px] md:text-sm lg:text-lg whitespace-nowrap"
                        >
                            hello@viralbug.in
                        </Link>
                        <Link
                            href="https://instagram.com"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[8px] sm:text-[12px] md:text-sm lg:text-lg whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[8px] sm:text-[12px] md:text-sm lg:text-lg whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Text */}
            <div className="relative flex flex-col justify-center items-center py-4 md:py-6 lg:py-8" style={{ overflow: "hidden" }}>
                {/* Upper Gradient Line */}
                <div
                    className="w-full h-[1px] mb-1 md:mb-2"
                    style={{
                        background: "linear-gradient(to left, #000000, #666666, #A7A7A7, transparent)",
                        maxWidth: "1440px",
                    }}
                />

                <div className="w-full flex justify-center items-center px-4">
                    <h2
                        className="viral-bug-heading font-extrabold leading-none tracking-tighter text-center"
                        style={{
                            fontFamily: "League Spartan, sans-serif",
                            fontSize: "clamp(3.5rem, 28vw, 480px)",
                            lineHeight: "0.85",
                            letterSpacing: "-0.06em",
                            padding: 0,
                            overflow: "visible",
                            color: "#ffffff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "100%",
                            maxWidth: "100vw",
                            height: "auto",
                            minHeight: "clamp(3rem, 24vw, 400px)",
                        }}
                    >
                        {viralBugText}
                    </h2>
                </div>

                {/* Bottom Gradient Line */}
                <div
                    className="w-full h-[1px] mt-1 md:mt-2"
                    style={{
                        background: "linear-gradient(to right, #000000, #666666, #A7A7A7, transparent)",
                        maxWidth: "1440px",
                    }}
                />
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 backdrop-blur-md py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-gray-400 text-[8px] xs:text-[9px] sm:text-xs md:text-sm lg:text-sm font-sharp-grotesk">Since 2023</p>
                    <p className="text-gray-400 text-[6px] xs:text-[6px] sm:text-[6px] md:text-sm lg:text-sm font-sharp-grotesk">All Rights Reserved</p>
                </div>
            </div>

            <style jsx>{`
                .viral-bug-heading {
                    white-space: nowrap;
                }

                /* Mobile First Approach */
                @media (max-width: 480px) {
                    .viral-bug-heading {
                        font-size: clamp(3.5rem, 22vw, 140px) !important;
                        line-height: 0.9 !important;
                        letter-spacing: -0.04em !important;
                        min-height: clamp(3rem, 20vw, 120px) !important;
                    }
                }

                /* Small Mobile */
                @media (min-width: 481px) and (max-width: 640px) {
                    .viral-bug-heading {
                        font-size: clamp(4rem, 24vw, 180px) !important;
                        line-height: 0.85 !important;
                        min-height: clamp(3.5rem, 22vw, 160px) !important;
                    }
                }

                /* Tablet */
                @media (min-width: 641px) and (max-width: 1024px) {
                    .viral-bug-heading {
                        font-size: clamp(4rem, 25vw, 280px) !important;
                        line-height: 0.85 !important;
                        min-height: clamp(3.5rem, 22vw, 240px) !important;
                    }
                }

                /* Desktop */
                @media (min-width: 1025px) and (max-width: 1440px) {
                    .viral-bug-heading {
                        font-size: clamp(5rem, 28vw, 400px) !important;
                        line-height: 0.85 !important;
                        min-height: clamp(4.5rem, 24vw, 340px) !important;
                    }
                }

                /* Large Desktop */
                @media (min-width: 1441px) {
                    .viral-bug-heading {
                        font-size: clamp(6rem, 30vw, 480px) !important;
                        line-height: 0.85 !important;
                        min-height: clamp(5rem, 26vw, 400px) !important;
                    }
                }

                /* Landscape Mobile */
                @media (max-height: 500px) and (orientation: landscape) {
                    .viral-bug-heading {
                        font-size: clamp(2rem, 15vw, 80px) !important;
                        line-height: 1 !important;
                        min-height: clamp(1.8rem, 14vw, 70px) !important;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;