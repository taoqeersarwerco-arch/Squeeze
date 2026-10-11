'use client';

import React from 'react';
import Link from 'next/link';
import { Sliders, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-base tracking-tight">S</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              Squeeze
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                Local
              </span>
            </span>
          </div>
        </Link>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/convert/png-to-ico" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Favicon (PNG &rarr; ICO)
          </Link>
          <Link href="/convert/svg-to-png" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            SVG &rarr; PNG
          </Link>
          <Link href="/convert/jpg-to-webp" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            JPG &rarr; WebP
          </Link>
          <Link href="/compress/jpg" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Compressor
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% Private &bull; In-Browser
          </div>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Compression settings"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
