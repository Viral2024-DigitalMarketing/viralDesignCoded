"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { useState, useEffect } from "react";

interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    slug: string;
}

interface BlogCardProps {
    title: string;
    excerpt: string;
    imageSrc: string;
    slug: string;
    large?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, imageSrc, slug, large = false }) => {
    const displayImage = imageSrc || "/placeholder.webp"; // Use WebP for placeholder
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSvg = displayImage.endsWith(".svg");

    return (
        <div
            className={`w-full bg-white p-4 xs:p-3 sm:p-3 md:p-5 flex flex-col rounded-md shadow-md 
      ${large ? "md:col-span-2" : ""} 
      xs:col-span-1 sm:col-span-1 xs:mx-0 sm:mx-0`}
            style={{
                ...(windowWidth < 768 && {
                    padding: "12px",
                }),
            }}
        >
            <div
                className="relative w-full mb-2 xs:mb-1 sm:mb-1 md:mb-5 overflow-hidden rounded"
                style={{
                    height: windowWidth < 640 ? "auto" : "375px",
                    maxWidth: large && windowWidth >= 1280 ? "100%" : "800px",
                    margin: "0 auto",
                    aspectRatio: windowWidth < 640 ? "16/9" : undefined,
                }}
            >
                <Image
                    src={displayImage}
                    alt={title}
                    {...(windowWidth >= 640
                        ? { fill: true }
                        : { width: 800, height: 450 })}
                    className={`${
                        windowWidth < 640 ? (isSvg ? "object-contain" : "object-cover") : "object-cover"
                    }`}
                    sizes={
                        large || windowWidth < 640
                            ? "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1279px) 450px, 800px"
                            : "(max-width: 639px) 100vw, 450px"
                    }
                    priority={true} // Prioritize all images for faster loading
                    quality={70} // Slightly lower quality for speed
                    placeholder="blur" // Use blur placeholder
                    blurDataURL="data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoBAAEAAgA0JaQAA3AA/v3AgAA=" // Optimized base64 placeholder
                    style={{
                        background: 'linear-gradient(90deg, #e0e0e0 33%, #f0f0f0 66%, #e0e0e0 100%)',
                        backgroundSize: '300% 100%',
                        animation: 'fastShimmer 1s infinite linear',
                    }} // Optimized shimmer effect
                />
                <style jsx>{`
                    @keyframes fastShimmer {
                        0% {
                            background-position: 100% 0;
                        }
                        100% {
                            background-position: 0% 0;
                        }
                    }
                `}</style>
            </div>

            <div className={`flex flex-col justify-between flex-grow ${large || windowWidth < 640 ? "px-2 xs:px-0 sm:px-0 md:px-5" : ""}`}>
                <div className="text-left">
                    <h3 className="font-helvetica mt-1 xs:mt-0 sm:mt-0 md:mt-4 font-bold text-lg xs:text-sm sm:text-sm md:text-lg lg:text-xl mb-1 xs:mb-0 sm:mb-0 md:mb-3 text-black">{title}</h3>
                    <p className="font-sharp-grotesk text-xs xs:text-[0.625rem] sm:text-[0.675rem] md:text-xs lg:text-sm text-gray-800 mb-2 xs:mb-1 sm:mb-1 md:mb-5 line-clamp-3">{excerpt}</p>
                </div>

                <div className="flex justify-end xs:mt-1 sm:mt-1 md:mt-[-50px]">
                    <Link
                        href={`/blog/${slug}`}
                        className="font-helvetica font-bold text-xs xs:text-[0.625rem] sm:text-[0.675rem] md:text-xs lg:text-sm text-black border-b-2 border-blue-600 inline-block"
                    >
                        READ MORE
                    </Link>
                </div>
            </div>
        </div>
    );
};

const BlogGrid: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileBg = "xs:bg-black sm:bg-black";
    const desktopBg = "md:bg-[#F3F0F0] lg:bg-[#F3F0F0]";
    const desktopGap = "md:gap-x-8 lg:gap-x-8 md:gap-y-6 lg:gap-y-6";

    return (
        <section
            className={`py-6 xs:py-4 sm:py-6 md:py-24 ${mobileBg} ${desktopBg}`}
        >
            <div className="xs:px-4 sm:px-4 md:px-[80px] lg:px-[80px]">
                <div
                    className={`
            grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 
            ${desktopGap}
          `}
                    style={{
                        ...(windowWidth < 768 && {
                            gap: "15px",
                        }),
                    }}
                >
                    {blogPosts.map((post: BlogPost, index: number) => (
                        <BlogCard
                            key={index}
                            title={post.title}
                            excerpt={post.excerpt}
                            imageSrc={post.image}
                            slug={post.slug}
                            large={windowWidth >= 768 && (index % 4 === 0 || index % 4 === 3)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;