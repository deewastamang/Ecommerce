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
import { useBulkDeleteOrderDataMutation } from "@/features/orderForAdminSlice/orderForAdmin.slice";

const BulkDeleteOrderDataModal = ({
  isOpen,
  selectedRows,
  closeDeleteModal,
  refetch,
  emptySelectedRows,
}) => {
  const [
    bulkDeleteOrderData,
    { isLoading: isDeleting, isSuccess, isError, error: bulkDeleteError },
  ] = useBulkDeleteOrderDataMutation();

  const handleBulkDelete = async () => {
    try {
      const res = await bulkDeleteOrderData(selectedRows).unwrap();
      if (!res.success) {
        console.error("Failed to delete order data ", res.msg);
      }
      toast.success(
        `Selected ${selectedRows.length} order data have been deleted`
      );
      refetch();
      emptySelectedRows();
    } catch (error) {
      toast.error("Failed to delete order data");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDeleteModal}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete all selected order data?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            This action cannot be undone. This will permanently delete your
            order data and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleBulkDelete}
            className="bg-black text-white rounded-[5px] hover:bg-orange-600 duration-200"
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkDeleteOrderDataModal;
