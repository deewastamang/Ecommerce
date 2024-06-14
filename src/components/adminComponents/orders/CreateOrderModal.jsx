"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { FaSquarePlus } from "react-icons/fa6";

import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { toast } from "sonner";
import ImageUpload from "../products/ImageUpload";
import Select from "react-select";
import { useGetAllUsersQuery } from "@/features/orderForAdminSlice/orderForAdmin.slice";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";

const CreateOrderModal = ({ refetch, isOpen, closeCreateModal }) => {
  const {data: allUsers, isLoading: usersIsLoading, error: userError} = useGetAllUsersQuery();
  const {data: allProducts, isLoading: productsIsLoading, error: productsError} = useGetProductsQuery();


  const [temp, setTemp] = useState(null);
  const initialValues = {
    userId: "",
    userEmail: "",
    userName: "",
    stripeSessionId: "",
    status: "",
    wishlist: [],
    orders: [],
  };

  const statusOptions = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Delivered",
      value: "delivered",
    },
    {
      label: "Canceled",
      value: "canceled",
    },
  ]

  const userOptions = allUsers?.data?.map(user => (
    {
      label: `${user.email} (${user.name})`,
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
    }
  ));

  const orderOptions = allProducts?.data?.map(product => (
    {
      label: product.title,
      value: product,
    }
  ))

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // setSubmitting(true);
        // const res = await createProduct(values);
        // if (res.data.success) {
        //   toast.success(`Product ${res.data.data.title} is added successfully`);
        //   refetch();
        //   closeCreateModal();
        //   resetForm();
        // } else {
        //   throw new Error("Post method failed");
        // }
        values.orders = [temp]
        console.log('order values are: ', values);
      } catch (error) {
        console.error("Failed to create product: ", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fieldStyleClass =
    "flex h-10 w-11/12 rounded-[5px] border border-gray-400/50 bg-gray-300 px-2 py-1.5 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Sheet open={isOpen} onOpenChange={closeCreateModal}> 
      <SheetContent className="bg-slate-200 min-w-[40vw] overflow-y-auto">
        <SheetHeader className="border-b-[1px] border-b-slate-300 pb-2">
          <SheetTitle className="text-black/80">
            Create a New Order
          </SheetTitle>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-center gap-y-1.5">
            <Label htmlFor="stripeSessionId" className="block w-11/12">
              Stripe Session Id
            </Label>
            <input
              name="stripeSessionId"
              type="text"
              id="stripeSessionId"
              className={fieldStyleClass}
              value={formik.values.stripeSessionId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.stripeSessionId && formik.errors.stripeSessionId && (
              <div className="col-span-4 my-0 text-center text-red-600 text-sm">
                {formik.errors.stripeSessionId}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-y-1.5">
            <Label htmlFor="user" className="block w-11/12">
              User
            </Label>
            <Select
              name="userId"
              type="text"
              id="user"
              placeholder="Select a user with email"
              className="w-11/12 h-10 "
              styles={{
                option: (base, state) => ({
                  ...base,
                  border: `1px solid gray `,
                  height: "100%",
                  backgroundColor: state.isSelected
                    ? "#9CA3AF"
                    : base.backgroundColor,
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }),
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#D1D5DB",
                  border: state.isFocused
                    ? "1px solid #D97706"
                    : "1px solid #9CA3AF",
                  width: "100%",
                  boxShadow: "none",
                  "&:hover": {
                    border: state.isFocused
                      ? "1px solid #D97706"
                      : "1px solid #D97706",
                  },
                }),
              }}
              options={userOptions}
              value={userOptions?.find(
                //stores boolean value
                (option) => option.userId === formik.values.userId
              )}
              onChange={(selectedUser) => {
                formik.setFieldValue("userId", selectedUser.userId); 
                formik.setFieldValue("userEmail", selectedUser.userEmail); 
                formik.setFieldValue("userName", selectedUser.userName); 
              }}
              onBlur={() => {
                formik.setFieldTouched("userId", true);
              }}
            />
            {formik.touched.userId && formik.errors.userId && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.userId}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-y-1.5">
            <Label htmlFor="status" className="block w-11/12">
              Status
            </Label>
            <Select
              name="status"
              type="text"
              id="status"
              placeholder="Select an order's status"
              className="w-11/12 h-10 "
              styles={{
                option: (base, state) => ({
                  ...base,
                  border: `1px solid gray `,
                  height: "100%",
                  backgroundColor: state.isSelected
                    ? "#9CA3AF"
                    : base.backgroundColor,
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }),
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#D1D5DB",
                  border: state.isFocused
                    ? "1px solid #D97706"
                    : "1px solid #9CA3AF",
                  width: "100%",
                  boxShadow: "none",
                  "&:hover": {
                    border: state.isFocused
                      ? "1px solid #D97706"
                      : "1px solid #D97706",
                  },
                }),
              }}
              options={statusOptions}
              value={statusOptions?.find(
                //stores boolean value
                (option) => option.value === formik.values.status
              )}
              onChange={(value) => {
                formik.setFieldValue("status", value.value); //from categoryOptions
              }}
              onBlur={() => {
                formik.setFieldTouched("status", true);
              }}
            />
            {formik.touched.status && formik.errors.status && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.status}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-y-1.5">
            <Label htmlFor="orders" className=" w-11/12 flex justify-between items-end">
              <p>Orders</p>
              <span onClick={() => setOrderSelects(p => p+1)} className="cursor-pointer"><FaSquarePlus className="text-2xl" /></span>
            </Label>
                <Select
                name="orders"
                type="text"
                id="orders"
                placeholder="Select orders"
                className="w-11/12 h-10 "
                styles={{
                  option: (base, state) => ({
                    ...base,
                    border: `1px solid gray `,
                    height: "100%",
                    backgroundColor: state.isSelected
                      ? "#9CA3AF"
                      : base.backgroundColor,
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }),
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#D1D5DB",
                    border: state.isFocused
                      ? "1px solid #D97706"
                      : "1px solid #9CA3AF",
                    width: "100%",
                    boxShadow: "none",
                    "&:hover": {
                      border: state.isFocused
                        ? "1px solid #D97706"
                        : "1px solid #D97706",
                    },
                  }),
                }}
                options={orderOptions}
                value={orderOptions?.find(
                  (option) => option.value === formik.values.status
                )}
                onChange={(selectedOrder) => {
                  setTemp(selectedOrder.value)
                }}
                onBlur={() => {
                  formik.setFieldTouched("orders", true);
                }}
              />

 

            {formik.touched.orders && formik.errors.orders && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.orders}
              </div>
            )}
          </div>

          <ImageUpload formik={formik} />

          <div className="flex justify-center py-4 items-center md:justify-end gap-x-2">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
            <div
              className="border border-input bg-background rounded-[5px] hover:bg-orange-600 hover:text-white duration-200 px-4 py-2 flex items-center cursor-pointer text-sm"
              onClick={closeCreateModal}
            >
              Cancel
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateOrderModal;
