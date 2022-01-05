import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Pagination = ({
    nextPage,
    prevPage,
    firstPage,
    firstPageUrl,
    lastPage,
    lastPageUrl,
    perPage,
    path,
    to,
    currentPage,
    total,
}) => {
    return (
        <div className="flex max-w-6xl justify-center pt-4 gap-8">
            {currentPage > 1 && (
                <Link
                    className="py-2 px-3 bg-white text-background rounded-md"
                    href={firstPageUrl}
                >
                    الاول
                </Link>
            )}

            {currentPage + 2 < lastPage && (
                <Link
                    className="py-2 px-3 bg-white text-background rounded-md"
                    href={`${path}?page=${currentPage + 3}`}
                >
                    {currentPage}
                </Link>
            )}
            {currentPage && (
                <Link
                    className="py-2 px-3 bg-slate-300 text-background rounded-md"
                    href={`${path}?page=${currentPage}`}
                >
                    {currentPage}
                </Link>
            )}
            {currentPage !== null && nextPage !== null && (
                <Link
                    className="py-2 px-3 bg-white text-background rounded-md"
                    href={nextPage}
                >
                    {currentPage !== null ? currentPage + 1 : ""}
                </Link>
            )}
            {to + 5 < total && (
                <Link
                    className="py-2 px-3 bg-white text-background rounded-md"
                    href={`${path}?page=${currentPage + 2}`}
                >
                    {currentPage !== null ? currentPage + 2 : ""}
                </Link>
            )}

            {currentPage < lastPage && (
                <Link
                    className="py-2 px-3 bg-white text-background rounded-md"
                    href={lastPageUrl}
                >
                    الاخير
                </Link>
            )}
        </div>
    );
};

export default Pagination;
