'use client'; // Marking this as a client-side component

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const CTASection: React.FC = () => {
    const [isBackgroundWhite, setIsBackgroundWhite] = useState(false);
    const [decryptedText, setDecryptedText] = useState("start");
    const originalText = "start?";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let iteration = 0;

        const animateText = () => {
            setDecryptedText(
                originalText
                    .split("")
                    .map((_, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            iteration += 1 / 3;
            if (iteration > originalText.length + 5) {
                setDecryptedText(originalText);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Reset animation on each intersection
                    iteration = 0;
                    setDecryptedText("start");
                    interval = setInterval(animateText, 50);
                } else {
                    clearInterval(interval as NodeJS.Timeout);
                    setDecryptedText(originalText); // Ensure it remains "start" when out of view
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector("#cta-section");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
            if (interval) clearInterval(interval);
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <section
            id="cta-section"
            className="py-[30px] xs:py-[30px] sm:py-[30px] md:py-8 lg:py-[80px]"
            style={{ backgroundColor: isBackgroundWhite ? "#FFFFFF" : "#000000" }}
            onMouseEnter={() => setIsBackgroundWhite(true)}
        >
            <div className="mx-auto px-4 xs:px-8 sm:px-12 md:px-16 lg:px-28 w-full flex items-center">
                <div className="flex flex-row items-center justify-between gap-4 xs:gap-6 sm:gap-8 md:gap-6 w-full lg:items-start">
                    {/* Left Heading */}
                    <motion.div
                        className="w-1/2 max-w-[320px] text-left lg:w-1/2 lg:max-w-[640px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="font-helvetica font-bold uppercase
              text-[1.5rem] xs:text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.25rem]
              leading-[0.8] tracking-[-0.02em]"
                            style={{ color: isBackgroundWhite ? "#000000" : "#FFFFFF" }}
                        >
                            Ready<br />to<br />
                            {decryptedText}
                        </h2>
                    </motion.div>

                    {/* Right Text & Button */}
                    <motion.div
                        className="w-1/2 max-w-[320px] flex flex-col items-end lg:w-1/2 lg:max-w-[640px] lg:mt-20"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-100px"}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <p
                            className="font-helvetica mb-2 xs:mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 text-right lg:text-left
              text-[0.625rem] xs:text-[0.6875rem] sm:text-[0.75rem] md:text-[0.9375rem] lg:text-lg xl:text-xl"
                            style={{color: isBackgroundWhite ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"}}
                        >
                            Bug us and let’s build <br/> something that connects.
                        </p>
                        <div className="flex justify-end lg:justify-start">
                            <Link href="/contact" className="inline-block">
                                <motion.button
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.97}}
                                    className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-1.5 md:gap-1.5 lg:gap-2
    px-3 xs:px-3.5 sm:px-4 md:px-4 lg:px-6 sm:py-1.5 xs:py-1.25 py-1 lg:py-1.75
    text-[0.625rem] xs:text-[0.6875rem] sm:text-[0.75rem] md:text-[0.9375rem] lg:text-xl     tracking-tighter font-bold"
                                    style={{
                                        backgroundColor: isBackgroundWhite ? "#FDE9E9" : "#FFFFFF",
                                        color: isBackgroundWhite ? "#E30000" : "#E30000",
                                        fontFamily: "Helvetica", // Added Helvetica font
                                    }}
                                >
                                    <Image
                                        src="/images/log.svg"
                                        alt="Button Icon"
                                        width={10}  // Decreased width
                                        height={10} // Decreased height
                                        className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 object-contain"
                                    />

                                    Bug us — let's build.
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
