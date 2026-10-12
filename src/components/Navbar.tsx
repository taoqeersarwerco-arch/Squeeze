'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Sliders, Menu, X, ChevronDown, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { SEO_CONVERSION_PAIRS, SEO_COMPRESS_FORMATS } from '@/lib/constants';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<'convert' | 'compress' | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<'convert' | 'compress' | null>(null);
  const [pinnedDropdown, setPinnedDropdown] = useState<'convert' | 'compress' | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeDropdown = pinnedDropdown || hoverDropdown;

  React.useEffect(() => {
    const handlePointerDownOutside = (e: MouseEvent | TouchEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setPinnedDropdown(null);
        setHoverDropdown(null);
      }
    };
    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('touchstart', handlePointerDownOutside);
    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, []);

  const handleMouseEnter = (menu: 'convert' | 'compress') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoverDropdown(menu);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoverDropdown(null);
    }, 220);
  };

  const toggleDropdownClick = (menu: 'convert' | 'compress') => {
    if (pinnedDropdown === menu) {
      setPinnedDropdown(null);
      setHoverDropdown(null);
    } else {
      setPinnedDropdown(menu);
    }
  };

  const closeDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setPinnedDropdown(null);
    setHoverDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
      <div className="relative mx-auto flex h-12 max-w-4xl items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl px-4 sm:px-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] pointer-events-auto">
        {/* Specular top edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {/* Brand */}
        <Link href="/" onClick={closeDropdown} className="flex items-center gap-2 group">
          <span className="font-bold text-[15px] tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            Squeeze
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav ref={navContainerRef} className="hidden md:flex items-center gap-1 text-[13px] font-medium text-zinc-400">
          {/* Convert with Hover & Click Submenu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('convert')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdownClick('convert')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer ${
                activeDropdown === 'convert'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span>Convert</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeDropdown === 'convert' ? 'rotate-180' : ''}`} />
            </button>

            {/* Convert Submenu Flyout */}
            {activeDropdown === 'convert' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[600px] max-w-[90vw] pointer-events-auto z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('convert')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Invisible hover bridge */}
                <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" />
                <div
                  className="rounded-2xl border border-white/[0.10] bg-zinc-950/95 backdrop-blur-2xl p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] space-y-4"
                  style={{ boxShadow: 'var(--glass-inset), 0 24px 48px -12px rgba(0,0,0,0.85)' }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div>
                      <p className="text-xs font-semibold text-white">Image Conversion Pairs</p>
                      <p className="text-[11px] text-[var(--text-secondary)]">Instant in-browser format conversion</p>
                    </div>
                    <Link
                      href="/"
                      onClick={closeDropdown}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition"
                    >
                      <span>Custom converter</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {SEO_CONVERSION_PAIRS.map((pair) => (
                      <Link
                        key={`${pair.from}-${pair.to}`}
                        href={`/convert/${pair.from}-to-${pair.to}`}
                        onClick={closeDropdown}
                        className="group/item flex items-center justify-between p-2 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1 text-xs font-medium text-zinc-300 group-hover/item:text-white">
                            <span className="uppercase">{pair.from}</span>
                            <span className="text-zinc-500">&rarr;</span>
                            <span className="uppercase text-white font-semibold">{pair.to}</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                            {pair.to === 'ico' ? 'Favicon' : pair.to === 'svg' ? 'Vector trace' : 'Convert'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compress with Hover & Click Submenu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('compress')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdownClick('compress')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer ${
                activeDropdown === 'compress'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span>Compress</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeDropdown === 'compress' ? 'rotate-180' : ''}`} />
            </button>

            {/* Compress Submenu Flyout */}
            {activeDropdown === 'compress' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px] pointer-events-auto z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('compress')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Invisible hover bridge */}
                <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" />
                <div
                  className="rounded-2xl border border-white/[0.10] bg-zinc-950/95 backdrop-blur-2xl p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] space-y-2"
                  style={{ boxShadow: 'var(--glass-inset), 0 24px 48px -12px rgba(0,0,0,0.85)' }}
                >
                  <div className="pb-2 mb-1 border-b border-white/[0.06]">
                    <p className="text-xs font-semibold text-white">Lossless & Smart Compression</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Shrink image file size with zero upload</p>
                  </div>

                  {SEO_COMPRESS_FORMATS.map((cf) => (
                    <Link
                      key={cf.format}
                      href={`/compress/${cf.format}`}
                      onClick={closeDropdown}
                      className="group/item flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover/item:text-white">
                          Compress {cf.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          {cf.format === 'jpg' ? 'Perceptual photo shrinkage' : cf.format === 'png' ? 'Transparent graphic squeeze' : 'High performance web images'}
                        </p>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-600 group-hover/item:text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Learn */}
          <Link
            href="/learn"
            onClick={closeDropdown}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
          >
            Learn
          </Link>

          {/* Developers */}
          <Link
            href="/developers"
            onClick={closeDropdown}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
          >
            Developers
          </Link>
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
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/[0.10] bg-zinc-950/95 backdrop-blur-2xl p-3 md:hidden shadow-2xl max-h-[80vh] overflow-y-auto space-y-2">
            {/* Convert Accordion */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'convert' ? null : 'convert')}
                className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-white"
              >
                <span>Convert ({SEO_CONVERSION_PAIRS.length} formats)</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileSection === 'convert' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'convert' && (
                <div className="grid grid-cols-2 gap-1.5 pt-2 mt-2 border-t border-white/[0.06]">
                  {SEO_CONVERSION_PAIRS.map((pair) => (
                    <Link
                      key={`${pair.from}-${pair.to}`}
                      href={`/convert/${pair.from}-to-${pair.to}`}
                      onClick={() => setMobileOpen(false)}
                      className="px-2 py-1.5 rounded-lg text-[11px] text-zinc-300 bg-white/[0.03] hover:text-white hover:bg-white/[0.08]"
                    >
                      <span className="uppercase font-medium">{pair.from}</span> &rarr; <span className="uppercase font-bold text-white">{pair.to}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Compress Accordion */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'compress' ? null : 'compress')}
                className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-white"
              >
                <span>Compress ({SEO_COMPRESS_FORMATS.length} tools)</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileSection === 'compress' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'compress' && (
                <div className="space-y-1 pt-2 mt-2 border-t border-white/[0.06]">
                  {SEO_COMPRESS_FORMATS.map((cf) => (
                    <Link
                      key={cf.format}
                      href={`/compress/${cf.format}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 bg-white/[0.03] hover:text-white hover:bg-white/[0.08]"
                    >
                      Compress {cf.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06]"
            >
              Learn
            </Link>

            <Link
              href="/developers"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06]"
            >
              Developers
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
