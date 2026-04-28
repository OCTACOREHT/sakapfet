"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BellRing,
  CandlestickChart,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  ShieldEllipsis,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: CandlestickChart },
  { href: "/portfolio", label: "Portfolio", icon: BarChart3 },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/crypto", label: "Crypto", icon: BellRing },
  { href: "/screener", label: "Screener", icon: ShieldEllipsis },
];

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-electric/30 bg-electric/10 shadow-neon">
            <span className="font-heading text-xl text-electric">N</span>
          </div>
          {!collapsed ? (
            <div>
              <p className="font-heading text-lg text-white">Neon Nexus</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Financial cockpit
              </p>
            </div>
          ) : null}
        </div>

        <nav className="space-y-2" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300",
                  active
                    ? "border border-electric/25 bg-electric/10 text-white shadow-neon"
                    : "border border-transparent text-slate-400 hover:border-white/8 hover:bg-white/5 hover:text-white",
                )}
              >
                <motion.div whileHover={{ scale: 1.08, rotate: active ? 0 : 4 }}>
                  <Icon className="h-5 w-5" />
                </motion.div>
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-electric/16 via-white/4 to-violet/16 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
          Premium mode
        </p>
        {!collapsed ? (
          <>
            <p className="mt-2 font-heading text-lg text-white">
              Stream dashboards with live neon telemetry.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Alerts, market rhythm, and portfolio glow in one cockpit.
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebarOpen,
    closeMobileSidebar,
  } = useUiStore();

  return (
    <>
      {mobileSidebarOpen ? (
        <button
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close navigation overlay"
          onClick={closeMobileSidebar}
        />
      ) : null}

      <motion.aside
        animate={{ width: sidebarCollapsed ? 92 : 280 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-screen border-r border-white/8 bg-black/30 p-4 backdrop-blur-2xl md:sticky md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="mb-5 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <SidebarContent collapsed={sidebarCollapsed} key={`${pathname}-${sidebarCollapsed}`} />
      </motion.aside>
    </>
  );
}
