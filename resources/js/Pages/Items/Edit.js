import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import DashboardBar from "../../Components/DashboardBar";
// import ComboBox from "@/Components/ComboBox";

export default function Edit({ auth, item, errors }) {
    let { data, setData } = useForm({
        name: item.name || "",
        qty: item.qty || 0,
        category: item.category || "",
        no: item.no || 0,
        desc: item.desc || "",
        note: item.note || "",
        _method: "PUT",
    });
    // let [itemState, setitemState] = useState(initialState);
    // let { email, name, isAdmin, password, password_confirmation } = itemState;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handelClick = (e) => {
        e.preventDefault();
        Inertia.post(`/item/${item.id}`, data);
    };

    // const handlechecked = (e) => {
    //     if (data.isAdmin == "1") {
    //         setData({ ...data, isAdmin: "0" });
    //     } else {
    //         setData({ ...data, isAdmin: "1" });
    //     }
    // };
    return (
        <Authenticated auth={auth}>
            <Head title="تعديل معلومات الموظف" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className=" flex justify-center  text-gray-900 text-2xl">
                        <div className="pt-12" style={{ width: "512px" }}>
                            <form
                                onSubmit={handelClick}
                                className="w-full mx-auto border-2 bg-white p-8 space-y-6"
                            >
                                <div className="">
                                    <Label
                                        className="text-xl w-full pb-2"
                                        forInput="name"
                                        value="اسم الموظف"
                                    />
                                    <Input
                                        type="text"
                                        className="p-2 w-full text-center"
                                        name="name"
                                        handleChange={handleChange}
                                        value={data.name}
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.name}
                                </small>

                                <div className="">
                                    <Label
                                        className="text-xl  pb-2"
                                        forInput="email"
                                        value="التصنيف"
                                    />
                                    <Input
                                        type="text"
                                        name="category"
                                        handleChange={handleChange}
                                        value={data.category}
                                        className="p-2 w-full text-center"
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.category}
                                </small>

                                <div className="">
                                    <Label
                                        className="text-xl pb-2"
                                        forInput="note"
                                        value="الملاحظات"
                                    />
                                    <Input
                                        area="true"
                                        type="text"
                                        name="note"
                                        handleChange={handleChange}
                                        value={data.note}
                                        className="p-2 text-center w-full placeholder-gray-400"
                                        placeholder="اترك الحقل فارغ لعدم التغيير"
                                    />
                                </div>
                                <div className="">
                                    <Label
                                        className="text-xl pb-2"
                                        forInput="qty"
                                        value="العدد"
                                    />
                                    <Input
                                        name="qty"
                                        type="no"
                                        handleChange={handleChange}
                                        value={data.qty}
                                        className="p-2 text-center w-full placeholder-gray-400"
                                        placeholder="اترك الحقل فارغ لعدم التغيير"
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.qty}
                                </small>
                                {/* <div className="flex">
                            <Label
                                className="text-xl pb-2"
                                forInput="password_confirmation"
                                value="رقم الحاسبة"
                            />
                            <ComboBox
                                name="PcN"
                                type="password"
                                handleChange={handleChange}
                                value={data.PcN}
                                className="block mr-8 px-2"
                                placeholder="اترك الحقل فارغ لعدم التغيير"
                            />
                        </div> */}
                                {/* <small className="text-red-500 text-base">
                                    {errors.PcN}
                                </small> */}
                                {/* <div className="flex items-center h-10 w-1/2 text-gray-900">
                                    <Input
                                        type="checkBox"
                                        name="isAdmin"
                                        value={data.isAdmin}
                                        handleChange={handlechecked}
                                        className="w-6 h-6"
                                        checked={data.isAdmin}
                                    />
                                    <Label
                                        forInput="isAdmin"
                                        className="text-xl px-4 "
                                        value="ترقية الى مدير"
                                    />
                                </div> */}

                                <div className="flex justify-center">
                                    <Button className="bg-green-500 py-2">
                                        حفظ
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
