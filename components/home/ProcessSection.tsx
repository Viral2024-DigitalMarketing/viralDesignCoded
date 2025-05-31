"use client";

// Import necessary React hooks and Framer Motion for animations
import React, { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// DECRYPTED TEXT ANIMATION COMPONENT
// Creates a text decryption effect for specific words in titles
const DecryptedText: FC<{
    text: string;
    shouldAnimate: boolean;
    delay: number;
    color: string;
}> = ({ text, shouldAnimate, delay, color }) => {
    const [displayText, setDisplayText] = useState<string>(text);

    // Characters used for scrambling effect
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        // Start animation when shouldAnimate becomes true
        if (shouldAnimate) {
            // Start decryption animation after delay
            timer = setTimeout(() => {
                let iteration = 0;
                const maxIterations = text.length * 4;

                interval = setInterval(() => {
                    setDisplayText(() => {
                        return text
                            .split('')
                            .map((char, charIndex) => {
                                // If we've revealed this character, show it
                                if (iteration > charIndex * 4) {
                                    return char;
                                }
                                // Show space as space, scramble other characters
                                if (char === ' ') {
                                    return ' ';
                                }
                                // Otherwise show random scrambled character
                                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            })
                            .join('');
                    });

                    iteration++;

                    // Stop animation when complete
                    if (iteration > maxIterations) {
                        clearInterval(interval);
                        setDisplayText(text); // Ensure final text is correct
                    }
                }, 60);

            }, delay * 1000);
        } else {
            // Reset to original text when not animating
            setDisplayText(text);
        }

        // Cleanup function
        return () => {
            if (timer) clearTimeout(timer);
            if (interval) clearInterval(interval);
        };
    }, [shouldAnimate, text, delay]);

    return (
        <span style={{ color, fontFamily: 'League Spartan, sans-serif' }}>
            {displayText}
        </span>
    );
};

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
        textColor: '#FFFFFF',                 // White text color for card 1
        descriptionColor: '#FFFFFF',          // White description text for card 1
        gradientStart: '#E46D6D',             // Updated gradient start color for number
        gradientEnd: '#D06161',               // Updated gradient end color for number
        fillColor: '#D46363',                 // Fill color for number (same as background)
    },
    {
        backgroundColor: '#B79BFF',           // Purple background for card 2
        textColor: '#000000',                 // BLACK text color for card 2
        descriptionColor: '#000000',          // BLACK description text for card 2
        gradientStart: '#C6B1FF',             // Updated gradient start color for number
        gradientEnd: '#B296FF',               // Updated gradient end color for number
        fillColor: '#B79BFF',                 // Fill color for number (same as background)
    },
    {
        backgroundColor: '#F4D173',           // Yellow background for card 3
        textColor: '#000000',                 // BLACK text color for card 3
        descriptionColor: '#000000',          // BLACK description text for card 3
        gradientStart: '#FFE8AF',             // Updated gradient start color for number
        gradientEnd: '#F2CB6F',               // Updated gradient end color for number
        fillColor: '#F4D173',                 // Fill color for number (same as background)
    },
    {
        backgroundColor: '#E28144',           // Orange background for card 4
        textColor: '#FFFFFF',                 // White text color for card 4
        descriptionColor: '#FFFFFF',          // White description text for card 4
        gradientStart: '#F2CB6F',             // Updated gradient start color for number
        gradientEnd: '#DE7E41',               // Updated gradient end color for number
        fillColor: '#E28144',                 // Fill color for number (same as background)
    },
];

const ProcessSection: FC = () => {
    // State to track which cards have been interacted with (hovered/touched)
    const [interactedCards, setInteractedCards] = useState<boolean[]>(Array(processes.length).fill(false));

    // State to track if device is mobile or desktop
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // State to track exact screen size for responsive design
    const [screenSize, setScreenSize] = useState<string>('lg');

    // RESPONSIVE DESIGN HANDLER
    // Function to determine screen size and set mobile/desktop mode
    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
            setScreenSize('xs');      // Extra small mobile (< 640px)
            setIsMobile(true);
        } else if (width < 768) {
            setScreenSize('sm');      // Small mobile (640px - 768px)
            setIsMobile(true);
        } else if (width < 1024) {
            setScreenSize('md');      // Medium tablet (768px - 1024px)
            setIsMobile(true);
        } else {
            setScreenSize('lg');      // Large desktop (> 1024px)
            setIsMobile(false);
        }
    };

    // Set up resize listener for responsive behavior
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // INTERACTION HANDLER
    // Handle hover/touch events to trigger card animations
    const handleHoverStart = (index: number) => {
        setInteractedCards((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    // RESPONSIVE SIZING FUNCTIONS
    // These functions return different sizes based on screen size for responsive design

    // Get main card height - MOBILE: increased heights for better description text fit
    const getCardHeight = () => {
        if (screenSize === 'xs') return 'h-[200px]';      // Mobile extra small - INCREASED from 180px
        if (screenSize === 'sm') return 'h-[240px]';      // Mobile small - INCREASED from 220px
        if (screenSize === 'md') return 'h-[340px]';      // Tablet - INCREASED from 320px
        return 'h-[488px]';                               // Desktop - unchanged
    };

    // Get number SVG dimensions - MOBILE: smaller numbers, DESKTOP: large numbers
    const getNumberSize = () => {
        if (screenSize === 'xs') return { width: 160, height: 320 };   // Mobile XS
        if (screenSize === 'sm') return { width: 200, height: 400 };   // Mobile SM
        if (screenSize === 'md') return { width: 280, height: 560 };   // Tablet
        return { width: 480, height: 960 };                          // Desktop - Adjusted to prevent overflow
    };

    // Get number font size - MOBILE: smaller text, DESKTOP: large text
    const getNumberFontSize = () => {
        if (screenSize === 'xs') return '160px';
        if (screenSize === 'sm') return '200px';
        if (screenSize === 'md') return '280px';
        return '480px';                                       // Desktop - Adjusted to fit within card
    };

    // Get colored card size - INCREASED SIZE FOR MOBILE AND LARGE SCREENS
    const getColoredCardSize = () => {
        if (screenSize === 'xs') return 'w-[180px] h-[115px]';        // Mobile XS - INCREASED from 160x95 to 180x115
        if (screenSize === 'sm') return 'w-[200px] h-[130px]';        // Mobile SM - INCREASED from 180x110 to 200x130
        if (screenSize === 'md') return 'w-[260px] h-[160px]';        // Tablet - INCREASED from 240x140 to 260x160
        return 'w-[620px] h-[280px]';                                 // Desktop - unchanged
    };

    // Get colored card text size - MOBILE: INCREASED, DESKTOP: unchanged
    const getColoredCardTextSize = () => {
        if (screenSize === 'xs') return 'text-[20px]';              // Mobile XS - INCREASED from 17px to 20px
        if (screenSize === 'sm') return 'text-[22px]';              // Mobile SM - INCREASED from 19px to 22px
        if (screenSize === 'md') return 'text-[30px]';              // Tablet - INCREASED from 26px to 30px
        return 'text-[64px]';                                       // Desktop - unchanged
    };

    // Get colored card description size - MOBILE: SLIGHTLY DECREASED from previous, DESKTOP: unchanged
    const getColoredCardDescriptionSize = () => {
        if (screenSize === 'xs') return 'text-[8px] max-w-[95px] leading-[10px] tracking-normal';     // Mobile XS - DECREASED from 9px to 8px, increased width for better paragraph alignment
        if (screenSize === 'sm') return 'text-[9px] max-w-[105px] leading-[11px] tracking-normal';    // Mobile SM - DECREASED from 10.5px to 9px, increased width for better paragraph alignment
        if (screenSize === 'md') return 'text-[11px] max-w-[135px] leading-[13px] tracking-normal';   // Tablet - DECREASED from 13px to 11px, increased width for better paragraph alignment
        return 'text-[22px] max-w-[320px] leading-[26px]';                                           // Desktop - unchanged
    };

    // Get title line height - MOBILE: INCREASED for better spacing with larger text, DESKTOP: unchanged
    const getTitleLineHeight = () => {
        if (screenSize === 'xs') return 'leading-[19px]';           // Mobile XS - INCREASED from 16px to 19px
        if (screenSize === 'sm') return 'leading-[21px]';           // Mobile SM - INCREASED from 18px to 21px
        if (screenSize === 'md') return 'leading-[28px]';           // Tablet - INCREASED from 24px to 28px
        return 'leading-[60px]';                                    // Desktop - unchanged
    };

    // Get padding for color card content - MOBILE: increased for better spacing with larger text
    const getContentPadding = () => {
        if (screenSize === 'xs') return 'p-2';                      // Mobile XS - INCREASED from p-1.5 to p-2
        if (screenSize === 'sm') return 'p-2.5';                    // Mobile SM - INCREASED from p-2 to p-2.5
        if (screenSize === 'md') return 'p-3';                      // Tablet - INCREASED from p-2.5 to p-3
        return 'p-6';                                               // Desktop - unchanged
    };

    // Get title width for large screens - controls how much space title takes
    const getTitleWidth = () => {
        if (screenSize === 'lg') return '55%';                      // Desktop - unchanged
        return isMobile ? '55%' : '55%';                            // Mobile and tablet unchanged
    };

    // Get description width for large screens - controls how much space description takes
    const getDescriptionWidth = () => {
        if (screenSize === 'lg') return '45%';                      // Desktop - unchanged
        return isMobile ? '45%' : '45%';                            // Mobile and tablet unchanged
    };

    return (
        <section className="w-full px-4 pt-12 pb-16 sm:pb-20 bg-white">
            {/* SECTION HEADER */}
            <div className="max-w-full lg:px-20 xl:px-20 2xl:px-20">
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
                    className="max-w-full text-left mb-4 sm:mb-8 md:mb-6 lg:mb-8 text-justify lg:text-left"
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

            {/* MAIN CARDS CONTAINER */}
            <div
                className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-10 max-w-full lg:px-20 xl:px-20 2xl:px-20"
                style={{ width: "100%" }}
            >
                {processes.map((process, index) => (
                    <div key={index} className="relative w-full">
                        {/* MAIN LARGE CARD */}
                        <motion.div
                            className={`text-white relative flex items-center ${getCardHeight()} overflow-visible w-full`}
                            style={{
                                backgroundColor: '#000000',
                                borderRadius: '25px'
                            }}
                            onHoverStart={() => handleHoverStart(index)}
                            onTouchStart={() => handleHoverStart(index)}
                        >
                            {/* COLOR FILL ANIMATION */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    borderRadius: '25px',
                                    zIndex: 1
                                }}
                                initial={{
                                    background: `radial-gradient(ellipse at 85% 100%, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 0%, transparent 0%)`,
                                }}
                                animate={{
                                    background: interactedCards[index]
                                        ? `radial-gradient(ellipse at 0% 0%, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 150%, transparent 150%)`
                                        : `radial-gradient(ellipse at 85% 100%, ${cardStyles[index].backgroundColor} 0%, ${cardStyles[index].backgroundColor} 0%, transparent 0%)`,
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 0.1, 0.25, 1.0]
                                }}
                            />

                            {/* WAVE FILL ANIMATION */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: cardStyles[index].backgroundColor,
                                    borderRadius: '25px',
                                    zIndex: 2
                                }}
                                initial={{
                                    clipPath: 'polygon(85% 100%, 85% 100%, 85% 100%, 85% 100%)',
                                }}
                                animate={{
                                    clipPath: interactedCards[index]
                                        ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                        : 'polygon(85% 100%, 85% 100%, 85% 100%, 85% 100%)',
                                }}
                                transition={{
                                    duration: 1.0,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                            />

                            {/* LARGE NUMBER DISPLAY */}
                            <motion.div
                                className="absolute"
                                style={{ zIndex: 10, left: screenSize === 'lg' ? '10px' : '0px' }}
                                initial={{
                                    top: screenSize === 'xs' ? '10px' : screenSize === 'sm' ? '8px' : screenSize === 'md' ? '3px' : '5px',
                                    scale: 1,
                                    opacity: 0.9
                                }}
                                animate={{
                                    top: interactedCards[index]
                                        ? screenSize === 'xs' ? '23px'
                                            : screenSize === 'sm' ? '26px'
                                                : screenSize === 'md' ? '25px' : '25px'
                                        : screenSize === 'xs' ? '10px'
                                            : screenSize === 'sm' ? '8px'
                                                : screenSize === 'md' ? '3px' : '5px',
                                    scale: interactedCards[index] ? 0.98 : 1,
                                    opacity: interactedCards[index] ? 1 : 0.9,
                                }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                            >
                                <svg
                                    width={interactedCards[index] ? getNumberSize().width * 0.98 : getNumberSize().width}
                                    height={interactedCards[index] ? getNumberSize().height * 0.98 : getNumberSize().height}
                                    viewBox={`0 0 ${getNumberSize().width} ${getNumberSize().height}`}
                                    className={`w-[${getNumberSize().width}px] h-[${getNumberSize().height}px]`}
                                    style={{ overflow: 'visible' }}
                                >
                                    <defs>
                                        <linearGradient id={`numberGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#9D9D9D" />
                                            <stop offset="50%" stopColor="#454545" />
                                            <stop offset="100%" stopColor="#060606" />
                                        </linearGradient>
                                        <linearGradient id={`activeGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor={cardStyles[index].gradientStart} />
                                            <stop offset="100%" stopColor={cardStyles[index].gradientEnd} />
                                        </linearGradient>
                                        <linearGradient id={`borderGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor={
                                                index === 0 ? '#E46D6D' :
                                                    index === 1 ? '#C6B1FF' :
                                                        index === 2 ? '#FFE8AF' :
                                                            '#FF9F61'
                                            } />
                                            <stop offset="100%" stopColor={
                                                index === 0 ? '#D06161' :
                                                    index === 1 ? '#B296FF' :
                                                        index === 2 ? '#F2CB6F' :
                                                            '#DE7E41'
                                            } />
                                        </linearGradient>
                                    </defs>
                                    <motion.text
                                        x="40%"
                                        y="34%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fill={interactedCards[index] ? cardStyles[index].fillColor : "transparent"}
                                        stroke={interactedCards[index] ? `url(#borderGradient-${index})` : `url(#numberGradient-${index})`}
                                        strokeWidth={interactedCards[index] ? 4 : 4}
                                        fontSize={getNumberFontSize()}
                                        fontWeight="bold"
                                        style={{ fontFamily: 'League Spartan, sans-serif' }}
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

                            {/* SMALL COLORED CARD */}
                            <div
                                className={`absolute ${getColoredCardSize()} flex flex-col ${getContentPadding()}`}
                                style={{
                                    backgroundColor: cardStyles[index].backgroundColor,
                                    borderRadius: '20px',
                                    zIndex: 15,
                                    right: '0px',
                                    bottom: '0px',
                                    backgroundImage: index === 3 ? 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")' : 'none',
                                    backgroundBlendMode: index === 3 ? 'overlay' : 'normal',
                                    ...(isMobile && {
                                        right: '0px',
                                        bottom: '0px',
                                    })
                                }}
                            >
                                <div className={`flex flex-row justify-between items-end w-full h-full ${screenSize === 'lg' ? 'gap-4' : 'gap-1'}`}>
                                    {/* TITLE SECTION - MOVED SLIGHTLY LEFT FOR LARGE SCREENS */}
                                    <div
                                        className={`flex flex-col font-bold ${getColoredCardTextSize()} ${getTitleLineHeight()} text-left h-full ${index === 3 ? 'mt-4' : 'mt-2'}`}
                                        style={{
                                            color: cardStyles[index].textColor,
                                            maxWidth: getTitleWidth(),
                                            justifyContent: 'flex-end',
                                            fontFamily: 'League Spartan, sans-serif',
                                            ...(screenSize === 'lg' && {
                                                paddingLeft: '8px', // MOVE TITLE SLIGHTLY LEFT FOR LARGE SCREENS
                                            })
                                        }}
                                    >
                                        {process.text.map((word, idx) => {
                                            // Define which words should animate for each card
                                            const getAnimatedWord = (cardIndex: number) => {
                                                switch(cardIndex) {
                                                    case 0: return 'First';           // First card - animate "The"
                                                    case 1: return 'Building';      // Second card - animate "Building"
                                                    case 2: return 'Campaigns';     // Third card - animate "Campaigns"
                                                    case 3: return 'Performance';   // Fourth card - animate "Performance"
                                                    default: return '';
                                                }
                                            };

                                            const shouldAnimate = word === getAnimatedWord(index);

                                            return (
                                                <DecryptedText
                                                    key={`${index}-${idx}`}
                                                    text={word}
                                                    shouldAnimate={shouldAnimate && interactedCards[index]}
                                                    delay={idx * 0.3}
                                                    color={cardStyles[index].textColor}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* DESCRIPTION SECTION - MOVED SLIGHTLY LEFT AND BETTER ALIGNMENT FOR LARGE SCREENS */}
                                    <div
                                        className="flex items-end justify-end h-full"
                                        style={{
                                            maxWidth: getDescriptionWidth(),
                                            ...(screenSize === 'lg' && {
                                                paddingLeft: '8px', // MOVE DESCRIPTION SLIGHTLY LEFT FOR LARGE SCREENS
                                                justifyContent: 'flex-start', // BETTER ALIGNMENT FOR LARGE SCREENS
                                            })
                                        }}
                                    >
                                        <p
                                            className={`${getColoredCardDescriptionSize()} text-left`}
                                            style={{
                                                color: cardStyles[index].descriptionColor,
                                                textAlign: 'left',
                                                hyphens: 'auto',
                                                fontFamily: 'League Spartan, sans-serif',
                                                ...(screenSize === 'lg' && {
                                                    textAlign: 'left', // KEEP LEFT ALIGNMENT TO AVOID WORD GAPS
                                                    wordSpacing: 'normal', // NORMAL WORD SPACING FOR NATURAL FLOW
                                                })
                                            }}
                                        >
                                            {process.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProcessSection;