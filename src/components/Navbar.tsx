'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sliders, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Convert', href: '/' },
    { label: 'Compress', href: '/compress/jpg' },
    { label: 'Learn', href: '/learn' },
    { label: 'Developers', href: '/developers' },
  ];

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
      <div className="relative mx-auto flex h-12 max-w-4xl items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl px-4 sm:px-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] pointer-events-auto">
        {/* Specular top edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-[15px] tracking-tight text-white">
            Squeeze
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-zinc-400">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-zinc-300 hover:bg-white/[0.08] hover:border-white/[0.14] hover:text-white transition-all duration-150 cursor-pointer"
              aria-label="Conversion settings"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white transition cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/[0.08] bg-zinc-950/95 backdrop-blur-2xl p-2 md:hidden shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-[13px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
