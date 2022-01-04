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
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("dashboard/catagories/edit"));
    };

    return (
        <>
            <Authenticated auth={auth} errors={errors}>
                <Head title="الفئات" />
                <div className="flex">
                    <DashboardBar auth={auth} />
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <div className="flex-1 flex flex-col">
                        <form>
                            <div class="flex items-center justify-center h-screen bg-gray-100">
                                <div class="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                                    <h1 class="text-center text-lg font-bold text-gray-500">
                                        Form Register
                                    </h1>
                                    <div class="space-y-4 mt-6">
                                        <div class="w-full">
                                            <input
                                                type="text"
                                                placeholder="fullname"
                                                class="px-4 py-2 bg-gray-50"
                                            />
                                        </div>
                                        <div class="w-full">
                                            <input
                                                type="text"
                                                placeholder="username"
                                                class="px-4 py-2 bg-gray-50"
                                            />
                                        </div>
                                        <div class="w-full">
                                            <input
                                                type="text"
                                                placeholder="email"
                                                class="px-4 py-2 bg-gray-50"
                                            />
                                        </div>
                                        <div class="w-full">
                                            <input
                                                type="text"
                                                placeholder="password"
                                                class="px-4 py-2 bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    <button class="w-full mt-5 bg-indigo-600 text-white py-2 rounded-md font-semibold tracking-tight">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
