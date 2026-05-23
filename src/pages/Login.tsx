import { useState, type FormEvent } from "react";

type LoginProps = {
  onSuccess: () => void;
};

function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-700 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-ocean-500/40 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-ocean-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-10 right-1/3 h-72 w-72 rounded-full bg-ocean-300/15 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute top-[10%] left-[12%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        <span className="absolute top-[20%] left-[40%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.7)]" />
        <span className="absolute top-[38%] left-[8%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
        <span className="absolute top-[65%] left-[36%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        <span className="absolute top-[80%] left-[18%] h-1 w-1 rounded-full bg-white/80" />
        <span className="absolute top-[15%] left-[78%] h-1 w-1 rounded-full bg-white/60" />
        <span className="absolute top-[72%] left-[90%] h-2 w-2 rounded-full bg-white/50 shadow-[0_0_14px_rgba(255,255,255,0.5)]" />
        <span className="absolute top-[45%] left-[95%] h-1 w-1 rounded-full bg-white/70" />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[12%] left-[48%] h-20 w-20 rotate-12 rounded-2xl border border-white/15 backdrop-blur-sm" />
        <div className="absolute bottom-[20%] left-[6%] h-16 w-16 -rotate-6 rounded-full border border-white/20" />
        <div className="absolute top-[58%] left-[42%] h-10 w-10 rotate-45 border border-white/15" />
      </div>

      <svg
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="rgba(255,255,255,0.05)"
          d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,154.7C672,171,768,213,864,218.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L0,320Z"
        />
        <path
          fill="rgba(255,255,255,0.04)"
          d="M0,272L60,261.3C120,251,240,229,360,224C480,219,600,229,720,234.7C840,240,960,240,1080,229.3C1200,219,1320,197,1380,186.7L1440,176L1440,320L0,320Z"
        />
      </svg>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <section className="hidden lg:flex lg:w-3/5 flex-col justify-between p-12 xl:p-16">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12c2.5-2 5 2 7.5 0S14.5 10 17 12s5-2 5-2" />
                <path d="M2 17c2.5-2 5 2 7.5 0S14.5 15 17 17s5-2 5-2" />
                <path d="M2 7c2.5-2 5 2 7.5 0S14.5 5 17 7s5-2 5-2" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-wide">Lucario</span>
          </div>

          <div className="max-w-xl space-y-7">
            <h1 className="text-5xl font-bold leading-tight">
              欢迎回来
              <br />
              <span className="bg-gradient-to-r from-white to-ocean-200 bg-clip-text text-transparent">
                深邃如海，自在如风
              </span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ocean-100/85">
              登录你的账户，开启一段沉浸式的工作体验。我们用细节守护效率，用设计陪伴你的每一刻。
            </p>

            <div className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-1 h-6 w-6 flex-shrink-0 text-white/70"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 7h4v4H7c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V9c0-1.1.9-2 2-2zm10 0h4v4h-4c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V9c0-1.1.9-2 2-2z" />
                </svg>
                <div>
                  <p className="text-sm leading-relaxed text-white/90">
                    Lucario 让我们的团队像潜入深海一样专注，所有干扰都被柔和过滤。
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-ocean-900">
                      LY
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-white">林屿</div>
                      <div className="text-white/60">Product Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-8">
              {[
                { label: "活跃团队", value: "12k+" },
                { label: "在线协作", value: "99.9%" },
                { label: "国家与地区", value: "60+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="mt-0.5 text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>© {new Date().getFullYear()} Lucario · Crafted with care</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                所有系统运行正常
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:w-2/5 lg:justify-end lg:pr-16 xl:pr-24">
          <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12c2.5-2 5 2 7.5 0S14.5 10 17 12s5-2 5-2" />
                <path d="M2 17c2.5-2 5 2 7.5 0S14.5 15 17 17s5-2 5-2" />
                <path d="M2 7c2.5-2 5 2 7.5 0S14.5 5 17 7s5-2 5-2" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">Lucario</span>
          </div>

          <div className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-8 text-ocean-900 shadow-[0_30px_80px_-20px_rgba(3,16,29,0.6)] ring-1 ring-ocean-900/5 sm:p-10">
            <header className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-ocean-950">
                登录账户
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                输入你的邮箱与密码，继续未完成的旅程。
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-ocean-900"
                >
                  邮箱 / 用户名
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-ocean-900"
                >
                  密码
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="11" width="16" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 018 0v3" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 pr-11 text-ocean-950 placeholder:text-slate-400 outline-none transition focus:border-ocean-700 focus:ring-4 focus:ring-ocean-700/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-ocean-700"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                        <path d="M9.9 4.2A10 10 0 0112 4c5 0 9 4 10 8a9.7 9.7 0 01-3.2 4.4" />
                        <path d="M6.3 6.3A10.4 10.4 0 002 12c1 4 5 8 10 8 1.6 0 3.1-.3 4.5-.9" />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer select-none items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-ocean-800 accent-ocean-800 focus:ring-ocean-700"
                  />
                  记住我
                </label>
                <a
                  href="#"
                  className="font-medium text-ocean-700 transition hover:text-ocean-900"
                >
                  忘记密码？
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-ocean-900 px-4 py-3 font-medium text-white shadow-lg shadow-ocean-900/30 transition hover:bg-ocean-800 active:bg-ocean-950 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading && (
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeOpacity="0.25"
                        strokeWidth="4"
                      />
                      <path
                        d="M22 12a10 10 0 01-10 10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {loading ? "登录中..." : "登 录"}
                </span>
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-slate-400">
                    或使用第三方账号
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  aria-label="使用 GitHub 登录"
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 transition hover:border-ocean-300 hover:bg-ocean-50"
                >
                  <svg
                    className="h-5 w-5 text-ocean-900"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.7 2.7 1.2 3.4.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="使用 Google 登录"
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 transition hover:border-ocean-300 hover:bg-ocean-50"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2c-.3 1.5-1.1 2.7-2.3 3.6v3h3.7c2.2-2 3.4-5 3.4-8.8z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-3c-1 .7-2.3 1.1-3.9 1.1-3 0-5.6-2-6.5-4.8H1.7v3C3.6 20.5 7.5 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.5 13.5c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V6H1.7C.9 7.6.5 9.5.5 11.3s.4 3.7 1.2 5.3l3.8-3.1z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.6c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.6 2.5 1.7 6l3.8 3c.9-2.8 3.5-4.4 6.5-4.4z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="使用微信登录"
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 transition hover:border-ocean-300 hover:bg-ocean-50"
                >
                  <svg
                    className="h-5 w-5 text-[#07c160]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8.7 2C4.4 2 1 4.9 1 8.5c0 2 1.1 3.9 2.8 5.1L3 16.5l3-1.5c.9.2 1.7.3 2.5.3h.6c-.1-.4-.2-.9-.2-1.3 0-3.4 3.2-6.1 7.2-6.1h.6C16.1 4.6 12.7 2 8.7 2zM6 7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm12 7c0-3-2.9-5.5-6.5-5.5S10 11 10 14s2.9 5.5 6.5 5.5c.7 0 1.4-.1 2-.3l2.5 1.3-.7-2.3c1.6-.9 2.7-2.5 2.7-4.2zM14 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm5 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                  </svg>
                </button>
              </div>

              <p className="pt-2 text-center text-sm text-slate-500">
                还没有账号？
                <a
                  href="#"
                  className="ml-1 font-semibold text-ocean-700 transition hover:text-ocean-900"
                >
                  立即注册
                </a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
