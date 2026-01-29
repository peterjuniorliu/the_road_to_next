"use client";
import {useDebouncedCallback} from "use-debounce";
import {Input} from "./ui/input";
import {useEffect, useState} from "react";

type SearchInputProps = {
    placeholder: string,
    value?: string | null,
    onChange?: (value: string) => void | Promise<unknown>
};

const SearchInput = ({placeholder, value, onChange}: SearchInputProps) =>
{
    const [localValue, setLocalValue] = useState(value ?? "");

    useEffect(() => {
        setLocalValue(value ?? "");
    }, [value]);

    const handleSearch = useDebouncedCallback((nextValue: string) => {
        if (onChange) {
            onChange(nextValue);
        }
    }, 250);

    return (
        <Input
            value={localValue}
            placeholder={placeholder}
            onChange={(event) => {
                const nextValue = event.target.value;
                setLocalValue(nextValue);
                handleSearch(nextValue);
            }}
        />
    );
};

export {SearchInput};
