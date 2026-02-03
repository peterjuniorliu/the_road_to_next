"use client";
import {useQueryStates, useQueryState} from "nuqs";
import {useEffect, useRef} from "react";
import {Pagination} from "../../../components/pagination";
import {PaginatedData} from "../../../types/pagination";
import {TicketWithMetadata} from "../types";
import {searchParser, paginationOptions, paginationParser} from "../search-params";

type TicketPaginationProps = {
    paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"]
};

const TicketPagination = ({
    paginatedTicketMetadata
}: TicketPaginationProps) => 
{
    const [pagination, setPagination] = useQueryStates(
        paginationParser,
        paginationOptions 
    );

    const [search] = useQueryState("search", searchParser);

    const previousSearch = useRef(search);

    useEffect(() => {
        if (search === previousSearch.current)

        return;

        previousSearch.current = search;

        setPagination({...pagination, page: 0});
    }, [search, pagination, setPagination]);

    return (
        <Pagination pagination={pagination} onPagination={setPagination} paginatedMetadata={paginatedTicketMetadata} />
    );
};

export {TicketPagination};