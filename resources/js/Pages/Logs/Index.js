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
    console.log(logs);
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
                    <div className="relative"></div>
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
                                        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                        href="/logs?page=1"
                                    >
                                        تصفير
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <a
                                    className="bg-green-500 p-2 rounded-lg"
                                    href="/print?p=excel"
                                >
                                    <svg
                                        enable-background="new 0 0 30 30"
                                        height="30px"
                                        id="Layer_1"
                                        version="1.1"
                                        viewBox="0 0 30 30"
                                        width="30px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g>
                                            <path
                                                clip-rule="evenodd"
                                                d="M28.705,7.506l-5.461-6.333l-1.08-1.254H9.262   c-1.732,0-3.133,1.403-3.133,3.136V7.04h1.942L8.07,3.818c0.002-0.975,0.786-1.764,1.758-1.764l11.034-0.01v5.228   c0.002,1.947,1.575,3.523,3.524,3.523h3.819l-0.188,15.081c-0.003,0.97-0.79,1.753-1.759,1.761l-16.57-0.008   c-0.887,0-1.601-0.87-1.605-1.942v-1.277H6.138v1.904c0,1.912,1.282,3.468,2.856,3.468l17.831-0.004   c1.732,0,3.137-1.41,3.137-3.139V8.966L28.705,7.506"
                                                fill="#fff"
                                                fill-rule="evenodd"
                                            />
                                            <path
                                                d="M20.223,25.382H0V6.068h20.223V25.382 M1.943,23.438h16.333V8.012H1.943"
                                                fill="#fff"
                                            />
                                            <polyline
                                                fill="#fff"
                                                points="15.73,20.822 12.325,20.822 10.001,17.538 7.561,20.822 4.14,20.822 8.384,15.486 4.957,10.817    8.412,10.817 10.016,13.355 11.726,10.817 15.242,10.817 11.649,15.486 15.73,20.822  "
                                            />
                                        </g>
                                    </svg>
                                </a>
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
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
