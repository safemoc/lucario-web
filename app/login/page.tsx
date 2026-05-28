import LoginCard from "@/app/login/(common)/loginCard";
import SystemOperationStatus from "@/app/(common)/system";
import {MottoCard, Card} from "@/app/(common)/cards";


export default function Login() {
    return (
        <>
            <div className={"relative flex min-h-screen flex-col lg:flex-row"}>
                <section className={"hidden lg:flex lg:w-3/5 flex-col justify-between p-12 xl:p-16"}>
                    <Card/>
                    <div className={"max-w-xl space-y-7"}>
                        <h1 className={"text-5xl font-bold leading-tight"}>
                            欢迎回来
                            <br/>
                            <span
                                className={"bg-linear-to-r from-white to-ocean-200 bg-clip-text text-transparent"}>深邃入海，自在如风</span>

                        </h1>
                        <p className={"max-w-md text-base leading-relaxed text-ocean-100/85"}>登录你的账户，开启一段沉浸式的工作体验。我们用细节守护效率，用设计陪伴你的每一刻。</p>
                        <MottoCard/>
                    </div>


                    <SystemOperationStatus/>
                </section>
                <LoginCard/>

            </div>


        </>

    )
}