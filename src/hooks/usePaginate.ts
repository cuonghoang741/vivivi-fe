"use client"

// usePaginatedData.ts

import {useState, useCallback, useEffect} from 'react';
import {makeRequest} from "@/utils/apiClient";
import useQueryString from "@/hooks/useQueryString";
import {toast} from "react-toastify";

const usePaginate = (
    {
        initialData = [],
        meta = {
            page: 1,
            per_page: 10,
            current_page: 1,
            total_pages: 2
        },
        endpoint_api = "",
        field = 'products',
        itemField = 'items',
        default_query = {}
    }
) => {
    const [data, setData] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(meta?.page ? meta?.page + 1 : 2);
    const {queryString, setQueryString} = useQueryString();

    const fetchMoreData = async () => {
        if (!hasMore){
            toast.error("Không còn nội dung để hiển thị")
        }
        setIsFetching(true)
        const nextPage = page + 1;
        setPage(nextPage)
        const res = await makeRequest({
            path: endpoint_api,
            method: "get",
            params: {
                ...default_query,
                ...queryString,
                page,
                limit: meta.per_page
            }
        })
        const newData:any = res[field][itemField];
        if (newData?.length) {
            setData([...data,...newData])
        } else {
            toast.error("Không còn nội dung để hiển thị")
            setHasMore(false)
        }
        setIsFetching(false)
    }


    return {
        hasMore,
        data,
        page,
        isFetching,
        fetchMoreData
    }
}


export default usePaginate