"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useBulkDeleteProductsMutation } from "@/features/productSlice/product.slice";

const BulkDeleteProductsModal = ({
  isOpen,
  selectedRows,
  closeDeleteModal,
  refetch,
  emptySelectedRows
}) => {
    const [bulkDeleteProducts, {isLoading: isDeletingProducts, isSuccess, isError, error: bulkDeleteError}] = useBulkDeleteProductsMutation();

  const handleBulkDelete = async () => {
    try {
      const res = await bulkDeleteProducts(selectedRows).unwrap();
      if(!res.success) {
        console.error("Failed to delete products ", res.msg)
      }
      toast.success('Selected products have been deleted');
      refetch(); 
      emptySelectedRows();
    } catch (error) {
      toast.error('Failed to delete products');
    }
  }


  return (
    <AlertDialog open={isOpen} onOpenChange={closeDeleteModal}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete the selected products?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleBulkDelete}
            className="bg-black text-white rounded-[5px] hover:bg-orange-600 duration-200"
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkDeleteProductsModal;
