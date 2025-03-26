"use client";

import { Header } from "@/components/header";
import { useGetProductsQuery } from "../state/api";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const InventoryPage = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();

    if (isLoading) {
        return <div className="py-4"> Loading...</div>
    }

    if (isError || !products) {
        <div className="text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    }
    return (
        <div className="flex flex-col ">
            <Header name="Inventory" />
            <DataTable columns={columns} data={products ?? []} searchKey="name" />
        </div>
    );
}

export default InventoryPage;