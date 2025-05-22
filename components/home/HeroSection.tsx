'use client';

import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
    return (
        <section className="w-full relative flex items-start justify-center bg-black overflow-hidden py-10 mt-8 sm:mt-10 xl:mt-4 md:min-h-screen">
            <div
                className="flex flex-col lg:flex-row justify-between items-start w-full max-w-[1680px] 2xl:max-w-[1920px] px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-28 h-full md:h-[calc(100vh-80px)]">

                {/* Hero Text Section */}
                <div className="w-full lg:w-1/2 text-left mb-8 sm:mb-10 lg:mb-0 pt-6 sm:pt-8 lg:pt-24 pl-0 sm:pl-0">
                    <h1
                        className="
        font-helvetica font-bold uppercase tracking-tight
        text-[2.25rem] sm:text-[3rem] md:text-6xl
        lg:text-[6.5rem] xl:text-[7rem] 2xl:text-[7rem] 3xl:text-[8rem]
        text-white
    "
                    >

                        <div className="flex flex-col space-y-0">
                            <span className="whitespace-nowrap leading-[0.8]">The world is</span>
                            <span className="whitespace-nowrap leading-[0.8]">
                                online<span
                                className="inline-block w-[0.14em] h-[0.14em] bg-[#04D42A] ml-1 align-middle"
                                style={{transform: 'translateY(0.21em)'}}></span>
                            </span>
                            <span className="whitespace-nowrap leading-[0.8]">Your business</span>
                            <span className="whitespace-nowrap leading-[0.8]">
                                should be <span className="text-white">too</span><span
                                className="inline-block w-[0.14em] h-[0.14em] bg-red-500 ml-1 align-middle"
                                style={{transform: 'translateY(0.21em)'}}></span>
                            </span>
                        </div>
                    </h1>
                </div>

                {/* Right Content */}
                <div className="
                    w-full lg:w-1/2 flex flex-col justify-end
                    lg:self-end lg:pb-8
                    pt-0 lg:pt-[120px]
                    pl-0 sm:pl-0
                ">
                    <div className="w-full lg:w-auto flex flex-col items-start lg:items-end lg:mr-4">
                        <p className="uppercase text-white font-bold text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base mb-4 text-left max-w-[320px] leading-[1.1]">
                            Empowering Your Business <br/> in the Digital Age
                        </p>

                        <Button
                            className="
                                rounded-none
                                bg-white text-[#E30000] hover:bg-gray-100
                                px-2 py-[2px] sm:px-3 sm:py-[6px] md:px-5 md:py-[10px] lg:px-5 lg:py-[10px]
                                text-[10px] sm:text-sm md:text-base xl:text-lg
                                font-bold flex items-center gap-1 sm:gap-2
                                self-start lg:self-auto
                                text-center
                                w-auto
                                h-[28px] sm:h-[34px] md:h-[42px] lg:h-[38px] xl:h-[40px]
                            "
                        >
                            <img
                                src="/images/log.svg"
                                alt="Button Icon"
                                className="w-[10px] h-[10px] sm:w-4 sm:h-4 md:w-5 md:h-5 object-contain"
                            />
                            <span
                                className="text-[10px] sm:text-sm md:text-base xl:text-lg">Bug us — let's build.</span>
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
