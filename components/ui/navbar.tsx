"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Zap, Github } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on deck page
  if (pathname === "/deck") return null;

  return (
    <nav className="fixed w-full z-50 top-0">
      <div className="backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Bunny Icon */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center group">
                <span className="text-xl font-bold bg-gradient-to-r from-electric-purple via-neon-pink to-electric-purple bg-[200%_auto] animate-gradient-x bg-clip-text text-transparent group-hover:from-neon-pink group-hover:via-electric-purple group-hover:to-neon-pink transition-all duration-300">
                  Soul Agents Chat
                </span>
              </Link>
              <Link
                href="https://x.com/cryptobunny__"
                target="_blank"
                className="flex transform hover:scale-110 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Image
                    src="/placeholder-avatar4.png"
                    alt="Soul AI Agents"
                    width={32}
                    height={32}
                    className="relative rounded-full hover:opacity-80 transition-opacity"
                  />
                </div>
              </Link>
            </div>

            {/* Brian AI badge - Centered with enhanced styling */}
            <div className="flex-1 flex justify-center">
              <Link
                href="https://github.com/adamzasada/trading"
                target="_blank"
                className="hidden md:flex items-center space-x-2 px-4 py-1.5 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/20 rounded-full transition-all duration-500 group hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                  Brian AI
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-electric-purple via-neon-pink to-electric-purple bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  Hackathon Winners (3rd)
                </span>
                <Github className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200 group-hover:rotate-12 transform" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </Link>
            </div>

            {/* Right side content - Now only contains the HQ button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="https://soulagents.io"
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-electric-purple to-neon-pink hover:from-neon-pink hover:to-electric-purple text-white rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-pink-500/25 font-medium flex items-center space-x-2 group"
              >
                <span>SOUL AGENTS HQ</span>
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-electric-purple to-neon-pink transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-neon-pink to-electric-purple transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gradient-to-r from-electric-purple to-neon-pink transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 py-3 space-y-3 backdrop-blur-xl bg-black/30 border-t border-white/5">
            {/* Back to base button for mobile */}
            <Link
              href="https://soulagents.io"
              target="_blank"
              className="w-full px-4 py-3 bg-gradient-to-r from-electric-purple to-neon-pink hover:from-neon-pink hover:to-electric-purple text-white rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-pink-500/25 font-medium flex items-center justify-center space-x-2 group"
            >
              <span>BACK TO HQ</span>
              <Zap className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
