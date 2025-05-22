"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { caseStudies } from "@/lib/data";

interface PortfolioCardProps {
    title: string;
    category: string;
    videoSrc: string;
    slug: string;
    index: number;
}

const PortfolioCard = ({
                           title,
                           category,
                           videoSrc,
                           slug,
                           index,
                       }: PortfolioCardProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (inView && videoRef.current) {
            videoRef.current.play();
            controls.start("visible");
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="w-full max-w-[1440px] h-auto rounded-lg bg-black mx-auto"
        >
            {/* For md+ screens */}
            <div className="hidden md:flex justify-between items-start w-full h-[433px]">
                {/* Text Side */}
                <div className="flex flex-col justify-between w-full md:w-[394px] h-full">
                    <div className="mb-auto">
                        <p className="font-helvetica font-bold text-2xl leading-none tracking-[-0.03em] mt-60 uppercase text-white">{title}</p>
                        <p className="font-sharp-grotesk font-normal text-base leading-none tracking-[0.04em] text-[#CCCCCC] mt-4">
                            {category}
                        </p>
                    </div>
                    <div className="mt-5 mb-5">
                        <Link
                            href={`/portfolio/${slug}`}
                            className="font-helvetica font-bold text-[32px] leading-none text-white underline underline-offset-2"
                        >
                            View Case Study
                        </Link>
                    </div>
                </div>

                {/* Video Side */}
                <div className="w-[833px] h-[401px] rounded">
                    <video
                        ref={videoRef}
                        src={videoSrc || "/videos/roast.mp4"}
                        className="w-full h-full object-cover rounded"
                        muted
                        playsInline
                        loop
                    />
                </div>
            </div>

            {/* For xs/sm screens */}
            <div className="md:hidden flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <video
                        ref={videoRef}
                        src={videoSrc || "/videos/srikara.mp4"}
                        className="w-full h-[200px] object-cover rounded"
                        muted
                        playsInline
                        loop
                    />
                </div>
                <div className="flex justify-between items-center px-2">
                    <div>
                        <p className="font-helvetica text-lg leading-tight text-white">{title}</p>
                        <p className="font-sharp-grotesk text-sm leading-tight text-[#CCCCCC] mt-1">
                            {category}
                        </p>
                    </div>
                    <Link
                        href={`/portfolio/${slug}`}
                        className="font-helvetica text-sm font-bold text-white underline underline-offset-2"
                    >
                        View Case Study
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default function CaseStudies() {
    return (
        <section className="py-8 md:py-32 bg-black">
            <div className="container mx-auto px-0 md:px-[80px] max-w-[1440px]">
                <div className="grid grid-cols-1 gap-[80px]">
                    {caseStudies.map((study, index) => (
                        <PortfolioCard
                            key={index}
                            title={study.title}
                            category={study.category}
                            videoSrc={study.videos?.[0] || "/videos/default-case-study.mp4"}
                            slug={study.slug}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}