"use client";

// Import necessary React hooks and Framer Motion for animations
import React, { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define TypeScript interface for Process data structure
interface Process {
    step: string;       // The step number
    text: string[];     // Array of text lines to display for each step
    description: string; // Description text for each step
}

// Process data - content for each step card
const processes: Process[] = [
    {
        step: '1',
        text: ['The', 'First', 'Step'],
        description: 'We begin with a personalized consultation to understand your goals, audience, and brand identity.',
    },
    {
        step: '2',
        text: ['Building', 'Your', 'Identity'],
        description: 'We develop a tailored strategy to align with your objectives and maximize impact.',
    },
    {
        step: '3',
        text: ['Campaigns', 'That', 'Connect'],
        description: 'We execute the plan with precision, ensuring every detail reflects your vision.',
    },
    {
        step: '4',
        text: ['Performance', 'You', 'Can', 'Measure'],
        description: 'We monitor and optimize to drive sustainable growth and measurable results.',
    },
];

// Style definitions for each card - colors for both before and after animation states
const cardStyles = [
    {
        backgroundColor: '#D46363',           // Red background for card 1
        textColor: '#FFFFFF',                 // White text color
        descriptionColor: '#FFFFFF',          // White description text
        gradientStart: '#E46D6D',             // Updated gradient start color for number
        gradientEnd: '#D06161',               // Updated gradient end color for number
    },
    {
        backgroundColor: '#B79BFF',           // Purple background for card 2
        textColor: '#000000',                 // Black text color
        descriptionColor: '#000000',          // Black description text
        gradientStart: '#C6B1FF',             // Updated gradient start color for number
        gradientEnd: '#B296FF',               // Updated gradient end color for number
    },
    {
        backgroundColor: '#F4D173',           // Yellow background for card 3
        textColor: '#000000',                 // Black text color
        descriptionColor: '#000000',          // Black description text
        gradientStart: '#FFE8AF',             // Updated gradient start color for number
        gradientEnd: '#F2CB6F',               // Updated gradient end color for number
    },
    {
        backgroundColor: '#E28144',           // Orange background for card 4
        textColor: '#FFFFFF',                 // White text color
        descriptionColor: '#FFFFFF',          // White description text
        gradientStart: '#F2CB6F',             // Updated gradient start color for number
        gradientEnd: '#DE7E41',               // Updated gradient end color for number
    },
];

// DecryptText component to animate the first two letters of each word
const DecryptText: FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
    const firstTwo = text.slice(0, 2);
    const rest = text.slice(2);

    return (
        <span className="inline-flex">
            <AnimatePresence>
                {isActive ? (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {firstTwo.split('').map((char, idx) => (
                            <motion.span
                                key={`${char}-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                ) : (
                    <span>{firstTwo}</span>
                )}
            </AnimatePresence>
            <span>{rest}</span>
        </span>
    );
};

const ProcessSection: FC = () => {
    const [interactedCards, setInteractedCards] = useState<boolean[]>(Array(processes.length).fill(false));
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [screenSize, setScreenSize] = useState<string>('lg');

    // Function to determine screen size
    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
            setScreenSize('xs');
            setIsMobile(true);
        } else if (width < 768) {
            setScreenSize('sm');
            setIsMobile(true);
        } else if (width < 1024) {
            setScreenSize('md');
            setIsMobile(true);
        } else {
            setScreenSize('lg');
            setIsMobile(false);
        }
    };

    // Set up resize listener
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleHoverStart = (index: number) => {
        if (!interactedCards[index]) {
            setInteractedCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
            });
        }
    };

    // Get card height based on screen size
    const getCardHeight = () => {
        if (screenSize === 'xs') return 'h-[180px]';
        if (screenSize === 'sm') return 'h-[220px]';
        if (screenSize === 'md') return 'h-[320px]';
        return 'h-[488px]';
    };

    // Get number SVG dimensions based on screen size
    const getNumberSize = () => {
        if (screenSize === 'xs') return { width: 160, height: 320 };
        if (screenSize === 'sm') return { width: 200, height: 400 };
        if (screenSize === 'md') return { width: 280, height: 560 };
        return { width: 500, height: 1000 };
    };

    // Get number font size based on screen size
    const getNumberFontSize = () => {
        if (screenSize === 'xs') return '160px';
        if (screenSize === 'sm') return '200px';
        if (screenSize === 'md') return '280px';
        return '500px';
    };

    // Get colored card size based on screen size with increased width
    const getColoredCardSize = () => {
        if (screenSize === 'xs') return 'w-[180px] h-[100px]';
        if (screenSize === 'sm') return 'w-[210px] h-[120px]';
        if (screenSize === 'md') return 'w-[260px] h-[170px]';
        return 'w-[550px] h-[250px]';
    };

    // Get colored card text size based on screen size
    const getColoredCardTextSize = () => {
        if (screenSize === 'xs') return 'text-[13px]';
        if (screenSize === 'sm') return 'text-[15px]';
        if (screenSize === 'md') return 'text-xl';
        return 'text-5xl';
    };

    // Get colored card description size based on screen size - very small for mobile with proper spacing
    const getColoredCardDescriptionSize = () => {
        if (screenSize === 'xs') return 'text-[6px] max-w-[90px] leading-[8px] tracking-tight';
        if (screenSize === 'sm') return 'text-[7px] max-w-[100px] leading-[9px] tracking-tight';
        if (screenSize === 'md') return 'text-[9px] max-w-[120px] leading-[12px]';
        return 'text-[14px] max-w-[220px] leading-[18px]';
    };

    // Get title line height based on screen size
    const getTitleLineHeight = () => {
        if (screenSize === 'xs') return '15px';
        if (screenSize === 'sm') return '17px';
        if (screenSize === 'md') return '28px';
        return '48px';
    };

    // Get padding for color card content
    const getContentPadding = () => {
        if (screenSize === 'xs') return 'p-2';
        if (screenSize === 'sm') return 'p-2';
        if (screenSize === 'md') return 'p-4';
        return 'p-5';
    };

    return (
        <section className="w-full px-4 pt-12 pb-16 sm:pb-20 bg-white">
            {/* Heading with 80px left padding for large screens */}
            <div className="lg:px-20 xl:px-20 2xl:px-20">
                <h2
                    className="
    font-helvetica font-bold
    text-[1.6rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[4.2rem] lg:text-[7xl] xl:text-[7xl] 2xl:text-[7xl]
    tracking-tighter
    mb-4 sm:mb-6 md:mb-8 lg:mb-[12px] xl:mb-[12px] 2xl:mb-[12px]
    text-black
    text-left md:text-left lg:text-left xl:text-left 2xl:text-left
    leading-[1.1] xs:leading-[1.05] sm:leading-[1.08] md:leading-[1.15] lg:leading-[1.2] xl:leading-[1.2] 2xl:leading-[1.2]
  "
                >
                    From Hello to Results
                </h2>

                <p
                    className="max-w-full text-left mb-6 sm:mb-8 md:mb-10 lg:mb-16 text-justify lg:text-left"
                    style={{
                        fontFamily: 'Sharp Grotesk, sans-serif',
                        fontWeight: 300,
                        fontSize: isMobile ? '15px' : '17px',
                        lineHeight: isMobile ? '18px' : '20px',
                        letterSpacing: '6%',
                        color: '#000000',
                    }}
                >
                    From first conversation to final conversion, here's how we bring your brand to life—step by step,
                    with purpose, precision, and results you can measure.
                </p>
            </div>

            {/* Card container with padding for lg screens and up */}
            <div
                className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:px-20 xl:px-20 2xl:px-20"
                style={{maxWidth: "100%", width: "100%"}}
            >
                {processes.map((process, index) => (
                    <motion.div
                        key={index}
                        className={`text-white relative flex items-center ${getCardHeight()} overflow-hidden rounded-xl sm:rounded-2xl`}
                        style={{
                            width: "100%",
                            backgroundColor: '#000000',
                            position: 'relative',
                            padding: '0',
                            margin: '0'
                        }}
                        onHoverStart={() => handleHoverStart(index)}
                        onTouchStart={() => handleHoverStart(index)}
                    >
                        {/* ----- COLOR ANIMATION FROM SMALL CARD TOP-LEFT ----- */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{
                                background: `radial-gradient(ellipse at ${screenSize === 'xs' ? '85%' : screenSize === 'sm' ? '83%' : screenSize === 'md' ? '80%' : '75%'} ${screenSize === 'xs' ? '45%' : screenSize === 'sm' ? '40%' : screenSize === 'md' ? '35%' : '30%'}, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 0%, transparent 0%)`,
                            }}
                            animate={{
                                background: interactedCards[index]
                                    ? `radial-gradient(ellipse at ${screenSize === 'xs' ? '85%' : screenSize === 'sm' ? '83%' : screenSize === 'md' ? '80%' : '75%'} ${screenSize === 'xs' ? '45%' : screenSize === 'sm' ? '40%' : screenSize === 'md' ? '35%' : '30%'}, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 150%, transparent 150%)`
                                    : `radial-gradient(ellipse at ${screenSize === 'xs' ? '85%' : screenSize === 'sm' ? '83%' : screenSize === 'md' ? '80%' : '75%'} ${screenSize === 'xs' ? '45%' : screenSize === 'sm' ? '40%' : screenSize === 'md' ? '35%' : '30%'}, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 0%, transparent 0%)`,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1.0]
                            }}
                            style={{ zIndex: 1 }}
                        />

                        {/* Wave-like fill animation from small card position */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{
                                clipPath: screenSize === 'xs'
                                    ? 'polygon(85% 45%, 85% 45%, 85% 45%, 85% 45%)'
                                    : screenSize === 'sm'
                                        ? 'polygon(83% 40%, 83% 40%, 83% 40%, 83% 40%)'
                                        : screenSize === 'md'
                                            ? 'polygon(80% 35%, 80% 35%, 80% 35%, 80% 35%)'
                                            : 'polygon(75% 30%, 75% 30%, 75% 30%, 75% 30%)',
                            }}
                            animate={{
                                clipPath: interactedCards[index]
                                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                    : screenSize === 'xs'
                                        ? 'polygon(85% 45%, 85% 45%, 85% 45%, 85% 45%)'
                                        : screenSize === 'sm'
                                            ? 'polygon(83% 40%, 83% 40%, 83% 40%, 83% 40%)'
                                            : screenSize === 'md'
                                                ? 'polygon(80% 35%, 80% 35%, 80% 35%, 80% 35%)'
                                                : 'polygon(75% 30%, 75% 30%, 75% 30%, 75% 30%)',
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            style={{
                                backgroundColor: cardStyles[index].backgroundColor,
                                zIndex: 2
                            }}
                        />

                        {/* ----- LARGE NUMBER DISPLAY ----- */}
                        <motion.div
                            className="absolute"
                            style={{zIndex: 10, left: '0px'}}
                            initial={{
                                top: screenSize === 'xs' ? '-8px' : screenSize === 'sm' ? '-10px' : screenSize === 'md' ? '-12px' : '-20px',
                                scale: 1,
                                opacity: 0.9
                            }}
                            animate={{
                                top: interactedCards[index] ?
                                    screenSize === 'xs' ? '5px' :
                                        screenSize === 'sm' ? '8px' :
                                            screenSize === 'md' ? '10px' : '20px'
                                    : screenSize === 'xs' ? '-8px' :
                                        screenSize === 'sm' ? '-10px' :
                                            screenSize === 'md' ? '-12px' : '-20px',
                                scale: interactedCards[index] ? 0.98 : 1,
                                opacity: interactedCards[index] ? 1 : 0.9,
                            }}
                            transition={{duration: 0.4, ease: 'easeInOut'}}
                        >
                            <svg
                                width={interactedCards[index] ? getNumberSize().width * 0.98 : getNumberSize().width}
                                height={interactedCards[index] ? getNumberSize().height * 0.98 : getNumberSize().height}
                                viewBox={`0 0 ${getNumberSize().width} ${getNumberSize().height}`}
                                className={`w-[${getNumberSize().width}px] h-[${getNumberSize().height}px]`}
                                style={{overflow: 'visible'}}
                            >
                                <defs>
                                    <linearGradient id={`numberGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#9D9D9D"/>
                                        <stop offset="50%" stopColor="#454545"/>
                                        <stop offset="100%" stopColor="#060606"/>
                                    </linearGradient>
                                    <linearGradient id={`activeGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor={cardStyles[index].gradientStart}/>
                                        <stop offset="100%" stopColor={cardStyles[index].gradientEnd}/>
                                    </linearGradient>
                                </defs>
                                <motion.text
                                    x="40%"
                                    y="34%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fill={interactedCards[index] ? `url(#activeGradient-${index})` : "transparent"}
                                    stroke={interactedCards[index] ? "none" : `url(#numberGradient-${index})`}
                                    strokeWidth={interactedCards[index] ? 1 : 4}
                                    fontSize={getNumberFontSize()}
                                    fontWeight="bold"
                                    style={{fontFamily: 'helvetica, sans-serif'}}
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: interactedCards[index] ? 1.02 : 1,
                                    }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    {process.step}
                                </motion.text>
                            </svg>
                        </motion.div>

                        {/* ----- COLORED CONTENT CARD - ABSOLUTELY FLUSH RIGHT ----- */}
                        <div
                            className={`absolute ${getColoredCardSize()} rounded-xl sm:rounded-2xl flex flex-col justify-end ${getContentPadding()}`}
                            style={{
                                backgroundColor: cardStyles[index].backgroundColor,
                                zIndex: 15,
                                top: 'auto',
                                right: '0',
                                bottom: '0',
                                left: 'auto',
                                margin: '0',
                                padding: getContentPadding() === 'p-2' ? '8px' : getContentPadding() === 'p-4' ? '16px' : '20px',
                                border: 'none',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        >
                            <motion.div
                                initial={{
                                    scale: 0.95,
                                    opacity: 0.9,
                                    y: 10
                                }}
                                animate={{
                                    scale: interactedCards[index] ? 1 : 0.95,
                                    opacity: interactedCards[index] ? 1 : 0.9,
                                    y: interactedCards[index] ? 0 : 10
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: interactedCards[index] ? 0.3 : 0,
                                    ease: 'easeOut'
                                }}
                                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                            >
                                {/* Mobile layout - title left, description right at bottom */}
                                {isMobile ? (
                                    <div className="flex flex-row justify-between items-end w-full" style={{ width: '100%', height: '100%', alignItems: 'flex-end' }}>
                                        {/* Title section on the left, aligned at the bottom */}
                                        <motion.div
                                            className={`flex flex-col font-bold ${getColoredCardTextSize()} text-left`}
                                            style={{
                                                color: cardStyles[index].textColor,
                                                lineHeight: getTitleLineHeight(),
                                                maxWidth: screenSize === 'xs' ? '50%' : '55%',
                                                paddingLeft: '4px'
                                            }}
                                            initial={{ x: -10, opacity: 0.8 }}
                                            animate={{
                                                x: interactedCards[index] ? 0 : -10,
                                                opacity: interactedCards[index] ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.4, delay: 0.4 }}
                                        >
                                            {process.text.map((word, idx) => (
                                                <DecryptText key={idx} text={word} isActive={interactedCards[index]}/>
                                            ))}
                                        </motion.div>

                                        {/* Description section on the right, aligned at the bottom right */}
                                        <motion.p
                                            className={`${getColoredCardDescriptionSize()} text-right`}
                                            style={{
                                                color: cardStyles[index].descriptionColor,
                                                paddingRight: '0px',
                                                paddingLeft: screenSize === 'xs' ? '4px' : '6px',
                                                wordSpacing: screenSize === 'xs' ? '0px' : screenSize === 'sm' ? '0.5px' : 'normal',
                                                textAlign: 'right',
                                                hyphens: 'auto',
                                                lineBreak: 'auto',
                                                maxWidth: screenSize === 'xs' ? '45%' : '40%'
                                            }}
                                            initial={{ x: 10, opacity: 0.8 }}
                                            animate={{
                                                x: interactedCards[index] ? 0 : 10,
                                                opacity: interactedCards[index] ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                        >
                                            {process.description}
                                        </motion.p>
                                    </div>
                                ) : (
                                    /* Desktop layout - side by side at bottom */
                                    <div className="flex flex-row justify-between items-end w-full" style={{ width: '100%', height: '100%', alignItems: 'flex-end' }}>
                                        {/* Title section on the left, aligned at the bottom */}
                                        <motion.div
                                            className={`flex flex-col font-bold ${getColoredCardTextSize()} text-left`}
                                            style={{
                                                color: cardStyles[index].textColor,
                                                lineHeight: getTitleLineHeight(),
                                                maxWidth: '60%',
                                                paddingLeft: '4px'
                                            }}
                                            initial={{ x: -15, opacity: 0.8 }}
                                            animate={{
                                                x: interactedCards[index] ? 0 : -15,
                                                opacity: interactedCards[index] ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.4, delay: 0.4 }}
                                        >
                                            {process.text.map((word, idx) => (
                                                <DecryptText key={idx} text={word} isActive={interactedCards[index]}/>
                                            ))}
                                        </motion.div>

                                        {/* Description section on the right, aligned at the bottom right */}
                                        <motion.p
                                            className={`${getColoredCardDescriptionSize()} text-right`}
                                            style={{
                                                color: cardStyles[index].descriptionColor,
                                                paddingLeft: '10px',
                                                paddingRight: '0px',
                                                wordSpacing: 'normal',
                                                textAlign: 'right',
                                            }}
                                            initial={{ x: 15, opacity: 0.8 }}
                                            animate={{
                                                x: interactedCards[index] ? 0 : 15,
                                                opacity: interactedCards[index] ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                        >
                                            {process.description}
                                        </motion.p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProcessSection;