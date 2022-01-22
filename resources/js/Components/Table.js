import React, { useEffect } from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Input from "./Input";
import moment from "moment";
import "moment/locale/ar-ly";
import Pagination from "./Pagination";

export default function Table({
    data,
    url,
    paginate,
    auth,
    tableHeaders,
    takeout = false,
    logs = false,
    total,
    editUrl,
}) {
    const [checked, setChecked] = React.useState([]);

    // const [value, setValue] = React.useState(1);

    console.log(data);
    useEffect(() => {
        localStorage.getItem("checked") &&
            setChecked(JSON.parse(localStorage.getItem("checked")));
    }, []);

    const removeItem = (id) => {
        let items = JSON.parse(localStorage.getItem("checked"));
        items = items.filter((item) => item !== id);
        console.log(items);
        localStorage.setItem("checked", JSON.stringify(items));
        Inertia.post(`/checkout`, { data: items }, { replaces: true });
    };

    const handleStore = (id, outID) => {
        // e.preventDefault();
        console.log(id);
        Inertia.put(
            `logs/${id}`,
            { id: id, outID: outID },
            {
                onSuccess: () => {
                    Inertia.visit("/print?p=inpdf&id=" + id);
                },
            }
        );
    };

    // const onHandleChange = (e) => {
    //     console.log(e.target);
    //     // setValue(e.target.value);
    // };

    const handleToggle = (data) => {
        const currentIndex = checked.indexOf(data);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(data);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        localStorage.setItem("checked", JSON.stringify(newChecked));
    };

    const handleClick = (id) => {
        Swal.fire({
            title: "هل انت متأكد من الحذف؟",
            icon: "warning",
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
        <>
            {total > 0 && (
                <div className=" flex text-gray-600  justify-end gap-x-4   items-center">
                    <p> عدد المواد : </p>
                    <p> {total} </p>
                </div>
            )}
            <div className="flex flex-col pt-4 print:pr-0 pr-32">
                <table className="max-w-5xl  divide-y text-center print:text-base divide-gray-200">
                    <thead className="bg-gray-50 text-right ">
                        <tr>
                            {takeout ? (
                                <th
                                    scope="col"
                                    className=" py-3 text-center print:text-xs text-base font-medium  text-gray-500 uppercase tracking-wider"
                                >
                                    <Checkbox
                                        name="disabledCheck"
                                        checked={true}
                                        disabled
                                    />
                                </th>
                            ) : null}
                            {tableHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className=" py-3 last:print:hidden print:text-xs print:font-thin text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, key) => (
                            <tr key={key}>
                                {takeout ? (
                                    <th
                                        scope="col"
                                        className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <Checkbox
                                            name="checkeditem"
                                            handleChange={() =>
                                                handleToggle(item.id)
                                            }
                                            checked={checked.includes(item.id)}
                                            takeoutCheck={true}
                                        />
                                    </th>
                                ) : null}
                                {(item.qty || logs) && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.id}
                                    </td>
                                )}
                                {item.email && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {key + 1}
                                    </td>
                                )}
                                {logs && (
                                    <td className="py-4 print:p-1 print:text-xs print:font-thin">
                                        {item.authname}
                                    </td>
                                )}
                                {!logs && url === "user" && (
                                    <td className="py-4">
                                        {auth.user.isAdmin === 1 ? (
                                            <Link
                                                className="hover:text-red-500  transition duration-500 ease-in-out"
                                                href={`/${url}/${item.id}/edit`}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                )}
                                {item.email && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.email}
                                    </td>
                                )}
                                {(takeout ||
                                    url === "inventory" ||
                                    url === "items") && (
                                    <td className="py-4 p-1 print:text-xs print:font-thin">
                                        {item.name}
                                    </td>
                                )}
                                {logs && (
                                    <td className="py-4 p-1 print:text-xs print:font-thin">
                                        {item.items.name}
                                    </td>
                                )}

                                {logs && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.name}
                                    </td>
                                )}
                                {/* {logs && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.categories.name}
                                        lll
                                    </td>
                                )} */}

                                {/* {logs && item.items.no && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.items.no}
                                    </td>
                                )} */}

                                {item.categories && (
                                    <td className="py-4 print:p-1 print:text-xs print:font-thin">
                                        {item.categories.name}
                                    </td>
                                )}

                                {(item.qty >= 0 || logs) && (
                                    <td className="py-4 print:p-1 print:text-xs print:font-thin">
                                        {item.qty}
                                    </td>
                                )}
                                {!logs &&
                                    url !== "user" &&
                                    url !== "items" &&
                                    takeout === false && (
                                        <td className="py-4 text-lg print:text-xs print:font-thin">
                                            {moment(item.created_at).format(
                                                "L"
                                            )}
                                        </td>
                                    )}
                                {(takeout || url === "items" || logs) && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.constate === 1 ? (
                                            <span className="text-green-500 font-tajawal-Black">
                                                قابل للاستهلاك
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                غير قابل للاستهلاك
                                            </span>
                                        )}
                                    </td>
                                )}
                                {(url === "items" ||
                                    takeout ||
                                    logs ||
                                    url === "inventory") && (
                                    <td className="py-4 print:text-xs print:font-thin">
                                        {item.state == 1 && (
                                            <span className="text-green-500 font-tajawal-Black">
                                                جيده
                                            </span>
                                        )}
                                        {item.state == 2 && (
                                            <span className="text-orange-500 font-tajawal-Black">
                                                متوسطه
                                            </span>
                                        )}
                                        {item.state == 3 && (
                                            <span className="text-yellow-500 font-tajawal-Black">
                                                رديئة
                                            </span>
                                        )}
                                        {item.state == 4 && (
                                            <span className="text-green-500 font-tajawal-Black">
                                                يعمل
                                            </span>
                                        )}
                                        {item.state == 5 && (
                                            <span className="text-red-500 font-tajawal-Black">
                                                لايعمل
                                            </span>
                                        )}
                                    </td>
                                )}
                                {(takeout && item.category) ||
                                    (url === "items" && (
                                        <td className="py-4 print:p-1 print:text-xs print:font-thin text-lg">
                                            {moment(item.created_at).format(
                                                "L"
                                            )}
                                        </td>
                                    ))}
                                {logs && (
                                    <td className="py-4 print:p-1 print:text-xs print:font-thin text-lg">
                                        {moment(item.outDate).format(
                                            "HH:mm - YYYY/MM/DD"
                                        )}
                                    </td>
                                )}
                                {item.email &&
                                    (item.isAdmin ? (
                                        <td className="py-4 print:p-1 print:text-xs print:font-thin text-green-600 px-5">
                                            مدير
                                        </td>
                                    ) : (
                                        <td className="py-4 text-red-600 px-5">
                                            موظف
                                        </td>
                                    ))}
                                {((!takeout && !logs && url === "items") ||
                                    url === "inventory" ||
                                    url === "user") && (
                                    <td className="py-4 flex items-center justify-center">
                                        <Link
                                            href={`/${editUrl}/${item.id}/edit`}
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
                                            className={` px-2 py-2 transition duration-500 ease-in-out bg-red-500 hover:bg-red-600
                                             text-white p-2 rounded-lg mx-2 
                                               `}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="red"
                                                viewBox="0 0 24 24"
                                                stroke="#fff"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                )}

                                {logs && (
                                    <td className="py-2 print:hidden">
                                        {item.constate === 1 ? (
                                            <span className="text-red-500 font-tajawal-Black">
                                                مستهلك
                                            </span>
                                        ) : item.inDate === null ? (
                                            <button
                                                type="submit"
                                                onClick={() => {
                                                    handleStore(
                                                        item.id,
                                                        item.outID
                                                    );
                                                }}
                                                className={` px-2 py-2 transition duration-500 ease-in-out 
                                               bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg mx-2 
                                               `}
                                            >
                                                <span className="flex gap-x-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span>ادخال</span>
                                                </span>
                                            </button>
                                        ) : (
                                            moment(item.inDate).format(
                                                "HH:mm - YYYY/MM/DD"
                                            )
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="">
                    {paginate && (
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
                    )}
                </div>
            </div>
        </>
    );
}
