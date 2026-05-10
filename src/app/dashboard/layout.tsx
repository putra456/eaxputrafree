"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Info,
  Clock,
  FileCode2,
  User,
  Layers,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { key: "/dashboard", label: "Home", icon: Home },
  { key: "/dashboard/about", label: "About", icon: Info },
  { key: "/dashboard/updates", label: "Updates", icon: Clock },
  { key: "/dashboard/scripts", label: "Scripts", icon: FileCode2 },
  { key: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="dash-container py-5 sm:py-8 pb-32">{children}</div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        {/* Center Big Button - Other Projects */}
        <div className="pointer-events-auto mb-2">
          <button
            onClick={() => router.push("/dashboard/projects")}
            className="relative flex items-center gap-2.5 px-5 py-3 font-bold text-sm"
            style={{
              background:
                isActive("/dashboard/projects")
                  ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(200,200,200,0.85))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.1))",
              color: isActive("/dashboard/projects") ? "#000" : "#fff",
              borderRadius: "20px",
              border: isActive("/dashboard/projects")
                ? "1px solid rgba(255,255,255,0.6)"
                : "1px solid rgba(255,255,255,0.2)",
              boxShadow: isActive("/dashboard/projects")
                ? "0 6px 24px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.5)"
                : "0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <Layers
              size={18}
              style={{
                color: isActive("/dashboard/projects") ? "#000" : "#fff",
              }}
            />
            <span>Other Projects</span>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
              style={{
                background: isActive("/dashboard/projects")
                  ? "rgba(0,0,0,0.12)"
                  : "rgba(52,199,89,0.25)",
                color: isActive("/dashboard/projects") ? "#000" : "#34c759",
              }}
            >
              FREE
            </span>
          </button>
        </div>

        {/* 5-item nav bar */}
        <nav
          className="pointer-events-auto flex items-center gap-0.5 px-2 py-2 mb-3"
          style={{
            background:
              "linear-gradient(160deg, rgba(18,18,18,0.92) 0%, rgba(10,10,10,0.96) 100%)",
            backdropFilter: "blur(48px) saturate(180%)",
            WebkitBackdropFilter: "blur(48px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.55), inset 0 0.5px 0 rgba(255,255,255,0.08)",
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.key);
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => router.push(item.key)}
                className="relative flex items-center gap-1.5 px-3 py-2.5 rounded-full transition-all duration-300"
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid transparent",
                  boxShadow: active
                    ? "0 2px 12px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.12)"
                    : "none",
                }}
              >
                <Icon
                  size={17}
                  style={{
                    color: active ? "#fff" : "rgba(255,255,255,0.35)",
                    transition: "color 0.3s",
                  }}
                />
                <span
                  className="text-[11px] font-semibold transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: active ? "#fff" : "rgba(255,255,255,0.35)",
                    maxWidth: active ? "70px" : "0px",
                    opacity: active ? 1 : 0,
                    overflow: "hidden",
                    paddingLeft: active ? "2px" : "0px",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
