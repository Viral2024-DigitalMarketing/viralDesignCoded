import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import AboutCareers from '@/components/contact/AboutCareers';


export const metadata: Metadata = {
    title: 'Contact Us |ViralBug Digital Marketing',
    description: 'Get in touch with our expert team to discuss your digital transformation needs and how we can help your business grow online.',
};
export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <AboutCareers />
    </>
  );
}