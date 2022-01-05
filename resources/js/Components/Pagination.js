import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Pagination = ({ nextPage, prevPage, prePage, to, currentPage }) => {
    return (
        <div dir="ltr" className="flex  max-w-lg justify-center space-x-3">
            {nextPage && (
                <Link
                    className="py-2 px-3 bg-green-500 text-background rounded-md"
                    // href={nextPage}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam quas rerum, eos quisquam doloribus exercitationem hic
                    incidunt quos modi ex voluptatum voluptate quia rem ratione
                    nihil doloremque reprehenderit veniam necessitatibus!
                </Link>
            )}

            {prevPage && (
                <Link
                    className="py-2 px-3 bg-green-500 text-background rounded-md"
                    // href={prevPage}
                >
                    السابق
                </Link>
            )}
        </div>
    );
};

export default Pagination;
