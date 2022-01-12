import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";

import Checkbox from "../../Components/Checkbox";
import Toast from "../../Components/Toast";

export default function Add({ auth, errors, success }) {
    const { data, setData, post } = useForm({
        name: "",
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
    //     Inertia.post(`/items`, data);
    // };

    const submit = (e) => {
        e.preventDefault();

        post("/categories", {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: success,
                });
            },
        });
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
                <Head title="اضافة صنف" />
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
                                                    <div className="shadow overflow-hidden sm:rounded-md">
                                                        <div className="px-4 py-5 bg-white sm:p-6">
                                                            <h2 className="text-center pt-4 pb-6">
                                                                {" "}
                                                                إضافة صنف{" "}
                                                            </h2>
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="name"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        إسم
                                                                        الصنف
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
