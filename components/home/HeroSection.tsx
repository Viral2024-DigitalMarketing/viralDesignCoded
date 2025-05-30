"use client"

const HeroSection: React.FC = () => {
    return (
        <section className="w-full relative flex items-center justify-center bg-black overflow-hidden py-10 mt-8 sm:mt-10 xl:mt-4 min-h-[40vh] sm:min-h-[80vh] md:min-h-screen sm:items-start">
            {/* Main Content */}
            <div
                className="flex flex-col lg:flex-row justify-between items-start w-full max-w-[1680px] 2xl:max-w-[1920px] px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-28 h-full md:h-[calc(100vh-80px)]">

                {/* Left Text */}
                <div className="w-full lg:w-1/2 text-left mb-8 sm:mb-10 lg:mb-0 pt-6 sm:pt-8 lg:pt-24 xl:pt-24 2xl:pt-22 3xl:pd-28">
                    <h1 className="font-helvetica font-bold uppercase tracking-tight text-[2.25rem] sm:text-[3rem] md:text-6xl lg:text-[6.5rem] xl:text-[7rem] 2xl:text-[7rem] 3xl:text-[8rem] text-white">
                        <div className="flex flex-col space-y-0 sm:space-y-1">
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

                {/* Right Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-end lg:self-end lg:pb-8 pt-4 sm:pt-0 lg:pt-[120px]">
                    <div className="w-full lg:w-auto flex flex-col items-start lg:items-end lg:mr-0 pl-1 sm:pl-3 md:pl-0">
                        <p className="uppercase text-white text-xs sm:text-sm lg:text-sm xl:text-base mb-6 sm:mb-8 lg:mb-4 text-left max-w-[220px] leading-[1.1] font-medium">
                            We use design and technology to help brands connect better
                            <br className="hidden lg:inline"/>
                            with people.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default HeroSection