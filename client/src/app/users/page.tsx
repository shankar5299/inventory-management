"use client";

import { Header } from "@/components/header";
import {  useGetUsersQuery } from "../state/api";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const Page = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();

    if (isLoading) {
        return <div className="py-4"> Loading...</div>
    }

    if (isError || !users) {
        <div className="text-center text-red-500 py-4">
            Failed to fetch users
        </div>
    }
    return (
        <div className="flex flex-col ">
            <Header name="Users" />
            <DataTable columns={columns} data={users ?? []} searchKey="name" />
        </div>
    );
}

export default Page;