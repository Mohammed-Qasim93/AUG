import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Add({ status, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        item_id: "",
        qty: "",
        state: "",
        active: "",
        note: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // const onHandleChange = (event) => {
    //     setData(
    //         event.target.name,
    //         event.target.type === "checkbox"
    //             ? event.target.checked
    //             : event.target.value
    //     );
    // };

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard/catagories/edit"));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handelClick = (e) => {
        e.preventDefault();
        Inertia.post(`/user/${user.id}`, data);
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
                                                <form>
                                                    <div className="shadow overflow-hidden sm:rounded-md">
                                                        <div className="px-4 py-5 bg-white sm:p-6">
                                                            <div className="grid grid-cols-6 gap-6">
                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="first-name"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        First
                                                                        name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="first-name"
                                                                        id="first-name"
                                                                        autoComplete="given-name"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="last-name"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Last
                                                                        name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="last-name"
                                                                        id="last-name"
                                                                        autoComplete="family-name"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-4">
                                                                    <label
                                                                        htmlFor="email-address"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Email
                                                                        address
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="email-address"
                                                                        id="email-address"
                                                                        autoComplete="email"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="country"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Country
                                                                    </label>
                                                                    <select
                                                                        id="country"
                                                                        name="country"
                                                                        autoComplete="country-name"
                                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    >
                                                                        <option>
                                                                            United
                                                                            States
                                                                        </option>
                                                                        <option>
                                                                            Canada
                                                                        </option>
                                                                        <option>
                                                                            Mexico
                                                                        </option>
                                                                    </select>
                                                                </div>

                                                                <div className="col-span-6">
                                                                    <label
                                                                        htmlFor="street-address"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Street
                                                                        address
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="street-address"
                                                                        id="street-address"
                                                                        autoComplete="street-address"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                    <label
                                                                        htmlFor="city"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        City
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="city"
                                                                        id="city"
                                                                        autoComplete="address-level2"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label
                                                                        htmlFor="region"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        State /
                                                                        Province
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="region"
                                                                        id="region"
                                                                        autoComplete="address-level1"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                                    <label
                                                                        htmlFor="postal-code"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        ZIP /
                                                                        Postal
                                                                        code
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="postal-code"
                                                                        id="postal-code"
                                                                        autoComplete="postal-code"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 flex justify-center bg-gray-50 text-right sm:px-6">
                                                            <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                Save
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
