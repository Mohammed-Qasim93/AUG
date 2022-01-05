import React, { useState } from "react";
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

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(success);
        Inertia.get(
            `/items?`,
            { date_from: data.from, date_to: data.to },
            { replaces: true, preserveState: true }
        );
        Swal.fire({
            title: "jjijijij",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
        });
    };
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>السلع</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className="flex justify-between items-end h-20 ">
                        <TableButtons text="إضافة مادة" url="/items/create" />
                    </div>
                    <div className="flex flex-col justify-end pr-32 items-start max-w-6xl ">
                        <div className="flex gap-32 w-full justify-between">
                            <Filters text="اخر يوم :" />
                            <Filters text="اخر اسبوع :" />
                        </div>
                        <div className="flex w-full justify-between">
                            <Filters text="اخر شهر :" />
                            <div className="flex gap-8">
                                <div className="flex items-center gap-4">
                                    <Label value="من :"></Label>
                                    <Input
                                        type="date"
                                        name="from"
                                        value={data.from}
                                        className="mt-1 block w-full"
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
                                <div className="flex items-center gap-4">
                                    <Button
                                        className="bg-orange-400 hover:bg-orange-500"
                                        handleClick={submit}
                                        children="بحث"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table
                        data={items.data}
                        paginate={items}
                        url="items"
                        auth={auth}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الكمية",
                            "الصنف",
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
