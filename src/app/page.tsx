import React from "react";
import Layout from "@/components/layout/layout";
import HomePage from "@/template/HomePage";
import {makeSrsRequest} from "@/app/makeSrsRequest";
import {API_PATHS} from "@/constants/apis";

const buildSearchParams = (srsParams:any)=>{
    return {
        ...srsParams
    }
}

export default async function Home({
                                       params,
                                       searchParams,
                                   }: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    try {
        const srsParams = buildSearchParams(searchParams);
        const girls:any = await makeSrsRequest({
            path: API_PATHS.GET_GIRLS,
            method: 'GET',
            params: srsParams,
        });
        return (
            <Layout girls={girls?.girls || []}>
                <HomePage girls={girls?.girls || []} />
            </Layout>
        );
    } catch (error) {
        return (
            <Layout>
                <HomePage girls={[]} searchParams={searchParams}/>
            </Layout>
        );
    }
}
