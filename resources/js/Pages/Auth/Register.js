import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Toast from "../../Components/Toast";

export default function Register({ success }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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

        post("/register", {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: success,
                });
            },
        });
    };

    return (
        <Guest>
            <Head title="إضافة موظف" />

            <form onSubmit={submit}>
                <h2 className="text-center text-3xl py-4 text-gray-600">
                    إضافة موظف
                </h2>
                <div>
                    <Label forInput="name" value="الاسم" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                    <small className="text-red-500 text-sm">
                        {errors.name}
                    </small>
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="الايميل" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                    <small className="text-red-500 text-sm">
                        {errors.email}
                    </small>
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="كلمة السر" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                    <small className="text-red-500 text-sm">
                        {errors.password}
                    </small>
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="إعادة كلمة السر"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-around mt-4">
                    <Button className="ml-4" processing={processing}>
                        إضافة
                    </Button>
                    <Link
                        href="/user?page=1"
                        className="ml-4 bg-transparent px-4 py-1 border rounded-lg"
                    >
                        رجوع
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
