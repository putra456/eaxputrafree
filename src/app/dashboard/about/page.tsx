"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Globe,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Layers,
  Award,
  Cpu,
  Target,
  Info,
} from "lucide-react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("xau_user");
    if (!stored) router.push("/");
  }, [router]);

  if (!mounted) return null;

  const features = [
    {
      icon: <Zap size={16} />,
      title: "Scalping Engine",
      desc: "Fast entry/exit dengan Bollinger Bands + RSI signal",
    },
    {
      icon: <TrendingUp size={16} />,
      title: "Dynamic Grid",
      desc: "ATR-based grid step dengan auto lot progression",
    },
    {
      icon: <Shield size={16} />,
      title: "Bi-Directional Hedge",
      desc: "Buy & Sell basket dengan net profit closure",
    },
    {
      icon: <Target size={16} />,
      title: "Risk Management",
      desc: "Daily target, stop loss, drawdown protection",
    },
    {
      icon: <Cpu size={16} />,
      title: "Session Filter",
      desc: "Auto trade pada jam trading optimal",
    },
    {
      icon: <Award size={16} />,
      title: "Dashboard Live",
      desc: "Real-time P&L tracking di chart MT4",
    },
  ];

  return (
    <>
      {/* Header */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "0.05s", opacity: 0 }}
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Info size={15} className="text-white/50" />
          </div>
          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(17px, 4.5vw, 22px)" }}
          >
            About Dev
          </h1>
        </div>
      </div>

      {/* Dev Card */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "0.12s", opacity: 0 }}
      >
        <div className="liquid-glass p-5 sm:p-6 mb-3.5">
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src="https://i.postimg.cc/pVCw2NjM/1778327126809-019e0c8d-4a61-7565-b5ba-b5dd6c6e3fe7.png"
                  alt="Dev Logo"
                  className="w-11 h-11 sm:w-14 sm:h-14 object-contain"
                />
              </div>
              <div>
                <h2 className="font-bold text-white text-base sm:text-lg">
                  Xau×Putra
                </h2>
                <p className="text-white/35 text-[11px] sm:text-xs mt-0.5">
                  Premium Quant Systems
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Heart size={11} className="text-red-400/60" />
                  <span className="text-white/25 text-[10px]">
                    Built with passion
                  </span>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-[11px] sm:text-xs leading-relaxed mb-4">
              Xau×Putra adalah platform EA (Expert Advisor) trading premium yang
              dikembangkan oleh tim quant trader berpengalaman. Fokus kami pada
              scalping, grid recovery, dan hedging strategy untuk menghasilkan
              profit konsisten di market forex & gold.
            </p>
            <div className="flex flex-wrap gap-2">
              {["MT4", "MQL4", "Scalping", "Grid", "Hedge"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Layers size={14} className="text-white/40" />
          <h3 className="font-semibold text-white text-sm">EA Features</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {features.map((f, i) => (
            <div
              key={i}
              className="liquid-glass p-4"
              style={{
                animationDelay: `${0.25 + i * 0.05}s`,
              }}
            >
              <div className="relative z-10">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-2.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-white/50">{f.icon}</span>
                </div>
                <h4 className="text-white/80 text-xs font-semibold mb-1">
                  {f.title}
                </h4>
                <p className="text-white/30 text-[11px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div
        className="animate-slide-up mt-4"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <div className="liquid-glass p-5 sm:p-6">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={14} className="text-white/40" />
              <h3 className="font-semibold text-white text-sm">Tech Stack</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Platform", value: "MetaTrader 4 (MT4)" },
                { label: "Language", value: "MQL4" },
                { label: "Timeframe", value: "M1 / M5" },
                { label: "Account", value: "Cent Account Recommended" },
                { label: "Pairs", value: "XAU/USD, EUR/USD, GBP/USD" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 px-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-white/35 text-[11px]">
                    {item.label}
                  </span>
                  <span className="text-white/60 text-[11px] font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-5 mt-2">
        <p className="text-white/12 text-[10px] tracking-wider">
          © 2024 Xau×Putra • Premium Quant Systems
        </p>
      </div>
    </>
  );
}


