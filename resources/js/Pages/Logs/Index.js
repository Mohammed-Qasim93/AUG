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
    const { data, setData } = useForm({
        from: "",
        to: "",
    });

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.get(
            `/items?`,
            { date_from: data.from, date_to: data.to },
            { replaces: true, preserveState: true }
        );
    };

    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="السجل" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <h2 className="font-tajawal-extrabold text-3xl pr-32 py-4 text-center w-full pt-10 ">
                        سجل الادخال والاخراج
                    </h2>
                    <div className="flex flex-col justify-end pr-32 items-start max-w-6xl">
                        <div className="flex   w-1/3 py-3 justify-around">
                            <Button children="اخر يوم" />
                            <Button children="اخر اسبوع" />
                            <Button children="اخر شهر" />
                        </div>
                        <div className="flex w-full  justify-between">
                            <div className="flex gap-4 pt-4">
                                <div className="flex items-center gap-4">
                                    <Label value="من :"></Label>
                                    <Input
                                        type="date"
                                        name="from"
                                        value={data.from}
                                        className="mt-1 block w-full "
                                        autoComplete="username"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label value="الى :"></Label>
                                    <Input
                                        type="date"
                                        name="to"
                                        value={data.to}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600"
                                        handleClick={submit}
                                        children="بحث"
                                    />
                                    <Link
                                        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                        href="/items?page=1"
                                    >
                                        تصفير
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600"
                                    handleClick={print}
                                    children="طباعة"
                                />
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600"
                                    handleClick={exportPDF}
                                    children="PDF"
                                />
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600"
                                    handleClick={exportExcel}
                                    children="Excel"
                                />
                            </div>
                        </div>
                    </div>
                    <Table
                        data={logs.data}
                        paginate={logs}
                        url="logs"
                        logs={true}
                        auth={auth}
                        tableHeaders={[
                            "التسلسل",
                            "الاسم",
                            "اسم الماده",
                            "الصنف",
                            "الرقم التسلسلي",
                            "الكميه",
                            "التاريخ",
                            "ادخال مخزني",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
