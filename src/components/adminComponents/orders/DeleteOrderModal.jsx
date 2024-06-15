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
import { useDeleteSingleOrderDataMutation } from "@/features/orderForAdminSlice/orderForAdmin.slice";
import { toast } from "sonner";

const DeleteOrderModal = ({
  isOpen,
  selectedRow,
  closeDeleteModal,
  refetch,
}) => {
  const [
    deleteSingleOrderData,
    { isLoading: isDeleting, isSuccess, isError, error: deleteError },
  ] = useDeleteSingleOrderDataMutation();

  const handleDeleteOperation = async () => {
    try {
      const res = await deleteSingleOrderData(selectedRow._id).unwrap();
      if (!res.success) {
        throw new Error(`Error while deleting a order data: ${res.msg}`);
      }
      toast.success(`${selectedRow.userEmail} order has been deleted successfully`);
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDeleteModal}>
      {" "}
      {/** onOpenChange is needed and triggers automatically when pressed some closing button in modal */}
      <AlertDialogContent className="bg-white ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            This action cannot be undone. This will permanently delete your
            order data and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDeleteOperation}
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

export default DeleteOrderModal;
