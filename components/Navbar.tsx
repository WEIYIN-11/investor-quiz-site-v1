"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e293b] shadow-lg">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/my-logo.png"
            alt="Logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
            priority
          />
        </Link>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span className="hidden sm:inline">投資心理測驗</span>
          <span className="inline-flex items-center gap-1 bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            免費評測
          </span>
        </div>
      </div>
    </nav>
  );
}
