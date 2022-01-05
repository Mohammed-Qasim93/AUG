import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import DashboardBar from "../../Components/DashboardBar";
import Table from "../../Components/Table";
import TableButtons from "../../Components/TableButtons";
import Pagination from "../../Components/Pagination";
import ReactPaginate from "react-paginate";
import Progress from "react-progress-2";
import "react-progress-2/main.css";
import Button from "../../Components/Button";

export default function index({ items, auth, errors }) {
    console.log(items);

    return (
        <Authenticated auth={auth} errors={errors}>
            <Head>
                <title>السلع</title>
            </Head>
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-6xl">
                    <div className="flex justify-between items-end h-20 ">
                        <TableButtons text="إضافة سلعة" url="/items/create" />
                        <Button
                            className="bg-orange-400 hover:bg-orange-500"
                            children="ترتيب"
                        />
                    </div>
                    <Table
                        data={items.data}
                        url="items"
                        auth={auth}
                        tableHeaders={[
                            "رقم الماده",
                            "اسم الماده",
                            "الكمية",
                            "الصنف",
                            "الحالة",
                            "تاريخ الاضافة",
                            "العمليات",
                        ]}
                    />

                    <ReactPaginate
                        pageCount={items.total}
                        initialPage={0}
                        // forcePage={this.state.currentPage - 1}
                        pageRangeDisplayed={items.per_page}
                        previousLabel="&#x276E;"
                        nextLabel="&#x276F;"
                        containerClassName="flex justify-end gap-8 max-w-5xl pt-10 text-2xl"
                        activeClassName="uk-active"
                        disabledClassName="uk-disabled"
                        // onPageChange={handlePageClick}
                        disableInitialCallback={true}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
