import Image from "next/image"

interface CaseStudyHeroProps {
    title: string
    subtitle: string
    stats: {
        value: string
        label: string
    }[]
    imageSrc: string
}

const CaseStudyHero = ({ title, subtitle, stats, imageSrc }: CaseStudyHeroProps) => {
    return (
        <div className="w-full bg-white mt-16">
            {/* Hero Section with fixed width and height */}
            <div className="w-full bg-white">
                <div className="mx-auto max-w-screen-xl">
                    {/* Container with max-width of 1280px */}
                    <div className="relative min-h-[448px]">
                        {/* Text Content with exact padding: 80px left/right, 36px top/bottom */}
                        <div className="px-4 md:px-20 py-9 h-full relative">
                            {/* px-20=80px, py-9=36px */}
                            {/* Left-aligned text content */}
                            <div className="flex flex-col md:ml-[-100px] gap-4">
                                <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl leading-none tracking-tight uppercase text-black">
                                    How
                                </h1>
                                <h2 className="font-bold mt-4 text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase text-black">
                                    {title}
                                </h2>

                                <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase text-black">
                                    {subtitle}
                                </h3>
                                <div className="font-normal text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase text-black mt-4">
                                    {stats.map((stat, index) => (
                                        <p key={index} className="mb-2">
                                            <span className="font-bold text-primary">{stat.value}</span> {stat.label}
                                        </p>
                                    ))}
                                </div>
                            </div>


                            {/* Right-aligned text content, positioned at bottom */}
                            <div className="absolute bottom-0 right-0 text-right pr-4 md:pr-0">
                                <p className="font-normal text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight uppercase text-gray-800">
                                    —<span className="font-normal">Brewed</span> <span className="font-bold text-primary">97%</span> Less!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Section - Full width with exact 632px height */}
            <div className="w-full mt-10 h-[300px] md:h-[450px] lg:h-[632px]">
                <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt="Case Study"
                    width={1440}
                    height={632}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default CaseStudyHero