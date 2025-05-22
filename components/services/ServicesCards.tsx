"use client";

import React, { useEffect, useRef, useState } from "react";

// Hook to observe a single element's visibility, triggers only on first downward scroll
function useSingleInView(threshold = 0.2) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY;
                if (entry.isIntersecting && currentScrollY > lastScrollY.current) {
                    setInView(true);
                    observer.disconnect();
                }
                lastScrollY.current = currentScrollY;
            },
            { threshold }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView] as const;
}

// List of moving images for each card (used on md+)
const movingImages = [
    "/images/up-log.svg",
    "/images/dow-log.svg",
    "/images/up-log.svg",
    "/images/dow-log.svg",
    "/images/up-log.svg",
    "/images/dow-log.svg",
];

function AnimatedFloatingImage({
                                   direction,
                                   imageSrc,
                                   alt,
                                   parentKey,
                                   animate,
                                   distance,
                                   delay = 0,
                               }: {
    direction: "left-to-right" | "right-to-left";
    imageSrc: string;
    alt: string;
    parentKey: number;
    animate: boolean;
    distance: number;
    delay?: number;
}) {
    useEffect(() => {
        if (!animate) return;
        const styleId = `animated-style-${parentKey}`;
        if (document.getElementById(styleId)) return;
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
      .anim-move-${parentKey} {
        animation: ${
            direction === "left-to-right"
                ? `moveLeftToRight${parentKey}`
                : `moveRightToLeft${parentKey}`
        } 4s cubic-bezier(0.4,0,0.2,1) ${delay}s both, fadeOutAnim${parentKey} 0.8s 4s linear both;
      }
      @keyframes moveLeftToRight${parentKey} {
        0% { transform: translateY(-50%) translateX(0); opacity: 1; }
        90% { transform: translateY(-50%) translateX(${distance}px); opacity: 1; }
        100% { transform: translateY(-50%) translateX(${distance}px); opacity: 0; }
      }
      @keyframes moveRightToLeft${parentKey} {
        0% { transform: translateY(-50%) translateX(0); opacity: 1; }
        90% { transform: translateY(-50%) translateX(-${distance}px); opacity: 1; }
        100% { transform: translateY(-50%) translateX(-${distance}px); opacity: 0; }
      }
      @keyframes fadeOutAnim${parentKey} {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
        document.head.appendChild(style);
        return () => {
            if (document.getElementById(styleId)) {
                document.getElementById(styleId)!.remove();
            }
        };
    }, [animate, distance, parentKey, direction, delay]);

    return (
        <div
            className="absolute z-30 pointer-events-none"
            style={{
                top: "60%",
                left: direction === "left-to-right" ? 0 : undefined,
                right: direction === "right-to-left" ? 0 : undefined,
                transform: "translateY(-50%)",
                width: 332.52,
                height: 80,
                opacity: animate ? 1 : 0,
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: direction === "left-to-right" ? "flex-start" : "flex-end",
            }}
        >
            <img
                src={imageSrc}
                alt={alt}
                width={332.52}
                height={80}
                className={`anim-move-${parentKey}`}
                style={{
                    width: 332.52,
                    height: 80,
                    objectFit: "contain",
                }}
                draggable={false}
            />
        </div>
    );
}

// Define a service card component to fix the hooks rule issue
function ServiceCard({
                         service,
                         index,
                         isEven,
                         distance,
                         movingImageSrc,
                         refCallback
                     }: {
    service: any;
    index: number;
    isEven: boolean;
    distance: number;
    movingImageSrc: string;
    refCallback: (el: HTMLDivElement | null) => void;
}) {
    const direction = isEven ? "right-to-left" : "left-to-right";
    const [cardRef, inView] = useSingleInView(0.5);

    // Combine refs
    const setCardRef = (el: HTMLDivElement | null) => {
        refCallback(el);
        if (cardRef) {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
    };

    const floatingImage = (
        <div className="hidden md:block">
            <AnimatedFloatingImage
                direction={direction}
                imageSrc={movingImageSrc}
                alt={service.title}
                parentKey={service.id}
                animate={inView}
                distance={distance}
                delay={0}
            />
        </div>
    );

    return (
        <div
            key={service.id}
            ref={setCardRef}
            className={`animated-card-${service.id} service-card bg-black border border-gray-800 w-full flex flex-col md:flex-row relative overflow-hidden h-auto md:h-[330px] ${isEven ? "even" : "odd"}`}
            style={{ position: "relative" }}
        >
            {floatingImage}
            <div className="md:hidden w-full p-4 xs:p-5 sm:p-6 flex flex-col gap-4">
                <h3
                    className="service-title uppercase text-white"
                    style={{
                        fontFamily: "Sharp Grotesk",
                        fontWeight: 400,
                        fontSize: "18px",
                        lineHeight: "100%",
                        letterSpacing: "-2%",
                        textTransform: "uppercase",
                    }}
                >
                    {service.title}
                </h3>
                <p
                    className="service-description text-[#CDCDCD]"
                    style={{
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "18px",
                        letterSpacing: "6%",
                    }}
                >
                    {service.description}
                </p>
                <div className="flex items-center justify-between gap-4">
                    <div className="service-image-container w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16">
                        <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-end">
                        <p
                            className="stat-label text-white"
                            style={{
                                fontFamily: "Sharp Grotesk",
                                fontWeight: 300,
                                fontSize: "18px",
                                lineHeight: "30px",
                                letterSpacing: "2%",
                            }}
                        >
                            {service.statLabel}
                        </p>
                        <div
                            className="stat-value"
                            style={{
                                fontFamily: "League Spartan, sans-serif",
                                fontWeight: 800,
                                fontSize: "48px", // Reduced for xs/sm
                                lineHeight: "40px", // Reduced for xs/sm
                                letterSpacing: "0%",
                                textAlign: "right",
                                color: "transparent",
                                background: "transparent",
                                WebkitTextStroke: "1px #F9F9F9",
                                textShadow: "none",
                            }}
                        >
                            {service.stat}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex w-full">
                {isEven ? (
                    <>
                        <div className="service-stat w-1/4 flex flex-col justify-center items-center ml-10">
                            <p
                                className="stat-label text-white mb-2"
                                style={{
                                    fontFamily: "Sharp Grotesk",
                                    fontWeight: 300,
                                    fontSize: "22.26px",
                                    lineHeight: "41.74px",
                                    letterSpacing: "2%",
                                }}
                            >
                                {service.statLabel}
                            </p>
                            <div
                                className="stat-value"
                                style={{
                                    width: 332.52,
                                    height: 80,
                                    fontFamily: "League Spartan, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "97.39px",
                                    lineHeight: "79.86px",
                                    letterSpacing: "0%",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "transparent",
                                    background: "transparent",
                                    margin: "0 auto",
                                    WebkitTextStroke: "1px #F9F9F9",
                                    textShadow: "none",
                                }}
                            >
                                {service.stat}
                            </div>
                        </div>
                        <div
                            className="service-image flex-1 flex items-center justify-center"
                            style={{ marginLeft: "150px" }}
                        >
                            <div className="service-image-container w-[200px] h-[200px]">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="service-info w-1/4 flex flex-col justify-center p-6 mr-10">
                            <h3
                                className="service-title uppercase mb-4 text-white"
                                style={{
                                    fontFamily: "Sharp Grotesk",
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    lineHeight: "100%",
                                    letterSpacing: "-2%",
                                    textTransform: "uppercase",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                className="service-description text-[#CDCDCD]"
                                style={{
                                    fontFamily: "Helvetica",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    letterSpacing: "6%",
                                }}
                            >
                                {service.description}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="service-info w-1/4 flex flex-col justify-center p-6 ml-10">
                            <h3
                                className="service-title uppercase mb-4 text-white"
                                style={{
                                    fontFamily: "Sharp Grotesk",
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    lineHeight: "100%",
                                    letterSpacing: "-2%",
                                    textTransform: "uppercase",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                className="service-description text-[#CDCDCD]"
                                style={{
                                    fontFamily: "Helvetica",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    letterSpacing: "6%",
                                }}
                            >
                                {service.description}
                            </p>
                        </div>
                        <div
                            className="service-image flex-1 flex items-center justify-center"
                            style={{ marginRight: "250px" }}
                        >
                            <div className="service-image-container w-[200px] h-[200px]">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="service-stat w-1/4 flex flex-col justify-center items-center mr-10">
                            <p
                                className="stat-label text-white mb-2"
                                style={{
                                    fontFamily: "Sharp Grotesk",
                                    fontWeight: 300,
                                    fontSize: "22.26px",
                                    lineHeight: "41.74px",
                                    letterSpacing: "2%",
                                }}
                            >
                                {service.statLabel}
                            </p>
                            <div
                                className="stat-value"
                                style={{
                                    width: 332.52,
                                    height: 80,
                                    fontFamily: "League Spartan, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "97.39px",
                                    lineHeight: "79.86px",
                                    letterSpacing: "0%",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "transparent",
                                    background: "transparent",
                                    margin: "0 auto",
                                    WebkitTextStroke: "1px #F9F9F9",
                                    textShadow: "none",
                                }}
                            >
                                {service.stat}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ServicesCards() {
    const services = [
        {
            id: 1,
            title: "PERFORMANCE MARKETING",
            description: "Maximize ROI with laser-focused ad campaigns",
            stat: "94.07%",
            statLabel: "Total Meta Reach",
            image: "/images/mic.svg",
        },
        {
            id: 2,
            title: "SOCIAL MEDIA",
            description: "Engage with your audience through strategic content",
            stat: "87.5%",
            statLabel: "Engagement Rate",
            image: "/images/met.svg",
        },
        {
            id: 3,
            title: "CONTENT STRATEGY",
            description: "Craft compelling narratives that resonate with users",
            stat: "72.3%",
            statLabel: "Conversion Rate",
            image: "/images/dev.svg",
        },
        {
            id: 4,
            title: "SEO OPTIMIZATION",
            description: "Climb search rankings with data-driven techniques",
            stat: "89.1%",
            statLabel: "Organic Traffic",
            image: "/images/des.svg",
        },
        {
            id: 5,
            title: "EMAIL MARKETING",
            description: "Deliver targeted campaigns directly to customers",
            stat: "65.8%",
            statLabel: "Open Rate",
            image: "/images/inc-nor.svg",
        },
        {
            id: 6,
            title: "ANALYTICS & DATA",
            description: "Make informed decisions with comprehensive insights",
            stat: "98.2%",
            statLabel: "Data Accuracy",
            image: "/images/ger.svg",
        },
    ];

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [distances, setDistances] = useState<number[]>(Array(services.length).fill(1200));

    useEffect(() => {
        const updateDistances = () => {
            setDistances(
                cardRefs.current.map((el) => (el ? el.offsetWidth - 332.52 : 1200))
            );
        };
        updateDistances();
        window.addEventListener("resize", updateDistances);
        return () => window.removeEventListener("resize", updateDistances);
    }, []);

    return (
        <div className="services-list bg-black w-full mt-[-80px] relative overflow-hidden">
            <header className="services-header w-full px-4 py-8 xs:px-6 sm:px-8 md:px-20 md:py-20 flex justify-start relative z-20">
                <h1
                    className="header-title font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-gray-200 tracking-tight"
                    style={{ fontFamily: "Helvetica" }}
                >
                    Services We Provide
                </h1>
            </header>
            <section className="services-section w-full px-4 xs:px-6 sm:px-8 md:px-20 pb-16 relative z-20">
                <div className="flex flex-col gap-6 xs:gap-8 sm:gap-10 md:gap-12">
                    {services.map((service, index) => {
                        const isEven = index % 2 === 1;
                        const movingImageSrc = movingImages[index % movingImages.length] || service.image;

                        // Create a callback for the ref
                        const setRef = (el: HTMLDivElement | null) => {
                            cardRefs.current[index] = el;
                        };

                        return (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                isEven={isEven}
                                distance={distances[index]}
                                movingImageSrc={movingImageSrc}
                                refCallback={setRef}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}