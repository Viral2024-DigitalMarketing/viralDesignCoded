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
    // Use provided imageSrc with fallback to placeholder
    const displayImage = imageSrc || "/placeholder.svg";

    // Client-side window width state
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        // Set initial width
        setWindowWidth(window.innerWidth);

        // Add resize listener
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine if the image is an SVG
    const isSvg = displayImage.endsWith(".svg");

    return (
        <div
            className={`w-full bg-white p-4 xs:p-3 sm:p-4 md:p-5 flex flex-col rounded-md shadow-md 
            ${large ? "md:col-span-2" : ""} 
            xs:col-span-1 sm:col-span-1 xs:mx-0 sm:mx-0
            `}
            style={{
                // Add padding for mobile screens (xs, sm)
                ...(windowWidth < 768 && {
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingBottom: "20px",
                }),
            }}
        >
            <div
                className="relative w-full mb-3 xs:mb-2 sm:mb-3 md:mb-5 overflow-hidden rounded"
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
                    className={`transition-transform duration-500 hover:scale-105 ${
                        windowWidth < 640 ? (isSvg ? "object-contain" : "object-cover") : "object-cover"
                    }`}
                    sizes={large || windowWidth < 640 ? "100vw" : "450px"}
                    priority
                />
            </div>

            <div className={`flex flex-col justify-between flex-grow ${large || windowWidth < 640 ? "px-2 xs:px-1 sm:px-2 md:px-5" : ""}`}>
                <div className="text-left">
                    <h3 className="font-helvetica mt-2 xs:mt-1 sm:mt-2 md:mt-4 font-bold text-lg xs:text-sm sm:text-base md:text-lg lg:text-xl mb-2 xs:mb-1 sm:mb-2 md:mb-3 text-black">{title}</h3>
                    <p className="font-sharp-grotesk text-xs xs:text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm text-gray-800 mb-4 xs:mb-3 sm:mb-4 md:mb-5 line-clamp-3">{excerpt}</p>
                </div>

                <div className="flex justify-end xs:mt-[-20px] sm:mt-[-30px] md:mt-[-50px]">
                    <Link
                        href={`/blog/${slug}`}
                        className="font-helvetica font-bold text-xs xs:text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm text-black bg-gray-100 px-3 xs:px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 xs:py-1 sm:py-1.5 md:py-1.5 lg:py-2 rounded hover:bg-gray-200 transition-colors inline-block"
                    >
                        READ MORE
                    </Link>
                </div>
            </div>
        </div>
    );
};

const BlogGrid: React.FC = () => {
    // Get window width to determine if mobile
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Tailwind classes for background and gap
    const mobileBg = "xs:bg-black sm:bg-black";
    const desktopBg = "md:bg-[#F3F0F0] lg:bg-[#F3F0F0]";
    const mobileGap = "xs:gap-y-8 sm:gap-y-8 md:gap-x-[15px] md:gap-y-6";
    const desktopGap = "md:gap-x-8 lg:gap-x-8";

    return (
        <section
            className={`py-6 xs:py-2 sm:py-10 md:py-24 ${mobileBg} ${desktopBg}`}
        >
            <div className="xs:px-4 sm:px-5 md:px-[80px] lg:px-[80px]">
                <div
                    className={`
                      grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 
                      ${mobileGap} ${desktopGap}
                    `}
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