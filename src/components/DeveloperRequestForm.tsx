'use client';

import React, { useState } from 'react';
import { KeyRound, Copy, Check, Loader2 } from 'lucide-react';

export function DeveloperRequestForm() {
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [usecase, setUsecase] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/developers/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, project, usecase }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to request API key.');
      }

      setApiKey(data.apiKey);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const copyToClipboard = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-7 space-y-5"
        style={{ boxShadow: 'var(--glass-inset)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.05] text-white">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Your Free API Key is Ready</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Assigned to {project} ({email}) &bull; Free tier (100 req/hr)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-zinc-400">API Key</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2.5 font-mono text-sm text-zinc-200 select-all overflow-x-auto">
              {apiKey}
            </div>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.10] bg-white/[0.06] px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.12] hover:text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-zinc-500">
            Keep this key confidential. Free tier active immediately for testing in your projects.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setEmail('');
              setProject('');
              setUsecase('');
              setApiKey('');
            }}
            className="text-xs text-zinc-400 hover:text-white transition underline underline-offset-2"
          >
            Create another key
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {status === 'error' && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-xs text-red-300">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="dev-email" className="block text-xs font-medium text-zinc-400 mb-1.5">
          Email address
        </label>
        <input
          id="dev-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/[0.16] transition"
        />
      </div>

      <div>
        <label htmlFor="dev-project" className="block text-xs font-medium text-zinc-400 mb-1.5">
          Project or App name
        </label>
        <input
          id="dev-project"
          type="text"
          required
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="My image app"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/[0.16] transition"
        />
      </div>

      <div>
        <label htmlFor="dev-usecase" className="block text-xs font-medium text-zinc-400 mb-1.5">
          What are you building?
        </label>
        <textarea
          id="dev-usecase"
          rows={3}
          value={usecase}
          onChange={(e) => setUsecase(e.target.value)}
          placeholder="Brief description of your image conversion needs"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/[0.16] transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center gap-2 rounded-lg bg-white text-zinc-900 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-100 disabled:opacity-50 transition cursor-pointer"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating Key...</span>
          </>
        ) : (
          <span>Get Free API Key</span>
        )}
      </button>
    </form>
  );
}
