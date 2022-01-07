import React, { useEffect, useState } from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import TableButtons from "../../Components/TableButtons";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import Button from "../../Components/Button";
import Filters from "../../Components/Filters";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function index({ logs, auth, errors, success }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="اخراج مخزني" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <Table
                        data={logs.data}
                        paginate={logs}
                        url="logs"
                        logs={true}
                        auth={auth}
                        tableHeaders={[
                            "الاسم",
                            "اسم الماده",
                            "الكميه",
                            "التاريخ",
                            "الحاله",
                            "الخيارات",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
