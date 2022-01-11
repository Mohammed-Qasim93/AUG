import React from "react";

export default function Button({
    name,
    options,
    handleChange,
    className,
    defaultValue,
    add,
}) {
    return (
        <select
            className={className}
            name={name}
            id="cars"
            onChange={handleChange}
            defaultValue={defaultValue}
        >
            {add && <option value="0"> {defaultValue}</option>}
            {options.map((option, index) => (
                <option key={index} value={index + 1}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
