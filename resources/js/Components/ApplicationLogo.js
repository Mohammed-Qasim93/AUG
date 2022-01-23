import React from "react";

export default function ApplicationLogo({ className }) {
    return (
        <img
            src="/logo.png"
            alt="AUG"
            className={className ? className : "w-52 h-16 "}
        />
    );
}
