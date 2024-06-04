import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import { toast } from "sonner";

import React from "react";
import { useUpdateProductMutation } from "@/features/productSlice/product.slice";
import ImageUpload from "./ImageUpload";

const UpdateProductModal = ({
  isOpen,
  selectedRow: product,
  closeEditModal,
  refetch,
}) => {
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const fieldStyleClass =
    "col-span-3 flex h-10 w-full rounded-[5px] border border-input bg-background px-2 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <Dialog open={isOpen} onOpenChange={closeEditModal}>
      <DialogContent className="sm:max-w-[675px] max-w-[350px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={product}
          // validationSchema
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              const res = await updateProduct(values);
              //Output of res:
              // data: {msg: "Product updated successfully", success: true}
              if (res.data.success) {
                toast.success(`Product has been updated successfully`);
              } else {
                throw new Error("Put method failed");
              }
            } catch (error) {
              console.error("Failed to update product: ", error.message);
            } finally {
              refetch();
              setSubmitting(false);
              closeEditModal();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Field
                  name="title"
                  type="text"
                  id="title"
                  className={fieldStyleClass}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Field
                  name="description"
                  type="text"
                  id="description"
                  className={fieldStyleClass}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Field
                  name="price"
                  type="number"
                  id="price"
                  className={fieldStyleClass}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPrice" className="text-right">
                  Old Price
                </Label>
                <Field
                  name="oldPrice"
                  type="number"
                  id="oldPrice"
                  className={fieldStyleClass}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Field
                  as="select"
                  name="category"
                  type="text"
                  id="category"
                  className={fieldStyleClass}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="others">Others</option>
                </Field>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Field
                  name="stock"
                  type="number"
                  id="stock"
                  className={fieldStyleClass}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Field
                  name="image"
                  type="text"
                  id="image"
                  className={fieldStyleClass}
                />
              </div>

              <DialogFooter className="sm:flex sm:justify-end justify-center flex-row gap-x-1">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  variant="primary"
                >
                  Save changes
                </Button>
                <div
                  className="border border-input bg-background rounded-[5px] hover:bg-orange-600 hover:text-white duration-200 px-3 py-1.5 flex items-center cursor-pointer text-sm font-medium"
                  onClick={closeEditModal}
                >
                  Cancel
                </div>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
