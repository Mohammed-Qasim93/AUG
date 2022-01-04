import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";

export default function index({ user, auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col ">
                    <Table user={user} auth={auth} />
                </div>
            </div>
        </Authenticated>
    );
}
