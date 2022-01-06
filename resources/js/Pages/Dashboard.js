import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import DashboardBar from "@/Components/DashboardBar";
import Table from "../Components/Table";

export default function Dashboard({ auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="الرئيسية" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-7xl">
                    <div className="flex flex-col justify-center items-center gap-4 pt-20">
                        <h2 className="text-5xl font-tajawal-extrabold text-right">
                            اهلا وسهلا بك يا {auth.user.name}
                        </h2>
                        <p>في نظام ادارة المخزن لمجموعة الدير للمقاولات</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 pt-20">
                        <h2 className="text-2xl font-tajawal-extrabold text-right">
                            فريق الدعم
                        </h2>
                        <a href="mailto:horizon.dev.iq@gmail.com">
                            Horizon Dev
                        </a>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
