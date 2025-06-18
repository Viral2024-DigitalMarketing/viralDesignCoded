import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import AboutCareers from '@/components/contact/AboutCareers';


export const metadata: Metadata = {
    title: 'Contact Us |ViralBug Digital Marketing',
    description: 'Ready to grow your business? Contact ViralBug Digital—Hyderabad’s trusted digital marketing agency. Book a free consultation today.',
};
export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <AboutCareers />
    </>
  );
}