"use client"

import { useEffect, useState, ChangeEvent, FormEvent } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ContactHero() {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    // Form state
    const [formData, setFormData] = useState({
        company: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Add your form submission logic here
    }

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section className="bg-black text-white pt-16 xs:pt-20 sm:pt-24 md:pt-40 pb-20 sm:pb-28 md:pb-40 px-4 md:px-8 lg:px-20">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="container mx-auto lg:mx-0 lg:px-0"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                    {/* Left side - Heading and tagline */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full md:w-[52%] md:pr-2 lg:pr-0 flex flex-col justify-start items-start"
                        style={{ marginTop: "55px" }}
                    >
                        <h1
                            className="font-helvetica font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[100px] tracking-tight uppercase text-left"
                            style={{
                                fontFamily: "Helvetica",
                                fontWeight: 700,
                                letterSpacing: "-1px",
                                textTransform: "uppercase",
                                lineHeight: 0.8, // Base line height for md and larger
                            }}
                        >
                            <span className="xs:block sm:block md:hidden lg:hidden xl:hidden" style={{ lineHeight: "1.2" }}>
                                Hear the
                            </span>
                            <span className="xs:block sm:block md:hidden lg:hidden xl:hidden" style={{ lineHeight: "1.2" }}>
                                Buzz.
                            </span>
                            <span className="xs:block sm:block md:hidden lg:hidden xl:hidden" style={{ lineHeight: "1.2" }}>
                                Build the Brand.
                            </span>
                            <span className="hidden md:block">
                                Hear the Buzz.<br />Build the Brand.
                            </span>
                        </h1>
                        <p
                            className="mt-4 sm:mt-6 text-white text-sm sm:text-base text-left"
                            style={{
                                fontFamily: "Sharp Grotesk",
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
                        className="w-full md:w-[44%] lg:w-[45%] flex justify-center md:justify-end lg:justify-end mt-3 md:mt-0"
                        style={{ marginTop: "15px" }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-[400px] p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-between border border-white bg-black rounded-lg"
                            style={{
                                borderRadius: "8px",
                                border: "0.5px solid #FFF",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "10px",
                                minHeight: "400px",
                            }}
                        >
                            <div className="space-y-2 w-full">
                                <div>
                                    <label className="block text-white text-sm mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Viralbug Digital Marketing"
                                        className="w-full p-2 bg-transparent border-b border-white text-white text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Viralbug.hyd@gmail.com"
                                        className="w-full p-2 bg-transparent border-b border-white text-white text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm mb-1">Contact Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9908341537"
                                        className="w-full p-2 bg-transparent border-b border-white text-white text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm mb-1">More about your Story</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Brahmanandham is a villian"
                                        className="w-full p-2 bg-transparent border-b border-white text-white text-sm h-16"
                                    />
                                </div>
                            </div>

                            <div className="w-full mt-4">
                                <Button
                                    type="submit"
                                    className="rounded-none w-full bg-white text-primary hover:bg-gray-100 pl-3 pr-4 py-2 font-bold text-base tracking-tighter flex items-center justify-center gap-1"
                                >
                                    <Image
                                        src="/images/log.svg"
                                        alt="Button Icon"
                                        className="w-4 h-4 object-contain"
                                        width={20}
                                        height={20}
                                    />
                                    Bug us — let's build.
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}