"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { useFormik } from "formik";
import { toast } from "sonner";

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
  const categoryOptions = [
    {
      value: "men",
      label: "Men",
    },
    {
      value: "women",
      label: "Women",
    },
    {
      value: "kids",
      label: "Kids",
    },
    {
      value: "unisex",
      label: "Unisex",
    },
    {
      value: "others",
      label: "Others",
    },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...product },
    // validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
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
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={closeEditModal}>
      <DialogContent className="sm:max-w-[675px] max-w-[350px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <input
              name="title"
              type="text"
              id="title"
              className={fieldStyleClass}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <input
              name="description"
              type="text"
              id="description"
              className={fieldStyleClass}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <input
              name="price"
              type="number"
              id="price"
              className={fieldStyleClass}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPrice" className="text-right">
              Old Price
            </Label>
            <input
              name="oldPrice"
              type="number"
              id="oldPrice"
              className={fieldStyleClass}
              value={formik.values.oldPrice}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <input
              name="stock"
              type="number"
              id="stock"
              className={fieldStyleClass}
              value={formik.values.stock}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              name="category"
              type="text"
              id="category"
              placeholder="Select a category"
              className="col-span-3 h-10 w-full"
              styles={{
                option: (base, state) => ({
                  ...base,
                  border: `1px solid gray `,
                  height: "100%",
                  backgroundColor: state.isSelected
                    ? "#D97706"
                    : base.backgroundColor,
                  "&:hover": {
                    backgroundColor: "#F59E0B",
                  },
                }),
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "white",
                  border: state.isFocused
                    ? "1px solid #D97706"
                    : "1px solid black",
                  width: "100%",
                  boxShadow: "none",
                  "&:hover": {
                    border: state.isFocused
                      ? "1px solid #D97706"
                      : "1px solid #D97706",
                  },
                }),
              }}
              options={categoryOptions}
              value={categoryOptions?.find(
                //stores boolean value
                (option) => option.value === formik.values.category
              )}
              onChange={(value) => {
                formik.setFieldValue("category", value.value); //from categoryOptions
              }}
              onBlur={() => {
                formik.setFieldTouched("category", true);
              }}
            />
            {formik.touched.category && formik.errors.category && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.category}
              </div>
            )}
          </div>
          <ImageUpload formik={formik} forUpdateModal={product?.image} />
          <DialogFooter className="sm:flex sm:justify-end justify-center flex-row gap-x-1">
            <Button type="submit" disabled={isLoading} variant="primary">
              Save changes
            </Button>
            <div
              className="border border-input bg-background rounded-[5px] hover:bg-orange-600 hover:text-white duration-200 px-3 py-1.5 flex items-center cursor-pointer text-sm font-medium"
              onClick={closeEditModal}
            >
              Cancel
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
