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
    title: 'Brewing the Perfect Strategy',
    paragraphs: [
      'At Viral Bug, we believe that great marketing is brewed with creativity, strategy, and data-driven insights. For Roast n Toast, our mission was clear:',
      'expand reach, boost engagement, and do it all with exceptional cost-efficiency. Over just 90 days, we achieved',
      'a <span style="font-weight: bold">64.2%</span> increase in reach & <span style="font-weight: bold">62.2%</span> boost in engagement, while spending <span style="font-weight: bold">97%</span> less than typical campaigns.',
    ],
    imageSrc: '/images/first.svg',
  },
  {
    title: 'Perfect Customer Targeting',
    paragraphs: [
      'Our data-driven approach identified the perfect audience segments for Roast n Toast\'s premium coffee products, connecting with buyers most likely to convert.',
      'By focusing on quality over quantity, we created highly personalized messaging that resonated with coffee enthusiasts and casual drinkers alike.',
      'This precision targeting led to a <span style="font-weight: bold">53%</span> higher conversion rate and <span style="font-weight: bold">32%</span> increase in average order value compared to previous campaigns.',
    ],
    imageSrc: '/images/second.svg',
  },
  {
    title: 'Content Optimization',
    paragraphs: [
      'We developed a robust content strategy that highlighted Roast n Toast\'s unique brewing methods and ethically sourced beans through compelling storytelling.',
      'Our A/B testing refined messaging and visuals based on real audience feedback, continuously improving performance metrics throughout the campaign.',
      'The result was <span style="font-weight: bold">44%</span> higher content engagement and <span style="font-weight: bold">76%</span> more shares across social platforms, creating organic amplification.',
    ],
    imageSrc: '/images/third.svg',
  },
  {
    title: 'Sustainable Growth Model',
    paragraphs: [
      'Beyond immediate results, we built a sustainable marketing framework that Roast n Toast can use for future campaigns with minimal additional investment.',
      'Our proprietary analytics dashboard provides real-time insights into customer behavior, allowing for quick pivots and optimization opportunities.',
      'This approach ensures <span style="font-weight: bold">85%</span> campaign efficiency improvements and <span style="font-weight: bold">40%</span> faster time-to-market for new product launches.',
    ],
    imageSrc: '/images/fourth.svg',
  },
];
// Strategy cards for Srikara Hospitals
const srikaraStrategyCards = [
  {
    title: 'Digital Marketing Diagnosis',
    paragraphs: [
      'Our data-driven approach identified the perfect audience segments for Srikara Hospitals\' digital presence, connecting with patients most likely to engage.',
      'Our team developed a data-driven strategy focused on increasing appointment bookings and raising awareness of specialized services.',
      'This approach resulted in a <span style="font-weight: bold">73%</span> increase in online appointment requests and <span style="font-weight: bold">46%</span> higher engagement with educational content.',
    ],
    imageSrc: '/images/sf.svg',
  },
  {
    title: 'Patient Journey Optimization',
    paragraphs: [
      'We redesigned the patient digital journey from awareness to post-care, ensuring seamless experiences across all platforms and devices.',
      'Our targeted content strategy addressed specific healthcare concerns and showcased Srikara\'s expertise through educational resources and patient testimonials.',
      'This optimization led to a <span style="font-weight: bold">58%</span> reduction in appointment cancellations and <span style="font-weight: bold">37%</span> improvement in patient satisfaction scores.',
    ],
    imageSrc: '/images/ss.svg',
  },
  {
    title: 'Healthcare Content Strategy',
    paragraphs: [
      'We developed specialized content focused on Srikara\'s centers of excellence, highlighting their advanced medical technologies and expert physician team.',
      'Our multilingual approach ensured information accessibility across diverse patient demographics, with cultural sensitivity built into all communications.',
      'The result was <span style="font-weight: bold">64%</span> increase in organic traffic and <span style="font-weight: bold">82%</span> longer average session duration on critical service pages.',
    ],
    imageSrc: '/images/st.svg',
  },
  {
    title: 'Reputation Management System',
    paragraphs: [
      'We implemented a comprehensive reputation management system to monitor, respond to, and leverage patient feedback across all digital channels.',
      'Our team trained hospital staff on digital communication best practices, ensuring consistent messaging and timely responses to patient inquiries.',
      'This system delivered a <span style="font-weight: bold">4.7/5</span> star rating average across platforms and <span style="font-weight: bold">52%</span> increase in positive reviews within three months.',
    ],
    imageSrc: '/images/sfiv.svg',
  },
  {
    title: 'Community Engagement Boost',
    paragraphs: [
      'We launched targeted community outreach campaigns to build trust and strengthen Srikara\'s presence in local communities.',
      'Our initiatives included virtual health webinars and social media challenges to engage patients and promote preventive care.',
      'This led to a <span style="font-weight: bold">68%</span> increase in community event participation and <span style="font-weight: bold">45%</span> growth in social media followers.',
    ],
    imageSrc: '/images/sl.svg',
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

          {/* First Image Section */}
          <div className="w-full">
            <div className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[632px]">
              <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
              >
                <source src="/videos/srikara.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* First Strategy Section - Better spacing for mobile */}
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

          {/* Second Strategy Section - Better spacing for mobile */}
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

              {/* Quote Section - Improved mobile layout */}
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

  // Roast and Toast layout - Updated for better mobile experience
  return (
      <div className="bg-[#F3F0F0]">
        {/* Custom Hero Section for Roast and Toast - Adjusted position to avoid navbar overlap on mobile */}
        <div className="w-full h-[220px] xs:h-[240px] sm:h-[270px] md:h-[320px] lg:h-[400px] xl:h-[500px] flex flex-col items-center justify-center bg-white relative overflow-hidden mt-[60px] xs:mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[30px] px-[10px]">
          <div className="w-full flex flex-col items-start justify-center h-full pl-3 xs:pl-4 sm:pl-8 md:pl-12 lg:pl-20 xl:pl-20 pt-[20px] xs:pt-[25px] md:pt-[30px]">
            <h1 className="font-helvetica font-bold text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[92px] leading-tight tracking-tight uppercase text-black"
                style={{letterSpacing: "-0.06em", lineHeight: "0.9"}}>
              How
            </h1>
            <h2 className="font-helvetica font-bold text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-[48px] leading-tight uppercase text-black mt-1"
                style={{letterSpacing: "-0.03em", lineHeight: "1.1"}}>
              Roast and Toast
            </h2>
            <h3 className="font-helvetica font-bold text-3xl xs:text-4xl sm:text-4xl md:text-[40px] lg:text-[48px] uppercase text-[#3D3D3D] mt-1"
                style={{letterSpacing: "-0.03em", lineHeight: "1"}}>
              Brewed
            </h3>

            <div className="flex flex-col mt-1 xs:mt-2">
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#3D3D3D]">
                <span className="font-bold text-red-500">64.2%</span>
                &nbsp;More Reach
              </div>
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#3D3D3D]">
                &
              </div>
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#3D3D3D]">
                <span className="font-bold text-red-500">62.2%</span>&nbsp;Higher Engagement
              </div>
            </div>
            <div className="w-full flex justify-end pr-3 xs:pr-4 sm:pr-8 md:pr-12 lg:pr-20 mt-2 xs:mt-3 md:mt-4 lg:mt-6">
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#3D3D3D]">
                —Spending <span className="font-bold text-red-500">97%</span> Less!
              </div>
            </div>
          </div>
        </div>

        {/* First Video Section */}
        <div className="w-full">
          <div className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[632px]">
            <video
                src="/videos/roast.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Strategy Section - Improved spacing for mobile */}
        <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-[#F3F0F0]">
          <div className="w-full px-[15px] xs:px-[20px] sm:px-[30px] md:px-[40px]">
            <div className="flex flex-col space-y-8 xs:space-y-9 sm:space-y-10 md:space-y-12">
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

            {/* Quote Section - Better spacing and text size for mobile */}
            <div className="w-full mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20 py-6 xs:py-7 sm:py-8 md:py-10 lg:py-12 flex flex-col md:flex-row justify-between items-center px-3 xs:px-4 sm:px-6 md:px-8">
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl uppercase text-black mb-4 md:mb-0 text-center md:text-left">
                For us
              </div>
              <div className="font-helvetica font-bold text-base xs:text-lg sm:text-xl md:text-2xl uppercase text-black text-center md:text-right max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
                every campaign is an opportunity to brew success —one story at a time.
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}