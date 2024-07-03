"use client";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import Loading from "@/app/loading";
import GlobalError from "@/app/global-error";
import { ImFilesEmpty } from "react-icons/im";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { useUpdateProductMutation } from "@/features/productSlice/product.slice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import DataTable from "@/components/adminComponents/settings/ProductsDataTable";

const AdminSettingsPage = () => {
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  const [updateProduct, { isLoading: isUpdating, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    refetch();
  },[refetch])

  const handleUpdateFeature = async (product) => {
    try {
      const updatedProduct = {...product, featured: !product.featured};
      const res = await updateProduct(updatedProduct);
      if(res.data.success) {
        toast.success(`${updatedProduct.title} is now ${updatedProduct.featured? "featured" : "unfeatured"}`)
      } else {
        throw new Error("Put method failed")
      }
    } catch (error) {
      console.error("Failed to update the feature status of product: ", error.message);
    } finally {
      refetch();
    }
  }

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoKeyOutline />
            Product ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const productId = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="adminTable">
                    <ImFilesEmpty className="mr-2" />
                    {productId.substring(0, 5)}...
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">{productId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineSubtitles className="text-lg" />
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const title = getValue();
        return <span className=""> {title}</span>;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoPricetagOutline />
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return <Badge variant="adminTable">NPR {price.toFixed(2)}</Badge>;
      },
    },
    {
      accessorKey: "oldPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoPricetagOutline />
            Old Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return <Badge variant="adminTable">NPR {price.toFixed(2)}</Badge>;
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoStorefrontOutline />
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const inStock = getValue();
        return (
          <>
            {inStock > 0 ? (
              <span className="text-green-700 font-medium">{inStock}</span>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "featured",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <TbCategory />
            Featured
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const featured = getValue();
        return (
          <>
            <Badge variant="adminTable">
              {featured === true ? (
                <span className="text-green-600">Featured</span>
              ) : featured === false? (
                <span className="text-red-600">Not Featured</span>
              ) : (
                <span className="text-blue-600">{featured || "N/A"}</span>
              )}
            </Badge>
          </>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const singleRowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white rounded">
              <DropdownMenuItem onClick={() => handleUpdateFeature(singleRowData)} className={singleRowData.featured ? "text-red-600" : "text-green-600"}>{singleRowData.featured ? "UnFeature": "Feature"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="py-4">
        <DataTable data={products?.data || []} columns={columns} refetch={refetch} />
    </div>
  );
};

export default AdminSettingsPage;
