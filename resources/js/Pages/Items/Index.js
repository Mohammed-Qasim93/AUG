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
import Toast from "../../Components/Toast";

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

    useEffect(() => {
        search.length > 0 &&
            Inertia.get(
                `/items?`,
                { item: search },
                { replaces: true, preserveState: true }
            );
    }, [search]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (success) {
            Toast.fire({
                icon: success.icon,
                title: success.title,
                text: success.message,
            });
        }
    }, [success]);

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
            <Head title="المواد" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col  max-w-6xl">
                    <h2 className="font-tajawal-extrabold text-3xl text-center w-full pt-10 pr-32">
                        سجل المواد
                    </h2>
                    <div className="flex justify-between items-end h-20 ">
                        <TableButtons
                            text="إضافة صنف"
                            url="/categories/create"
                        />
                    </div>
                    <div className="flex flex-col justify-end pr-32 items-start max-w-6xl">
                        <div className="flex w-full  justify-between">
                            <div className="flex gap-4 justify-between w-full pt-4">
                                <div className="flex gap-x-2">
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
                                <div className="flex items-center gap-4">
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
                                            href="/items?page=1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
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
                    </div>

                    <Table
                        data={items.data}
                        paginate={items}
                        url="items"
                        auth={auth}
                        total={items.total}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الصنف",
                            "الكمية",
                            "الاستهلاكية",
                            "الحالة",
                            "تاريخ الاضافة",
                            "العمليات",
                        ]}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
