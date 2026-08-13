import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const COLORS = {
  bg: "#0A0E14",
  surface: "#0F1520",
  surfaceBorder: "#1C2430",
  text: "#E8ECF1",
  muted: "#6B7684",
  amber: "#F4A340",
  green: "#4ADE80",
};

function PulseTicker() {
  const [bars, setBars] = useState(Array.from({ length: 48 }, () => 0.3 + Math.random() * 0.7));

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(0.25 + Math.random() * 0.75);
        return next;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-[3px] h-16 w-full">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-200 ease-out"
          style={{
            height: `${h * 100}%`,
            backgroundColor: i === bars.length - 1 ? COLORS.amber : COLORS.green,
            opacity: 0.35 + (i / bars.length) * 0.65,
          }}
        />
      ))}
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: COLORS.green }}
      />
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5"
        style={{ backgroundColor: COLORS.green }}
      />
    </span>
  );
}

const FEATURES = [
  {
    label: "01",
    title: "Endpoint checks",
    body: "Ping every route on your schedule. HTTP, TCP, or a custom script — we run it and log the response.",
  },
  {
    label: "02",
    title: "Latency history",
    body: "See p50 / p95 / p99 over time, not just an average that hides the spikes.",
  },
  {
    label: "03",
    title: "Alert routing",
    body: "Slack, PagerDuty, or a webhook. One incident, one thread, no duplicate pings.",
  },
  {
    label: "04",
    title: "Status pages",
    body: "A public page that updates itself. No more manually editing an incident post.",
  },
];

const PLANS = [
  {
    name: "Solo",
    price: "$0",
    period: "/mo",
    blurb: "For a side project or a single API you care about.",
    items: ["5 monitors", "5 minute checks", "Email alerts", "7 day history"],
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    blurb: "For a small backend team running real traffic.",
    items: ["50 monitors", "30 second checks", "Slack + PagerDuty", "90 day history", "Public status page"],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Talk to us",
    period: "",
    blurb: "For multiple services, regions, and on-call rotations.",
    items: ["Unlimited monitors", "Custom check intervals", "SSO + audit log", "1 year history"],
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen w-full font-sans"
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap"
      />

      {/* Nav */}
      <header className=" mx-auto px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: COLORS.amber }}
          >
            <span className="text-black text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              &gt;
            </span>
          </div>
          <span className="font-semibold tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            signal
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: COLORS.muted }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </nav>
        <Link to="/sign-up"
          className="text-sm font-medium px-4 py-2 rounded-md border transition-colors hover:bg-white/5"
          style={{ borderColor: COLORS.surfaceBorder }}
        >
          Sign up
        </Link>
      </header>

      {/* Hero */}
      <section className=" mx-auto px-10 pt-16 pb-24">
        <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
          <StatusDot />
          <span>ALL SYSTEMS OPERATIONAL — 99.98% uptime, 30d</span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Know when your API breaks
          <span style={{ color: COLORS.muted }}>.</span>
          <br />
          <span style={{ color: COLORS.amber }}>Before your users do.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg" style={{ color: COLORS.muted }}>
          Signal checks every endpoint on a schedule you set, tracks latency over time,
          and pages the right person the second something looks wrong.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            className="px-10 py-3 rounded-md font-medium text-sm text-black transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: COLORS.amber }}
          >
            Start monitoring — free
          </button>
          <button
            className="px-10 py-3 rounded-md font-medium text-sm border transition-colors hover:bg-white/5"
            style={{ borderColor: COLORS.surfaceBorder }}
          >
            View live demo
          </button>
        </div>

        {/* Signature element: live pulse ticker */}
        <div
          className="mt-16 rounded-lg border p-6"
          style={{ backgroundColor: COLORS.surface, borderColor: COLORS.surfaceBorder }}
        >
          <div className="flex items-center justify-between mb-4 text-xs" style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
            <span>GET /api/v1/checkout — response time (ms)</span>
            <span>last 48 checks</span>
          </div>
          <PulseTicker />
        </div>
      </section>

      {/* Features */}
      <section id="features" className=" mx-auto px-10 py-24 border-t" style={{ borderColor: COLORS.surfaceBorder }}>
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Everything between "it's down" and "it's fixed"
          </h2>
          <p className="mt-3" style={{ color: COLORS.muted }}>
            Four things that matter when a service goes sideways at 2am.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: COLORS.surfaceBorder }}>
          {FEATURES.map((f) => (
            <div key={f.label} className="p-8" style={{ backgroundColor: COLORS.bg }}>
              <span
                className="text-sm"
                style={{ color: COLORS.amber, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {f.label}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className=" mx-auto px-10 py-24 border-t" style={{ borderColor: COLORS.surfaceBorder }}>
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Pricing that scales with your traffic
          </h2>
          <p className="mt-3" style={{ color: COLORS.muted }}>
            Start free. Upgrade when your on-call rotation needs it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="rounded-lg border p-8 flex flex-col"
              style={{
                backgroundColor: p.highlighted ? COLORS.surface : "transparent",
                borderColor: p.highlighted ? COLORS.amber : COLORS.surfaceBorder,
              }}
            >
              <span className="text-sm font-medium" style={{ color: COLORS.muted }}>{p.name}</span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.price}</span>
                <span className="text-sm" style={{ color: COLORS.muted }}>{p.period}</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: COLORS.muted }}>{p.blurb}</p>
              <ul className="mt-6 space-y-2 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="text-sm flex items-center gap-2">
                    <span style={{ color: COLORS.green }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="mt-8 w-full py-2.5 rounded-md text-sm font-medium transition-colors"
                style={
                  p.highlighted
                    ? { backgroundColor: COLORS.amber, color: "#000" }
                    : { border: `1px solid ${COLORS.surfaceBorder}` }
                }
              >
                {p.price === "Talk to us" ? "Contact sales" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className=" mx-auto px-10 py-10 border-t flex items-center justify-between text-sm" style={{ borderColor: COLORS.surfaceBorder, color: COLORS.muted }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>signal</span>
        <span>© 2026 Signal Monitoring Inc.</span>
      </footer>
    </div>
  );
}