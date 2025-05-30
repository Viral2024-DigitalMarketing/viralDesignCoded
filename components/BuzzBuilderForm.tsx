'use client';

import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function BuzzBuilderForm() {
    const [formData, setFormData] = useState({
        company: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isOpen, setIsOpen] = useState(true); // Control form visibility

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsOpen(false); // Close form on submit
        // Your submission logic here
    };

    const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
        // Check if the click is on the overlay (outside the form)
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    if (!isOpen) return null; // Don't render anything if form is closed

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleOutsideClick}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-black border border-white/50 rounded-lg flex flex-col justify-between"
                style={{
                    borderRadius: '8px',
                    border: '0.5px solid #FFF',
                    gap: '12px',
                    minHeight: '360px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                <div className="space-y-4 w-full">
                    <div>
                        <label className="block text-white text-sm font-medium mb-1.5">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Viralbug Digital Marketing"
                            className="w-full p-2.5 bg-transparent border-b border-white/70 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Viralbug.hyd@gmail.com"
                            className="w-full p-2.5 bg-transparent border-b border-white/70 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-1.5">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9908341537"
                            className="w-full p-2.5 bg-transparent border-b border-white/70 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-1.5">
                            More about your Story
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Brahmanandham is a villain"
                            className="w-full p-2.5 bg-transparent border-b border-white/70 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white resize-none h-20"
                        />
                    </div>
                </div>

                <div className="w-full mt-6">
                    <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold text-base tracking-tight py-2.5 flex items-center justify-center gap-2 rounded-md"
                    >
                        <Image
                            src="/images/log.svg"
                            alt="Button Icon"
                            className="w-5 h-5 object-contain"
                            width={20}
                            height={20}
                        />
                        Bug us — let's build.
                    </Button>
                </div>
            </form>
        </div>
    );
}