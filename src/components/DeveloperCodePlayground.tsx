'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, Cpu } from 'lucide-react';

interface DeveloperCodePlaygroundProps {
  apiKey?: string;
}

type LanguageTab = 'curl' | 'typescript' | 'nodejs' | 'python' | 'go' | 'rust';

export function DeveloperCodePlayground({ apiKey }: DeveloperCodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<LanguageTab>('curl');
  const [copied, setCopied] = useState(false);

  const displayKey = apiKey || 'YOUR_API_KEY';

  const snippets: Record<LanguageTab, { title: string; filename: string; code: string }> = {
    curl: {
      title: 'cURL',
      filename: 'terminal.sh',
      code: `curl -X POST https://api.trysqueeze.online/v1/convert \\
  -H "Authorization: Bearer ${displayKey}" \\
  -F "file=@photo.png" \\
  -F "format=webp" \\
  -F "quality=85" \\
  -F "targetSsim=0.95" \\
  -F "stripExif=true"`,
    },
    typescript: {
      title: 'Browser SDK',
      filename: 'client-worker.ts',
      code: `import { SqueezeEngine } from '@squeeze/browser';

// 100% In-Browser Worker Execution (Zero Server Uploads)
const engine = new SqueezeEngine({
  concurrency: navigator.hardwareConcurrency || 4,
  apiKey: '${displayKey}', // Optional in client mode
});

const result = await engine.convert(imageFile, {
  format: 'webp',
  quality: 85,
  targetSsim: 0.95,
  stripExif: true,
});

console.log(\`Converted in \${result.latencyMs}ms | SSIM: \${result.ssim}\`);
const downloadUrl = URL.createObjectURL(result.blob);`,
    },
    nodejs: {
      title: 'Node.js',
      filename: 'convert.mjs',
      code: `import fs from 'node:fs';

const formData = new FormData();
formData.append('file', new Blob([fs.readFileSync('photo.png')]), 'photo.png');
formData.append('format', 'webp');
formData.append('quality', '85');
formData.append('targetSsim', '0.95');

const res = await fetch('https://api.trysqueeze.online/v1/convert', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ${displayKey}',
  },
  body: formData,
});

const data = await res.json();
console.log('Conversion successful:', data.downloadUrl, 'SSIM:', data.ssimScore);`,
    },
    python: {
      title: 'Python',
      filename: 'convert.py',
      code: `import httpx

with open("photo.png", "rb") as f:
    files = {"file": ("photo.png", f, "image/png")}
    data = {
        "format": "webp",
        "quality": "85",
        "targetSsim": "0.95",
        "stripExif": "true",
    }
    headers = {"Authorization": "Bearer ${displayKey}"}

    response = httpx.post(
        "https://api.trysqueeze.online/v1/convert",
        files=files,
        data=data,
        headers=headers,
        timeout=30.0,
    )

result = response.json()
print(f"Compressed {result['originalBytes']} -> {result['compressedBytes']} bytes (Savings: {result['savingsPercent']}%)")`,
    },
    go: {
      title: 'Go',
      filename: 'main.go',
      code: `package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func main() {
	file, _ := os.Open("photo.png")
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("file", "photo.png")
	io.Copy(part, file)
	writer.WriteField("format", "webp")
	writer.WriteField("quality", "85")
	writer.Close()

	req, _ := http.NewRequest("POST", "https://api.trysqueeze.online/v1/convert", body)
	req.Header.Set("Authorization", "Bearer ${displayKey}")
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	fmt.Println("Response Status:", resp.Status)
}`,
    },
    rust: {
      title: 'Rust',
      filename: 'main.rs',
      code: `use reqwest::multipart;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let form = multipart::Form::new()
        .file("file", "photo.png").await?
        .text("format", "webp")
        .text("quality", "85")
        .text("targetSsim", "0.95");

    let client = reqwest::Client::new();
    let res = client
        .post("https://api.trysqueeze.online/v1/convert")
        .bearer_auth("${displayKey}")
        .multipart(form)
        .send()
        .await?;

    println!("Response status: {}", res.status());
    Ok(())
}`,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl border border-white/[0.10] bg-black/60 backdrop-blur-2xl overflow-hidden"
      style={{ boxShadow: 'var(--glass-inset)' }}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] px-4 py-3 bg-white/[0.02]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {(Object.keys(snippets) as LanguageTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab === 'typescript' ? <Cpu className="h-3.5 w-3.5" /> : <Terminal className="h-3.5 w-3.5" />}
              <span>{snippets[tab].title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            {snippets[activeTab].filename}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.10] hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-5 overflow-x-auto bg-black/40">
        <pre className="text-xs sm:text-[13px] font-mono text-zinc-300 leading-relaxed whitespace-pre font-normal selection:bg-emerald-500/30">
          {snippets[activeTab].code}
        </pre>
      </div>

      {/* Footer bar with key status */}
      <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
        <span>
          {apiKey ? (
            <span className="text-emerald-400 font-medium">✓ Live key injected into snippets</span>
          ) : (
            <span>Tip: Generate your free key below to auto-populate snippets.</span>
          )}
        </span>
        <span className="font-mono">Endpoint: /v1/convert</span>
      </div>
    </div>
  );
}
