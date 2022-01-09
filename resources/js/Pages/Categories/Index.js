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

    const handleClick = (id) => {
        Swal.fire({
            title: "هل انت متأكد من الحذف؟",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "نعم",
            denyButtonText: `كلا`,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`categories/${id}`);
            }
        });
    };

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
                                    <th className="px-4 py-2">رقم الصنف</th>
                                    <th className="px-4 py-2">اسم الصنف</th>
                                    <th className="px-4 py-2">الوصف</th>
                                    {/* <th className="px-4 py-2">عدد المواد</th> */}
                                    <th className="px-4 py-2">العمليات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.map((category) => (
                                    <tr className="py-4 " key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.desc}</td>

                                        <td className="py-4 flex items-center justify-center">
                                            <Link
                                                href={`/category/${category.id}/edit`}
                                                className="bg-green-500 text-black p-2 rounded-lg mx-2 hover:bg-green-600 transition duration-500 ease-in-out"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="#fff"
                                                    className="bi bi-pencil-square"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                    />
                                                </svg>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleClick(category.id)
                                                }
                                                className={` px-2 py-2 transition duration-500 ease-in-out bg-red-500 hover:bg-red-600
                                             text-white p-2 rounded-lg mx-2 
                                               `}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="red"
                                                    viewBox="0 0 24 24"
                                                    stroke="#fff"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
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
