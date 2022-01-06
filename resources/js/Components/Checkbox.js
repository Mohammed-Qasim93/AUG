import React from "react";

export default function Checkbox({
    checked,
    disabled = false,
    name,
    value,
    handleChange,
    defaultChecked,
    takeoutCheck,
}) {
    return (
        <>
            {takeoutCheck ? (
                <input
                    type="checkbox"
                    name={name}
                    disabled={disabled}
                    value={value}
                    checked={checked}
                    // defaultChecked={checked}
                    className="
            rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={(e) => handleChange(e)}
                />
            ) : (
                <input
                    type="checkbox"
                    name={name}
                    disabled={disabled}
                    value={value}
                    // checked={checked}
                    defaultChecked={checked}
                    className="
            rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={(e) => handleChange(e)}
                />
            )}
        </>
    );
}
