// src/components/layout/Navbar.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
          <Image
            src="/images/mas_icon.png"
            alt={`${siteConfig.name} logo`}
            width={85}
            height={85}
            priority
            className="rounded-full"
          />
          <span className="text-lg tracking-tight xs:inline sm:text-xl">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <DarkModeToggle />
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-foreground/80 hover:text-accent"
                >
                  {t(item.key)}
                </Link>
              ))}
              <LocaleSwitcher />
              <DarkModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}