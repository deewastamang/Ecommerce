"use client";
import DataTable from "@/components/adminComponents/products/ProductDataTable";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const page = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [expandedRows, setExpandedRows] = useState({});
  console.log("products in table ", products);
  const toggleExpand = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
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
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price(in NPR)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
            Old Price(in NPR)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "new",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            New
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const isNew = getValue();
        return <>{isNew ? "New" : "Old"}</>;
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
        return <>{inStock > 0 ? inStock : "N/A"}</>;
      },
    },

    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row, getValue }) => {
        const description = getValue();
        const isExpanded = expandedRows[row.id];
        const shouldTruncate = description.length > 100 && !isExpanded;

        return (
          <>
            <span>
              {shouldTruncate
                ? `${description.substring(0, 34)}...`
                : description}
            </span>
            {description.length > 100 && (
              <button
                className="text-slate-500 ml-2"
                onClick={() => toggleExpand(row.id)}
              >
                {isExpanded ? "See less" : "See more"}
              </button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <p className="text-2xl font-semibold py-4 mx-4 text-orange-600">
        Products
      </p>
      <div className="w-5/6 mx-auto">
        <DataTable data={products?.data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
