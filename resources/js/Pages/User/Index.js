import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import TableButtons from "../../Components/TableButtons";
import Filters from "../../Components/Filters";
import Button from "../../Components/Button";

export default function index({ user, auth, errors }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>المستخدمين</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className="flex justify-between items-end h-20 ">
                        <TableButtons text="إضافة موظف" url="/register" />
                        <Button
                            className="bg-orange-400 hover:bg-orange-500"
                            children="ترتيب"
                            handleClick={handleClick}
                        />
                    </div>

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
                </div>
            </div>
        </Authenticated>
    );
}
