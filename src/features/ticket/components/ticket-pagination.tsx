"use client";
import {useQueryStates, useQueryState} from "nuqs";
import {useEffect, useRef} from "react";
import {Pagination} from "../../../components/pagination";
import {searchParser, paginationOptions, paginationParser} from "../search-params";

type TicketPaginationProps = {
    paginatedTicketMetadata: {
        count: number,
        hasNextPage: boolean 
    };
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
        <Pagination pagination={pagination} onPagination={setPagination} paginationMetadata={paginatedTicketMetadata} />
    );
};

export {TicketPagination};