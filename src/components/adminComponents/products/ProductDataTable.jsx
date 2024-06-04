"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { TbLayoutGridAdd } from "react-icons/tb";

import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateProductModal from "./CreateProductModal";
import BulkDeleteProductsModal from "./BulkDeleteProductsModal";


export default function DataTable({ columns, data, refetch }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = React.useState(false);
  const [rowsSelectionForBulkDelete, setRowsSelectionForBulkDelete] =React.useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, columnFilters, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
  });

  const handleBulkClick = () => {
    const selectedRowIdsOfTable = Object.keys(rowSelection).filter(id => rowSelection[id]);
    if (selectedRowIdsOfTable.length === 0) {
      toast.error('No rows selected for deletion');
      return;
    }
    const selectedProductsIds = selectedRowIdsOfTable.map(rowId => {
      const row = table.getRowModel().rows.find(row => row.id === rowId);
      return row ? row.original._id : null;
    }).filter(productId => productId !== null);
    
    setRowsSelectionForBulkDelete(selectedProductsIds)
    setIsBulkDeleteModalOpen(true);
    return
  }

  return (
    <div>
      <CreateProductModal 
      isOpen={isCreateModalOpen}
      closeCreateModal={() => setIsCreateModalOpen(false)}
      refetch={refetch} 
      />
      <BulkDeleteProductsModal 
        isOpen={isBulkDeleteModalOpen}
        closeDeleteModal={() => setIsBulkDeleteModalOpen(false)}
        refetch={refetch}
        selectedRows={rowsSelectionForBulkDelete}
        emptySelectedRows={() => setRowsSelectionForBulkDelete(null)}
      />
      <div className="flex items-center justify-between py-1.5">
        <Input
          placeholder="Search for a product..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs rounded"
        />
      <div className="flex gap-2">
          <button onClick={handleBulkClick} className="flex gap-x-2 items-center text-sm bg-red-500 text-white rounded px-4 py-3 whitespace-nowrap hover:bg-red-700 duration-200">
            <MdDelete className="text-xl" />
          </button>
          <button onClick={() => setIsCreateModalOpen(true)} className="flex gap-x-2 items-center text-sm bg-black text-white rounded px-4 py-3 whitespace-nowrap hover:bg-orange-600 duration-200">
            <TbLayoutGridAdd className="text-xl" />
            Add a new product
          </button>
        </div>
        
      </div>
      <div className="rounded-[5px] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-start first:text-center first:pl-3'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='hover:bg-slate-900/20 data-[state=selected]:bg-slate-900/30'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 bg-white">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-black text-slate-100 text-xs hover:bg-orange-600 duration-200 rounded px-3 py-2 cursor-pointer"
          >
            Previous
          </button>

          <div className=" text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-black text-slate-100  text-xs hover:bg-orange-600 duration-200 rounded px-3 py-2 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
