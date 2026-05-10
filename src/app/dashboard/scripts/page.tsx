"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FileCode2,
  Download,
  Copy,
  Check,
  Lock,
  Unlock,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

interface ScriptItem {
  name: string;
  version: string;
  desc: string;
  status: "free" | "premium";
  file: string;
}

const scripts: ScriptItem[] = [
  {
    name: "ScalpGridHedge Premium",
    version: "v3.0",
    desc: "Scalping + Grid + Bi-Directional Hedging dengan institutional risk management.",
    status: "premium",
    file: "ScalpGridHedge_Premium.mq4",
  },
  {
    name: "ScalpGridHedge Basic",
    version: "v1.0",
    desc: "Versi dasar dengan scalping dan grid recovery tanpa hedging.",
    status: "free",
    file: "ScalpGridHedge_Basic.mq4",
  },
  {
    name: "XAU Scalper Pro",
    version: "v2.1",
    desc: "EA khusus XAU/USD dengan signal BB + RSI untuk scalping cepat.",
    status: "premium",
    file: "XAU_Scalper_Pro.mq4",
  },
  {
    name: "Session Filter Tool",
    version: "v1.0",
    desc: "Utility untuk filter trading session dengan auto close diluar jam.",
    status: "free",
    file: "SessionFilter_Tool.mq4",
  },
];

export default function ScriptsPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("xau_user");
    if (!stored) router.push("/");
  }, [router]);

  const showToastMsg = useCallback((msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  const handleDownload = (file: string) => {
    if (file === "ScalpGridHedge_Premium.mq4") {
      const link = document.createElement("a");
      link.href = "/api/download";
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToastMsg(`Downloading ${file}...`);
    } else {
      showToastMsg("Coming soon!");
    }
  };

  if (!mounted) return null;

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
            <FileCode2 size={15} className="text-white/50" />
          </div>
          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(17px, 4.5vw, 22px)" }}
          >
            All Scripts
          </h1>
        </div>
      </div>

      {/* Stats */}
      <div
        className="animate-slide-up grid grid-cols-2 gap-2.5 mb-4"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <div className="liquid-glass p-4">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <Unlock size={12} className="text-emerald-400/60" />
              <span className="text-white/35 text-[10px] font-semibold uppercase tracking-wider">
                Free
              </span>
            </div>
            <span className="text-white font-bold text-lg">
              {scripts.filter((s) => s.status === "free").length}
            </span>
          </div>
        </div>
        <div className="liquid-glass p-4">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <Lock size={12} className="text-amber-400/60" />
              <span className="text-white/35 text-[10px] font-semibold uppercase tracking-wider">
                Premium
              </span>
            </div>
            <span className="text-white font-bold text-lg">
              {scripts.filter((s) => s.status === "premium").length}
            </span>
          </div>
        </div>
      </div>

      {/* Script List */}
      <div className="space-y-3">
        {scripts.map((script, idx) => (
          <div
            key={idx}
            className="animate-slide-up"
            style={{ animationDelay: `${0.15 + idx * 0.06}s`, opacity: 0 }}
          >
            <div className="liquid-glass p-4 sm:p-5">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          script.status === "premium"
                            ? "rgba(255,193,7,0.08)"
                            : "rgba(52,199,89,0.08)",
                        border: `1px solid ${
                          script.status === "premium"
                            ? "rgba(255,193,7,0.15)"
                            : "rgba(52,199,89,0.15)"
                        }`,
                      }}
                    >
                      {script.status === "premium" ? (
                        <Zap size={14} className="text-amber-400/60" />
                      ) : (
                        <TrendingUp size={14} className="text-emerald-400/60" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white/80 text-xs sm:text-sm font-semibold">
                        {script.name}
                      </h3>
                      <span className="text-white/25 text-[10px]">
                        {script.version}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{
                      background:
                        script.status === "premium"
                          ? "rgba(255,193,7,0.15)"
                          : "rgba(52,199,89,0.15)",
                      color:
                        script.status === "premium" ? "#ffc107" : "#34c759",
                    }}
                  >
                    {script.status === "premium" ? "PREMIUM" : "FREE"}
                  </span>
                </div>
                <p className="text-white/35 text-[11px] sm:text-xs leading-relaxed mb-3">
                  {script.desc}
                </p>
                <button
                  onClick={() => handleDownload(script.file)}
                  className="liquid-btn w-full py-2.5 text-[11px] font-semibold flex items-center justify-center gap-2"
                  style={{
                    background:
                      script.status === "premium"
                        ? "linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,193,7,0.04))"
                        : "linear-gradient(135deg, rgba(52,199,89,0.15), rgba(52,199,89,0.04))",
                    borderColor:
                      script.status === "premium"
                        ? "rgba(255,193,7,0.2)"
                        : "rgba(52,199,89,0.2)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Download size={13} />
                    Download
                    <ArrowRight size={12} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-5 mt-2">
        <p className="text-white/12 text-[10px] tracking-wider">
          © 2024 Xau×Putra • Premium Quant Systems
        </p>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? "show" : ""}`}>{toast}</div>
    </>
  );
}
