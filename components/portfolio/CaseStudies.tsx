"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { caseStudies } from "@/lib/data";

interface PortfolioCardProps {
    title: string;
    category: string;
    videoSrc1: string;
    videoSrc2: string;
    videoSrc3: string;
    videoSrc4?: string;
    slug: string;
    index: number;
    image1Src: string;
    image2Src: string;
    logoSrc: string;
}

const PortfolioCard = ({
                           title,
                           category,
                           videoSrc1,
                           videoSrc2,
                           videoSrc3,
                           videoSrc4,
                           slug,
                           index,
                           image1Src,
                           image2Src,
                           logoSrc,
                       }: PortfolioCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.2,
        rootMargin: '100px 0px',
    });

    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);
    const videoRef3 = useRef<HTMLVideoElement>(null);
    const videoRef4 = useRef<HTMLVideoElement>(null);
    const [videosLoaded, setVideosLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const isSrikara = slug === 'srikara' || title.toLowerCase().includes('srikara');

    // Optimized video control
    const handleVideoPlayback = useCallback(async (play: boolean) => {
        const videos = isSrikara && videoSrc4
            ? [videoRef1.current, videoRef2.current, videoRef3.current, videoRef4.current]
            : [videoRef1.current, videoRef2.current, videoRef3.current];

        const validVideos = videos.filter(video => video !== null) as HTMLVideoElement[];

        if (play && !isPlaying) {
            setIsPlaying(true);
            const playPromises = validVideos.map(video => {
                video.currentTime = 0;
                return video.play().catch((error) => {
                    console.error('Video playback failed:', error);
                    return Promise.resolve();
                });
            });
            await Promise.allSettled(playPromises);
        } else if (!play && isPlaying) {
            setIsPlaying(false);
            validVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
    }, [isSrikara, videoSrc4, isPlaying]);

    // Video preloading
    useEffect(() => {
        const videos = isSrikara && videoSrc4
            ? [videoRef1.current, videoRef2.current, videoRef3.current, videoRef4.current]
            : [videoRef1.current, videoRef2.current, videoRef3.current];

        const validVideos = videos.filter(video => video !== null) as HTMLVideoElement[];
        let loadedCount = 0;
        const totalVideos = validVideos.length;

        const handleVideoLoaded = () => {
            loadedCount++;
            if (loadedCount === totalVideos) {
                setVideosLoaded(true);
            }
        };

        const handleVideoError = (error: Event) => {
            console.error('Video loading error:', error);
            loadedCount++;
            if (loadedCount === totalVideos) {
                setVideosLoaded(true);
            }
        };

        validVideos.forEach((video) => {
            video.addEventListener('loadedmetadata', handleVideoLoaded);
            video.addEventListener('error', handleVideoError);

            video.muted = true;
            video.playsInline = true;
            video.loop = true;
            video.preload = 'metadata';
            video.load();
        });

        const timeout = setTimeout(() => {
            setVideosLoaded(true);
        }, 500);

        return () => {
            clearTimeout(timeout);
            validVideos.forEach((video) => {
                video.removeEventListener('loadedmetadata', handleVideoLoaded);
                video.removeEventListener('error', handleVideoError);
            });
        };
    }, [isSrikara, videoSrc4]);

    // Handle playback based on visibility
    useEffect(() => {
        if (inView) {
            handleVideoPlayback(true);
        } else {
            handleVideoPlayback(false);
        }
    }, [inView, handleVideoPlayback]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            handleVideoPlayback(false);
        };
    }, [handleVideoPlayback]);

    return (
        <div
            ref={ref}
            className="w-full max-w-[1440px] h-auto rounded-lg bg-black mx-auto relative"
            style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
            }}
        >
            {/* For lg+ screens */}
            <div className="hidden lg:flex justify-between items-start w-full h-[435.6436px]">
                <div className="flex flex-col justify-between w-full lg:w-[394px] h-full">
                    <div className="mb-auto">
                        <p className="font-helvetica font-semibold text-2xl leading-none tracking-[-0.03em] mt-60 uppercase text-white">
                            {title}
                        </p>
                        <p className="font-sharp-grotesk font-normal text-base leading-none tracking-[0.04em] text-[#CCCCCC] mt-4">
                            {category}
                        </p>
                    </div>
                    <div className="mt-5 mb-5">
                        <Link
                            href={`/portfolio/${slug}`}
                            className="font-helvetica font-bold text-[32px] leading-none text-white underline underline-offset-2 hover:opacity-80 transition-opacity duration-300"
                        >
                            View Case Study
                        </Link>
                    </div>
                </div>

                <div className="w-[833px] h-[435.6436px] rounded flex items-start relative">
                    {isSrikara ? (
                        <>
                            <video
                                ref={videoRef1}
                                src={videoSrc1}
                                style={{
                                    width: "242.8309px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 7,
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef2}
                                src={videoSrc2}
                                style={{
                                    width: "180px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 6,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef3}
                                src={videoSrc3}
                                style={{
                                    width: "180px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 5,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            {videoSrc4 && (
                                <video
                                    ref={videoRef4}
                                    src={videoSrc4}
                                    style={{
                                        width: "180px",
                                        height: "435.6436px",
                                        objectFit: "cover",
                                        zIndex: 4,
                                        marginLeft: "-65px",
                                        transform: 'translateZ(0)'
                                    }}
                                    className="object-cover"
                                    muted
                                    playsInline
                                    loop
                                    preload="metadata"
                                    autoPlay
                                />
                            )}
                            <img
                                src={image2Src}
                                alt="Image 2"
                                style={{
                                    width: "190px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 3,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                loading="lazy"
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={image1Src}
                                alt="Image 1"
                                style={{
                                    width: "242.8309px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 7,
                                    transform: 'translateZ(0)'
                                }}
                                loading="lazy"
                            />
                            <video
                                ref={videoRef1}
                                src={videoSrc1}
                                style={{
                                    width: "180px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 6,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef2}
                                src={videoSrc2}
                                style={{
                                    width: "180px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 5,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef3}
                                src={videoSrc3}
                                style={{
                                    width: "180px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 4,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                className="object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <img
                                src={image2Src}
                                alt="Image 2"
                                style={{
                                    width: "190px",
                                    height: "435.6436px",
                                    objectFit: "cover",
                                    zIndex: 3,
                                    marginLeft: "-65px",
                                    transform: 'translateZ(0)'
                                }}
                                loading="lazy"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* For screens below lg */}
            <div className="lg:hidden flex flex-col relative">
                <div className="flex relative w-full h-auto overflow-hidden">
                    {isSrikara ? (
                        <>
                            <video
                                ref={videoRef1}
                                src={videoSrc1}
                                className="w-[30%] max-w-[180px] h-[250px] sm:h-[280px] object-cover z-[7]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef2}
                                src={videoSrc2}
                                className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[6] -ml-[8%]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef3}
                                src={videoSrc3}
                                className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[5] -ml-[8%]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            {videoSrc4 && (
                                <video
                                    ref={videoRef4}
                                    src={videoSrc4}
                                    className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[4] -ml-[8%]"
                                    muted
                                    playsInline
                                    loop
                                    preload="metadata"
                                    autoPlay
                                />
                            )}
                            <img
                                src={image2Src}
                                alt="Image 2"
                                className="w-[25%] max-w-[150px] h-[250px] sm:h-[280px] object-cover z-[3] -ml-[8%]"
                                loading="lazy"
                                style={{ transform: 'translateZ(0)' }}
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={image1Src}
                                alt="Image 1"
                                className="w-[30%] max-w-[180px] h-[250px] sm:h-[280px] object-cover z-[7]"
                                loading="lazy"
                                style={{ transform: 'translateZ(0)' }}
                            />
                            <video
                                ref={videoRef1}
                                src={videoSrc1}
                                className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[6] -ml-[8%]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef2}
                                src={videoSrc2}
                                className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[5] -ml-[8%]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <video
                                ref={videoRef3}
                                src={videoSrc3}
                                className="w-[22%] max-w-[140px] h-[250px] sm:h-[280px] object-cover z-[4] -ml-[8%]"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                autoPlay
                            />
                            <img
                                src={image2Src}
                                alt="Image 2"
                                className="w-[25%] max-w-[150px] h-[250px] sm:h-[280px] object-cover z-[3] -ml-[8%]"
                                loading="lazy"
                                style={{ transform: 'translateZ(0)' }}
                            />
                        </>
                    )}

                    <div className="absolute top-4 right-6 z-20">
                        <img
                            src={logoSrc}
                            className="w-[50px] sm:w-[60px] h-auto"
                            alt={`${title} Logo`}
                            loading="lazy"
                            style={{ transform: 'translateZ(0)' }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-start px-2 sm:px-4 mt-4 pb-8 sm:pb-12">
                    <div className="flex-1 pr-4">
                        <p className="font-helvetica text-base sm:text-lg leading-tight text-white">{title}</p>
                        <p className="font-sharp-grotesk text-xs sm:text-sm leading-tight text-[#CCCCCC] mt-1">{category}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <Link
                            href={`/portfolio/${slug}`}
                            className="font-helvetica text-xs sm:text-sm font-bold text-white underline underline-offset-2 hover:opacity-80 transition-opacity duration-300 whitespace-nowrap"
                        >
                            View Case Study
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block absolute bottom-4 right-4">
                <img
                    src={logoSrc}
                    className="w-[116px] h-auto"
                    alt={`${title} Logo`}
                    loading="lazy"
                    style={{ transform: 'translateZ(0)' }}
                />
            </div>
        </div>
    );
};

export default function CaseStudies() {
    const displayedCaseStudies = caseStudies.slice(0, 2);

    return (
        <section
            className="py-8 sm:py-16 lg:py-32 bg-black"
            style={{
                transform: 'translateZ(0)',
                willChange: 'transform'
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-[80px] max-w-[1440px]">
                <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-[80px]">
                    {displayedCaseStudies.map((study, index) => (
                        <PortfolioCard
                            key={study.slug}
                            title={study.title}
                            category={study.category}
                            videoSrc1={study.videos?.[0] || "/videos/default-case-study1.mp4"}
                            videoSrc2={study.videos?.[1] || "/videos/default-case-study2.mp4"}
                            videoSrc3={study.videos?.[2] || "/videos/default-case-study3.mp4"}
                            videoSrc4={study.videos?.[3]}
                            slug={study.slug}
                            index={index}
                            image1Src={study.image1 || "/images/default.svg"}
                            image2Src={study.image2 || "/images/default-image2.png"}
                            logoSrc={study.logo || "/images/default-logo.svg"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}