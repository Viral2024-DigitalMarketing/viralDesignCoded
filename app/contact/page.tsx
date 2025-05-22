import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import AboutCareers from '@/components/contact/AboutCareers';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Digital Agency',
  description: 'Get in touch with our team for your digital transformation needs',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <AboutCareers />
    </>
  );
}