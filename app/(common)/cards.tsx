export  function MottoCard() {
    return (

        <>
            <div
                className={"mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"}>
                <div className={"flex items-start gap-3"}>
                    <svg
                        className="mt-1 h-6 w-6 shrink-0 text-white/70"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            d="M7 7h4v4H7c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V9c0-1.1.9-2 2-2zm10 0h4v4h-4c0 2.2 1.8 4 4 4v2c-3.3 0-6-2.7-6-6V9c0-1.1.9-2 2-2z"/>
                    </svg>
                    <div>
                        <p className="text-sm leading-relaxed text-white/90">
                            Lucario 让我们的团队像潜入深海一样专注，所有干扰都被柔和过滤。
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-ocean-900">
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
        </>
    )
}


export  function Card() {
    return (
        <>
            <div className={"flex items-center gap-3"}>
                <div
                    className={"flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur"}>
                    <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M2 12c2.5-2 5 2 7.5 0S14.5 10 17 12s5-2 5-2"/>
                        <path d="M2 17c2.5-2 5 2 7.5 0S14.5 15 17 17s5-2 5-2"/>
                        <path d="M2 7c2.5-2 5 2 7.5 0S14.5 5 17 7s5-2 5-2"/>
                    </svg>
                </div>
                <span className="text-xl font-semibold tracking-wide">Lucario</span>
            </div>
        </>
    )
}