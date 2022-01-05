import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Button from "./Button";

export default function Filters({ text, url }) {
    return (
        <div className="gap-16 justify-start flex max-w-6xl py-2">
            <p className="w-20"> {text} </p>
            <div className="flex gap-8">
                <Button children="pdf" />
                <Button children="excel" />
                <Button children="print" />
            </div>
        </div>
    );
}
