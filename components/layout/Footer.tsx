"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  PhoneCall,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.9 });

  useEffect(() => {
    controls.start(inView ? "animate" : "initial");
  }, [controls, inView]);

  const viralBugText = "viral bug".split("").map((char, i) => (
    <motion.span
      key={i}
      className="viral-letter"
      initial={{ color: "#ffffff" }}
      animate={controls}
      variants={{
        animate: {
          color: ["#ffffff", "#F21E1D", "#ffffff"],
          transition: {
            duration: 0.8,
            times: [0, 0.5, 1],
            delay: i * 0.15,
            ease: "easeInOut",
          },
        },
      }}
    >
      {char}
    </motion.span>
  ));

  return (
    <footer className="bg-black text-white" ref={ref} style={{ overflow: "hidden", margin: 0 }}>
      {/* Top Row: navigation + social */}
      <div className="border-t border-white/10 backdrop-blur-md pt-2 xs:pt-3 sm:pt-4 md:pt-6 lg:pt-9">
        <div className="flex justify-between items-center px-2 lg:px-10 overflow-hidden">
          {/* Left – internal nav links */}
          <div className="flex flex-nowrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-4 lg:gap-5 max-w-[45%] xs:max-w-[48%]">
            {["Home", "Services", "Portfolio", "Careers", "Contact"].map((text, i) => (
              <Link
                key={i}
                href={
                  text === "Home"
                    ? "/"
                    : text === "Careers"
                    ? "/contact#open-roles"
                    : `/${text.toLowerCase()}`
                }
                className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
              >
                <span className="text-[9px] xs:text-[8px] sm:text-[12px] md:text-sm lg:text-lg xl:text-xl pt-1 block">
  {text}
</span>

              </Link>
            ))}
          </div>

          {/* Right – contact and social icons */}
          <div className="flex flex-nowrap items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-4 lg:gap-5 max-w-[52%] xs:max-w-[50%] mt-1">
            <a
              href="mailto:viralbug.hyd@gmail.com"
              aria-label="Email"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              title="Email"
            >
              <Mail className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="tel:+91 97012 21406"
              aria-label="Phone"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              title="Phone"
            >
              <PhoneCall className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="https://www.google.com/maps/dir//Compound+AMB+mall,+Sarath+City+Capital+Mall,+B-406,+4th+Floor,+Block-B+Asian+Sun+City,+Commercial+Building,+X+Road,+Kothaguda,+Kondapur,+Telangana+500084/@17.458555,78.2806613,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bcb93003fa0ba8b:0x8579ddf682cec78!2m2!1d78.3630631!2d17.458572?entry=ttu&g_ep=EgoyMDI1MDYxNi4wIKXMDSoASAFQAw%3D%3D" // replace with real location URL
              aria-label="Location"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              target="_blank"
              rel="noopener noreferrer"
              title="Location"
            >
              <MapPin className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="https://www.instagram.com/viralbug.in/"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <Instagram className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="https://www.linkedin.com/company/viral-bug/"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
            <a
              href="https://www.facebook.com/viralbug.in/"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus-visible:outline-none"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <Facebook className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </a>
          </div>
        </div>
      </div>

      {/* Center animated “viral bug” */}
      <div className="relative flex flex-col items-center py-4 md:py-6 lg:py-8">
        <div
          className="w-full h-[1px] mb-2 md:mb-4"
          style={{
            background: "linear-gradient(to left, #000, #666, #A7A7A7, transparent)",
            maxWidth: "1440px",
          }}
        />
        <h2
          className="viral-bug-heading font-extrabold text-center leading-none tracking-tighter"
          style={{
            fontFamily: "League Spartan, sans-serif",
            fontSize: "clamp(3.5rem, 28vw, 480px)",
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: "clamp(3rem,24vw,400px)",
          }}
        >
          {viralBugText}
        </h2>
        <div
          className="w-full h-[1px] mt-2 md:mt-4"
          style={{
            background: "linear-gradient(to right, #000, #666, #A7A7A7, transparent)",
            maxWidth: "1440px",
          }}
        />
      </div>

      {/* Bottom line */}
      <div className="border-t border-white/10 backdrop-blur-md py-2">
        <div className="mx-auto max-w-screen-xl px-4 flex justify-between items-center">
          <p className="text-gray-400 text-[8px] xs:text-[9px] sm:text-xs md:text-sm lg:text-sm">
            Since 2023
          </p>
          <p className="text-gray-400 text-[6px] xs:text-[6px] sm:text-[6px] md:text-sm lg:text-sm">
            All Rights Reserved
          </p>
        </div>
      </div>

      <style jsx>{`
        .viral-bug-heading {
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .viral-bug-heading {
            font-size: clamp(3.5rem, 22vw, 140px) !important;
            line-height: 0.9 !important;
            letter-spacing: -0.04em !important;
            min-height: clamp(3rem, 20vw, 120px) !important;
          }
        }
      `}</style>
    </footer>
  );
}