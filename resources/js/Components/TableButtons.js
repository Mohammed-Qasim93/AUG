import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function TableButtons({ text, url }) {
    return (
        <div className="flex justify-between item-center">
            <Link
                className="rounded-md text-base bg-green-500 py-1 px-3 text-gray-100 hover:bg-green-600   transition duration-500 ease-in-out"
                href={url}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-plus inline h-6 w-6"
                    viewBox="0 0 15 15"
                >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span>{text}</span>
            </Link>
        </div>
    );
}
