import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";

export default function index({ user, auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>المستخدمين</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
<<<<<<< HEAD:resources/js/Pages/User/Index.jsx
                <div className="flex-1 flex flex-col ">
                    <Table user={user} auth={auth} />
=======
                <div className="flex-1 flex flex-col">
                    <TableButtons text="إضافة موظف" url="/register" />
                    <Table
                        data={user}
                        url="user"
                        auth={auth}
                        tableHeaders={[
                            "الاسم",
                            "البريد الالكتروني",
                            "الحالة",
                            "العمليات",
                        ]}
                    />
>>>>>>> 612d321e761345d63b9ab19af5b643c77c3859dd:resources/js/Pages/User/Index.js
                </div>
            </div>
        </Authenticated>
    );
}
