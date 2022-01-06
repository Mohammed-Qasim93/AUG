import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import Toast from "../../Components/Toast";
import Label from "../../Components/Label";

export default function Checkout({ auth, errors, items, success }) {
    const { data, setData, post } = useForm({
        name: items.name || "",
        category: items.category || "",
        qty: items.qty || "",
        no: items.no || "",
        note: items.note || "",
        desc: items.desc || "",
        state: items.state,
        _method: "PUT",
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
    //     console.log(data);
    //     e.preventDefault();
    //     Inertia.post(`/items/${items.id}`, data);
    // };

    const submit = (e) => {
        e.preventDefault();

        post(`/items/${items.id}`, {
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
                <Head title="اخراج مخزني" />
                <div className="flex">
                    <DashboardBar auth={auth} />
                    <div className="flex-1 flex flex-col max-w-6xl">
                        <div className="flex flex-col justify-end pr-32 items-start ">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex justify-between flex-1 gap-x-4 items-end pt-16">
                                    <form
                                        onSubmit={submit}
                                        className="w-1/2 mx-auto "
                                    >
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="name"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            الاسم
                                                        </label>
                                                        <Input
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                            type="text"
                                                            name="name"
                                                            value={data.name}
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        <small className="text-red-500 text-sm">
                                                            {errors.name}
                                                        </small>
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
                                                            value={data.note}
                                                            name="note"
                                                            autoComplete="street-address"
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 flex justify-center bg-gray-50 text-right sm:px-6">
                                                <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none ">
                                                    إخراج
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="flex gap-4 items-center pt-4">
                                    <div className="flex items-center gap-4">
                                        <Label value="من :"></Label>
                                        <Input
                                            type="search"
                                            name="search"
                                            value={data.search}
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
                                </div> */}
                            </div>
                        </div>

                        <Table
                            data={items}
                            // paginate={items}
                            // takeout="true"
                            checkout="true"
                            url="items"
                            auth={auth}
                            tableHeaders={[
                                "حذف",
                                "رقم الماده",
                                "اسم الماده",
                                "الصنف",
                                "الكمية",
                            ]}
                        />
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
