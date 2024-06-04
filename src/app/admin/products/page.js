"use client";
import DataTable from "@/components/adminComponents/products/ProductDataTable";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import GlobalError from "next/dist/client/components/error-boundary";

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

import DeleteProductDialog from "@/components/adminComponents/products/DeleteProductDialog";
import UpdateProductModal from "@/components/adminComponents/products/UpdateProductModal";

const AdminProductsPage = () => {
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteRowClick = (product) => {
    setSelectedRow(product);
    setDeleteModalOpen(true);
  };
  const handleEditRowClick = (product) => {
    setSelectedRow(product);
    setEditModalOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const title = getValue();
        return <span className="font-medium text-blue-400">{title}</span>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row, getValue }) => {
        const description = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {description.substring(0, 10)}...
                </TooltipTrigger>
                <TooltipContent className="w-48 bg-white rounded">
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
      enableResizing: false,
      size: 800,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return (
          <>
            <span className="font-medium">NPR</span> {price.toFixed(2)}
          </>
        );
      },
    },
    {
      accessorKey: "oldPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Old Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return (
          <>
            <span className="font-medium">NPR</span> {price.toFixed(2)}
          </>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const category = getValue();
        return (
          <>
            {category === "women" ? (
              <span className="text-pink-400">Women</span>
            ) : category === "men" ? (
              <span className="text-blue-400">Men</span>
            ) : (
              <span className="text-orange-400">{category}</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
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
              <span className="text-green-600">{inStock}</span>
            ) : (
              <span className="text-red-600">N/A</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Added at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const date = getValue();
        return (
          <>
            {date ? date.substring(0,10) : <span className="text-red-800">N/A</span>}
          </>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const date = getValue();
        return (
          <>
            {date ? date.substring(0,10) : <span className="text-red-800">N/A</span>}
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
              <DropdownMenuItem 
              className="text-green-600"
              onClick={() => handleEditRowClick(singleRowData)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDeleteRowClick(singleRowData)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <GlobalError />;
  }
  return (
    <main className="">
      <UpdateProductModal
        isOpen={isEditModalOpen}
        selectedRow={selectedRow}
        closeEditModal={() => setEditModalOpen(false)}
        refetch={refetch}
      />
        <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        selectedRow={selectedRow}
        closeDeleteModal={() => setDeleteModalOpen(false)}
        refetch={refetch}
        />
      <p className="text-2xl font-semibold py-4 mx-4 text-orange-600">
        Products
      </p>
      <div className="xl:w-5/6 mx-auto my-6">
        <DataTable data={products?.data} columns={columns} refetch={refetch} />
      </div>
    </main>
  );
};

export default AdminProductsPage;
