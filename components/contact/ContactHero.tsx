"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import emailjs from "emailjs-com"; // Import emailjs-com

export default function ContactHero() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [formData, setFormData] = useState({
        company: "",
        email: "",
        phone: "",
        message: "",
    });

    const [focusedField, setFocusedField] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear any previous status messages when user starts typing
        if (submitStatus.type) {
            setSubmitStatus({ type: null, message: '' });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // Send email with EmailJS using your provided credentials
            const result = await emailjs.sendForm(
                "service_qa042zr",      // Your service ID
                "template_pzfxkkg",     // Your template ID
                e.target as HTMLFormElement, // The form element
                "ijojqFPNtRXtu98kg"     // Your public key
            );

            console.log("Email sent successfully:", result.text);

            // Show success message
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!'
            });

            // Reset the form after successful submission
            setFormData({ company: "", email: "", phone: "", message: "" });

        } catch (error: any) {
            console.error("Error sending email:", error);

            // Show error message
            setSubmitStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or contact us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField("");
    };

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Auto-hide status messages after 5 seconds
    useEffect(() => {
        if (submitStatus.type) {
            const timer = setTimeout(() => {
                setSubmitStatus({ type: null, message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus.type]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section className="bg-black text-white pt-16 xs:pt-12 sm:pt-16 md:pt-40 pb-20 xs:pb-16 sm:pb-20 md:pb-40 xs:pl-[30px] sm:pl-[30px] md:pl-0 xs:pr-[30px] sm:pr-[30px] md:pr-0 lg:px-[80px]">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="max-w-full"
            >
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 lg:gap-10 xl:gap-16">
                    {/* Left side - Heading and tagline */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full md:w-[52%] flex flex-col justify-start items-start px-[30px] xs:px-[30px] sm:px-[30px] md:px-0"
                        style={{marginTop: "30px"}}
                    >
                        <h1
                            className="font-helvetica font-bold text-2xl xs:text-[45px] sm:text-[50px] md:text-6xl lg:text-7xl xl:text-[120px] tracking-tight uppercase text-left"
                            style={{
                                fontFamily: "Helvetica",
                                fontWeight: 700,
                                letterSpacing: "-0.5px",
                                textTransform: "uppercase",
                            }}
                        >
                            {/* Mobile view: Four lines for xs and sm */}
                            <span className="block xs:block sm:block md:hidden leading-none ml-2 text-lg sm:text-2xl"
                                  style={{ lineHeight: "1", marginBottom: "0px", paddingBottom: "0px" }}>Hear the</span>
                            <span className="block xs:block sm:block md:hidden leading-none ml-2 text-lg sm:text-xl"
                                  style={{ lineHeight: "1", marginBottom: "0px", paddingBottom: "0px" }}>Buzz.</span>
                            <span className="block xs:block sm:block md:hidden leading-none ml-2 text-lg sm:text-xl"
                                  style={{ lineHeight: "1", marginBottom: "0px", paddingBottom: "0px" }}>Build</span>
                            <span className="block xs:block sm:block md:hidden leading-none ml-2 text-lg sm:text-xl"
                                  style={{ lineHeight: "1", marginBottom: "0px", paddingBottom: "0px" }}>the Brand.</span>

                            {/* Desktop view: Two lines */}
                            <span className="hidden md:block" style={{lineHeight: "0.8"}}>
                                Hear the Buzz.<br/>Build the Brand.
                            </span>
                        </h1>
                        <p
                            className="mt-4 ml-2 sm:mt-6 text-white text-xs xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] text-left"
                            style={{
                                fontFamily: "Helvetica",
                                fontWeight: 300,
                                lineHeight: "1.6",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Imagine your brand as the next big conversation.
                        </p>
                    </motion.div>

                    {/* Right side - Contact form */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full md:w-[44%] lg:w-[45%] flex justify-start md:justify-end lg:justify-end mt-3 md:mt-0"
                        style={{marginTop: "15px"}}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-[90%] xs:max-w-[90%] sm:max-w-[90%] md:max-w-[400px] xl:max-w-[500px] p-6 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col justify-between border border-white bg-black rounded-lg mx-auto md:mx-0"
                            style={{
                                borderRadius: "8px",
                                border: "0.5px solid #FFF",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "10px",
                                minHeight: "280px",
                            }}
                        >
                            {/* Status Message */}
                            {submitStatus.type && (
                                <div className={`w-full p-3 rounded mb-4 text-sm ${
                                    submitStatus.type === 'success'
                                        ? 'bg-green-900/20 border border-green-500 text-green-400'
                                        : 'bg-red-900/20 border border-red-500 text-red-400'
                                }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <div className="space-y-4 w-full">
                                <div className="w-full">
                                    <label className="block text-white text-sm lg:text-base mb-2 text-left">Company Name</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("company")}
                                        onBlur={handleBlur}
                                        placeholder="Enter your company name"
                                        className="w-full p-2 bg-transparent text-white text-sm outline-none transition-all duration-300 border-b border-white"
                                        style={{ textAlign: "left" }}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm lg:text-base mb-2 text-left">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("email")}
                                        onBlur={handleBlur}
                                        placeholder="Enter your email"
                                        className="w-full p-2 bg-transparent text-white text-sm outline-none transition-all duration-300 border-b border-white"
                                        style={{ textAlign: "left" }}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm lg:text-base mb-2 text-left">Contact Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("phone")}
                                        onBlur={handleBlur}
                                        placeholder="Enter your phone number"
                                        className="w-full p-2 bg-transparent text-white text-sm outline-none transition-all duration-300 border-b border-white"
                                        style={{ textAlign: "left" }}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-white text-sm lg:text-base mb-2 text-left">More about your Story</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("message")}
                                        onBlur={handleBlur}
                                        placeholder="Tell us more about your story"
                                        className="w-full p-2 bg-transparent text-white text-sm h-16 outline-none resize-none transition-all duration-300 border-b border-white"
                                        style={{ textAlign: "left" }}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full mt-6 flex justify-start items-start">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`rounded-none font-bold tracking-tighter flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 lg:px-5 lg:py-2 transition-all duration-300 ${
                                        isSubmitting
                                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                            : 'bg-white text-[#E30000] hover:bg-gray-100'
                                    }`}
                                    style={{
                                        fontFamily: "Helvetica",
                                        height: "auto",
                                    }}
                                >
                                    {!isSubmitting && (
                                        <Image
                                            src="/images/log.svg"
                                            alt="Button Icon"
                                            width={10}
                                            height={10}
                                            className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 object-contain"
                                        />
                                    )}

                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        "Bug us — let's build."
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}