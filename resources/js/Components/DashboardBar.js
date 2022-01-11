import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function DashboardBar({ auth }) {
    const { user } = auth;

    const active = (r) => {
        if (r == window.location.pathname) {
            return "bg-gray-200 text-gray-900";
        } else {
            return " text-gray-200";
        }
    };

    return (
        <div className="print:hidden">
            <nav className="flex flex-col  w-64 h-screen px-4 tex-gray-900  bg-slate-500">
                <div className="flex flex-col text-slate-600 mt-8 justify-center items-center">
                    <h3 className="text-lg">اهلا</h3>
                    <h3 className="text-xl"> {user.name} </h3>
                </div>
                <div className="mt-10 mb-4">
                    <ul className="mr-4">
                        <li
                            className={`
                                mb-2  flex flex-row  
                        
                         border-gray-300 hover:text-slate-700 
                           hover:bg-gray-300  hover:font-bold rounded-lg
                            ${active("/categories")}
                                `}
                        >
                            <Link
                                href="/categories?page=1"
                                className="flex px-4 py-4 items-center w-full"
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
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </span>
                                <span className="mr-2">الاصناف</span>
                            </Link>
                        </li>
                        <li
                            className={`
                                mb-2  flex flex-row  
                        
                         border-gray-300 hover:text-slate-700 
                           hover:bg-gray-300  hover:font-bold rounded-lg
                            ${active("/items")}
                                `}
                        >
                            <Link
                                href="/items?page=1"
                                className="flex px-4 py-4 items-center w-full"
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
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                </span>
                                <span className="mr-2">المواد</span>
                            </Link>
                        </li>

                        <li
                            className={`
                                mb-2  flex flex-row  
                        
                         border-gray-300 hover:text-slate-700 
                           hover:bg-gray-300  hover:font-bold rounded-lg
                            ${active("/takeout")}
                                `}
                        >
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
                        <li
                            className={`
                                mb-2  flex flex-row  
                        
                         border-gray-300 hover:text-slate-700 
                           hover:bg-gray-300  hover:font-bold rounded-lg
                            ${active("/logs")}
                                `}
                        >
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
                                <span className="mr-2">السجل</span>
                            </Link>
                        </li>
                        <li
                            className={`
                                mb-2  flex flex-row  
                        
                         border-gray-300 hover:text-slate-700 
                           hover:bg-gray-300  hover:font-bold rounded-lg
                            ${active("/items/inventory")}
                                `}
                        >
                            <Link
                                href="items/inventory"
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
                                <span className="mr-2">سجل الجرد</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
