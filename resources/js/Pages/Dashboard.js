import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import DashboardBar from "@/Components/DashboardBar";
import Table from "../Components/Table";

export default function Dashboard({ auth, errors }) {
    return (
        <Authenticated auth={auth} errors={errors}>
            <Head title="الرئيسية" />
            <div className="flex">
                <DashboardBar auth={auth} />
                <div className="flex-1 flex flex-col max-w-7xl">
                    <div className="flex flex-col justify-center items-center gap-4 pt-20">
                        <h2 className="text-5xl mb-3 text-right">
                            مخازن شركة الدير المتحدة
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mx-20 pt-10">

                        {/* المواد */}
                        <div className="bg-green-600 bg-opacity-50 rounded-lg border border-2 shadow-lg p-3">
                            <h4 className="bg-green-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">المواد</h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4">
                                    <div className="flex">
                                        <p>عدد المواد الكلي</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">2</span>
                                    </div>
                                    <div className="flex">
                                        <p>عدد المواد في المخزن</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">10</span>
                                    </div>
                                    <div className="flex">
                                        <p>عدد مواد الجرد</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">22</span>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-box-seam mt-4 ml-5 opacity-50" viewBox="0 0 16 16">
                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* الاصناف */}
                        <div className="bg-blue-600 bg-opacity-50 rounded-lg border border-2 shadow-lg p-3">
                            <h4 className="bg-blue-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">الاصناف</h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>عدد الاصناف الكلي</p>
                                        <span className="bg-blue-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">2</span>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-tags mt-4 ml-5 opacity-50" viewBox="0 0 16 16">
                                        <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* المواد داخلة الشركة */}
                        <div className="bg-yellow-600 bg-opacity-50 rounded-lg border border-2 shadow-lg p-3">
                            <h4 className="bg-yellow-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">المواد الداخلة</h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>المواد التي استرجعت</p>
                                        <span className="bg-yellow-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">2</span>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-box-arrow-right mt-4 ml-5 opacity-50" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* المواد خارج الشركة */}
                        <div className="bg-red-600 bg-opacity-50 rounded-lg border border-2 shadow-lg p-3">
                            <h4 className="bg-red-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">المواد الخارجة</h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>خارج الشركة</p>
                                        <span className="bg-red-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">2</span>
                                    </div>
                                    <div className="flex">
                                        <p>خارج المخزن</p>
                                        <span className="bg-red-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">2</span>
                                    </div>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-box-arrow-left mt-4 ml-5 opacity-50" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mx-auto mt-10 text-center">
                        {/* ويب سايت */}
                        <a className="flex justify-center space-x-3" dir="ltr" href="https://horizondev-7ul7z3h2p-mohammed-qasim93.vercel.app/">
                            <span>0770 669 4397</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left opacity-50" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                        </a>

                        {/* موبايل */}
                        <p>فريق الدعم والتطوير لشركة &copy; HorizonDev IQ</p>
                        <a className="flex justify-center space-x-3" dir="ltr" href="tel:+9647706693497">
                            <span>0770 669 4397</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left opacity-50" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                        </a>

                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
