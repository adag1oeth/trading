"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Rocket,
  Scroll,
  Shield,
  Brain,
  BrainCircuit,
  MessagesSquare,
  Home,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Hide footer on deck page
  if (pathname === "/deck") return null;

  const mainLinks = [
    {
      label: "BLOG",
      href: "https://soulagents.io/blog",
      icon: <Scroll className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "HOME",
      href: "https://soulagents.io",
      icon: <Home className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "WHITEPAPER",
      href: "https://soulagents.io/whitepaper",
      icon: <Rocket className="w-3 h-3 md:w-4 md:h-4" />,
    },
  ];

  const legalLinks = [
    {
      label: "TERMS",
      href: "https://soulagents.io/terms",
      icon: <Scroll className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "PRIVACY",
      href: "https://soulagents.io/privacy",
      icon: <Shield className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "RISKS",
      href: "https://soulagents.io/disclosure",
      icon: <Shield className="w-3 h-3 md:w-4 md:h-4" />,
    },
  ];

  const socialLinks = [
    {
      label: "SOUL X",
      href: "https://x.com/soul_agents",
      icon: <Brain className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "BUNNY X",
      href: "https://x.com/cryptobunny__",
      icon: <BrainCircuit className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      label: "SOUL TG",
      href: "https://t.me/soul_agents",
      icon: <MessagesSquare className="w-3 h-3 md:w-4 md:h-4" />,
    },
  ];

  const renderLink = (link: {
    href: string;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isExternal = link.href.startsWith("http");
    const LinkComponent = isExternal ? "a" : Link;
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <LinkComponent
        key={link.href}
        href={link.href}
        {...externalProps}
        className="px-1.5 py-0.5 md:px-2 md:py-1 bg-black/40 hover:bg-black/60 rounded-lg transition-all duration-300 
                  transform hover:scale-105 group flex items-center gap-1.5 md:gap-2
                  border border-white/5 hover:border-current backdrop-blur-sm"
      >
        <span className="text-white/70 group-hover:text-current group-hover:scale-110 transition-all duration-200">
          {link.icon}
        </span>
        <span className="text-[10px] md:text-xs font-medium text-white/70 group-hover:text-white whitespace-nowrap">
          {link.label}
        </span>
      </LinkComponent>
    );
  };

  return (
    <footer className="fixed bottom-0 w-full bg-black/80 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-2 md:px-4 py-1.5 md:py-2">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {/* Resources Section */}
          <div className="flex items-center justify-start">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {mainLinks.map(renderLink)}
            </div>
          </div>

          {/* Legal Section */}
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
              {legalLinks.map(renderLink)}
            </div>
          </div>

          {/* Social Section */}
          <div className="flex items-center justify-end">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {socialLinks.map(renderLink)}
            </div>
          </div>
        </div>

        {/* Copyright - Now visible on all screens */}
        <div className="block text-center mt-2">
          <span className="text-xs text-white/60 flex items-center justify-center gap-2">
            <Brain className="w-4 h-4" />© {currentYear} SOUL AGENTS
            <span className="hidden md:inline">
              • POWERED BY GIGABRAIN and Brian AI ⚡
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
