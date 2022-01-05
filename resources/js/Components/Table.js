import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import Button from "./Button";
import moment from "moment";
import "moment/locale/ar";
import Pagination from "./Pagination";
import Filters from "./Filters";

export default function Table({ data, url, paginate, auth, tableHeaders }) {
    console.log(data);
    const handleClick = (id) => {
        Swal.fire({
            title: "هل انت متأكد من الحذف؟",
            showDenyButton: true,
            confirmButtonText: "نعم",
            denyButtonText: `كلا`,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`${url}/${id}`);
            }
        });
    };

    return (
        <div className="flex flex-col pt-8 pr-32">
            <table className="max-w-5xl divide-y text-center divide-gray-200">
                <thead className="bg-gray-50 text-right">
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, key) => (
                        <tr key={key}>
                            {item.no && <td className="pb-4">{item.no}</td>}
                            {item.email && <td className="pb-4">{item.id}</td>}
                            <td className="pb-4">
                                {auth.user.isAdmin === 1 ? (
                                    <Link
                                        className="hover:text-red-500 transition duration-500 ease-in-out"
                                        href={`/${url}/${item.id}/edit`}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    item.name
                                )}
                            </td>
                            {item.email && (
                                <td className="py-4 ">{item.email}</td>
                            )}
                            {item.qty >= 0 && (
                                <td className="py-4 ">{item.qty}</td>
                            )}
                            {item.category && (
                                <td className="py-4 ">{item.category}</td>
                            )}
                            {item.state && (
                                <td className="py-4 ">{item.state}</td>
                            )}
                            {item.category && (
                                <td className="py-4 ">
                                    {moment(item.created_at).fromNow()}
                                </td>
                            )}
                            {item.email &&
                                (item.isAdmin ? (
                                    <td className="py-4 text-green-600 px-5">
                                        مدير
                                    </td>
                                ) : (
                                    <td className="py-4 text-red-600 px-5">
                                        موظف
                                    </td>
                                ))}
                            <td className="py-4 flex items-center justify-center">
                                <Link
                                    href={`/${url}/${item.id}/edit`}
                                    className="bg-green-500 text-black p-2 rounded-lg mx-2 hover:bg-green-600 transition duration-500 ease-in-out"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="#fff"
                                        className="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                    </svg>
                                </Link>
                                <button
                                    onClick={() => handleClick(item.id)}
                                    className="px-2 py-2 bg-blue-500 rounded-lg mx-2 hover:bg-blue-600 transition duration-500 ease-in-out"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="#fff"
                                        className="bi bi-journal-check"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                        />
                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="">
                <Pagination
                    firstPageUrl={paginate.first_page_url}
                    lastPageUrl={paginate.last_page_url}
                    nextPage={paginate.next_page_url}
                    prevPage={paginate.prev_page_url}
                    perPage={paginate.perPage}
                    to={paginate.to}
                    total={paginate.data.length}
                    currentPage={paginate.current_page}
                    path={paginate.path}
                    lastPage={paginate.last_page}
                />
            </div>
        </div>
    );
}
