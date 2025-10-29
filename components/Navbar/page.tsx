"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-2 max-w-7xl mx-auto">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
          <a href="/" className="text-xl hidden sm:block">Scott's Portfolio</a>
        </div>

        {/* Desktop Navbar - Center */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <nav className="flex flex-col lg:flex-row justify-center gap-8">
            <a href="/about" className="text-gray-800 hover:text-blue-500 transition font-medium">About</a>
            <a href="/credentials" className="text-gray-800 hover:text-blue-500 transition font-medium">Credentials</a>
            <a href="/projects" className="text-gray-800 hover:text-blue-500 transition font-medium">Projects</a>
          </nav>
        </div>

        {/* Desktop Input and Button - Right */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
          <div 
            className="flex items-center gap-2 transition-all duration-300"
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(false)}
          >
            <input
              type="text"
              placeholder="ask scotty"
              className={`rounded-md border border-gray-900 px-4 py-2 focus:border-gray-200 transition-all duration-300 overflow-hidden ${
                showInput ? "w-36 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <button 
              className="rounded-full bg-gray-900 p-2 text-white hover:bg-gray-700 transition duration-200 flex items-center justify-center flex-shrink-0">
              <Image
                src="/askscotty.png"
                alt="Ask Scotty"
                width={20}
                height={20}
                style={{ filter: "invert(1)" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1 flex-shrink-0"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 p-4 flex flex-col gap-4">
          <nav className="flex flex-col lg:flex-row justify-center gap-8">
            <a href="/about" className="text-gray-800 hover:text-blue-500 transition font-medium">About</a>
            <a href="/credentials" className="text-gray-800 hover:text-blue-500 transition font-medium">Credentials</a>
            <a href="/projects" className="text-gray-800 hover:text-blue-500 transition font-medium">Projects</a>
          </nav>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="ask scotty"
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none w-full"
            />
            <button className="rounded-full bg-blue-100 px-4 py-2 text-white hover:bg-blue-700 transition duration-200 w-full flex items-center justify-center gap-2">
              <Image
                src="/askscotty.png"
                alt="Ask Scotty"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}