import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { caseStudies } from '@/lib/data';
import CaseStudyHero from '@/components/case-studies/case-study-hero';
import StrategyCard from '@/components/case-studies/strategy-card';
import CTASection from '@/components/home/CTASection';

// Strategy cards for Roast and Toast
const roastStrategyCards = [
  {
    title: 'Brewing \n' + 'the Perfect Strategy:',
    paragraphs: [
      'At Viral Bug, we believe that great marketing is brewed with creativity, strategy, and data-driven insights. For Roast n Toast, our mission was clear:',
      'expand reach, boost engagement, and do it all with exceptional cost-efficiency. Over just 90 days, we achieved',
      'a <span style="font-weight: bold">64.2%</span> increase in reach & <span style="font-weight: bold">62.2%</span> boost in engagement, while spending <span style="font-weight: bold">97%</span> less than typical campaigns.',
    ],
    imageSrc: '/images/first.webp',
  },
  {
    title: 'Pouring \n' + 'Measurable Results:',
    paragraphs: [
      'We reached 13.3 lakh unique accounts in just 90 days, reflecting a 64.2% increase in reach.',
      'Our content achieved 27,20,000 impressions, marking a 64% growth since before April.',
      '99.9% of that reach came from non-followers, showcasing strong organic visibility.',
      'We gained 438 new followers, bringing the total to 5,700.',
      '9.3k accounts engaged with our content, showing a 62.2% increase over previous months.',
    ],
    imageSrc: '/images/second.webp',
  },
  {
    title: 'Our secret? \n' + 'We crafted smart ',
    paragraphs: [
      "Story-driven content that captured attention and kept it.",
      "We focused on organic growth, leveraging engaging Reels, customer testimonials, and local influencer partnerships.",
      "We tapped into community voices with User-Generated Content (UGC), building trust and boosting brand visibility.",
    ],
    imageSrc: '/images/third.webp',
  },
  {
    title: 'Blending \n' + 'Strategy',
    paragraphs: [
      "Our strategy didn't just focus on visibility; it was about meaningful connection.",
      "Our campaign for Roast n Toast proved that with the right strategy and a dash of creativity, you can break records without breaking the bank.",
    ],
    imageSrc: '/images/fourth.webp',
  },
];

// Strategy cards for Srikara Hospitals
const srikaraStrategyCards = [
  {
    title: 'Diagnosing \n' +
        'the Challenge:',
    paragraphs: [
      'In the world of healthcare, visibility and trust are the heartbeat of brand success.',
      'Srikara Hospitals sought our help to expand in Hyderabad, engage their community, and enhance their care reputation.',
      'Our mission: to elevate brand awareness and reinforce patient trust through meaningful connections.',
    ],

    imageSrc: '/images/sf.webp',
  },

  {
    "title": "Delivering Measurable Results",
    "paragraphs": [
      "We launched a 30-day social media strategy that delivered impactful growth: Reached 130K unique accounts (40.3% visibility increase); gained 700 new followers (47.9% growth).",
      "Engagement rose 39.1%. Strong organic discovery: 99.5% non-follower reach.",
      "Visibility increased 40.3% to 130K unique accounts; 700 new followers (47.9% increase); 39.1% engagement rise."
    ],
    "imageSrc": "/images/ss.webp"
  },
  {
    "title": "Reviving Organic Growth",
    "paragraphs": [
      "Our strategy was simple but powerful: connect deeply with the audience.",
      "We spotlighted doctors, shared patient testimonials, and ran interactive Q&A sessions.",
      "We also expanded visibility through well-timed reels and community-focused storytelling."
    ],
    "imageSrc": "/images/st.webp"
  },
  {
    "title": "Administering Strategy with Precision",
    "paragraphs": [
      "We believe that healthcare deserves a personal touch. For Srikara Hospitals, we:",
      "Defined target audience.",
      "Studied market and found content gaps.",
      "Experimented with reels, stories, and posts.",
      "Focused on quality content to build trust."
    ],
    "imageSrc": "/images/sfiv.webp"
  },
  {
    "title": "Prescribing the Future",
    "paragraphs": [
      "Our Roadmap for Srikara Hospitals:",
      "<ul><li>Continue doctor spotlights and Q&As.</li><li>Expand into video content.</li><li>Launch testimonial content.</li></ul>"
    ],
    "imageSrc": "/images/sl.webp"
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = caseStudies.find(cs => cs.slug === params.slug);

  return {
    title: caseStudy ? `${caseStudy.title} | Portfolio` : 'Case Study | Digital Agency',
    description: caseStudy?.summary || 'Explore our detailed case study of a successful digital project',
  };
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies.find(cs => cs.slug === params.slug);

  if (!caseStudy) {
    return (
        <div className="w-full mt-10 py-20">
          <h1 className="text-4xl font-bold">Case study not found</h1>
          <Link href="/portfolio" className="mt-4 inline-flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
    );
  }

  // Select strategy cards based on slug
  const strategyCards = caseStudy.slug === 'srikara-hospitals' ? srikaraStrategyCards : roastStrategyCards;

  // Srikara Hospitals layout
  if (caseStudy.slug === 'srikara-hospitals') {
    return (
        <div className="bg-[#F3F0F0] min-h-screen w-full">
          {/* Hero Section - Adjusted position for xs, sm, md to avoid navbar overlap */}
          <div className="w-full flex flex-col items-center justify-center bg-[#F3F0F0] relative overflow-hidden mt-[60px] xs:mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[30px] px-[10px] pt-[30px] xs:pt-[40px] md:pt-[50px] pb-[50px] xs:pb-[60px] md:pb-[80px]">
            <div className="w-full flex flex-col items-start justify-start pl-[20px] xs:pl-[40px] sm:pl-[60px] md:pl-[80px]">
              <h1 className="font-helvetica font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight tracking-tight uppercase text-gray-500">
                The Prescription for
              </h1>
              <h1 className="font-helvetica font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight tracking-tight uppercase text-black">
                {caseStudy.title}
              </h1>
              <h1 className="font-helvetica font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight tracking-tight uppercase text-black">
                Digital Success
              </h1>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full h-[200px] xs:h-[150px] sm:h-[180px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
              <video
                  src="/videos/srikara_1.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>


          {/* First Strategy Section */}
          <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-[#F3F0F0]">
            <div className="w-full px-[15px] xs:px-[20px] sm:px-[30px] md:px-[40px]">
              <div className="flex flex-col space-y-8 xs:space-y-10 md:space-y-12">
                {strategyCards.slice(0, 2).map((card, index) => (
                    <StrategyCard
                        key={index}
                        title={card.title}
                        paragraphs={card.paragraphs}
                        imageSrc={card.imageSrc}
                        index={index}
                    />
                ))}
              </div>
            </div>
          </section>

          {/* Second Strategy Section */}
          <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-[#F3F0F0]">
            <div className="w-full px-[15px] xs:px-[20px] sm:px-[30px] md:px-[40px]">
              <div className="flex flex-col space-y-8 xs:space-y-10 md:space-y-12">
                {strategyCards.slice(2, 5).map((card, index) => (
                    <StrategyCard
                        key={index + 2}
                        title={card.title}
                        paragraphs={card.paragraphs}
                        imageSrc={card.imageSrc}
                        index={index + 2}
                    />
                ))}
              </div>

              {/* Quote Section */}
              <div className="w-full mt-6 sm:mt-8 md:mt-10 py-6 xs:py-7 sm:py-8 md:py-10 lg:py-12 flex flex-col md:flex-row justify-between items-center px-3 xs:px-4 md:px-6">
                <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl uppercase text-black mb-4 md:mb-0 text-center md:text-left">
                  Our focus is clear
                </div>
                <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl uppercase text-black text-center md:text-right max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl">
                  grow their digital presence, one meaningful connection at a time.
                </div>
              </div>
            </div>
          </section>
        </div>
    );
  }

  // Roast and Toast layout - Updated with reduced text sizes for mobile
  return (
      <div className="bg-[#F3F0F0]">
        {/* Custom Hero Section for Roast and Toast - With reduced text sizes for mobile */}
        <div className="w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[320px] lg:h-[400px] xl:h-[500px] flex flex-col items-center justify-center bg-white relative overflow-hidden mt-[60px] xs:mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[30px] px-[8px] xs:px-[12px] sm:px-[16px]">
          <div className="w-full flex flex-col items-start justify-center h-full pl-2 xs:pl-3 sm:pl-4 md:pl-12 lg:pl-20 xl:pl-20 pt-[10px] xs:pt-[12px] sm:pt-[16px] md:pt-[30px]">
            <h1
                className="font-helvetica font-bold text-lg sm:text-xl md:text-6xl lg:text-8xl xl:text-[92px] leading-tight tracking-tight uppercase text-black"
                style={{ letterSpacing: "-0.06em", lineHeight: "0.9" }}
            >
              How
            </h1>
            <h2
                className="font-helvetica font-bold text-sm sm:text-base md:text-3xl lg:text-[48px] leading-tight uppercase text-black mt-0.5 xs:mt-1 sm:mt-1.5"
                style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
            >
              Roast and Toast
            </h2>
            <h3
                className="font-helvetica text-base sm:text-lg md:text-[48px] lg:text-[48px] leading-[1.1] lg:leading-[1.2] tracking-[-0.03] uppercase text-[#3D3D3D] mt-0.5 xs:mt-1 sm:mt-1.5 lg:mt-2"
                style={{ fontWeight: 400 }}
            >
              Brewed
            </h3>

            <div className="flex flex-col mt-0.5 xs:mt-1 sm:mt-1.5 lg:mt-2 space-y-1 lg:space-y-2">
              <div
                  className="font-helvetica text-sm sm:text-base md:text-[48px] lg:text-[48px] leading-[1.1] lg:leading-[1.2] tracking-[-0.03] uppercase text-[#3D3D3D]"
                  style={{ fontWeight: 400 }}
              >
              <span className="font-bold text-red-500" style={{ fontWeight: 700 }}>
                64.2%
              </span>{" "}
                More Reach
              </div>
              <div
                  className="font-helvetica text-sm sm:text-base md:text-[48px] lg:text-[48px] leading-[1.1] lg:leading-[1.2] tracking-[-0.03] uppercase text-[#3D3D3D]"
                  style={{ fontWeight: 400 }}
              >
                &
              </div>
              <div
                  className="font-helvetica text-sm sm:text-base md:text-[48px] lg:text-[48px] leading-[1.1] lg:leading-[1.2] tracking-[-0.03] uppercase text-[#3D3D3D]"
                  style={{ fontWeight: 400 }}
              >
              <span className="font-bold text-red-500" style={{ fontWeight: 700 }}>
                62.2%
              </span>{" "}
                Higher Engagement
              </div>
            </div>
            <div className="w-full flex justify-end pr-2 xs:pr-3 sm:pr-4 md:pr-12 lg:pr-20 mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-4 lg:mt-6">
              <div
                  className="font-helvetica text-sm sm:text-base md:text-[48px] mt-4 md:mt-0 leading-[1.1] tracking-[-0.03] uppercase text-[#3D3D3D]"

                  style={{ fontWeight: 400 }}
              >
                —Spending{" "}
                <span className="font-bold text-red-500" style={{ fontWeight: 700 }}>
                97%
              </span>{" "}
                Less!
              </div>
            </div>
          </div>
        </div>

        {/* First Video Section - SIGNIFICANTLY INCREASED HEIGHT FOR MOBILE */}
        <div className="w-full">
          <div className="w-full h-[200px] xs:h-[150px] sm:h-[180px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
            <video
                src="/videos/case_1.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>


        {/* Strategy Section - Optimized spacing for xs and sm */}
        <section className="py-6 xs:py-8 sm:py-10 md:py-16 lg:py-20 bg-[#F3F0F0]">
          <div className="w-full px-[12px] xs:px-[16px] sm:px-[24px] md:px-[80px]">
            <div className="flex flex-col space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-12">
              {strategyCards.map((card, index) => (
                  <StrategyCard
                      key={index}
                      title={card.title}
                      paragraphs={card.paragraphs}
                      imageSrc={card.imageSrc}
                      index={index}
                  />
              ))}
            </div>

            {/* Quote Section - Left-aligned text for lg */}
            <div className="w-full mt-6 xs:mt-8 sm:mt-10 md:mt-16 lg:mt-20 pt-[20px] xs:pt-[24px] sm:pt-[32px] pb-[20px] xs:pb-[24px] sm:pb-[32px]">
              <hr className="w-full border-t border-black" />
              <div className="w-full flex flex-col md:flex-row justify-between items-start px-[12px] xs:px-[16px] sm:px-[24px] py-4 xs:py-5 sm:py-6 md:py-10 lg:py-12">
                <div className="font-helvetica font-bold text-sm xs:text-base sm:text-lg md:text-2xl uppercase text-black mb-2 xs:mb-3 sm:mb-4 md:mb-0 text-left">
                  For us
                </div>
                <div className="font-helvetica font-bold text-sm xs:text-base sm:text-lg md:text-2xl lg:text-2xl uppercase text-black text-left max-w-full">
                  every campaign is an opportunity to brew success —one story at a time.
                </div>
              </div>
              <hr className="w-full border-t border-black" />
            </div>
          </div>
        </section>
      </div>
  );
}