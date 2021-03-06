import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";

import { Inertia } from "@inertiajs/inertia";

export default function Checkout({ auth, errors, items, success }) {
    console.log(items);
    const { data, setData, post } = useForm({
        name: "",
        authname: "",
        note: "",
        vehiclenumber: "",
        vehicletype: "",
        drivername: "",
        outtype: "",
        items: [],
    });

    // const increment = (e) => {
    //     setData(value + 1);
    // };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const filterItems = (e) => {
        let i = [];
        items.map((item) => {
            i.push({
                itemId: item.id,
                item: item.name,
                category: item.category,
                no: item.no,
                state: item.state,
                qty: document.getElementById(item.id).value || 1,
            });
        });
        setData("items", i);
    };

    // const submit = (e) => {
    //     console.log(data);
    //     e.preventDefault();
    //     Inertia.post(`/items/${items.id}`, data);
    // };

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        const id = JSON.parse(localStorage.getItem("checked"));
        Inertia.post(`/logs`, data, {

            onSuccess: () => {
                if (data.items.length > 0 && data.name !== "" && data.authname !== "") {
                    Inertia.visit(
                        `/print?p=outpdf&n=${data.drivername}&num=${data.vehiclenumber}&car=${data.vehicletype}&outtype=${data.outtype}&id=${id.length}`
                    );
                    localStorage.removeItem("checked");
                }
            }
        });

        // } else {
        // alert("???????????? ?????????? ?????????? ??????????????");
        // }
    };

    const removeItem = (id) => {
        let items = JSON.parse(localStorage.getItem("checked"));
        items = items.filter((item) => item !== id);
        console.log(items);
        localStorage.setItem("checked", JSON.stringify(items));
        Inertia.post(`/checkout`, { data: items }, { replaces: true });
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
    //                 title: "?????? ?????????????? ??????????",
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
                <Head title="?????????? ??????????" />
                <div className="flex">
                    <DashboardBar auth={auth} />
                    <div className="flex-1 flex flex-col max-w-6xl">
                        <h2 className="font-tajawal-extrabold text-3xl text-center pr-32 w-full pt-10">
                            ?????????? ??????????
                        </h2>
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
                                                            ?????? ??????????????
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
                                                            htmlFor="authname"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            ?????? ????????????
                                                        </label>
                                                        <Input
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                            type="text"
                                                            name="authname"
                                                            value={
                                                                data.authname
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        <small className="text-red-500 text-sm">
                                                            {errors.authname}
                                                        </small>
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="note"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            ??????????????????
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
                                                    <div className="col-span-6 flex items-center gap-x-2 ">
                                                        <Checkbox
                                                            handleChange={
                                                                onHandleChange
                                                            }
                                                            name="outtype"
                                                            value={data.outtype}
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        <label
                                                            htmlFor="outtype"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            ???????? ????????????
                                                        </label>
                                                        <small className="text-red-500 text-sm">
                                                            {errors.outtype}
                                                        </small>
                                                    </div>
                                                    <div
                                                        className={`${data.outtype
                                                            ? " col-span-6 grid gap-6"
                                                            : " hidden"
                                                            }`}
                                                    >
                                                        <div className="col-span-6">
                                                            <label
                                                                htmlFor="name"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                ?????? ????????????
                                                            </label>
                                                            <Input
                                                                handleChange={
                                                                    onHandleChange
                                                                }
                                                                type="text"
                                                                name="drivername"
                                                                value={
                                                                    data.drivername
                                                                }
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <small className="text-red-500 text-sm">
                                                                {
                                                                    errors.drivername
                                                                }
                                                            </small>
                                                        </div>
                                                        <div className="col-span-6">
                                                            <label
                                                                htmlFor="vehicletype"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                ?????? ??????????????
                                                            </label>
                                                            <Input
                                                                handleChange={
                                                                    onHandleChange
                                                                }
                                                                type="text"
                                                                name="vehicletype"
                                                                value={
                                                                    data.vehicletype
                                                                }
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <small className="text-red-500 text-sm">
                                                                {errors.sender}
                                                            </small>
                                                        </div>
                                                        <div className="col-span-6">
                                                            <label
                                                                htmlFor="vehiclenumber"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                ?????? ??????????????
                                                            </label>
                                                            <Input
                                                                handleChange={
                                                                    onHandleChange
                                                                }
                                                                type="text"
                                                                name="vehiclenumber"
                                                                value={
                                                                    data.vehiclenumber
                                                                }
                                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <small className="text-red-500 text-sm">
                                                                {errors.sender}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 flex justify-around bg-gray-50 text-right sm:px-6">
                                                <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none ">
                                                    ??????????
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="flex gap-4 items-center pt-4">
                                    <div className="flex items-center gap-4">
                                        <Label value="???? :"></Label>
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

                        <div className="flex flex-col py-8 pr-32">
                            <table className="max-w-5xl divide-y text-center divide-gray-200">
                                <thead className="bg-gray-50 text-right">
                                    <tr>
                                        <th
                                            scope="col"
                                            className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ??????????
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ?????? ????????????
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ?????? ????????????
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ??????????
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ????????????
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.map((item, key) => (
                                        <tr key={key}>
                                            <th
                                                scope="col"
                                                className=" py-3 cursor-pointer "
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 mx-auto"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                    stroke="red"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </th>

                                            <td className="pb-4">{item.id}</td>

                                            <td className="pb-4">
                                                {item.name}
                                            </td>

                                            <td className="py-4 ">
                                                {item.categories.name}
                                            </td>

                                            <td className="flex items-center justify-center py-4 text-lg">
                                                <input
                                                    type="number"
                                                    name="qty"
                                                    id={item.id}
                                                    max={item.qty}
                                                    min={1}
                                                    onChange={filterItems}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
