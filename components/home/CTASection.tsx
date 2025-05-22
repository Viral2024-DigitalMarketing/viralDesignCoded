"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
      <section className="bg-black py-10 lg:py-10 xl:py-36 2xl:py-36">
        <div className="mx-auto px-4 xs:px-8 sm:px-12 md:px-16 lg:px-28 w-full">
          <div className="flex flex-row justify-between items-center gap-4 xs:gap-6 sm:gap-8 md:gap-6">
            {/* Left Heading */}
            <motion.div
                className="w-1/2 max-w-[640px] text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
              <h2
                  className="font-helvetica font-bold uppercase
              text-[1.75rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.25rem]
              text-white leading-[0.8] tracking-[-0.02em]"
              >
                Ready
                <br />
                to
                <br />
                start?
              </h2>
            </motion.div>

            {/* Right Text & Button */}
            <motion.div
                className="w-1/2 text-right max-w-[640px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p
                  className="text-white/80 font-helvetica mb-6 xs:mb-8 sm:mb-10 md:mb-12
              text-[0.75rem] xs:text-[0.8125rem] sm:text-[0.9375rem] md:text-[1.125rem] lg:text-lg xl:text-xl"
              >
                Bug us and let’s build <br /> something that connects.
              </p>
              <div className="mt-4 xs:mt-5 sm:mt-6 flex justify-end">
                <Link href="/contact" className="inline-block">
                  <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-1.5 xs:gap-1.5 sm:gap-2
                  px-2.5 xs:px-2.5 sm:px-3 py-1 xs:py-1 sm:py-1.25
                  text-[0.6875rem] xs:text-[0.625rem] sm:text-[0.75rem] md:text-[1.05rem] lg:text-[1.125rem]
                  bg-white hover:bg-gray-100 font-bold tracking-tighter"
                      style={{ color: "#E30000" }}
                  >
                    <img
                        src="/images/log.svg"
                        alt="Button Icon"
                        className="object-contain w-3.5 xs:w-3 sm:w-3.5 h-3.5 xs:h-3 sm:h-3.5 md:w-5.5 md:h-5.5 lg:w-5 lg:h-5"
                        style={{
                          filter:
                              "invert(12%) sepia(100%) saturate(7419%) hue-rotate(356deg) brightness(88%) contrast(111%)",
                        }}
                    />
                    Bug us — let’s build.
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