"use client";
import {
  useGetOrdersByProductForAdminQuery,
  useGetOrdersByUserForAdminQuery,
} from "@/features/orderForAdminSlice/orderForAdmin.slice";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ImFilesEmpty } from "react-icons/im";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { dateFormatter } from "@/helper";
import { Badge } from "@/components/ui/badge";

import DataTable from "@/components/adminComponents/orders/OrdersDataTable";
import UpdateOrderModal from "@/components/adminComponents/orders/UpdateOrderModal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/app/loading";
import GlobalError from "@/app/global-error";
import DeleteOrderModal from "@/components/adminComponents/orders/DeleteOrderModal";

const AdminOrdersPage = () => {
  document.title = "Admin | Orders"
  const {
    data: ordersByProduct,
    isLoading: ordersByProductisLoading,
    error: ordersByProductError,
    refetch: ordersByProductRefetch,
  } = useGetOrdersByProductForAdminQuery();
  const {
    data: ordersByUser,
    isLoading: ordersByUserIsLoading,
    error: ordersByUserError,
    refetch: ordersByUserRefetch,
  } = useGetOrdersByUserForAdminQuery();
  const [orderMode, setOrderMode] = useState("user");
  const [selectedRow, setSelectedRow] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    ordersByProductRefetch();
    ordersByUserRefetch();
  }, [ordersByUserRefetch, ordersByProductRefetch]);

  const handleEditRowClick = (orderData) => {
    setSelectedRow(orderData);
    setEditModalOpen(true);
  };

  const handleDeleteRowClick = (orderData) => {
    setSelectedRow(orderData);
    setIsDeleteModalOpen(true);
  }

  const columnsForProductMode = [
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
        const orderId = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="adminTable">
                    <ImFilesEmpty className="mr-2" />
                    {orderId.substring(0, 5)}...
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">{orderId}</p>
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
      accessorKey: "totalQuantity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoStorefrontOutline />
            Total Orders
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const totalOrders = getValue();
        return (
          <>
            {totalOrders > 0 ? (
              <span className="text-green-700 font-medium">{totalOrders}</span>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
          </>
        );
      },
    },

    {
      accessorKey: "orderedByUsers",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoKeyOutline />
            Ordered By
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const customers = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="adminTable">
                    <ImFilesEmpty className="mr-2" />
                    {customers[0].substring(0, 5) || "N/A"}...
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">
                    <p className="text-center font-semibold text-slate-500 underline mb-2">
                      Id of users who ordered:
                    </p>
                    <ul>
                      {customers.map((customer, index) => (
                        <li key={customer}>{`${index + 1}) ${customer}`}</li>
                      ))}
                    </ul>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
    },

  ];

  const columnsForUserMode = [
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
            Order ID
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
      accessorKey: "userId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoKeyOutline />
            {'User\'s ID'} 
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
                  <p className="">
                    <p className="font-semibold text-slate-500 mb-2 underline">Order is made by user with this id:</p> {productId}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
    },
    {
      accessorKey: "userEmail",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineSubtitles className="text-lg" />
            {'User\'s Email'} 
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const userEmail = getValue();
        return <span className=""> {userEmail || "N/A"}</span>;
      },
    },

    {
      accessorKey: "orders",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineDescription />
            Orders Made
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const orders = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                    {orders[0]?.title || "N/A"}...
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">
                    <p className="text-center font-semibold text-slate-500 underline mb-2">
                      Orders Made By this user:
                    </p>
                    <ul>
                      {orders.map((order, index) => (
                        <li key={order}>{`${index + 1}) ${order.title}\n(${
                          order._id
                        })`}</li>
                      ))}
                    </ul>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <TbCategory />
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const status = getValue();
        return (
          <>
            <Badge variant="adminTable">
              {status === "pending" ? (
                <span className="text-yellow-700">Pending</span>
              ) : status === "delivered" ? (
                <span className="text-green-600">Delivered</span>
              ) : (
                <span className="text-red-600">{status}</span>
              )}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "stripeSessionId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoKeyOutline />
            Stripe ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const stripeId = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="adminTable">
                    <ImFilesEmpty className="mr-2" />
                    {stripeId.substring(0, 5)}...
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">{stripeId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            className="flex gap-x-1"
          >
            <MdOutlineDateRange />
            Added at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const dateString = getValue();
        const date = dateString
          ? dateFormatter(dateString).substring(0, 10)
          : null;
        const time = dateString
          ? dateFormatter(dateString).substring(11, 27)
          : null;
        return (
          <>
            {dateString ? (
              <div className="flex flex-col ">
                <div className="font-medium text-black">{date}</div>
                <div className="text-slate-500 font-medium text-xs">{time}</div>
              </div>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
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
            className="flex gap-x-1"
          >
            <MdOutlineDateRange />
            Updated at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const dateString = getValue();
        const date = dateString
          ? dateFormatter(dateString).substring(0, 10)
          : null;
        const time = dateString
          ? dateFormatter(dateString).substring(11, 27)
          : null;
        return (
          <>
            {dateString ? (
              <div className="flex flex-col ">
                <div className="font-medium text-black">{date}</div>
                <div className="text-slate-500 font-medium text-xs">{time}</div>
              </div>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
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

  const readyForDataTable = {
    columns:
      orderMode === "product" ? columnsForProductMode : columnsForUserMode,
    data: orderMode === "product" ? ordersByProduct?.data : ordersByUser?.data,
    refetch:
      orderMode === "product" ? ordersByProductRefetch : ordersByUserRefetch,
    orderMode: orderMode,
  };

  if (ordersByProductisLoading || ordersByUserIsLoading) {
    return <Loading />;
  }
  if (ordersByProductError || ordersByUserError) {
    return <GlobalError />;
  }
  return (
    <div>
      <UpdateOrderModal
        isOpen={editModalOpen}
        selectedRow={selectedRow}
        closeEditModal={() => setEditModalOpen(false)}
        refetch={ordersByUserRefetch}
      />

      <DeleteOrderModal 
        isOpen={isDeleteModalOpen}
        selectedRow={selectedRow}
        closeDeleteModal={() => setIsDeleteModalOpen(false)}
        refetch={ordersByUserRefetch}
      />

      <div className="text-center text-sm mt-2">
        View Mode:{" "}
        <span
          className={
            orderMode === "user"
              ? "text-md font-semibold text-white bg-black/70 px-3 py-2 rounded-[5px] cursor-pointer "
              : "text-xs text-gray-500 cursor-pointer hover:underline  px-3 py-2"
          }
          onClick={() => setOrderMode("user")}
        >
          By Users
        </span>
        <span className="text-2xl"> | </span>
        <span
          className={
            orderMode === "product"
              ? "text-md font-semibold text-white bg-black/70 px-3 py-2 rounded-[5px] cursor-pointer"
              : "text-xs text-gray-500 cursor-pointer hover:underline  px-3 py-2"
          }
          onClick={() => setOrderMode("product")}
        >
          By Products
        </span>
      </div>
      <DataTable
        data={readyForDataTable.data}
        columns={readyForDataTable.columns}
        refetch={readyForDataTable.refetch}
        mode={readyForDataTable.orderMode}
      />
    </div>
  );
};

export default AdminOrdersPage;
