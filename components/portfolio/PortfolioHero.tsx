"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const PortfolioHero: React.FC = () => {
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
                {/* PORTFOLIO Heading */}
                <div
                    className="pl-[20px] pt-[80px] md:pt-[130px] md:pl-[150px] heading-container"
                >
                    <h1
                        className="uppercase text-left m-0 leading-[82%] heading-text"
                        style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 700,
                            fontSize: "clamp(30px, 10vw, 80px)",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        PORTFOLIO
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
                        Explore our case studies to see how we've helped businesses transform their digital presence and achieve measurable results.
                    </p>
                </div>
            </div>

            {/* Responsive fix for mobile */}
            <style jsx>{`
                @media (max-width: 767px) {
                    .heading-text {
                        margin-top: 50px; /* Remove top gap on mobile */
                    }
                    .heading-container {
                        padding-top: 20px; /* Reduce top padding on mobile */
                        padding-bottom: 0; /* Remove bottom padding on mobile */
                    }
                    section {
                        min-height: auto; /* Adjust section height to content */
                        padding-bottom: 0; /* Remove bottom gap on mobile */
                    }
                }
            `}</style>
        </section>
    );
};

export default PortfolioHero;