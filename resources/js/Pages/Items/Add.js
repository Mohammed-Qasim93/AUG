import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";

import Checkbox from "../../Components/Checkbox";
import Combo from "../../Components/Combo";
import Toast from "../../Components/Toast";

export default function Add({ auth, errors, categories }) {
    const { data, setData, post } = useForm({
        name: "",
        categories_id: "",
        qty: "",
        note: "",
        desc: "",
        constate: "",
        inventory: "",
    });

    let stateArr = [
        {
            name: "جيدة",
        },
        {
            name: "متوسطة",
        },
        {
            name: "رديئة",
        },
        {
            name: "يعمل",
        },
        {
            name: "لا يعمل",
        },
    ];

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    // const submit = (e) => {
    //     e.preventDefault();
    //     Inertia.post(`/items`, data);
    // };

    const submit = (e) => {
        e.preventDefault();

        post("/items", {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: success,
                });
            },
        });
        console.log(data);
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value });
    // };

    // const handelClick = (e) => {
    //     e.preventDefault();
    //     axios.post("/items", data).then((response) => {
    //         if (response.status === 201) {
    //             Swal.fire({
    //                 title: "تمت العملية بنجاح",
    //                 icon: "success",
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //             Inertia.replace("/items");
    //         }
    //     });
    // };

    return (
        <>
            <Authenticated auth={auth} errors={errors}>
                <Head title="اضافة مادة" />
                <div className="flex">
                    <DashboardBar auth={auth} />
                    <div className="flex-1 flex flex-col max-w-6xl">
                        <div className=" flex justify-center  text-gray-900 text-2xl">
                            <div className="pt-12" style={{ width: "512px" }}>
                                <div>
                                    <div className="mt-10 sm:mt-0">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="mt-5 md:mt-0 col-span-2">
                                                <form onSubmit={submit}>
                                                    <h2> إضافة مادة </h2>
                                                    <div className="shadow overflow-hidden sm:rounded-md">
                                                        <div className="px-4 py-5 bg-white sm:p-6">
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="name"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        إسم
                                                                        المادة
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        name="name"
                                                                        value={
                                                                            data.name
                                                                        }
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.name
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 ">
                                                                    <label
                                                                        htmlFor="category"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الصنف
                                                                    </label>
                                                                    <Combo
                                                                        className="w-full rounded-lg"
                                                                        name="categories_id"
                                                                        defaultValue={
                                                                            "---- اختر التصنيف ----"
                                                                        }
                                                                        options={
                                                                            categories
                                                                        }
                                                                        handleChange={(
                                                                            e
                                                                        ) => {
                                                                            onHandleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.category
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="qty"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        العدد
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="number"
                                                                        min="1"
                                                                        max={
                                                                            data.qty
                                                                        }
                                                                        value={
                                                                            data.qty
                                                                        }
                                                                        name="qty"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.qty
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="state"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الحاله
                                                                    </label>
                                                                    <Combo
                                                                        className="w-full rounded-lg"
                                                                        name="state"
                                                                        options={
                                                                            stateArr
                                                                        }
                                                                        defaultValue={
                                                                            "---- اختر الحاله ----"
                                                                        }
                                                                        handleChange={(
                                                                            e
                                                                        ) => {
                                                                            onHandleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.state
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="flex col-span-4 gap-x-8">
                                                                    <div className="flex items-center gap-x-2">
                                                                        <Checkbox
                                                                            name="inventory"
                                                                            value={
                                                                                data.inventory
                                                                            }
                                                                            checked={
                                                                                data.inventory
                                                                            }
                                                                            handleChange={
                                                                                onHandleChange
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor="state"
                                                                            className="block text-sm font-medium text-gray-700"
                                                                        >
                                                                            مادة
                                                                            جرد
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center gap-x-2">
                                                                        <Checkbox
                                                                            name="constate"
                                                                            disabled={
                                                                                data.inventory ===
                                                                                true
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            value={
                                                                                data.constate
                                                                            }
                                                                            checked={
                                                                                data.constate
                                                                            }
                                                                            handleChange={
                                                                                onHandleChange
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor="state"
                                                                            className="block text-sm font-medium text-gray-700"
                                                                        >
                                                                            قابل
                                                                            للاستهلاك
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="desc"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الوصف
                                                                    </label>
                                                                    <Input
                                                                        handleChange={(
                                                                            e
                                                                        ) =>
                                                                            onHandleChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        area="true"
                                                                        type="text"
                                                                        value={
                                                                            data.desc
                                                                        }
                                                                        name="desc"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="note"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الملاحظات
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        area="true"
                                                                        type="text"
                                                                        value={
                                                                            data.note
                                                                        }
                                                                        name="note"
                                                                        autoComplete="street-address"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 flex justify-center bg-gray-50 text-right sm:px-6">
                                                            <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none ">
                                                                إضافة
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
