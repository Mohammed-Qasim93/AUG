import React, { useEffect, useRef } from "react";

export default function Input({
    type = "text",
    name,
    value,
    max,
    min,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    area = false,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            {area ? (
                <textarea
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={
                        `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                        className
                    }
                    ref={input}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={(e) => handleChange(e)}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value > max ? max : value}
                    max={max}
                    min={min}
                    placeholder={placeholder}
                    className={
                        `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                        className
                    }
                    ref={input}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={(e) => handleChange(e)}
                />
            )}
        </div>
    );
}
