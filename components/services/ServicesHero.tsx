"use client";

export default function ServicesHero() {
    return (
        <section className="w-full px-0 pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            <div className="flex flex-row relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:h-[674px]">

                {/* Left side - White background with text */}
                <div
                    className="w-1/2 bg-white p-3 sm:p-4 md:p-6 lg:p-12 flex items-center relative"
                    style={{minHeight: "300px", height: "100%", maxHeight: "674px"}}
                >
                    {/* Image on top of full text */}
                    <img
                        src="/images/bh.svg"
                        alt="Left Top Decoration"
                        className="absolute w-[80px] h-[95px] xs:w-[110px] xs:h-[130px] sm:w-[150px] sm:h-[178px] md:w-[180px] md:h-[213px] lg:w-[210px] lg:h-[249px]"
                        style={{
                            top: "20p0x",
                            left: "582px",
                            zIndex: 20,
                        }}
                    />


                    <h1
                        className="font-helvetica text-black uppercase tracking-[-0.08em] sm:tracking-[-0.09em] md:tracking-[-0.10em] lg:ml-20 relative z-10 mt-[-80px] md:mt-[-70px] lg:mt-[-120px]"
                        style={{
                            fontSize: "45px",
                            lineHeight: "38px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                        }}
                    >
                        <span
                            className="xs:text-[55px] xs:leading-[46px] sm:text-[65px] sm:leading-[55px] md:text-[85px] md:leading-[70px] lg:text-[105.47px] lg:leading-[88px]">
                            Unlock <br/> Your Full
                        </span>
                    </h1>


                </div>

                {/* Right side - Red background */}
                <div
                    className="w-1/2 bg-[#BF1C1C] flex flex-col justify-center items-center relative"
                    style={{minHeight: "300px", height: "100%", maxHeight: "674px"}}
                >
                    {/* Image inside red card */}
                    <img
                        src="/images/rh.svg"
                        alt="Right Card Decoration"
                        className="absolute w-[80px] h-[95px] xs:w-[110px] xs:h-[130px] sm:w-[150px] sm:h-[178px] md:w-[180px] md:h-[213px] lg:w-[550px] lg:h-[550px] top-[20px] right-[15px] lg:top-[50px] lg:right-[30px]"
                        style={{
                            zIndex: 10,
                            top: '115px',
                            left: '-173px',

                        }}
                    />


                    <h1
                        className="font-helvetica font-bold uppercase mt-12 sm:mt-16 md:mt-[150px] lg:mt-[180px] text-left text-white max-w-[150px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[431px] relative left-[-30px] lg:left-[-75px] top-[40px] leading-[1.2]"
                        style={{
                            fontFamily: "Helvetica",
                            fontWeight: 700,
                            fontSize: "50px",
                            lineHeight: "0.8", // ✅ increased from 1 to 1.2
                            letterSpacing: "-0.06em",
                            height: "auto",
                            position: "relative",
                            top: '60px',
                            left: '-170px',
                        }}
                    >
  <span className="xs:text-[36px] sm:text-[42px] md:text-[52px] lg:text-[75px]">
    Digital
    <br/>
    Potential
  </span>
                    </h1>

                </div>

                {/* Center Triangles */}
                <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none scale-50 xs:scale-60 sm:scale-70 md:scale-80 lg:scale-100">
                    {/* Outer Triangle */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="261px"
                        height="269px"
                        viewBox="0 0 263 271"
                        fill="none"
                        style={{
                            transform: "rotate(-125deg)",
                            marginTop: "clamp(-20px, -10vw, 10px)",
                            marginLeft: "clamp(-40px, -10vw, 0px)",
                        }}
                    >
                        <path
                            opacity="0.35"
                            d="M9.21422 7.66546C2.40064 13.9388 0.0696865 23.7968 1.32482 32.7587C10.2901 103.557 19.076 174.535 28.0412 245.334C28.9377 253.579 32.5238 262.183 39.696 266.843C48.3026 272.758 59.9574 269.711 67.3089 263.079C128.81 211.996 190.312 160.913 251.813 109.831C258.627 104.274 263.648 95.3126 261.496 86.5299C259.344 77.2096 250.738 70.9363 242.131 68.0685C174.175 46.3807 106.039 24.5138 38.0823 2.82604C28.5791 -0.400235 16.745 0.316723 9.21422 7.66546Z"
                            stroke="url(#paint0_linear_2555_3413)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_2555_3413"
                                x1="15.5"
                                y1="136"
                                x2="262"
                                y2="107"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#BD0909" />
                                <stop offset="1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Inner Triangle */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="261px"
                        height="269px"
                        viewBox="0 0 263 271"
                        fill="none"
                        style={{
                            transform: "rotate(-125deg) translate(-45px, -40px)",
                            position: "absolute",
                            top: "-10%",
                            left: "10%",
                        }}
                    >
                        <path
                            opacity="0.35"
                            d="M9.21422 7.66546C2.40064 13.9388 0.0696865 23.7968 1.32482 32.7587C10.2901 103.557 19.076 174.535 28.0412 245.334C28.9377 253.579 32.5238 262.183 39.696 266.843C48.3026 272.758 59.9574 269.711 67.3089 263.079C128.81 211.996 190.312 160.913 251.813 109.831C258.627 104.274 263.648 95.3126 261.496 86.5299C259.344 77.2096 250.738 70.9363 242.131 68.0685C174.175 46.3807 106.039 24.5138 38.0823 2.82604C28.5791 -0.400235 16.745 0.316723 9.21422 7.66546Z"
                            stroke="url(#paint0_linear_2555_3413)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_2555_3413"
                                x1="35.5"
                                y1="136"
                                x2="262"
                                y2="107"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#BD0909" />
                                <stop offset="1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    );
}