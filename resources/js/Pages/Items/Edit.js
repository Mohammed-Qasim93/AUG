import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import ValidationErrors from "@/Components/ValidationErrors";
import { Inertia } from "@inertiajs/inertia";

export default function Add({ status, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category: "",
        qty: "",
        state: "",
        active: "",
        note: "",
        desc: "",
    });

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
    //     post(route("items/create"));
    // };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value });
    // };

    const handelClick = (e) => {
        e.preventDefault();
        Inertia.post(`/items`, data);
    };

    return (
        <>
            <Authenticated auth={auth} errors={errors}>
                <Head title="الفئات" />
                <div className="flex">
                    <DashboardBar auth={auth} />
                    <div className="flex-1 flex flex-col max-w-6xl">
                        <div className=" flex justify-center  text-gray-900 text-2xl">
                            <div className="pt-12" style={{ width: "512px" }}>
                                <div>
                                    <div className="mt-10 sm:mt-0">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="mt-5 md:mt-0 col-span-2">
                                                <form onSubmit={handelClick}>
                                                    <div className="shadow overflow-hidden sm:rounded-md">
                                                        <div className="px-4 py-5 bg-white sm:p-6">
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <div className="col-span-6 sm:col-span-3">
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
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="category"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الصنف
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        value={
                                                                            data.category
                                                                        }
                                                                        name="category"
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
                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="desc"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الوصف
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
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

                                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
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
                                                                        type="text"
                                                                        name="qty"
                                                                        value={
                                                                            data.qty
                                                                        }
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label
                                                                        htmlFor="active"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        قابل
                                                                        للاستهلاك
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        value={
                                                                            data.active
                                                                        }
                                                                        name="active"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label
                                                                        htmlFor="postal-code"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        الحاله
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        name="postal-code"
                                                                        id="postal-code"
                                                                        value={
                                                                            data.state
                                                                        }
                                                                        autoComplete="postal-code"
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
