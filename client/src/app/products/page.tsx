"use client";

import { useState } from "react";
import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import { PlusCircle, SearchIcon } from "lucide-react";
import { Header } from "@/components/header";
import Rating from "@/components/Rating";
import CreateProductModal from "./createProductModel";
import Image from "next/image";

type ProductDataProps = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};


const ProductPage = () => {
    const [searchTrem, setSearchTrem] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: products, isLoading, isError } = useGetProductsQuery(searchTrem);
    const [createProduct] = useCreateProductMutation();
    const handleCreateProduct = async (productData: ProductDataProps) => {
        await createProduct(productData)
    }

    if (isLoading) {
        return <div className="py-4"> Loading...</div>
    }

    if (isError || !products) {
        <div className="text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    }

    return (
        <div className="mx-auto pb-5 w-full">
            {/* search bar */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <SearchIcon className="size-5 text-gray-500 m-2" />
                    <input
                        className="w-full py-2 px-4 rounded "
                        placeholder="Search products..."
                        value={searchTrem}
                        onChange={(e) => setSearchTrem(e.target.value)}
                    />
                </div>
            </div>
            {/* header bar */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products" />
                <button className="flex items-center bg-blue-500 text-gray-200 font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}>
                    <PlusCircle className="size-5 mr-2 text-gray-200" /> Create Product
                </button>
            </div>

            {/* body Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between ">
                {isLoading ? (<div>Loading...</div>) : (
                    products?.map((product) => (
                        <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                            <div className="flex flex-col items-center">
                                 <Image
                                                    src={`https://s3-inventoryy-management.s3.us-east-1.amazonaws.com/product${Math.floor(Math.random() * 3) + 1}.png`}
                                                    alt={product.name}
                                                    width={150}
                                                    height={150}
                                                    className="mb-3 rounded-2xl size-36"
                                                  />
                                <h3 className="text-lg text-gray-900 font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-gray-800">{product.price.toFixed(2)}</p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* modalProductModal */}
            <CreateProductModal isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateProduct}
            />
        </div>
    );
}

export default ProductPage;