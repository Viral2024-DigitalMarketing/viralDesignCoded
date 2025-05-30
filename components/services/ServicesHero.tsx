"use client";

export default function ServicesHero() {
    return (
        <section className="w-full px-0 pt-16 xs:pt-20 sm:pt-24 md:pt-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24" style={{ backgroundColor: "white" }}>
            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bounceUpDown {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                .fade-in-text {
                    animation: fadeInUp 1.2s ease-out forwards;
                    opacity: 0;
                }

                .bounce-arrow {
                    animation: bounceUpDown 2s ease-in-out infinite;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .bounce-arrow:hover {
                    transform: scale(1.1);
                }

                .text-line-1 {
                    animation-delay: 0.2s;
                }

                .text-line-2 {
                    animation-delay: 0.4s;
                }

                .text-line-3 {
                    animation-delay: 0.6s;
                }

                .text-line-4 {
                    animation-delay: 0.8s;
                }

                .arrow-animation {
                    animation: fadeInUp 1.5s ease-out forwards, bounceUpDown 2s ease-in-out infinite 1.5s;
                    opacity: 0;
                }

                /* Mobile responsive text */
                @media (max-width: 639px) {
                    .hero-title {
                        font-size: 32px !important;
                        line-height: 85% !important;
                        letter-spacing: -1px !important;
                    }
                }

                @media (min-width: 640px) and (max-width: 767px) {
                    .hero-title {
                        font-size: 48px !important;
                        line-height: 88% !important;
                        letter-spacing: -1.5px !important;
                    }
                }

                @media (min-width: 768px) and (max-width: 1024px) {
                    .hero-title {
                        font-size: 64px !important;
                        line-height: 90% !important;
                        letter-spacing: -2px !important;
                    }
                }

                @media (min-width: 1025px) and (max-width: 1279px) {
                    .hero-title {
                        font-size: 85px !important;
                        line-height: 90% !important;
                        letter-spacing: -3% !important;
                    }
                }

                @media (min-width: 1280px) {
                    .hero-title {
                        font-size: 96px !important;
                        line-height: 88% !important;
                        letter-spacing: -3% !important;
                    }
                }

                @media (min-width: 1536px) {
                    .hero-title {
                        font-size: 110px !important;
                        line-height: 85% !important;
                        letter-spacing: -4% !important;
                    }
                }

                /* Arrow responsive sizing */
                .arrow-img {
                    width: 60px;
                    height: 60px;
                }

                @media (min-width: 640px) {
                    .arrow-img {
                        width: 80px;
                        height: 80px;
                    }
                }

                @media (min-width: 768px) {
                    .arrow-img {
                        width: 100px;
                        height: 100px;
                    }
                }

                @media (min-width: 1024px) {
                    .arrow-img {
                        width: 120px;
                        height: 120px;
                    }
                }

                @media (min-width: 1280px) {
                    .arrow-img {
                        width: 140px;
                        height: 140px;
                    }
                }

                @media (min-width: 1536px) {
                    .arrow-img {
                        width: 160px;
                        height: 160px;
                    }
                }
            `}</style>

            <div className="flex flex-row min-h-[280px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] xl:min-h-[674px] 2xl:min-h-[800px]">
                {/* Full width - White background with left-aligned text */}
                <div
                    className="w-full bg-white p-2 sm:p-3 md:p-4 lg:p-6 xl:p-12 2xl:p-16 flex flex-col items-start justify-start relative"
                    style={{ minHeight: "280px", height: "100%" }}
                >
                    <h1
                        className="hero-title font-helvetica text-black uppercase ml-2 sm:ml-4 md:ml-6 lg:ml-12 xl:ml-20 2xl:ml-24 pt-3 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-6 2xl:pt-8"
                        style={{
                            fontFamily: "Helvetica",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            textAlign: "left",
                        }}
                    >
                        <span className="fade-in-text text-line-1 block">Unlock</span>
                        <span className="fade-in-text text-line-2 block">Your Full</span>
                        <span className="fade-in-text text-line-3 block">Digital</span>
                        <span className="fade-in-text text-line-4 block">Potential</span>
                    </h1>

                    {/* Animated down arrow below the text */}
                    <div
                        className="ml-2 sm:ml-4 md:ml-6 lg:ml-12 xl:ml-20 2xl:ml-24 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 2xl:mt-32"
                        onClick={() => {
                            window.scrollTo({
                                top: window.innerHeight,
                                behavior: 'smooth'
                            });
                        }}
                    >
                        <img
                            src="/images/down-arr.svg"
                            alt="Scroll down arrow"
                            className="arrow-animation bounce-arrow arrow-img"
                            style={{
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}