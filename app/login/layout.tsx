import "@/app/ui/global.css"
import React from "react";

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <>

            <div
                className={"relative min-h-screen overflow-hidden bg-linear-to-br from-ocean-950 via-ocean-900 to-ocean-700 text-white"}>
                <div className={"pointer-events-none absolute inset-0"} aria-hidden={true}>
                    <div className={"absolute -top-24 -left-24 h-96 w-96 rounded-full bg-ocean-500/40 blur-3xl"}/>
                    <div
                        className="absolute -bottom-40 -right-32 h-128 w-lg rounded-full bg-ocean-400/20 blur-3xl"/>
                    <div
                        className="absolute top-1/2 left-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"/>
                    <div className="absolute top-10 right-1/3 h-72 w-72 rounded-full bg-ocean-300/15 blur-3xl"/>
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
                    <span
                        className="absolute top-[10%] left-[12%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]"/>
                    <span
                        className="absolute top-[20%] left-[40%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.7)]"/>
                    <span
                        className="absolute top-[38%] left-[8%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]"/>
                    <span
                        className="absolute top-[65%] left-[36%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.7)]"/>
                    <span className="absolute top-[80%] left-[18%] h-1 w-1 rounded-full bg-white/80"/>
                    <span className="absolute top-[15%] left-[78%] h-1 w-1 rounded-full bg-white/60"/>
                    <span
                        className="absolute top-[72%] left-[90%] h-2 w-2 rounded-full bg-white/50 shadow-[0_0_14px_rgba(255,255,255,0.5)]"/>
                    <span className="absolute top-[45%] left-[95%] h-1 w-1 rounded-full bg-white/70"/>
                </div>
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                        className="absolute top-[12%] left-[48%] h-20 w-20 rotate-12 rounded-2xl border border-white/15 backdrop-blur-sm"/>
                    <div
                        className="absolute bottom-[20%] left-[6%] h-16 w-16 -rotate-6 rounded-full border border-white/20"/>
                    <div className="absolute top-[58%] left-[42%] h-10 w-10 rotate-45 border border-white/15"/>
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

                {children}

            </div>

        </>
    );
}
