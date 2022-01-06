import React, { useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
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
    checkout = false,
    value,
}) {
    const [checked, setChecked] = React.useState([]);
    // const [value, setValue] = React.useState(1);

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
        <div className="flex flex-col pt-8 pr-32">
            <table className="max-w-5xl divide-y text-center divide-gray-200">
                <thead className="bg-gray-50 text-right">
                    <tr>
                        {takeout ? (
                            <th
                                scope="col"
                                className=" py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider"
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
                            {checkout && (
                                <th
                                    scope="col"
                                    className=" py-3 cursor-pointer "
                                    onClick={() => removeItem(item.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mx-auto"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                        stroke="red"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </th>
                            )}
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
                            {item.no && <td className="pb-4">{item.no}</td>}
                            {item.email && <td className="pb-4">{key + 1}</td>}
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
                            {item.category && (
                                <td className="py-4 ">{item.category}</td>
                            )}
                            {!checkout && item.qty >= 0 && (
                                <td className="py-4 ">{item.qty}</td>
                            )}
                            {takeout && item.category && (
                                <td className="py-4 ">{item.state}</td>
                            )}

                            {checkout && (
                                <td className="flex items-center justify-center py-4 text-lg">
                                    <Input
                                        type="number"
                                        name="qty"
                                        defaultValue={1}
                                        max={item.qty}
                                        min={1}
                                    />
                                </td>
                            )}
                            {!takeout && !checkout && item.category && (
                                <td className="py-4 text-lg">
                                    {moment(item.created_at).format("L")}
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
                            {!takeout && !checkout && (
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
                                        className="px-2 py-2 bg-red-500 rounded-lg mx-2 hover:bg-red-600 transition duration-500 ease-in-out"
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
    );
}
