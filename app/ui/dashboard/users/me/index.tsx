
export default async function Me() {
    return (
        <section
            className={"relative flex h-auto  max-h-1/3 min-h-0 flex-col rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_8px_24px_-12px_rgba(6,29,51,0.12)] transition hover:shadow-[0_14px_32px_-16px_rgba(6,29,51,0.2)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"}>
            <header>
                <h3>我的账户</h3>
                <p>
                    {/*TODO:年月日*/}
                </p>
            </header>
            <div>
                {/*TODO: HELLO, 代办数+协调申请数*/}
            </div>
            <div>
                {/*TODO:个人信息+职位+工号*/}
            </div>
            <div>
                {/*TODO:本月工时*/}
            </div>
        </section>
    )
}