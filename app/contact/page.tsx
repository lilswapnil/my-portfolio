'use client';
import './contact.css';
import LenisProvider from '../components/LenisProvider';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { image } from '../../data/images';
import { useTheme } from 'next-themes';
import { useIconsConfig } from '../../hooks/useIconsConfig';

type IconsConfig = ReturnType<typeof useIconsConfig>;
type IconItem = IconsConfig[number];

interface OrbitIconProps {
  item: IconItem;
  index: number;
  totalIcons: number;
}
function OrbitIcon({ item, index, totalIcons }: OrbitIconProps) {
  const IconComponent = item.icon;

  return (
    <div
      className="orbit-item absolute"
      style={{ ['--rotation' as string]: `${(index * 360) / totalIcons}deg` }}
    >
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={item.label}
        className={`p-3 ${item.bg} text-white rounded-full ${item.hover} transition duration-200 flex items-center justify-center`}
      >
        <IconComponent size={24} />
      </a>
    </div>
  );
}

function OrbitSection({
  icons,
}: {
  icons: ReturnType<typeof useIconsConfig>;
}) {
  return (
    <div className="w-full h-full  flex items-center justify-center overflow-hidden">
      {/* Responsive square that never exceeds the viewport */}
      <div
        className="relative w-[min(90vw,360px)] h-[min(90vw,360px)] sm:w-[min(70vw,360px)] sm:h-[min(70vw,360px)]"
        style={{}}
      >
        <div className="orbit-container absolute inset-0 flex items-center justify-center">
          {/* Center Image */}
          <div className="absolute z-10">
            <Image
              src= {image}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full"
              style={{
                width: "min(28vw, 180px)",
                height: "min(28vw, 180px)",
              }}
              priority
            />
          </div>

          {/* Orbiting Icons */}
          <div className="orbit absolute inset-0">
            {icons.map((item, index) => (
              <OrbitIcon
                key={item.href}
                item={item}
                index={index}
                totalIcons={icons.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const icons = useIconsConfig();
  const { theme } = useTheme();
  const isDark = mounted && theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = {
    primary: isDark ? 'bg-red-600' : 'bg-red-300',
    secondary: isDark ? 'bg-yellow-500' : 'bg-yellow-300',
    textPrimary: isDark ? 'text-primary dark:text-primary' : 'text-primary',
    textSecondary: isDark ? 'text-secondary dark:text-secondary' : 'text-secondary',
    glassContainer: isDark ? 'glass-container rounded-2xl' : 'bg-white rounded-2xl border border-gray-200 shadow',
    glassInput: isDark ? 'glass-input' : 'bg-zinc-100 border border-gray-300 text-primary placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-200',
    button: isDark ? 'w-full py-3 px-4 font-semibold text-primary dark:text-white bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg disabled:bg-gray-500/20 disabled:cursor-not-allowed' : 'w-full py-3 px-4 font-semibold text-primary bg-zinc-200 border border-gray-300 rounded-lg hover:bg-zinc-300 active:scale-95 transition-all duration-200 shadow-lg disabled:bg-gray-500/20 disabled:cursor-not-allowed',
  };

  // Years counter
  const [yearsCount, setYearsCount] = useState<number>(0);

  useEffect(() => {
    if (yearsCount >= 3) return;
    const timer = setTimeout(() => setYearsCount((prev) => prev + 1), 300);
    return () => clearTimeout(timer);
  }, [yearsCount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setResponseMessage('Message sent successfully!');
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const msg =
          (data && (data.message as string)) || 'Failed to send message.';
        throw new Error(msg);
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'An unexpected error occurred.';
      setResponseMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
    <div className="min-h-screen py-16">
      <LenisProvider />
      
      {/* Background gradient blur effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`}
        />
        <div
          className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`}
        />
      </div>

      <div className="max-w-7xl mt-12 mx-auto px-4 ">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 ${colors.textPrimary}`}>
          Get in Touch
          </h1>
          <p className={`text-lg ${colors.textSecondary}`}>
            I&apos;d love to hear from you! Whether you have a question, want to collaborate, feel free to reach out using the form below or via my social media channels.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About/Orbit */}
          <div className="about-container flex items-center justify-center text-white text-4xl relative overflow-x-hidden">
            <OrbitSection icons={icons} />
          </div>

          {/* Contact Form */}
          <div className={`w-full p-8 space-y-6 ${colors.glassContainer}`}>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-secondary dark:text-secondary"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${colors.glassInput} mt-1 block w-full px-4 py-3 rounded-lg border-0 text-primary placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white`}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-secondary dark:text-secondary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${colors.glassInput} mt-1 block w-full px-4 py-3 rounded-lg border-0 text-primary placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-secondary dark:text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${colors.glassInput} mt-1 block w-full px-4 py-3 rounded-lg border-0 text-primary placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-white`}
                  placeholder="Your message..."
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={colors.button}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting
                    ? 'Sending...'
                    : isSubmitted
                    ? 'Message Sent!'
                    : 'Send Message'}
                </button>
              </div>

              {responseMessage && (
                <p
                  className={`text-sm text-center ${
                    isSubmitted ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}