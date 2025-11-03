'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { useIconsConfig } from '../../hooks/useIconsConfig';
import { useTheme } from "next-themes";

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const socialIcons = useIconsConfig();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const colors = {
        primary: isDark ? 'bg-red-600' : 'bg-red-300',
        secondary: isDark ? 'bg-yellow-500' : 'bg-yellow-300',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                setResponseMessage('Message sent successfully!');
                setIsSubmitted(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                throw new Error(data.message || 'Failed to send message.');
            }
        } catch (error: any) {
            setResponseMessage(error.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
    <div className={`min-h-screen py-16 ${isDark ? 'dark' : ''}`}>
      {/* Background gradient blur effect with molecular animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
      </div>

      <div className="max-w-7xl mt-12 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 text-primary ${isDark ? 'dark' : ''}`}>
            Get in Touch
          </h1>
          <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
            I'd love to hear from you! Whether you have a question, want to collaborate, feel free to reach out using the form below or via. my social media channels.
          </p>
        </div>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: Contact Form */}
                <div className="w-full p-8 space-y-6 glass-container rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-200">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="glass-input mt-1 block w-full px-4 py-3 rounded-lg border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-200">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input mt-1 block w-full px-4 py-3 rounded-lg border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-sm font-medium text-gray-200">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="glass-input mt-1 block w-full px-4 py-3 rounded-lg border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white"
                                placeholder="Your message..."
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 font-semibold text-white bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg disabled:bg-gray-500/20 disabled:cursor-not-allowed"
                                disabled={isSubmitting || isSubmitted}
                            >
                                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                            </button>
                        </div>
                        {responseMessage && (
                            <p className={`text-sm text-center ${isSubmitted ? 'text-green-400' : 'text-red-400'}`}>
                                {responseMessage}
                            </p>
                        )}
                    </form>
                </div>

                {/* Right Side: Business Card */}
                <div className="w-full p-8 space-y-6 glass-container rounded-2xl">
                    <div className="w-full max-w-md space-y-6 rounded-2xl text-white ">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold">Swapnil Scott Bhalerao</h2>
                            <p className="text-gray-300">Full Stack Developer</p>
                        </div>
                        <div className="border-t border-white/20 my-4"></div>
                        <div className="space-y-4 text-lg">
    
                            <div className="flex items-center gap-4">
                                <FaPhone className="text-xl" />
                                <a
                                    href="tel:+13159377020"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >+1 (315) 937-7020</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaGlobe className="text-xl" />
                                <a
                                    href={"https://lilswapnil.me"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >Website</a>
                            </div>                        
                            <div className="space-y-4 text-lg">
                                {socialIcons.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.href}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.label}
                                            className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors duration-200"
                                        >
                                            <Icon className="text-xl" />
                                            <span>{social.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}