"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const phases = [
  {
    number: "01",
    title: "Discover\nLet's Talk.",
    icon: "/images/fir.svg",
  },
  {
    number: "02",
    title: "Design &\nStrategize.",
    icon: "/images/sec.svg",
  },
  {
    number: "03",
    title: "Launch &\nEngage.",
    icon: "/images/thir.svg",
  },
  {
    number: "04",
    title: "Measure &\nGrow",
    icon: "/images/for.svg",
  },
];

export default function TransformationSystem() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textButtonRef = useRef<HTMLDivElement>(null);
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isTextButtonVisible, setIsTextButtonVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState([false, false, false, false]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Better mobile detection
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      return mobile;
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mobile = checkMobile();

    // Optimized observer options for mobile
    const observerOptions = {
      root: null,
      rootMargin: mobile ? "-10% 0px -10% 0px" : "0px",
      threshold: mobile ? [0.1, 0.2, 0.3] : [0.3, 0.5, 0.7],
    };

    const createObserver = (
        ref: React.RefObject<Element>,
        delay: number,
        setVisibleFn: () => void
    ) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > (mobile ? 0.1 : 0.3)) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
              setTimeout(() => {
                setVisibleFn();
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      observer.observe(ref.current);
      return observer;
    };

    // Reduced delays for mobile for faster, smoother experience
    const headingDelay = mobile ? 0 : 0;
    const textButtonDelay = mobile ? 100 : 200;
    const stepBaseDelay = mobile ? 150 : 300;
    const stepInterval = mobile ? 100 : 150;

    const headingObserver = createObserver(headingRef, headingDelay, () =>
        setIsHeadingVisible(true)
    );

    const textButtonObserver = createObserver(textButtonRef, textButtonDelay, () =>
        setIsTextButtonVisible(true)
    );

    const stepObservers = stepRefs.map((ref, idx) =>
        createObserver(ref, stepBaseDelay + idx * stepInterval, () => {
          setStepsVisible((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
          if (idx === stepRefs.length - 1) {
            setTimeout(() => setIsUnlocked(true), mobile ? 200 : 400);
          }
        })
    );

    // Improved scroll handling for mobile
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (ticking) return;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        if (!isUnlocked && sectionRef.current) {
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const threshold = mobile ? 0.15 : 0.2;

          // More precise mobile scroll detection
          if (mobile) {
            if (sectionRect.top < windowHeight * threshold &&
                sectionRect.bottom > windowHeight * (1 - threshold)) {
              // Smooth scroll with reduced motion for mobile
              sectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            }
          } else {
            if (sectionRect.top < windowHeight * threshold &&
                sectionRect.bottom > windowHeight * 0.8) {
              sectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }
        }
        ticking = false;
      });

      ticking = true;
    };

    // Throttled scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (headingObserver) headingObserver.disconnect();
      if (textButtonObserver) textButtonObserver.disconnect();
      stepObservers.forEach((observer) => observer && observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isUnlocked]);

  // Smoother animation functions with reduced motion for mobile
  const fadeInFromLeft = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0) scale(1)" : `translateX(${isMobile ? '-10px' : '-20px'}) scale(0.98)`,
    transition: `opacity ${isMobile ? '1s' : '1.5s'} cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${isMobile ? '1s' : '1.5s'} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  });

  const fadeInFromBottom = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : `translateY(${isMobile ? '10px' : '20px'}) scale(0.98)`,
    transition: `opacity ${isMobile ? '1s' : '1.5s'} cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${isMobile ? '1s' : '1.5s'} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  });

  const stepReveal = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : `translateY(${isMobile ? '15px' : '30px'}) scale(0.95)`,
    transition: `opacity ${isMobile ? '1.2s' : '1.6s'} cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${isMobile ? '1.2s' : '1.6s'} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  });

  const handleButtonClick = () => {
    router.push("/contact");
  };

  return (
      <section
          ref={sectionRef}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-black px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden ${
              !isUnlocked && !isMobile ? "sticky top-0" : ""
          }`}
          style={{
            // Ensure smooth rendering on mobile
            willChange: 'transform',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
      >
        <div className="w-full mx-0">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-10 md:mb-12 lg:justify-between">
            <h2
                ref={headingRef}
                className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase lg:text-left"
                style={{
                  fontFamily: "Helvetica",
                  ...fadeInFromLeft(isHeadingVisible),
                  willChange: 'transform, opacity'
                }}
            >
              Our 4-Phase System
              <br />
              for Digital Transformation
            </h2>
            <div
                ref={textButtonRef}
                className="flex flex-col mt-4 sm:mt-6 md:mt-0 w-full sm:w-auto items-start sm:items-end md:items-end lg:items-end"
                style={{
                  ...fadeInFromBottom(isTextButtonVisible),
                  willChange: 'transform, opacity'
                }}
            >
              <p
                  className="text-gray-200 text-sm sm:text-base md:text-lg leading-5 text-left sm:text-right"
                  style={{ fontFamily: "Sharp Grotesk", fontWeight: 300 }}
              >
                We craft your brand journey: <br /> clear steps, real impact.
              </p>
              <Button
                  onClick={handleButtonClick}
                  className="rounded-none bg-white text-[#E30000] hover:bg-gray-100 font-bold tracking-tighter flex items-center gap-1 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-xl px-3 py-1 sm:px-3 sm:py-1 md:px-5 md:py-2 lg:px-6 lg:py-2"
                  style={{
                    fontFamily: "Helvetica",
                    height: "auto",
                    transition: 'all 0.3s ease'
                  }}
              >
                <Image
                    src="/images/log.svg"
                    alt="Button Icon"
                    width={10}
                    height={10}
                    className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 object-contain"
                />
                Bug us — let's build.
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {phases.map((phase, idx) => (
                <div
                    key={phase.number}
                    ref={stepRefs[idx]}
                    className="flex flex-col"
                    style={{
                      ...stepReveal(stepsVisible[idx]),
                      willChange: 'transform, opacity'
                    }}
                >
              <span
                  className="text-gray-400 font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight"
                  style={{ fontFamily: "Helvetica" }}
              >
                {phase.number}
              </span>
                  <div
                      className="w-full h-px mt-2"
                      style={{
                        background: "linear-gradient(90deg, #000000, #666666, #A7A7A7, #FFFFFF)",
                        width: stepsVisible[idx] ? "100%" : "0%",
                        transition: `width ${isMobile ? '1.5s' : '2s'} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        willChange: 'width'
                      }}
                  />
                  <Image
                      src={phase.icon}
                      alt={`${phase.title.split("\n")[0]} Icon`}
                      width={48}
                      height={48}
                      className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 mt-2"
                  />
                  <h3
                      className="text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl leading-tight mt-2"
                      style={{ fontFamily: "Sharp Grotesk", fontWeight: 300 }}
                  >
                    {phase.title.split("\n").map((line, i) => (
                        <span key={i}>
                    {line}
                          {i < phase.title.split("\n").length - 1 && <br />}
                  </span>
                    ))}
                  </h3>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}