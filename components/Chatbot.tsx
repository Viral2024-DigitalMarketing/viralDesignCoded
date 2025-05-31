'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { KnowledgeItem, knowledgeBase } from './knowledgeBase';

interface Message {
    from: 'user' | 'bot';
    text: string;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [lineVisible, setLineVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [spiderAnimation, setSpiderAnimation] = useState('swing');
    const [bugImagePath] = useState('/images/bug_robo.jpg'); // Update this path to your actual image

    const getBotResponse = (input: string): string => {
        const text = input.toLowerCase();
        for (const item of knowledgeBase) {
            if (item.keywords.some((kw) => text.includes(kw))) {
                return item.response;
            }
        }
        return "Hmm, that's not in my web of knowledge yet. Ask me about our services, pricing, or how to contact us!";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        const botMsg = getBotResponse(userMsg);

        setMessages((prev) => [...prev, { from: 'user', text: userMsg }, { from: 'bot', text: botMsg }]);
        setInput('');
    };

    // Show welcome popup when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomePopup(true);
            // Auto hide popup after 3 seconds
            setTimeout(() => setShowWelcomePopup(false), 3000);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Red line animation effect
    useEffect(() => {
        const timer = setTimeout(() => setLineVisible(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Spider animation cycling
    useEffect(() => {
        const animations = ['swing', 'wiggle', 'bounce'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % animations.length;
            setSpiderAnimation(animations[currentIndex]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !target.closest('.chatbot-container') && !target.closest('.chatbot-button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Auto-close when not hovering
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isOpen && !isHovering) {
            timeout = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [isOpen, isHovering]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9990]">
            {/* Simple Creative Popup - Desktop */}
            {showWelcomePopup && (
                <div className="fixed bottom-56 right-2 z-[10001] pointer-events-auto animate-fade-in hidden md:block">
                    <div className="bg-black border-2 border-red-500 rounded-xl p-4 shadow-xl max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">💬</div>
                            <div>
                                <p className="text-white text-sm font-bold">Hey there! 👋</p>
                                <p className="text-red-300 text-xs">Ready to catch some digital success?</p>
                            </div>
                        </div>
                    </div>
                    {/* Arrow pointing down to icon */}
                    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500"></div>
                </div>
            )}

            {/* Simple Creative Popup - Mobile */}
            {showWelcomePopup && (
                <div className="fixed bottom-32 right-2 z-[10001] pointer-events-auto animate-fade-in block md:hidden">
                    <div className="bg-black border-2 border-red-500 rounded-xl p-3 shadow-xl max-w-xs">
                        <div className="flex items-center gap-2">
                            <div className="text-xl">💬</div>
                            <div>
                                <p className="text-white text-sm font-bold">Hey there! 👋</p>
                                <p className="text-red-300 text-xs">Ready to catch some digital success?</p>
                            </div>
                        </div>
                    </div>
                    {/* Arrow pointing down to mobile icon */}
                    <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500"></div>
                </div>
            )}

            {/* Desktop View - Thin to Thick Web Line and Spider */}
            <div className="hidden md:block">
                {/* Gradual Thickening Web Line */}
                <div className="fixed top-0 right-12 z-[9999] pointer-events-none">
                    <div
                        className="web-line relative"
                        style={{
                            height: lineVisible ? "calc(100vh - 200px)" : "0px",
                            width: "1px",
                            background: "linear-gradient(to bottom, transparent 0%, #fca5a5 10%, #dc2626 50%, #991b1b 80%, #7f1d1d 100%)",
                            transformOrigin: "top center",
                            transition: "height 2s ease-out",
                            borderRadius: '0.5px',
                            boxShadow: '0 0 8px rgba(220, 38, 38, 0.4)'
                        }}
                    >
                        {/* Gradual width increase */}
                        <div className="absolute inset-0" style={{
                            width: '2px',
                            left: '-0.5px',
                            background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, #dc2626 100%)',
                            borderRadius: '1px'
                        }}></div>
                    </div>

                    {/* Spider at End of Line */}
                    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] chatbot-button pointer-events-auto spider-container ${spiderAnimation}`}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="spider-button relative group"
                            aria-label="Open spider chatbot"
                        >
                            {/* Spider with Image */}
                            <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 via-red-700 to-black rounded-full shadow-xl border-2 border-red-400 hover:scale-110 transition-all duration-300 overflow-hidden">
                                <img
                                    src={bugImagePath}
                                    alt="Bug mascot"
                                    className="w-full h-full object-cover rounded-full"
                                    onError={(e) => {
                                        // Fallback to gradient if image fails
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile View - Simple Spider Button with Professional Float Animation */}
            <div className="block md:hidden">
                <div className="fixed bottom-6 right-6 z-[9999] chatbot-button pointer-events-auto mobile-float-animation">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-14 h-14 rounded-full shadow-xl hover:scale-110 transition-all duration-300 border-2 border-red-400 overflow-hidden"
                        aria-label="Open spider chatbot"
                    >
                        <img
                            src={bugImagePath}
                            alt="Bug mascot"
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                // Show fallback gradient background
                                const button = target.parentElement as HTMLButtonElement;
                                button.classList.add('bg-gradient-to-br', 'from-red-600', 'via-red-700', 'to-black');
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Simple Clean Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-28 w-[380px] h-[500px] shadow-2xl rounded-2xl flex flex-col z-[10000] chatbot-container pointer-events-auto md:right-6 right-4 overflow-hidden border-2 border-red-500 bg-black"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                        maxWidth: 'calc(100vw - 2rem)',
                        width: 'min(380px, calc(100vw - 2rem))',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(220, 38, 38, 0.3)'
                    }}
                >
                    {/* Simple Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center">
                                <img
                                    src={bugImagePath}
                                    alt="Bug mascot"
                                    className="w-6 h-6 object-contain"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) {
                                            fallback.style.display = 'block';
                                        }
                                    }}
                                />
                                <span className="text-lg" style={{display: 'none'}}></span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Viral Bug</h3>
                                <p className="text-white/80 text-sm">Your Marketing Buddy</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
                        {messages.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/lpg.svg"
                                        alt="Company Logo"
                                        className="w-12 h-12 object-contain"
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = 'none';
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (fallback) {
                                                fallback.style.display = 'block';
                                            }
                                        }}
                                    />
                                    <span className="text-2xl font-bold text-white" style={{display: 'none'}}>VB</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">Ready to go viral? 🚀</h4>
                                <p className="text-gray-400 text-sm">Let's create some digital magic together!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                        msg.from === 'user'
                                            ? 'bg-white text-black'
                                            : 'bg-red-600 text-white'
                                    }`}>
                                        {msg.from === 'user' ? 'YOU' : 'VB'}
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-2xl ${
                                        msg.from === 'user'
                                            ? 'bg-white text-black rounded-br-md'
                                            : 'bg-red-900 text-white rounded-bl-md'
                                    }`}>
                                        <span className="text-sm">{msg.text}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Simple Input */}
                    <div className="p-4 bg-black border-t border-red-500/30">
                        <div className="flex gap-2 bg-gray-800 rounded-xl p-2">
                            <input
                                type="text"
                                className="flex-1 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                disabled={!input.trim()}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style jsx>{`
                @keyframes swing {
                    0%, 100% { transform: translateX(-50%) rotate(0deg); }
                    25% { transform: translateX(-50%) rotate(-10deg); }
                    75% { transform: translateX(-50%) rotate(10deg); }
                }

                @keyframes wiggle {
                    0%, 100% { transform: translateX(-50%) translateY(0px); }
                    25% { transform: translateX(-50%) translateY(-3px); }
                    75% { transform: translateX(-50%) translateY(-2px); }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0px); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes mobile-float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }

                .spider-container.swing { animation: swing 4s ease-in-out infinite; }
                .spider-container.wiggle { animation: wiggle 2s ease-in-out infinite; }
                .spider-container.bounce { animation: bounce 2s ease-in-out infinite; }

                .mobile-float-animation {
                    animation: mobile-float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Chatbot;