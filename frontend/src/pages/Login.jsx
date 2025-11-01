import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const css = `
      :root{
        --bg:#f3f6fb; --card:#ffffff; --accent:#2563eb; --muted:#6b7280;
        --danger:#dc2626; --radius:12px;
      }
      .login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px;background:linear-gradient(180deg,var(--bg),#ffffff);}
      .login-card{width:100%;max-width:920px;background:var(--card);border-radius:var(--radius);box-shadow:0 6px 30px rgba(16,24,40,0.08);display:flex;overflow:hidden;}
      .lp-illustration{flex:1.1;background:linear-gradient(135deg,#eef2ff, #f8fafc);padding:48px;display:flex;flex-direction:column;justify-content:center;gap:18px;}
      .lp-illustration h2{margin:0;color:var(--accent);font-size:20px;}
      .lp-illustration p{margin:0;color:var(--muted);font-size:14px;line-height:1.4;}
      .lp-form{flex:1;padding:36px 40px;display:flex;flex-direction:column;gap:16px;}
      .brand{display:flex;align-items:center;gap:10px;font-weight:600;color:var(--accent);}
      .logo-dot{width:42px;height:42px;background:linear-gradient(90deg,#60a5fa,#6366f1);border-radius:9px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;}
      form{display:flex;flex-direction:column;gap:12px;}
      label{font-size:13px;color:var(--muted);display:flex;justify-content:space-between;align-items:center;}
      input[type="email"],input[type="password"]{padding:12px 12px;border:1px solid #e6eef8;border-radius:8px;font-size:15px;outline:none;transition:box-shadow .12s, border-color .12s;}
      input[type="email"]:focus,input[type="password"]:focus{box-shadow:0 4px 14px rgba(37,99,235,0.08);border-color:var(--accent);}
      .row{display:flex;gap:12px;align-items:center;}
      .checkbox{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--muted);}
      .btn{padding:10px 14px;border-radius:10px;border:0;background:var(--accent);color:white;font-weight:600;cursor:pointer;}
      .btn.secondary{background:#eef2ff;color:var(--accent);border:1px solid rgba(37,99,235,0.08);}
      .btn.ghost{background:transparent;color:var(--muted);border:1px dashed #e6eef8;}
      .socials{display:flex;gap:10px;margin-top:6px;}
      .socials button{flex:1;display:flex;align-items:center;gap:8px;justify-content:center;padding:9px;border-radius:10px;border:1px solid #eef2ff;background:white;cursor:pointer;}
      .divider{display:flex;gap:10px;align-items:center;margin:6px 0;color:var(--muted);font-size:13px;}
      .divider::before,.divider::after{content:"";flex:1;height:1px;background:#eef2ff;border-radius:4px;}
      .error{color:var(--danger);font-size:13px;}
      .hint{font-size:13px;color:var(--muted);}
      .small{font-size:13px;color:var(--muted);text-align:right;}
      @media (max-width:840px){.login-card{flex-direction:column}.lp-illustration{display:none}.lp-form{padding:28px}}
    `;
    const style = document.createElement("style");
    style.setAttribute("data-generated-by", "Login.jsx");
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      errors.email = "Enter a valid email.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e, msg) {
    e.preventDefault();
    if (!msg && !validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatusMessage({
        type: "success",
        text: msg || "Login successful. Redirecting...",
      });
      setTimeout(() => navigate("/"), 1000);
    }, 800);
  }

  function fillDemo() {
    setEmail("demo@example.com");
    setPassword("password");
    setFieldErrors({});
    setStatusMessage({ type: "info", text: "Demo credentials populated." });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="lp-illustration">
          <h2>Welcome back</h2>
          <p>
            Access your account to manage settings, monitor status and connect
            with teammates.
          </p>
        </div>

        <div className="lp-form">
          <div className="brand">
            <div className="logo-dot">MG</div>
            <div>
              <div style={{ fontSize: 18 }}>MyGreatCompany</div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}
              >
                Sign in to continue
              </div>
            </div>
          </div>

          {statusMessage && (
            <div role="status" className="hint" aria-live="polite">
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <div className="error">{fieldErrors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">
                Password
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  style={{
                    marginLeft: 10,
                    fontSize: 13,
                    color: "var(--muted)",
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <div className="error">{fieldErrors.password}</div>
              )}
            </div>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button
                type="button"
                className="btn ghost small"
                onClick={() =>
                  setStatusMessage({
                    type: "info",
                    text: "Forgot password flow (UX-only).",
                  })
                }
              >
                Forgot?
              </button>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={fillDemo}
                disabled={loading}
              >
                Use demo
              </button>
            </div>

            <div className="divider">or continue with</div>

            <div className="socials">
              <button
                type="button"
                onClick={(e) =>
                  handleSubmit(
                    e,
                    "Simulated Google sign-in successful (UI-only)."
                  )
                }
              >
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path
                    fill="#fbbc05"
                    d="M43.6 20.4H42V20H24v8h11.3C34.7 32 30.5 35 24 35c-7 0-13-6-13-13s6-13 13-13c3.3 0 6.2 1.1 8.5 3.1l6-6C34.9 3.4 29.8 1 24 1 11.9 1 2 10.9 2 23s9.9 22 22 22c12.1 0 22-9.9 22-22 0-1.5-.2-2.6-.4-3.6z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, "GitHub sign-in successful")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#111827"
                    d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.7 7.1 10.1.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.3-3.5-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.9.7 2.4 1.3.2-1 .4-1.6.8-2-2.3-.3-4.6-1.2-4.6-5.2 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.1.9-.3 1.9-.5 2.8-.5.9 0 1.9.2 2.8.5 2.2-1.4 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4-2.3 4.9-4.6 5.2.4.4.7 1 7.1 10.1V21c0 .3.2.6.8.5 4.1-1.4 7.1-5.4 7.1-10.1C23.1 5.3 18.3.5 12 .5z"
                  />
                </svg>
                GitHub
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <div className="hint">Don't have an account?</div>
              <button
                type="button"
                className="btn ghost"
                onClick={() =>
                  setStatusMessage({
                    type: "info",
                    text: "Sign up flow (UX-only).",
                  })
                }
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
