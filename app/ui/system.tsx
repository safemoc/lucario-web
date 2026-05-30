export default function SystemOperationStatus() {

    return (
        <>

            <div className="space-y-6">
                <div className="flex items-center gap-8">
                    {[
                        {label: "活跃团队", value: "12k+"},
                        {label: "在线协作", value: "99.9%"},
                        {label: "国家与地区", value: "60+"},
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
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"/>
                所有系统运行正常
              </span>
                </div>
            </div>

        </>


    )
}