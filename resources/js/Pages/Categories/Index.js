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

export default function index({ categories, auth, errors, success }) {
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

    useEffect(() => {
        if (success) {
            Toast.fire({
                icon: success.icon,
                title: success.title,
                text: success.message,
            });
        }
    }, [success]);

    // const submit = (e) => {
    //     e.preventDefault();
    //     Inertia.get(
    //         `/items?`,
    //         { date_from: data.from, date_to: data.to },
    //         { replaces: true, preserveState: true }
    //     );
    //     Swal.fire({
    //         title: errors.data.name,
    //         toast: true,
    //         html: "I will close in <b></b> milliseconds.",
    //         timer: 2000,
    //     });
    // };
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

                    <div className="flex flex-col pt-4 print:pr-0 pr-32">
                        <table className="max-w-5xl  divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-50 text-center ">
                                <tr className=" ">
                                    <th className="px-4 py-2">اسم الصنف</th>
                                    <th className="px-4 py-2">عدد المواد</th>
                                    <th className="px-4 py-2">الوصف</th>
                                    <th className="px-4 py-2">العمليات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.map((category) => (
                                    <tr className="py-4 " key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.desc}</td>

                                        <td>
                                            <Link
                                                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 $"
                                                href={`/items/${category.id}/edit`}
                                            >
                                                تعديل
                                            </Link>
                                            <Button children={kopko} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
