import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function DashboardBar({ auth }) {
    const { user } = auth;

    return (
        <div>
            <nav className="flex flex-col  w-64 h-screen px-4 tex-gray-900  bg-slate-500">
                <div className="flex flex-col text-slate-600 mt-8 justify-center items-center">
                    <h3 className="text-lg">اهلا</h3>
                    <h3 className="text-xl"> {user.name} </h3>
                </div>
                <div className="mt-10 mb-4">
                    <ul className="mr-4">
                        <li className="mb-2 text-gray-100 flex flex-row  border-gray-300 hover:text-slate-700   hover:bg-gray-300  hover:font-bold rounded-lg">
                            <Link
                                href="/items?page=1"
                                className="flex px-4 py-4 items-center w-full"
                            >
                                <span>
                                    <svg
                                        className="fill-current h-5 w-5 "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmrns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <span className="mr-2">المواد</span>
                            </Link>
                        </li>

                        <li className="mb-2  text-gray-100 flex flex-row  border-gray-300 hover:text-slate-700   hover:bg-gray-300  hover:font-bold rounded-lg">
                            <Link
                                className="flex px-4 py-4 items-center w-full"
                                href="/takeout"
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </span>
                                <span className="mr-2">اخراج مخزني</span>
                            </Link>
                        </li>
                        <li className="mb-2  text-gray-100 flex flex-row  border-gray-300 hover:text-slate-700   hover:bg-gray-300  hover:font-bold rounded-lg">
                            <Link
                                href="/logs?page=1"
                                className="flex  px-4 py-4 items-center w-full "
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                        />
                                    </svg>
                                </span>
                                <span className="mr-2">سجل الخروج</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
