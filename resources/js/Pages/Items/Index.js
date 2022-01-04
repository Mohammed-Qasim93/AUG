import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import TableButtons from "../../Components/TableButtons";

export default function index({ items, auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>السلع</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col">
                    <TableButtons text="إضافة سلعه" url="/items/create" />
                    <Table
                        data={items}
                        url="user"
                        auth={auth}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الكمية",
                            "الحالة",
                            "الملاحظات",
                            "تاريخ الاضافة",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
