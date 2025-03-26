import { Header } from "@/components/header";
import React from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z
        .number()
        .min(1, "Price must be at least 1")
        .max(100000, "Price cannot exceed 100000"),
    stockQuantity: z
        .number()
        .min(0, "Stock must be at least 0")
        .max(10000, "Stock cannot exceed 10000"),
    rating: z
        .number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating cannot exceed 5"),
});

type ProductFormData = z.infer<typeof productSchema>;

type CreateProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            stockQuantity: 0,
            rating: 0,
        },
    });

    // ✅ Handle form submission
    const onSubmit = (data: ProductFormData) => {
        const product = { ...data, productId: v4() };
        onCreate(product);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <Header name="Create New Product" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Product Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter price"
                                            {...field}
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} // ✅ Ensures number type
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Stock Quantity */}
                        <FormField
                            control={form.control}
                            name="stockQuantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter stock quantity"
                                            {...field}
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating (0-5)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter rating"
                                            {...field}
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                            min={0}
                                            max={5}
                                            step="0.1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit & Cancel Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                type="submit" disabled={form.formState.isSubmitting}>
                                create
                            </button>
                            <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateProductModal;
