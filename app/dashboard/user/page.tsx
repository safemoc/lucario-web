import Todo from "@/app/ui/dashboard/users/todo";
import Me from "@/app/ui/dashboard/users/me";
import Structure from "@/app/ui/dashboard/company/struct";


export default function Page() {
    return (
        <>
            <Me/>
            <Todo/>
            {/*TODO:协调申请*/}

            <Structure/>
            Hello Lucario!!</>
    )

}