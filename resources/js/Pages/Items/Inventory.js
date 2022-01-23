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

export default function index({ items, auth, errors, success }) {
    const { data, setData } = useForm({
        from: "",
        to: "",
    });

    const [search, setSearch] = useState("");

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.get(
            `/items/inventory?=`,
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
                        مواد الجرد
                    </h2>
                    <div className="relative"></div>
                    <div className="flex flex-col justify-end pr-32 print:absolute top-0 items-start max-w-6xl">
                        <div className="flex  w-full py-3 justify-between print:hidden">
                            <div className="flex items-center gap-x-4 ">
                                <TableButtons
                                    text="إضافة ماده"
                                    url="/items/create"
                                />
                                <a
                                    className="bg-gray-500 flex py-1 px-3 text-white gap-x-2 rounded-lg"
                                    href="/print?p=excel"
                                >
                                    <span>Excel</span>{" "}
                                    <svg
                                        enableBackground="new 0 0 30 30"
                                        className="w-5 h-5"
                                        id="Layer_1"
                                        version="1.1"
                                        viewBox="0 0 30 30"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g>
                                            <path
                                                clipRule="evenodd"
                                                d="M28.705,7.506l-5.461-6.333l-1.08-1.254H9.262   c-1.732,0-3.133,1.403-3.133,3.136V7.04h1.942L8.07,3.818c0.002-0.975,0.786-1.764,1.758-1.764l11.034-0.01v5.228   c0.002,1.947,1.575,3.523,3.524,3.523h3.819l-0.188,15.081c-0.003,0.97-0.79,1.753-1.759,1.761l-16.57-0.008   c-0.887,0-1.601-0.87-1.605-1.942v-1.277H6.138v1.904c0,1.912,1.282,3.468,2.856,3.468l17.831-0.004   c1.732,0,3.137-1.41,3.137-3.139V8.966L28.705,7.506"
                                                fill="#fff"
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
                            <div className="">
                                <span>عدد المواد :</span>
                                <span>{items.data.length}</span>
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
                                        href="/items/inventory?page=1"
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
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-4">
                                    <Label value="بحث :"></Label>
                                    <Input
                                        type="search"
                                        name="search"
                                        value={search}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        handleChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <Link
                                        className="inline-flex items-center p-2 bg-red-500 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                        href="/items/inventory?page=1"
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
                            data={items.data}
                            paginate={items}
                            url="inventory"
                            editUrl="items"
                            auth={auth}
                            tableHeaders={[
                                "التسلسل",
                                "اسم الماده",
                                "الصنف",
                                "الكميه",
                                "التاريخ",
                                "الحاله",
                                "العمليات",
                            ]}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
