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
import Checkout from "./Checkout";
import Toast from "../../Components/Toast";

export default function index({ items, auth, errors, success }) {
    const [data, setData] = useState("");

    useEffect(() => {
        if (success) {
            Toast.fire({
                title: "خطأ",
                text: success,
                confirmButtonText: "اغلاق",
            });
        }
    }, [success]);

    const onHandleChange = (e) => {
        e.preventDefault();
        setData(e.target.value);
        Inertia.get(
            `/takeout?`,
            { item: data },
            { replaces: true, preserveState: true }
        );
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(
            `/checkout`,
            { data: JSON.parse(localStorage.getItem("checked")) },
            { replaces: true }
        );
    };
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="اخراج مخزني" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className="flex flex-col justify-end pr-32 items-start max-w-6xl">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex justify-between items-end h-20 ">
                                {/* <TableButtons text="اخراج" url="/checkout" /> */}
                                <Button handleClick={submit} children="اخراج" />
                            </div>
                            <div className="flex gap-4 items-center pt-4">
                                <div className="flex items-center gap-4">
                                    <Label value="من :"></Label>
                                    <Input
                                        type="search"
                                        name="search"
                                        value={data}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <Link
                                        className="inline-flex items-center p-3 bg-red-500 hover:bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                        href="/takeout"
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

                    <Table
                        data={items.data}
                        paginate={items}
                        takeout="true"
                        url="items"
                        auth={auth}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الصنف",
                            "الكمية",
                            "الحاله",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
