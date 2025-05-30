"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const BlogHero: React.FC = () => {
    const [ref] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section
            className="bg-black text-white relative"
            style={{
                minHeight: "60px",
            }}
        >
            <div
                ref={ref}
                className="w-full flex flex-col justify-between lg:h-[410px]"
            >
                {/* BLOGS Heading */}
                <div
                    className="pl-[20px] pt-[80px] md:pt-[130px] md:pl-[150px] heading-container"
                >
                    <h1
                        className="uppercase text-left m-0 leading-[82%] heading-text"
                        style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(30px, 10vw, 75px)",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        BLOGS
                    </h1>
                </div>

                <div
                    className="absolute bottom-0 right-0 pb-[80px] text-right hidden md:block"
                    style={{
                        marginRight: "150px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(16px, 2vw, 18px)",
                        lineHeight: "125%",
                        letterSpacing: "0%",
                        maxWidth: "400px",
                        textAlign: "left",
                        color: "#CCCCCC",
                    }}
                >
                    <p>
                        Dive into our insights on digital marketing trends, strategies, and success stories.
                    </p>
                </div>
            </div>

            {/* Responsive fix for mobile */}
            <style jsx>{`
                @media (max-width: 767px) {
                    .heading-text {
                        margin-top: 0; /* Remove top margin on mobile */
                    }

                    .heading-container {
                        padding-top: 50px; /* Increased top padding to push content below navbar */
                        padding-bottom: 0; /* Remove bottom padding on mobile */
                    }

                    section {
                        min-height: auto; /* Adjust section height to content */
                        padding-top: 20px; /* Add top padding to section to ensure clearance */
                        padding-bottom: 0; /* Remove bottom gap on mobile */
                    }
                }
            `}</style>
        </section>
    );
};

export default BlogHero;