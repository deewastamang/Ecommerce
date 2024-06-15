"use client";

import React, { useState, useEffect } from "react";
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

import { FaSquarePlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { useGetAllUsersQuery, useUpdateOrderDataMutation } from "@/features/orderForAdminSlice/orderForAdmin.slice";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import { useCreateOrderMutation } from "@/features/orderSlice/order.slice";

const UpdateOrderModal = ({
  isOpen,
  selectedRow: orderData,
  closeEditModal,
  refetch,
}) => {
  const {
    data: allUsers,
    isLoading: usersIsLoading,
    error: userError,
  } = useGetAllUsersQuery();
  const {
    data: allProducts,
    isLoading: productsIsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const [
    createOrder,
    {
      isLoading: orderIsSubmitting,
      isSuccess: orderIsSuccess,
      isError: orderSubmissionFailed,
    },
  ] = useCreateOrderMutation();
  const [updateOrderData, {isLoading: isUpdating, error: updatingError}] = useUpdateOrderDataMutation();

  const [orderTempPlacement, setOrderTempPlacement] = useState(
    orderData?.orders || [{}]
  );
  useEffect(() => {
    if (orderData?.orders) {
      setOrderTempPlacement(orderData.orders);
    }
  }, [orderData]);
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
  ];

  const userOptions = allUsers?.data?.map((user) => ({
    label: `${user.email} (${user.name})`,
    userId: user._id,
    userEmail: user.email,
    userName: user.name,
  }));

  const orderOptions = allProducts?.data?.map((product) => ({
    label: product.title,
    value: product,
  }));

  const fieldStyleClass =
    "flex h-10 w-11/12 rounded-[5px] border border-gray-400/50 bg-gray-300 px-2 py-1.5 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const selectFieldStyle = {
    option: (base, state) => ({
      ...base,
      border: `1px solid gray `,
      height: "100%",
      backgroundColor: state.isSelected ? "#9CA3AF" : base.backgroundColor,
      "&:hover": {
        backgroundColor: "gray",
      },
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: "#D1D5DB",
      border: state.isFocused ? "1px solid #D97706" : "1px solid #9CA3AF",
      width: "100%",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #D97706" : "1px solid #D97706",
      },
    }),
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...orderData },
    // validationSchema,
    onSubmit: async (values) => {
      try {
        values.orders = orderTempPlacement.filter(
          (order) =>
            order !== undefined &&
            Object.keys(order).length !== 0 &&
            Object.keys(order).includes("_id")
        );
        const res = await updateOrderData(values);
        if (res.data.success) {
          toast.success(`${values.userEmail} is updated successfully`);
        } else {
          throw new Error("Put method failed");
        }
      } catch (error) {
        console.error("Failed to update product: ", error.message);
      } finally {
        refetch();
        closeEditModal();
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={closeEditModal}>
      <DialogContent className="sm:max-w-[675px] max-w-[350px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Make changes to the order of a user here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
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
            {formik.touched.stripeSessionId &&
              formik.errors.stripeSessionId && (
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
              styles={selectFieldStyle}
              options={userOptions}
              value={
                userOptions?.find(
                  (option) => option.userId === formik.values?.userId //will return the user
                ) || {}
              }
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
              styles={selectFieldStyle}
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
          <div className="flex flex-col gap-y-1.5 w-11/12 mx-auto">
            <div className="flex gap-x-6 ">
              <Label
                htmlFor="orders"
                className="flex-[5] flex justify-between items-end"
              >
                <p>Orders</p>
                <div className="flex gap-x-1">
                  <span
                    onClick={() =>
                      setOrderTempPlacement((prev) => [...prev, {}])
                    }
                    className="cursor-pointer"
                  >
                    <FaSquarePlus className="text-2xl" />
                  </span>
                </div>
              </Label>

              <Label
                htmlFor="productQuantity"
                className="flex-1 flex items-end"
              >
                Quantity
              </Label>
              <Label className="invisible">
                {" "}
                {/** Only using to align with input fields */}
                <RxCross2 className="text-2xl" />
              </Label>
            </div>

            {orderTempPlacement?.map((order, i) => (
              <div key={i} className="flex gap-x-6">
                <Select
                  name="ordersForThisUser"
                  type="text"
                  id="orders"
                  placeholder="Select orders"
                  className="flex-[5]"
                  styles={selectFieldStyle}
                  options={orderOptions}
                  value={
                    orderOptions?.find(
                      (option) => option.value._id === order._id
                    ) || ""
                  }
                  onChange={(selectedOrder) => {
                    setOrderTempPlacement((prev) => {
                      const newOrderTempPlacement = [...prev];
                      const checkIfAlreadyExists = newOrderTempPlacement.some(
                        (enteredOrder) => {
                          return enteredOrder?._id === selectedOrder.value._id;
                        }
                      );
                      if (checkIfAlreadyExists) {
                        toast.error("Product is already selected");
                      } else {
                        newOrderTempPlacement[i] = selectedOrder.value;
                      }
                      return newOrderTempPlacement;
                    });
                  }}
                  onBlur={() => {
                    formik.setFieldTouched("orders", true);
                  }}
                />
                <div className="flex-1 ">
                  <input
                    name="orders"
                    type="number"
                    id="productQuantity"
                    className={fieldStyleClass}
                    value={order.quantity || ""}
                    min="1"
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      setOrderTempPlacement((prev) => {
                        const newOrderTempPlacement = prev.map(
                          (order, index) => {
                            if (index === i) {
                              return {
                                ...order,
                                quantity: value,
                              };
                            }
                            return order;
                          }
                        );
                        return newOrderTempPlacement;
                      });
                    }}
                  />
                </div>
                <span
                  className="flex items-center cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setOrderTempPlacement((prev) => {
                      const newOrderTempPlacement = prev.filter(
                        (_, index) => index !== i
                      );
                      if (newOrderTempPlacement.length < 1) {
                        return [{}];
                      } else {
                        return newOrderTempPlacement;
                      }
                    });
                  }}
                >
                  <RxCross2 className="text-2xl" />
                </span>
              </div>
            ))}

            {formik.touched.orders && formik.errors.orders && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.orders}
              </div>
            )}
          </div>

          <div className="flex justify-center py-4 items-center md:justify-end gap-x-2">
            <Button
              type="submit"
              disabled={isUpdating}
              variant="primary"
            >
              Save Changes
            </Button>
            <div
              className="border border-input bg-background rounded-[5px] hover:bg-orange-600 hover:text-white duration-200 px-4 py-2 flex items-center cursor-pointer text-sm"
              onClick={closeEditModal}
            >
              Cancel
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderModal;
