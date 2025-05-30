"use client";

import React, { useEffect, useRef, useState } from "react";

// Hook to observe a single element's visibility
function useSingleInView(threshold: number = 0.1): [React.RefObject<HTMLDivElement>, boolean] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !inView) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '50px 0px' }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, inView]);

    return [ref, inView];
}

// List of moving images for each card (used on lg+)
const movingImages: string[] = [
    "/images/right.svg",
    "/images/left.svg",
    "/images/right.svg",
    "/images/left.svg",
    "/images/right.svg",
    "/images/left.svg",
];

interface AnimatedFloatingImageProps {
    direction: "left-to-right" | "right-to-left";
    imageSrc: string;
    alt: string;
    parentKey: number;
    animate: boolean;
    distance: number;
    delay?: number;
    isMobile?: boolean;
}

function AnimatedFloatingImage({
                                   direction,
                                   imageSrc,
                                   alt,
                                   parentKey,
                                   animate,
                                   distance,
                                   delay = 0,
                                   isMobile = false,
                               }: AnimatedFloatingImageProps) {
    useEffect(() => {
        if (!animate) return;
        const styleId = `animated-style-${parentKey}${isMobile ? '-mobile' : ''}`;
        if (document.getElementById(styleId)) return;
        const style = document.createElement("style");
        style.id = styleId;

        // For mobile, always use left-to-right
        const actualDirection = isMobile ? "left-to-right" : direction;
        const width = isMobile ? 150 : 332.52;
        const height = isMobile ? 36 : 80;

        // Faster animation for desktop (1s instead of 2s), keep mobile at 2s
        const animationDuration = isMobile ? "2s" : "1s";

        style.innerHTML = `
      .anim-move-${parentKey}${isMobile ? '-mobile' : ''} {
        animation: ${
            actualDirection === "left-to-right"
                ? `moveLeftToRight${parentKey}${isMobile ? 'Mobile' : ''}`
                : `moveRightToLeft${parentKey}${isMobile ? 'Mobile' : ''}`
        } ${animationDuration} linear forwards;
      }
      @keyframes moveLeftToRight${parentKey}${isMobile ? 'Mobile' : ''} {
        0% { 
          transform: translateY(-50%) translateX(0); 
          opacity: 0; 
        }
        10% { 
          transform: translateY(-50%) translateX(${distance * 0.1}px); 
          opacity: 0.4; 
        }
        25% { 
          transform: translateY(-50%) translateX(${distance * 0.25}px); 
          opacity: 0.8; 
        }
        50% { 
          transform: translateY(-50%) translateX(${distance * 0.5}px); 
          opacity: 1; 
        }
        75% { 
          transform: translateY(-50%) translateX(${distance * 0.75}px); 
          opacity: 0.8; 
        }
        90% { 
          transform: translateY(-50%) translateX(${distance * 0.9}px); 
          opacity: 0.4; 
        }
        100% { 
          transform: translateY(-50%) translateX(${distance}px); 
          opacity: 0; 
        }
      }
      @keyframes moveRightToLeft${parentKey}${isMobile ? 'Mobile' : ''} {
        0% { 
          transform: translateY(-50%) translateX(0); 
          opacity: 0; 
        }
        10% { 
          transform: translateY(-50%) translateX(-${distance * 0.1}px); 
          opacity: 0.4; 
        }
        25% { 
          transform: translateY(-50%) translateX(-${distance * 0.25}px); 
          opacity: 0.8; 
        }
        50% { 
          transform: translateY(-50%) translateX(-${distance * 0.5}px); 
          opacity: 1; 
        }
        75% { 
          transform: translateY(-50%) translateX(-${distance * 0.75}px); 
          opacity: 0.8; 
        }
        90% { 
          transform: translateY(-50%) translateX(-${distance * 0.9}px); 
          opacity: 0.4; 
        }
        100% { 
          transform: translateY(-50%) translateX(-${distance}px); 
          opacity: 0; 
        }
      }
    `;
        document.head.appendChild(style);
        return () => {
            if (document.getElementById(styleId)) {
                document.getElementById(styleId)!.remove();
            }
        };
    }, [animate, distance, parentKey, direction, delay, isMobile]);

    const width = isMobile ? 150 : 332.52;
    const height = isMobile ? 36 : 80;
    const actualDirection = isMobile ? "left-to-right" : direction;

    return (
        <div
            className="absolute z-10 pointer-events-none"
            style={{
                top: isMobile ? "70%" : "50%", // Moved down more on mobile (70% instead of 60%)
                left: actualDirection === "left-to-right" ? 0 : undefined,
                right: actualDirection === "right-to-left" ? 0 : undefined,
                transform: "translateY(-50%)",
                width: width,
                height: height,
                opacity: animate ? 1 : 0,
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: actualDirection === "left-to-right" ? "flex-start" : "flex-end",
            }}
        >
            <img
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                className={animate ? `anim-move-${parentKey}${isMobile ? '-mobile' : ''}` : ''}
                style={{
                    width: width,
                    height: height,
                    objectFit: "contain",
                }}
                draggable={false}
            />
        </div>
    );
}

interface Service {
    id: number;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
    image: string;
}

interface ServiceCardProps {
    service: Service;
    index: number;
    isEven: boolean;
    distance: number;
    movingImageSrc: string;
    refCallback: (el: HTMLDivElement | null) => void;
}

function ServiceCard({
                         service,
                         index,
                         isEven,
                         distance,
                         movingImageSrc,
                         refCallback,
                     }: ServiceCardProps) {
    const direction = isEven ? "right-to-left" : "left-to-right";
    const [cardRef, inView] = useSingleInView(0.1);
    const [isHovered, setIsHovered] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Track mobile state
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Combine refs
    const setCardRef = (el: HTMLDivElement | null) => {
        refCallback(el);
        if (cardRef) {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
    };

    // Auto-trigger animation when in view
    useEffect(() => {
        if (inView && !hasAnimated) {
            if (isMobile) {
                // For mobile, trigger animation immediately for first few cards, then with delay
                const delay = index <= 1 ? 100 : 200 + (index * 100);
                const timer = setTimeout(() => {
                    setIsHovered(true);
                    setHasAnimated(true);
                }, delay);

                return () => clearTimeout(timer);
            }
        }
    }, [inView, hasAnimated, index, isMobile]);

    // Check if first cards are already visible on page load
    useEffect(() => {
        if (isMobile && index <= 1 && !hasAnimated) {
            // For first two cards on mobile, trigger animation after a short delay
            const timer = setTimeout(() => {
                if (!hasAnimated) {
                    setIsHovered(true);
                    setHasAnimated(true);
                }
            }, 500 + (index * 200));

            return () => clearTimeout(timer);
        }
    }, [isMobile, index, hasAnimated]);

    const handleMouseEnter = () => {
        // Only trigger on desktop and when in view
        if (!isMobile && !hasAnimated && inView) {
            setIsHovered(true);
            setHasAnimated(true);
        }
    };

    const handleMouseLeave = () => {
        // Keep the animation state but don't trigger again
    };

    // Calculate mobile distance - ensuring it goes from left edge to right edge
    const mobileDistance = typeof window !== 'undefined' ? Math.max(window.innerWidth - 150, 200) : 200;

    // Desktop floating image
    const desktopFloatingImage = (
        <div className="hidden lg:block">
            <AnimatedFloatingImage
                direction={direction}
                imageSrc={movingImageSrc}
                alt={service.title}
                parentKey={service.id}
                animate={isHovered}
                distance={distance}
                delay={0}
                isMobile={false}
            />
        </div>
    );

    // Mobile floating image (always left-to-right, using right.svg only)
    const mobileFloatingImage = (
        <div className="block lg:hidden">
            <AnimatedFloatingImage
                direction="left-to-right"
                imageSrc="/images/right.svg"
                alt={service.title}
                parentKey={service.id}
                animate={isHovered}
                distance={mobileDistance}
                delay={0}
                isMobile={true}
            />
        </div>
    );

    return (
        <div
            key={service.id}
            ref={setCardRef}
            className={`animated-card-${service.id} service-card bg-black w-full flex flex-col lg:flex-row relative overflow-hidden h-auto lg:h-[330px] ${isEven ? "even" : "odd"} sm:rounded-[20px] xs:rounded-[20px] cursor-pointer transition-all duration-300`}
            style={{
                position: "relative",
                animationDelay: `${index * 0.1}s`,
                zIndex: 10 + index,
                '--card-index': index
            } as React.CSSProperties & { '--card-index': number }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {desktopFloatingImage}
            {mobileFloatingImage}

            {/* Mobile Layout */}
            <div className="lg:hidden w-full p-4 xs:p-5 sm:p-6 flex flex-col gap-4">
                {/* Title and Description */}
                <div className="w-full">
                    <h3
                        className="service-title uppercase text-white whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{
                            fontFamily: "Sharp Grotesk",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "-2%",
                            textTransform: "uppercase",
                        }}
                    >
                        {service.title}
                    </h3>
                    <p
                        className="service-description text-[#CDCDCD] mt-3"
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
                </div>

                {/* Image Left, Stats Right */}
                <div className="flex items-center justify-between gap-4">
                    <div className="service-image-container w-20 h-20 xs:w-28 xs:h-28 sm:w-32 sm:h-32 flex items-center justify-center flex-shrink-0">
                        <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            className="w-full h-full object-contain"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </div>
                    <div className="text-right">
                        <p
                            className="stat-label text-gray-300 mb-3" // Increased margin-bottom from mb-1 to mb-3
                            style={{
                                fontFamily: "Helvetica",
                                fontWeight: 300,
                                fontSize: "16px",
                                lineHeight: "20px",
                                letterSpacing: "2%",
                            }}
                        >
                            {service.statLabel}
                        </p>
                        <div
                            className="stat-value"
                            style={{
                                fontFamily: "League Spartan",
                                fontWeight: 800,
                                fontSize: "48px",
                                lineHeight: "32px",
                                letterSpacing: "0%",
                                color: "transparent",
                                background: "transparent",
                                WebkitTextStrokeWidth: "0.8px",
                                WebkitTextStrokeColor: "#F9F9F9",
                                textShadow: "none",
                                marginTop: "8px", // Added margin-top to move stat downward
                            }}
                        >
                            {service.stat}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex w-full relative z-20">
                {isEven ? (
                    <>
                        {/* Left: Stats */}
                        <div className="service-stat w-1/4 flex flex-col justify-center items-start px-10">
                            <p
                                className="stat-label text-gray-300 mb-2"
                                style={{
                                    fontFamily: "Helvetica",
                                    fontWeight: 500,
                                    fontSize: "23px",
                                    lineHeight: "41.74px",
                                    letterSpacing: "2%",
                                    textAlign: "left",
                                }}
                            >
                                {service.statLabel}
                            </p>
                            <div
                                className="stat-value"
                                style={{
                                    fontFamily: "League Spartan, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "97.3913px",
                                    lineHeight: "79.86px",
                                    letterSpacing: "0%",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    color: "transparent",
                                    background: "transparent",
                                    WebkitTextStroke: "1px #E5E5E5",
                                    textShadow: "none",
                                }}
                            >
                                {service.stat}
                            </div>
                        </div>

                        {/* Center: Image */}
                        <div className="service-image flex-1 flex items-center justify-center">
                            <div className="service-image-container w-[200px] h-[200px] flex items-center justify-center">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="w-full h-full object-contain"
                                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                                />
                            </div>
                        </div>

                        {/* Right: Text Info */}
                        <div className="service-info w-1/4 flex flex-col justify-center items-end px-10">
                            <div className="text-right">
                                <h3
                                    className="service-title uppercase mb-4 text-white leading-none"
                                    style={{
                                        fontFamily: "Sharp Grotesk",
                                        fontWeight: 400,
                                        fontSize: "22px",
                                        lineHeight: "100%",
                                        letterSpacing: "-2%",
                                        textTransform: "uppercase",
                                        textAlign: "right",
                                        whiteSpace: "nowrap",
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
                                        textAlign: "right",
                                    }}
                                >
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Left: Text Info */}
                        <div className="service-info w-1/4 flex flex-col justify-center items-start px-10">
                            <div className="text-left">
                                <h3
                                    className="service-title uppercase mb-4 text-white leading-none"
                                    style={{
                                        fontFamily: "Sharp Grotesk",
                                        fontWeight: 400,
                                        fontSize: "22px",
                                        lineHeight: "100%",
                                        letterSpacing: "-2%",
                                        textTransform: "uppercase",
                                        textAlign: "left",
                                        whiteSpace: "nowrap",
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
                                        textAlign: "left",
                                    }}
                                >
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        {/* Center: Image */}
                        <div className="service-image flex-1 flex items-center justify-center">
                            <div className="service-image-container w-[200px] h-[200px] flex items-center justify-center">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.title}
                                    className="w-full h-full object-contain"
                                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                                />
                            </div>
                        </div>

                        {/* Right: Stats */}
                        <div className="service-stat w-1/4 flex flex-col justify-center items-end px-10">
                            <div className="text-right w-full">
                                <p
                                    className="stat-label text-gray-300 mb-2"
                                    style={{
                                        fontFamily: "Helvetica",
                                        fontWeight: 400,
                                        fontSize: "24px",
                                        lineHeight: "41.74px",
                                        letterSpacing: "2%",
                                        textAlign: "right",
                                    }}
                                >
                                    {service.statLabel}
                                </p>
                                <div
                                    className="stat-value"
                                    style={{
                                        fontFamily: "League Spartan, sans-serif",
                                        fontWeight: 800,
                                        fontSize: "97.39px",
                                        lineHeight: "79.86px",
                                        letterSpacing: "0%",
                                        textAlign: "right",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        color: "transparent",
                                        background: "transparent",
                                        WebkitTextStroke: "1px #E5E5E5",
                                        textShadow: "none",
                                    }}
                                >
                                    {service.stat}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const ServicesCards: React.FC = () => {
    const services: Service[] = [
        {
            id: 1,
            title: "PERFORMANCE MARKETING",
            description: "Maximize ROI with laser-focused ad campaigns",
            stat: "94.07%",
            statLabel: "Total Ad Reach",
            image: "/images/mic.svg",
        },
        {
            id: 2,
            title: "SOCIAL MEDIA MARKETING",
            description: "Connecting, engaging, and growing your audience online.",
            stat: "80.35%",
            statLabel: "Audience Engagement",
            image: "/images/met.svg",
        },
        {
            id: 3,
            title: "WEBSITE DEVELOPMENT",
            description: "Building your digital storefront, pixel by perfect pixel.",
            stat: "67.34%",
            statLabel: "Website Traffic Growth",
            image: "/images/dev.svg",
        },
        {
            id: 4,
            title: "BRANDING AND CREATIVE DESIGN",
            description: "Give your brand a look and voice people remember",
            stat: "75.42%",
            statLabel: "Brand Visibility Impact",
            image: "/images/des.svg",
        },
        {
            id: 5,
            title: "ANALYTICS AND REPORTING",
            description: "Unlocking insights, driving smarter decisions.",
            stat: "82.19%",
            statLabel: "Data-Driven Insights",
            image: "/images/inc-nor.svg",
        },
        {
            id: 6,
            title: "SEO(SEARCH ENGINE OPTIMIZATION)",
            description: "Get found faster with smart SEO solutions.",
            stat: "63.87%",
            statLabel: "Organic Traffic Growth",
            image: "/images/gear.svg",
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
            <style>
                {`
                    @media (max-width: 1023px) {
                        .service-card {
                            animation: stackCard 0.5s ease-out forwards;
                            animation-delay: calc(var(--card-index) * 0.1s);
                            transform: translateY(50px) scale(0.95);
                            opacity: 0;
                            z-index: calc(10 + var(--card-index));
                            position: relative;
                        }
                        @keyframes stackCard {
                            0% { transform: translateY(50px) scale(0.95); opacity: 0; }
                            100% { transform: translateY(0) scale(1); opacity: 1; }
                        }
                    }
                `}
            </style>
            <header className="services-header w-full px-4 py-8 xs:px-6 sm:px-8 lg:px-20 lg:py-20 flex justify-start relative z-30">
                <h1
                    className="header-title font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-gray-200 tracking-tight"
                    style={{ fontFamily: "Helvetica" }}
                >
                    Services We Provide
                </h1>
            </header>
            <section className="services-section w-full px-4 xs:px-6 sm:px-8 lg:px-20 pb-16 relative z-20">
                <div className="flex flex-col gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
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
};

export default ServicesCards;