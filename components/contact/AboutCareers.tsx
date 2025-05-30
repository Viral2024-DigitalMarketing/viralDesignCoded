"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define prop types for the job cards
interface JobCardProps {
    title: string;
    description: string;
    responsibilities: string[];
}

interface MobileJobCardProps extends JobCardProps {
    isOpen: boolean;
    toggleOpen: () => void;
}

// Job card component for mobile/tablet (accordion style)
const MobileJobCard = ({
                           title,
                           description,
                           responsibilities,
                           isOpen,
                           toggleOpen,
                       }: MobileJobCardProps) => {
    const router = useRouter();

    return (
        <div className="w-full bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            <div
                className="p-5 flex justify-between items-center cursor-pointer"
                onClick={toggleOpen}
            >
                <h2 className="font-sharp-grotesk text-xl sm:text-2xl font-light">
                    {title}
                </h2>
                {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>

            {isOpen && (
                <div className="border-t border-gray-100">
                    <div className="p-5 pt-4">
                        <div className="mb-4">
                            <h3 className="font-sharp-grotesk text-base font-medium mb-2">
                                About the role
                            </h3>
                            <p className="font-sharp-grotesk text-sm sm:text-base font-normal">
                                {description}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-sharp-grotesk text-base font-medium mb-2">
                                Responsibilities:
                            </h3>
                            <ul className="list-disc pl-5 font-sharp-grotesk text-sm sm:text-base font-normal">
                                {responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-sharp-grotesk text-base font-medium mb-2">
                                To Apply:
                            </h3>
                            <p className="font-sharp-grotesk text-sm sm:text-base font-normal mb-4">
                                Resume, portfolio, and cover letter.
                            </p>
                        </div>

                        <Button
                            onClick={() => router.push("/contact")} // Navigate to contact page
                            className="rounded-none w-[150px] xs:w-[150px] sm:w-[150px] md:w-auto bg-white text-[#E30000] hover:bg-gray-100 px-3 xs:pl-4 xs:pr-6 sm:pl-5 sm:pr-7 py-1 xs:py-1 sm:py-1 md:py-2 font-bold text-[0.85rem] xs:text-[0.9rem] sm:text-[1rem] md:text-lg tracking-tighter flex items-center gap-1 ml-2 xs:ml-4 md:ml-6 md:mr-[0.8rem] lg:mr-[1.5rem]"
                        >
                            <img
                                src="/images/log.svg"
                                alt="Button Icon"
                                className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7 object-contain"
                                width={24}
                                height={24}
                            />
                            Bug us — let's build.
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Job card component for desktop
const DesktopJobCard = ({ title, description, responsibilities }: JobCardProps) => {
    const router = useRouter();

    return (
        <div className="w-full max-w-[1280px] p-6 lg:p-8 flex flex-col items-start gap-4 lg:gap-6 bg-white rounded-lg shadow-sm mb-8">
            <h2 className="w-full text-left font-sharp-grotesk text-2xl lg:text-4xl font-light">
                {title}
            </h2>

            <div className="w-full">
                <h3 className="font-sharp-grotesk text-base lg:text-lg font-medium mb-2">
                    About the role
                </h3>
                <p className="font-sharp-grotesk text-base lg:text-lg font-normal max-w-[1030px]">
                    {description}
                </p>
            </div>

            <div className="w-full">
                <h3 className="font-sharp-grotesk text-base lg:text-lg font-medium mb-2">
                    Responsibilities:
                </h3>
                <ul className="list-disc pl-5 font-sharp-grotesk text-base lg:text-lg font-normal max-w-[1030px]">
                    {responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                <h3 className="font-sharp-grotesk text-base lg:text-lg font-medium mb-2">
                    To Apply:
                </h3>
                <p className="font-sharp-grotesk text-base lg:text-lg font-normal mb-4 lg:mb-6">
                    Resume, portfolio, and cover letter.
                </p>
            </div>

            <Button
                onClick={() => router.push("/contact")} // Navigate to contact page
                className="rounded-none w-[150px] xs:w-[150px] sm:w-[150px] md:w-auto bg-white text-[#E30000] hover:bg-gray-100 px-3 xs:pl-4 xs:pr-6 sm:pl-5 sm:pr-7 py-1 xs:py-1 sm:py-1 md:py-2 font-bold text-[0.85rem] xs:text-[0.9rem] sm:text-[1rem] md:text-lg tracking-tighter flex items-center gap-1 ml-2 xs:ml-4 md:ml-6 md:mr-[0.8rem] lg:mr-[1.5rem]"
            >
                <img
                    src="/images/log.svg"
                    alt="Button Icon"

                    width={10}  // Decreased width
                    height={10} // Decreased height
                    className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 object-contain"
                />
                Bug us — let's build.
            </Button>
        </div>
    );
};

// Define job listing interface
interface JobListing {
    title: string;
    description: string;
    responsibilities: string[];
}

export default function AboutCareers() {
    // State to track which job listing is open in mobile view
    const [openJobIndex, setOpenJobIndex] = useState<number | null>(null);

    // Toggle function for job accordion
    const toggleJob = (index: number) => {
        setOpenJobIndex(openJobIndex === index ? null : index);
    };

    // Job listings data
    const jobListings: JobListing[] = [
        {
            title: "Senior Web Developer",
            description: "Build and maintain scalable web applications using modern frameworks and technologies.",
            responsibilities: [
                "Build responsive web applications using modern frameworks.",
                "Implement backend solutions and APIs.",
                "Optimize applications for maximum speed and scalability.",
                "Collaborate with designers and other team members.",
                "Stay up-to-date with emerging technologies.",
            ],
        },
        {
            title: "Digital Marketing Specialist",
            description: "Develop and implement comprehensive digital marketing strategies to drive brand awareness and engagement.",
            responsibilities: [
                "Develop and implement digital marketing strategies.",
                "Manage social media campaigns and content.",
                "Analyze campaign performance and optimize for results.",
                "Stay updated with latest digital marketing trends.",
                "Collaborate with design and content teams.",
            ],
        },
        {
            title: "UX/UI Designer",
            description: "Design user-centered digital experiences across platforms. Collaborate with design, development, and marketing.",
            responsibilities: [
                "Design wireframes, flows, mockups, and prototypes.",
                "Conduct user research and testing.",
                "Collaborate on requirements and feasibility.",
                "Develop UI style guides.",
                "Follow UI/UX trends.",
            ],
        },
        {
            title: "Project Manager",
            description: "Lead digital projects from conception to delivery, ensuring they meet client requirements and deadlines.",
            responsibilities: [
                "Manage project scope, timeline, and resources.",
                "Coordinate between clients and internal teams.",
                "Monitor project progress and address any blockers.",
                "Ensure quality delivery of all project components.",
                "Report on project metrics and KPIs.",
            ],
        },
        {
            title: "Content Strategist",
            description: "Develop compelling content strategies that align with business goals and engage target audiences.",
            responsibilities: [
                "Create content strategies for various digital channels.",
                "Develop brand voice and messaging guidelines.",
                "Oversee content production and quality control.",
                "Analyze content performance and optimize strategy.",
                "Stay updated on content trends and best practices.",
            ],
        },
    ];

    return (
        <section className="bg-[#F3F0F0] text-black py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="container mx-auto">
                {/* Conditional Heading: "Open Roles" for mobile, full heading and tagline for desktop */}
                <div className="mb-10 lg:mb-16">
                    <div className="lg:hidden">
                        <h1 className="font-helvetica font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-6">
                            Open Roles
                        </h1>
                    </div>

                    <div className="hidden lg:flex flex-col lg:flex-row justify-between items-start lg:items-end">
                        <div className="w-full lg:w-1/2">
                            <h1
                                style={{
                                    color: '#000000',
                                    fontFamily: 'Helvetica',
                                    fontSize: '84px',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: '77px',
                                    letterSpacing: '-3.36px',
                                    textTransform: 'uppercase',
                                }}
                                className="mb-6 lg:mb-0"
                            >
                                Join The Tribe!
                            </h1>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-end">
                            <p className="text-black font-sharp-grotesk text-sm md:text-sm lg:text-sm max-w-[500px]">
                                Growth, innovation, and excellence are our passion. If you're driven and collaborative, join our talented team of digital innovators! We're looking for passionate individuals who are excited about creating exceptional digital experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job listings - Mobile & Tablet View (xs, sm, md) */}
                <div className="lg:hidden space-y-4">
                    {jobListings.map((job, index) => (
                        <div key={index}>
                            <MobileJobCard
                                title={job.title}
                                description={job.description}
                                responsibilities={job.responsibilities}
                                isOpen={openJobIndex === index}
                                toggleOpen={() => toggleJob(index)}
                            />
                        </div>
                    ))}
                </div>

                {/* Job listings - Desktop View (lg and up) */}
                <div className="hidden lg:block space-y-8">
                    {jobListings.map((job, index) => (
                        <div key={index}>
                            <DesktopJobCard
                                title={job.title}
                                description={job.description}
                                responsibilities={job.responsibilities}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}