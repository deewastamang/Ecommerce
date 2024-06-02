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
import { useDeleteSingleProductMutation } from "@/features/productSlice/product.slice";
import { toast } from "sonner";

const DeleteProductDialog = ({
  isOpen,
  selectedRow,
  closeDeleteModal,
  refetch,
}) => {
  const [
    deleteSingleProduct,
    { isLoading: isDeleting, isSuccess, isError, error: deleteError },
  ] = useDeleteSingleProductMutation();

  const handleDeleteOperation = async () => {
    try {
      const res = await deleteSingleProduct(selectedRow._id).unwrap();
      // res output: {success: true, msg: 'Product deleted successfully'}
      //=========
      // Output without unwrap():
      // {
      //   meta: { ... },
      //   payload: { ... }  // this contains the actual response data or error
      // }
      if (!res.success) {
        throw new Error(`Error while deleting a product: ${res.msg}`);
      }
      toast.success(`${selectedRow.title} has been deleted successfully`);
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDeleteModal}>
      {" "}
      {/** onOpenChange is needed and triggers automatically when pressed some closing button in modal */}
      {/* <AlertDialogTrigger>Delete</AlertDialogTrigger> */}
      <AlertDialogContent className="bg-white ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleDeleteOperation}
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

export default DeleteProductDialog;
