'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function JoinOurTeamSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    return (
        <motion.section
            ref={ref}
            className="
        border-t border-zinc-800
        py-8 xs:py-8 sm:py-10 md:py-12 lg:py-12 xl:py-14 2xl:py-16
        px-[15px] sm:px-[15px] md:pl-[20px] md:pr-[15px] lg:px-[96px]
      "
            style={{
                backgroundColor: isInView ? '#ffffff' : '#000000',
                transition: 'background-color 0.6s ease',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center w-full flex-nowrap"
                style={{ minHeight: 'auto' }}
            >
                {/* Left Heading */}
                <h2
                    className="
    uppercase tracking-tight
    text-[1.4rem] xs:text-[1.5rem] sm:text-[1.7rem] md:text-[2rem]
    lg:text-[2.8rem] xl:text-[3.2rem] 2xl:text-[3.6rem]
    m-0 p-0
  "
                    style={{
                        fontFamily: 'Helvetica',
                        fontWeight: 600,
                        color: isInView ? '#000000' : '#ffffff',
                        transition: 'color 0.6s ease',
                    }}
                >
                    Join us
                </h2>


                {/* Right Roles Info as Link */}
                <Link href="/contact#open-roles" className="flex items-center gap-3 m-0 p-0 group cursor-pointer">
          <span
              className="
              uppercase font-helvetica font-normal group-hover:underline
              text-[1rem] xs:text-[1.05rem] sm:text-[1.15rem] md:text-[1.5rem]
              lg:text-[2.5rem] xl:text-[2.9rem] 2xl:text-[3.3rem]
            "
              style={{
                  color: isInView ? '#000000' : '#ffffff',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  transition: 'color 0.6s ease',
              }}
          >
            3 Open Roles
          </span>
                    <ArrowRight
                        className="
              transition-transform duration-300 group-hover:translate-x-1
              w-5 xs:w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12 2xl:w-14
              h-5 xs:h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 2xl:h-14
              rotate-[45deg]
            "
                        style={{
                            color: isInView ? '#000000' : '#ffffff',
                            transition: 'color 0.6s ease',
                        }}
                    />
                </Link>
            </motion.div>
        </motion.section>
    );
}