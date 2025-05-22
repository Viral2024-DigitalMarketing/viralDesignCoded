"use client";

import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: isMobile ? 0.1 : 0.3, // Lower threshold on mobile for earlier trigger
    };

    const createObserver = (
        ref: React.RefObject<Element>,
        delay: number,
        setVisibleFn: () => void
    ) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleFn();
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      observer.observe(ref.current);

      return observer;
    };

    const headingObserver = createObserver(headingRef, isMobile ? 50 : 100, () =>
        setIsHeadingVisible(true)
    );
    const textButtonObserver = createObserver(textButtonRef, isMobile ? 150 : 300, () =>
        setIsTextButtonVisible(true)
    );
    const stepObservers = stepRefs.map((ref, idx) =>
        createObserver(ref, isMobile ? 300 + idx * 100 : 500 + idx * 200, () => {
          setStepsVisible((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
          if (idx === stepRefs.length - 1) {
            setTimeout(() => setIsUnlocked(true), isMobile ? 800 : 1200);
          }
        })
    );

    const handleScroll = () => {
      if (!isUnlocked && sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        if (sectionTop < 0) {
          window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (headingObserver) {
        headingObserver.disconnect();
      }

      if (textButtonObserver) {
        textButtonObserver.disconnect();
      }

      stepObservers.forEach((observer) => {
        if (observer) {
          observer.disconnect();
        }
      });

      window.removeEventListener("scroll", handleScroll);
    };
  }, [isUnlocked]);

  const fadeInFromLeft = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0) scale(1)" : "translateX(-50px) scale(0.95)",
    transition:
        "opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  const fadeInFromBottom = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
    transition:
        "opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  const stepReveal = (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
    transition:
        "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  return (
      <section
          ref={sectionRef}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-black px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden ${
              !isUnlocked ? "sticky top-0" : ""
          }`}
      >
        <div className="w-full mx-0">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-10 md:mb-12 lg:justify-between">
            <h2
                ref={headingRef}
                className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase lg:text-left"
                style={{ fontFamily: "Helvetica", ...fadeInFromLeft(isHeadingVisible) }}
            >
              Our 4-Phase System
              <br />
              for Digital Transformation
            </h2>
            <div
                ref={textButtonRef}
                className="flex flex-col items-end mt-4 sm:mt-6 md:mt-0 lg:items-end"
                style={fadeInFromBottom(isTextButtonVisible)}
            >
              <p
                  className="text-gray-200 text-sm sm:text-base md:text-lg leading-5 text-right"
                  style={{ fontFamily: "Sharp Grotesk", fontWeight: 300 }}
              >
                We craft your brand journey: <br /> clear steps, real impact.
              </p>
              <Button
                  className="
                rounded-none bg-white text-primary hover:bg-gray-100
                px-3 sm:px-4 md:px-5 lg:px-6
                py-1 sm:py-1.5 md:py-2
                font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-tighter
                flex items-center gap-1 mt-2 sm:mt-3 md:mt-4"
              >
                <Image
                    src="/images/log.svg"
                    alt="Button Icon"
                    width={20}
                    height={20}
                    className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 object-contain"
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
                    style={stepReveal(stepsVisible[idx])}
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
                        background:
                            "linear-gradient(90deg, #000000, #666666, #A7A7A7, #FFFFFF)",
                        width: stepsVisible[idx] ? "100%" : "0%",
                        transition: "width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
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