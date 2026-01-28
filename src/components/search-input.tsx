"use client";
import {useQueryState} from "nuqs";
import {searchParser} from "../features/ticket/search-params";
import {useDebouncedCallback} from "use-debounce";
import {Input} from "./ui/input";

type SearchInputProps = {
    placeholder: string,
    value?: string | null,
    onChange?: (value: string) => void | Promise<unknown>
};

const SearchInput = ({placeholder, value, onChange}: SearchInputProps) =>
{
    const [search, setSearch] = useQueryState("search", searchParser);

    const handleSearch = useDebouncedCallback((event: 
        React.ChangeEvent<HTMLInputElement>
    ) => {
        const nextValue = event.target.value;

        if (onChange) {
            onChange(nextValue);
            return;
        }

        setSearch(nextValue);
    }, 250);

    return (
        <Input
            value={value ?? search ?? ""}
            placeholder={placeholder}
            onChange={handleSearch}
        />
    );
};

export {SearchInput};
