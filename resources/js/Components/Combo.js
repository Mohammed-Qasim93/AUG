import React from "react";

export default function Button({
    name,
    options,
    handleChange,
    className,
    defaultValue,
}) {
    return (
        <select
            className={className}
            name={name}
            id="cars"
            onChange={handleChange}
            defaultValue="0"
        >
            <option value="0"> {defaultValue}</option>
            {options.map((option, index) => (
                <option key={index} value={index + 1}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
