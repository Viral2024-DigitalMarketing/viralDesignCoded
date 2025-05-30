"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ServiceItem {
  title: string;
  mobileTitle?: string;
  description: string;
  image: string;
}

export default function ServicesSection(): React.ReactElement {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact");
  };

  const services: ServiceItem[] = [
    {
      title: "Performance<br>Marketing",
      description: "Maximize ROI with laser-focused ad campaigns.",
      image: "/images/one.svg",
    },
    {
      title: "Social Media<br>Marketing",
      description: "Connecting, engaging, and growing your audience online.",
      image: "/images/two.svg",
    },
    {
      title: "Website<br>Development",
      description: "Building your digital storefront, pixel by perfect pixel.",
      image: "/images/three.svg",
    },
    {
      title: "Branding and<br>Creative Design",
      description: "Give your brand a look and voice people remember.",
      image: "/images/four.svg",
    },
    {
      title: "Analytics and<br>Reporting",
      description: "Unlocking insights, driving smarter decisions.",
      image: "/images/five.svg",
    },
    {
      title: "Search Engine<br>Optimization",
      mobileTitle: "SEO",
      description: "Get found faster with smart SEO solutions.",
      image: "/images/six.svg",
    },
  ];

  return (
      <section className="w-full px-4 pt-10 pb-16 sm:pb-20 bg-white sm:bg-black">
        {/* Heading with responsive left padding */}
        <div className="lg:pl-20 xl:pl-24 2xl:pl-28 3xl:pl-32 4xl:pl-40">
          <h2
              className="
            font-helvetica font-bold
            text-[1.6rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[4.2rem] lg:text-[7xl] xl:text-[8xl] 2xl:text-[9xl]
            tracking-tighter
            mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14
            text-black sm:text-black md:text-black lg:text-white xl:text-white 2xl:text-white
            text-left
            leading-[1.1] xs:leading-[1.05] sm:leading-[1.08] md:leading-[1.15] lg:leading-[1.2] xl:leading-[1.25] 2xl:leading-[1.3]
          "
          >
            From visibility to conversion—we cover it all
          </h2>
        </div>

        <div className="flex justify-center">
          {/* Mobile Layout (xs/sm/md, hidden on lg and up) - UNCHANGED */}
          <div
              className="w-full max-w-[370px] sm:max-w-[390px] md:max-w-[720px] grid grid-cols-2 gap-5 sm:gap-6 md:gap-5 place-items-center lg:hidden"
          >
            {services.map((service, index) => (
                <div
                    key={`mobile-${index}`}
                    className="flex flex-col justify-center items-center relative overflow-hidden rounded-lg mx-auto"
                    style={{
                      background: "linear-gradient(135deg, #B33C3C 0%, #B33C3C 100%)",
                      width: "170px",
                      height: "136px",
                      borderRadius: "8px",
                      padding: "16px 4px",
                      gap: "4px",
                    }}
                >
                  <div className="flex justify-center items-center mb-[2px] sm:mb-[3px] md:mb-[1px]">
                    <img
                        src={service.image || "/placeholder.svg"}
                        alt={(service.mobileTitle || service.title).replace("<br>", " ")}
                        className="object-contain filter brightness-0 invert"
                        style={{
                          width: "72px",
                          height: "72px",
                          padding: "5.33px",
                          transform: "rotate(0deg)",
                        }}
                    />
                  </div>
                  <div className="text-center">
                    <h3
                        className="text-white uppercase"
                        style={{
                          fontFamily: "Sharp Grotesk, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-2%",
                          textAlign: "center",
                          overflow: "visible",
                          whiteSpace: "normal",
                          display: "block",
                          maxHeight: "32px",
                        }}
                        dangerouslySetInnerHTML={{ __html: service.mobileTitle || service.title }}
                    />
                  </div>
                </div>
            ))}
          </div>

          {/* Desktop Layout (visible on lg and up) */}
          <div className="hidden lg:block w-full">
            <div className="px-4 lg:px-20 xl:px-24 2xl:px-28 3xl:px-32 4xl:px-40 mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px]">
              <div className="grid grid-cols-3 gap-x-6 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-12 3xl:gap-x-14 4xl:gap-x-16 gap-y-6 justify-items-center mx-auto">
                {services.map((service, index) => (
                    <div
                        key={`desktop-${index}`}
                        className="w-full max-w-[400px] h-[360px] lg:max-w-[420px] lg:h-[380px] xl:max-w-[460px] xl:h-[400px] 2xl:max-w-[500px] 2xl:h-[420px] 3xl:max-w-[540px] 3xl:h-[440px] 4xl:max-w-[580px] 4xl:h-[460px] p-6 lg:p-7 xl:p-8 2xl:p-9 3xl:p-10 4xl:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group bg-black hover:bg-[#B33C3C]"
                    >
                      <div className="flex flex-col h-full">
                        <h3
                            className="mb-2 transition-colors duration-300 text-white uppercase"
                            style={{
                              fontFamily: "Sharp Grotesk, sans-serif",
                              fontWeight: 500,
                              fontSize: "19px",
                              lineHeight: "100%",
                              letterSpacing: "-2%",
                            }}
                        >
                          {service.title.replace("<br>", " ")}
                        </h3>
                        <p
                            className="text-gray-400 group-hover:text-white transition-colors duration-300 mb-4 mt-3 flex-grow"
                            style={{
                              fontFamily: "Helvetica, sans-serif",
                              fontWeight: 500,
                              fontSize: "17.5px",
                              lineHeight: "24px",
                              letterSpacing: "0%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                        >
                          {service.description}
                        </p>

                        {/* Button that appears on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 mb-6">
                          <button
                              onClick={handleContactClick}
                              className="w-[135px] h-[32px] px-4 py-2 border border-white text-white uppercase tracking-tighter hover:bg-white hover:text-black transition-colors duration-200"
                              style={{
                                fontFamily: "Sharp Grotesk, sans-serif",
                                fontWeight: 300,
                                fontSize: "15px",
                                lineHeight: "100%",
                                letterSpacing: "-0.02em",
                              }}
                          >
                            Bug us Now
                          </button>
                        </div>
                      </div>

                      {/* Image section - Adjusted positioning */}
                      <div className="flex justify-center transform transition-transform duration-300 group-hover:-translate-y-2 pt-2">
                        <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title.replace("<br>", " ")}
                            className="w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] 2xl:w-[200px] 2xl:h-[200px] 3xl:w-[220px] 3xl:h-[220px] 4xl:w-[240px] 4xl:h-[240px] object-contain transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                        />
                        <div
                            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                            style={{ background: "linear-gradient(to top, #6013123B, transparent)" }}
                        ></div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}