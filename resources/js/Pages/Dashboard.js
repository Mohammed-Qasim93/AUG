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
                        <div className="bg-green-600 bg-opacity-50 rounded-lg  border-2 shadow-lg p-3">
                            <h4 className="bg-green-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">
                                المواد
                            </h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4">
                                    <div className="flex">
                                        <p>عدد المواد الكلي</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            2
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <p>عدد المواد في المخزن</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            10
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <p>عدد مواد الجرد</p>
                                        <span className="bg-green-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            22
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        fill="currentColor"
                                        className="bi bi-box-seam mt-4 ml-5 opacity-50"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* الاصناف */}
                        <div className="bg-blue-600 bg-opacity-50 rounded-lg  border-2 shadow-lg p-3">
                            <h4 className="bg-blue-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">
                                الاصناف
                            </h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>عدد الاصناف الكلي</p>
                                        <span className="bg-blue-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            2
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        fill="currentColor"
                                        className="bi bi-tags mt-4 ml-5 opacity-50"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* المواد داخلة الشركة */}
                        <div className="bg-yellow-600 bg-opacity-50 rounded-lg  border-2 shadow-lg p-3">
                            <h4 className="bg-yellow-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">
                                المواد الداخلة
                            </h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>المواد التي استرجعت</p>
                                        <span className="bg-yellow-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            2
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-right mt-4 ml-5 opacity-50"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fullRule="evenodd"
                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                        />
                                        <path
                                            fullRule="evenodd"
                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* المواد خارج الشركة */}
                        <div className="bg-red-600 bg-opacity-50 rounded-lg  border-2 shadow-lg p-3">
                            <h4 className="bg-red-800 bg-opacity-50 text-center rounded-lg text-3xl py-2 mb-3">
                                المواد الخارجة
                            </h4>
                            <div className="flex justify-between">
                                <div className="mr-3 space-y-4 my-auto">
                                    <div className="flex">
                                        <p>خارج الشركة</p>
                                        <span className="bg-red-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            2
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <p>خارج المخزن</p>
                                        <span className="bg-red-800 text-gray-200 bg-opacity-50 rounded-lg px-2 mx-2">
                                            2
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-left mt-4 ml-5 opacity-50"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fullRule="evenodd"
                                            d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                        />
                                        <path
                                            fullRule="evenodd"
                                            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-10 text-center flex flex-col gap-y-3 py-4">
                        {/* ويب سايت */}

                        {/* موبايل */}
                        <p>فريق الدعم والتطوير لشركة &copy; HorizonDev IQ</p>
                        <div className="flex items-center w-1/2 mx-auto justify-around">
                            <a dir="ltr" href="tel:+9647706693497">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-whatsapp"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                            </a>
                            <a
                                dir="ltr"
                                href="https://www.facebook.com/Horizon.Dev.IQ"
                                target="_blank"
                                noopener="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-facebook"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </a>
                            <a
                                dir="ltr"
                                href="https://www.facebook.com/Horizon.Dev.IQ"
                                target="_blank"
                                noopener="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-instagram"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </a>
                        </div>
                        <a
                            className="flex justify-center items-center space-x-3"
                            dir="ltr"
                            href="https://horizondev-7ul7z3h2p-mohammed-qasim93.vercel.app/"
                        >
                            <span>او زيارة موقعنا الالكتروني</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-box-arrow-left opacity-50"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fullRule="evenodd"
                                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                />
                                <path
                                    fullRule="evenodd"
                                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
