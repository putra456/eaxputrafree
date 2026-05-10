"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  ExternalLink,
  ArrowRight,
  Zap,
  Globe,
  Code2,
  Smartphone,
  Palette,
  Database,
  Bot,
  Gamepad2,
  Sparkles,
} from "lucide-react";

interface Project {
  name: string;
  desc: string;
  icon: React.ReactNode;
  tags: string[];
  status: "live" | "beta" | "coming";
  url?: string;
}

const projects: Project[] = [
  {
    name: "Xau×Putra EA",
    desc: "Premium trading EA dengan scalping, grid, dan hedging strategy untuk MT4.",
    icon: <Zap size={18} />,
    tags: ["MT4", "MQL4", "Trading"],
    status: "live",
    url: "/dashboard",
  },
  {
    name: "Signal Bot Telegram",
    desc: "Bot signal trading otomatis dengan notifikasi real-time ke Telegram.",
    icon: <Bot size={18} />,
    tags: ["Python", "Telegram", "API"],
    status: "beta",
  },
  {
    name: "Portfolio Tracker",
    desc: "Dashboard tracking portfolio crypto & forex dengan chart real-time.",
    icon: <Database size={18} />,
    tags: ["Next.js", "Chart.js", "Free"],
    status: "coming",
  },
  {
    name: "Trade Journal App",
    desc: "Aplikasi jurnal trading untuk mencatat dan analisa setiap trade.",
    icon: <Smartphone size={18} />,
    tags: ["React", "PWA", "Free"],
    status: "coming",
  },
  {
    name: "Indicator Pack",
    desc: "Kumpulan custom indicator MT4 gratis: Trend, Volume, Momentum.",
    icon: <Code2 size={18} />,
    tags: ["MQL4", "Free", "Indicators"],
    status: "live",
  },
  {
    name: "Backtest Tool",
    desc: "Tool backtesting strategy dengan visualisasi equity curve.",
    icon: <Gamepad2 size={18} />,
    tags: ["Python", "Pandas", "Free"],
    status: "beta",
  },
];

const statusConfig = {
  live: { label: "LIVE", color: "#34c759", bg: "rgba(52,199,89,0.12)" },
  beta: { label: "BETA", color: "#5ac8fa", bg: "rgba(90,200,250,0.12)" },
  coming: { label: "SOON", color: "#ff9500", bg: "rgba(255,149,0,0.12)" },
};

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("xau_user");
    if (!stored) router.push("/");
  }, [router]);

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
            <Layers size={15} className="text-white/50" />
          </div>
          <div>
            <h1
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(17px, 4.5vw, 22px)" }}
            >
              Other Projects
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Sparkles size={10} className="text-emerald-400/60" />
              <span className="text-emerald-400/70 text-[10px] font-bold">
                FREE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div
        className="animate-slide-up mb-4"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <div className="liquid-glass p-4 sm:p-5">
          <div className="relative z-10">
            <p className="text-white/40 text-[11px] sm:text-xs leading-relaxed">
              Kumpulan project dan tool trading yang dikembangkan oleh tim
              Xau×Putra. Semua project di halaman ini bisa diakses secara
              <span className="text-emerald-400/70 font-semibold"> gratis</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="animate-slide-up grid grid-cols-3 gap-2 mb-4"
        style={{ animationDelay: "0.14s", opacity: 0 }}
      >
        {[
          {
            count: projects.filter((p) => p.status === "live").length,
            label: "Live",
            color: "#34c759",
          },
          {
            count: projects.filter((p) => p.status === "beta").length,
            label: "Beta",
            color: "#5ac8fa",
          },
          {
            count: projects.filter((p) => p.status === "coming").length,
            label: "Soon",
            color: "#ff9500",
          },
        ].map((stat, i) => (
          <div key={i} className="liquid-glass p-3 text-center">
            <div className="relative z-10">
              <span
                className="font-bold text-lg block"
                style={{ color: stat.color }}
              >
                {stat.count}
              </span>
              <span className="text-white/30 text-[10px] font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-3">
        {projects.map((project, idx) => {
          const cfg = statusConfig[project.status];
          return (
            <div
              key={idx}
              className="animate-slide-up"
              style={{ animationDelay: `${0.2 + idx * 0.05}s`, opacity: 0 }}
            >
              <div className="liquid-glass p-4 sm:p-5">
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <span className="text-white/50">{project.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-white/80 text-xs sm:text-sm font-semibold">
                          {project.name}
                        </h3>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block"
                          style={{
                            background: cfg.bg,
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/35 text-[11px] sm:text-xs leading-relaxed mb-3">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-md"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.url && project.status === "live" ? (
                      <button
                        onClick={() => router.push(project.url!)}
                        className="liquid-btn px-3 py-1.5 text-[10px] font-semibold flex items-center gap-1 flex-shrink-0 ml-2"
                      >
                        <span className="relative z-10 flex items-center gap-1">
                          Open
                          <ArrowRight size={11} />
                        </span>
                      </button>
                    ) : (
                      <span className="text-white/15 text-[10px] font-medium flex-shrink-0 ml-2">
                        {project.status === "coming" ? "Soon" : "Beta"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="animate-slide-up mt-4"
        style={{ animationDelay: "0.45s", opacity: 0 }}
      >
        <div className="liquid-glass p-4 sm:p-5">
          <div className="relative z-10 text-center">
            <Globe size={20} className="text-white/30 mx-auto mb-2" />
            <h3 className="text-white/70 text-sm font-semibold mb-1">
              Punya ide project?
            </h3>
            <p className="text-white/30 text-[11px] sm:text-xs mb-3">
              Request fitur atau project baru ke owner.
            </p>
            <button
              onClick={() => {
                const msg = encodeURIComponent(
                  "Halo Owner, saya punya ide project baru nih!"
                );
                window.open(`https://wa.me/6282230304458?text=${msg}`, "_blank");
              }}
              className="liquid-btn px-5 py-2.5 text-[11px] font-semibold inline-flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,211,102,0.18), rgba(37,211,102,0.05))",
                borderColor: "rgba(37,211,102,0.2)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Project
                <ArrowRight size={12} />
              </span>
            </button>
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
