"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Footer = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.9,
    });

    useEffect(() => {
        if (inView) {
            controls.start("animate");
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
        <footer className="bg-black text-white" ref={ref}>
            {/* Navigation and Contact Info */}
            <div className="border-t border-white/10 backdrop-blur-md py-3">
                <div className="w-full flex flex-row justify-between items-center px-2 lg:px-10 overflow-x-auto">
                    {/* Left Side - Navigation Links */}
                    <div className="flex flex-row flex-nowrap gap-2 md:gap-4 lg:gap-5 max-w-[45%] items-center">
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
      <span className="text-[9px] xs:text-[5px] sm:text-[6px] md:text-sm lg:text-lg xl:text-xl whitespace-nowrap">
        {text}
      </span>
                            </Link>
                        ))}
                    </div>


                    {/* Right Side - Email and Social Links */}
                    <div className="flex flex-row flex-nowrap items-center gap-1.5 md:gap-4 lg:gap-5 max-w-[55%] mt-1">
                        <Link
                            href="mailto:hello@viralbug.in"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[6px] sm:text-[7px] md:text-sm lg:text-lg whitespace-nowrap"
                        >
                            hello@viralbug.in
                        </Link>
                        <Link
                            href="https://instagram.com"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[6px] sm:text-[7px] md:text-sm lg:text-lg whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            className="text-red-600 hover:text-white transition-colors text-[9px] xs:text-[6px] sm:text-[7px] md:text-sm lg:text-lg whitespace-nowrap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Text */}
            <div className="relative flex justify-center items-start py-[1vw] pb-[3vw]">
                <div className="w-full flex justify-center items-start overflow-x-auto">
                    <h2
                        className="viral-bug-heading font-extrabold leading-none tracking-tighter text-center"
                        style={{
                            fontFamily: "League Spartan, sans-serif",
                            fontSize: "clamp(2.5rem, 22vw, 420px)",
                            lineHeight: "1",
                            letterSpacing: "-0.06em",
                            margin: 0,
                            padding: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            position: "relative",
                            top: "-1vw",
                            width: "100%",
                            maxWidth: "100vw",
                            height: "1.2em", // Increased height to accommodate descenders like 'g'
                        }}
                    >
                        {viralBugText}
                    </h2>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 backdrop-blur-md py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-gray-400 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-lg font-sharp-grotesk">Since 2023</p>
                    <p className="text-gray-400 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-lg font-sharp-grotesk">All Rights Reserved</p>
                </div>
            </div>

            <style jsx>{`
                .viral-bug-heading {
                    white-space: nowrap;
                }

                @media (max-width: 640px) {
                    .viral-bug-heading {
                        font-size: clamp(2.5rem, 12vw, 56px);
                        top: -2vw;
                        height: 1.2em; // Ensure height accommodates descenders on smaller screens
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;