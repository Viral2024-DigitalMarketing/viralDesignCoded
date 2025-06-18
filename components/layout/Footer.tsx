"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaInstagram, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.9 });

    useEffect(() => {
        if (inView) {
            controls.start("animate");
        } else {
            controls.start("initial");
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
            {/* Navigation and Icons in One Line */}
            <div className="border-t border-white/10 backdrop-blur-md py-3">
                <div className="w-full px-2 lg:px-10 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 sm:gap-0">

                    {/* Navigation Links */}
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        {["Home", "Services", "Portfolio", "Careers", "Contact"].map((text, i) => (
                            <Link
                                key={i}
                                href={
                                    text === "Home"
                                        ? "/"
                                        : text === "Careers"
                                            ? "/contact#open-roles"
                                            : `/${text.toLowerCase().replace(" ", "")}`
                                }
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="text-[10px] xs:text-[10px] sm:text-[12px] md:text-sm lg:text-lg whitespace-nowrap">
                                    {text}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end text-red-600 text-lg">
                        <Link href="mailto:viralbug.hyd@gmail.com" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope className="hover:text-white transition-colors" />
                        </Link>
                        <Link href="https://www.instagram.com/viralbug.in/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-white transition-colors" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/viral-bug/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="hover:text-white transition-colors" />
                        </Link>
                        <Link href="https://www.facebook.com/viralbug.in" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Logo */}
            <div className="relative flex flex-col justify-center items-center py-4 md:py-6 lg:py-8" style={{ overflow: "hidden" }}>
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
                            minHeight: "clamp(3rem, 24vw, 400px)"
                        }}
                    >
                        {viralBugText}
                    </h2>
                </div>
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
                    <p className="text-gray-400 text-[8px] xs:text-[9px] sm:text-xs md:text-sm lg:text-sm font-sharp-grotesk">
                        Since 2023
                    </p>
                    <p className="text-gray-400 text-[6px] xs:text-[6px] sm:text-[6px] md:text-sm lg:text-sm font-sharp-grotesk">
                        All Rights Reserved
                    </p>
                </div>
            </div>

            <style jsx>{`
                .viral-bug-heading {
                    white-space: nowrap;
                }
                @media (max-width: 640px) {
                    .viral-bug-heading {
                        font-size: clamp(3rem, 20vw, 100px);
                        line-height: 1;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;