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

    console.log(logs.data);

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

    // const exportExcel = () => {
    //     Inertia.get("/print?p=excel");
    // };

    const submit = (e) => {
        e.preventDefault();
        Inertia.get(
            `/logs?=`,
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
                    <h2 className="font-tajawal-extrabold print:hidden  text-3xl print:pr-0 pr-32 py-4 text-center w-full pt-10 ">
                        سجل الادخال والاخراج
                    </h2>

                    {
                        logs.data.length > 0 ? (<>
                            <div className="flex flex-col justify-end pr-32 print:absolute top-0 items-start max-w-6xl">
                                <div className="flex  w-full py-3 justify-end print:hidden">
                                    <div className="">
                                        <span>عدد المواد :</span>
                                        <span>{logs.data.length}</span>
                                    </div>
                                </div>
                                <div className="flex w-full  justify-between print:hidden pt-4">
                                    <div className="flex gap-4 ">
                                        <div className="flex items-center gap-x-4">
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
                                        <div className="flex items-center gap-x-4">
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
                                                className="inline-flex items-center p-2 bg-red-500 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                                href="/logs?page=1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="#fff"
                                                    className="bi bi-arrow-clockwise"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                                    />
                                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form">
                                <Table
                                    data={logs.data}
                                    paginate={logs}
                                    url="logs"
                                    logs={true}
                                    auth={auth}
                                    tableHeaders={[
                                        "التسلسل",
                                        "اسم المخول",
                                        "اسم الماده",
                                        "اسم المستلم",
                                        "الكميه",
                                        "الاستهلاكية",
                                        "الحالة",
                                        "التاريخ",
                                        "ادخال مخزني",
                                    ]}
                                />
                            </div></>) : (
                            <h2 className="text-center mt-20" > لا يوجد مواد مستخرجه </h2>
                        )
                    }

                </div>
            </div>
        </Authenticated>
    );
}
