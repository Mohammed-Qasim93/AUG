import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import TableButtons from "../../Components/TableButtons";
import Filters from "../../Components/Filters";
import Button from "../../Components/Button";

export default function index({ items, auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>السلع</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className="flex justify-between items-end h-20 ">
                        <TableButtons text="إضافة سلعة" url="/items/create" />
                        <Button
                            className="bg-orange-400 hover:bg-orange-500"
                            children="ترتيب"
                        />
                    </div>

                    <Table
                        data={items}
                        url="items"
                        auth={auth}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الكمية",
                            "الحالة",
                            "تاريخ الاضافة",
                            "الملاحظات",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
