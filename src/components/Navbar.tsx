'use client';

import React from 'react';
import Link from 'next/link';
import { Sliders, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-zinc-900/70 backdrop-blur-xl px-4 sm:px-5 shadow-2xl shadow-black/40 pointer-events-auto transition-all">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-extrabold text-sm tracking-tight">S</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              Squeeze
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
              Pro Engine
            </span>
          </div>
        </Link>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-400">
          <Link
            href="/convert/png-to-ico"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            PNG &rarr; ICO
          </Link>
          <Link
            href="/convert/svg-to-png"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            SVG &rarr; PNG
          </Link>
          <Link
            href="/convert/jpg-to-webp"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            JPG &rarr; WebP
          </Link>
          <Link
            href="/compress/jpg"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
          >
            <Sparkles className="h-3 w-3" />
            Compressor
          </Link>
        </nav>

        {/* Actions & Status Pill */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <ShieldCheck className="h-3 w-3" />
            100% In-Browser
          </div>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              type="button"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              aria-label="Compression settings"
            >
              <Sliders className="h-3.5 w-3.5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              <span>Settings</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
