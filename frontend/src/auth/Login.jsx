import React, { useState } from "react";
import { API_URL } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const COLORS = {
  bg: "#0A0E14",
  surface: "#0F1520",
  border: "#1C2430",
  text: "#E8ECF1",
  muted: "#6B7684",
  amber: "#F4A340",
  red: "#F87171",
  green: "#4ADE80",
};

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A9.9 9.9 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.9-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

  console.log("api---", API_URL);


  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setApiError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (data.success || res.ok) {
        toast.success(data.message)
        navigate("/")
      }
      if (!res.ok || !data.success) {
        toast.error(data.message)
        setApiError(data.message || "Invalid email or password.");
        return;
      }
      setLoggedIn(true);
    } catch (err) {
      setApiError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-12" style={{ backgroundColor: COLORS.bg, color: COLORS.text }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;500;600&display=swap"
      />
      <div className="w-full max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>

        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="h-6 w-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: COLORS.amber }}>
            <span className="text-black text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>&gt;</span>
          </div>
          <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>signal</span>
        </div>

        <h1 className="text-2xl font-semibold text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Sign in
        </h1>
        <p className="mt-2 text-sm text-center" style={{ color: COLORS.muted }}>
          Welcome back. Your monitors kept running without you.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: COLORS.muted }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@company.com"
              className="w-full px-3.5 py-2.5 rounded-md text-sm outline-none transition-colors"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${errors.email ? COLORS.red : COLORS.border}`,
                color: COLORS.text,
              }}
            />
            {errors.email && <p className="mt-1.5 text-xs" style={{ color: COLORS.red }}>{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium" style={{ color: COLORS.muted }}>Password</label>
              <a href="#" className="text-xs" style={{ color: COLORS.amber }}>Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 pr-10 rounded-md text-sm outline-none transition-colors"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${errors.password ? COLORS.red : COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.muted }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPw} />
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs" style={{ color: COLORS.red }}>{errors.password}</p>}
          </div>

          {apiError && (
            <p className="text-xs text-center" style={{ color: COLORS.red }}>{apiError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md text-sm font-medium text-black transition-transform hover:scale-[1.01] disabled:opacity-60"
            style={{ backgroundColor: COLORS.amber }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
          <span className="text-xs" style={{ color: COLORS.muted }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-md text-sm font-medium border transition-colors hover:bg-white/5"
          style={{ borderColor: COLORS.border }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.3-1 2.4-2.2 3.2v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8Z" />
            <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.7c-1 .7-2.2 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.8C4.1 20.6 7.8 23 12 23Z" />
            <path fill="#FBBC05" d="M6 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.6.4-2.4V6.8H2.3C1.5 8.4 1 10.2 1 12s.5 3.6 1.3 5.2L6 14.4Z" />
            <path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6l3.1-3.1C17.4 2.1 15 1 12 1 7.8 1 4.1 3.4 2.3 6.8L6 9.6c.9-2.5 3.2-4.2 6-4.2Z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm" style={{ color: COLORS.muted }}>
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium" style={{ color: COLORS.amber }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}