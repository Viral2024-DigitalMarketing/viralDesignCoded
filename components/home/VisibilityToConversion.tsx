"use client"

import React from 'react';

interface ServiceItem {
  title: string;
  mobileTitle?: string;
  description: string;
  image: string;
}

export default function ServicesSection(): React.ReactElement {
  const services: ServiceItem[] = [
    {
      title: "Performance<br>Marketing",
      description: "Maximize ROI with laser-focused ad campaigns.",
      image: "/images/camp-col.svg",
    },
    {
      title: "Social Media<br>Marketing",
      description: "Connecting, engaging, and growing your audience online.",
      image: "/images/meta.svg",
    },
    {
      title: "Website<br>Development",
      description: "Building your digital storefront, pixel by perfect pixel.",
      image: "/images/devment.svg",
    },
    {
      title: "Branding and<br>Creative Design",
      description: "Give your brand a look and voice people remember.",
      image: "/images/design.svg",
    },
    {
      title: "Analytics and<br>Reporting",
      description: "Unlocking insights, driving smarter decisions.",
      image: "/images/incre.svg",
    },
    {
      title: "Search Engine<br>Optimization",
      mobileTitle: "SEO",
      description: "Get found faster with smart SEO solutions.",
      image: "/images/seo.svg",
    },
  ];

  return (
      <section className="w-full px-4 pt-10 pb-16 sm:pb-20 bg-white sm:bg-black">
        {/* Heading with 80px left padding for large screens */}
        <div className="lg:pl-20 xl:pl-20 2xl:pl-20">
          <h2
              className="
            font-helvetica font-bold
            text-[1.6rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[4.2rem] lg:text-[7xl] xl:text-[7xl] 2xl:text-[7xl]
            tracking-tighter
            mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-10 2xl:mb-10
            text-black sm:text-black md:text-black lg:text-white xl:text-white 2xl:text-white
            text-left md:text-left lg:text-left xl:text-left 2xl:text-left
            leading-[1.1] xs:leading-[1.05] sm:leading-[1.08] md:leading-[1.15] lg:leading-[1.2] xl:leading-[1.2] 2xl:leading-[1.2]
          "
          >
            From visibility to conversion—we cover it all
          </h2>
        </div>

        <div className="flex justify-center">
          {/* Mobile Layout (xs/sm/md, hidden on lg and up) - UNCHANGED */}
          <div
              className="w-full max-w-[370px] sm:max-w-[390px] md:max-w-[720px] grid grid-cols-2 gap-5 sm:gap-6 md:gap-5 place-items-center lg:hidden">
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
                  {/* Image at the top */}
                  <div className="flex justify-center items-center mb-[2px] sm:mb-[3px] md:mb-[1px]">
                    <img
                        src={service.image || "/placeholder.svg"}
                        alt={(service.mobileTitle || service.title).replace('<br>', ' ')}
                        className="object-contain filter brightness-0 invert"
                        style={{
                          width: "72px",
                          height: "72px",
                          padding: "5.33px",
                          transform: "rotate(0deg)",
                        }}
                    />
                  </div>

                  {/* Text below the image - Allow wrapping to two lines */}
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
                        dangerouslySetInnerHTML={{__html: service.mobileTitle || service.title}}
                    />
                  </div>
                </div>
            ))}
          </div>

          {/* Desktop Layout (visible on lg and up) */}
          <div className="hidden lg:block w-full">
            {/* Container with responsive max-width */}
            <div className="px-4 lg:px-20 xl:px-20 2xl:px-20 mx-auto max-w-[1280px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
              <div className="grid grid-cols-3 gap-x-10 lg:gap-x-10 xl:gap-x-12 2xl:gap-x-14 gap-y-4 justify-items-center">
                {services.map((service, index) => (
                    <div
                        key={`desktop-${index}`}
                        className="p-6 lg:p-7 xl:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group bg-black hover:bg-[#B33C3C]"
                        style={{
                          width: "100%",
                          maxWidth: "350px",
                          height: "380px"
                        }}
                    >
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3
                            className="mb-2 transition-colors duration-300 text-white uppercase"
                            style={{
                              fontFamily: "Sharp Grotesk, sans-serif",
                              fontWeight: 550,
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "-2%",
                            }}
                        >
                          {service.title.replace('<br>', ' ')}
                        </h3>
                        <p
                            className="text-gray-400 group-hover:text-white transition-colors duration-300 mb-4 mt-3"
                            style={{
                              fontFamily: "Sharp Grotesk, sans-serif",
                              fontWeight: 300,
                              fontSize: "16px",
                              lineHeight: "20px",
                              letterSpacing: "0%",

                            }}
                        >
                          {service.description}
                        </p>

                        {/* Button that appears on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                          <button
                              className="w-[135px] h-[32px] px-4 py-2 border border-white text-white uppercase tracking-tighter"
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

                      <div className="mt-auto transform transition-transform duration-300 group-hover:-translate-y-2">
                        <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title.replace('<br>', ' ')}
                            className="w-[160px] h-[160px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] mx-auto object-contain transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                        />

                        {/* Light gradient at the bottom that disappears on hover */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                            style={{background: "linear-gradient(to top, #6013123B, transparent)"}}
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