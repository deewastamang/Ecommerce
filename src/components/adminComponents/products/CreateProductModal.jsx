"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbLayoutGridAdd } from "react-icons/tb";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateProductMutation } from "@/features/productSlice/product.slice";
import { toast } from "sonner";

const CreateProductModal = ({refetch}) => {
    const [createProduct, {isLoading, isSuccess, isError}] = useCreateProductMutation();
    const initialValues = {
        title: '',
        new: false,
        oldPrice: 0,
        price: 0,
        description: '',
        category: '',
        image: '',
        stock: 0,
    }

    const fieldStyleClass = "col-span-3 flex h-10 w-full rounded-[5px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <Sheet>
      <SheetTrigger>
        <button className="flex gap-x-2 items-center text-sm bg-black text-white rounded px-4 py-3 whitespace-nowrap hover:bg-orange-600 duration-200">
          <TbLayoutGridAdd className="text-xl" />
          Add a new product
        </button>
      </SheetTrigger>
      <SheetContent className="bg-slate-100">
        <SheetHeader className="border-b-[1px] border-b-slate-300 pb-2">
          <SheetTitle className="text-orange-600">
            Create a New Product
          </SheetTitle>
        </SheetHeader>
        <Formik
            initialValues={initialValues}
            // validationSchema
            onSubmit={
                async (values, {setSubmitting}) => {
                    try {
                        const res = await createProduct(values);
                        if(res.data.success) {
                            toast.success("Product created successfully")
                            refetch();
                            setSubmitting(false);
                        } else {
                            throw new Error("Post method failed")
                        }
                        
                    } catch (error) {
                        console.error("Failed to create product: ", error.message);
                        setSubmitting(false);
                    }
                }
            }
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Field name='title' type='text' id="title" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Field name='description' type='text' id="description" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Field name='price' type='number' id="price" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPrice" className="text-right">
                  Old Price
                </Label>
                <Field name='oldPrice' type='number' id="oldPrice" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Field name='category' type='text' id="category" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Field name='stock' type='number' id="stock" className={fieldStyleClass} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Field name='image' type='text' id="image" className={fieldStyleClass} />
              </div>

              <div className="flex justify-center py-4 items-center gap-x-2">
                <SheetClose className="" asChild>
                  <Button type="submit" disabled={isSubmitting || isLoading} variant="primary">
                    Save changes
                  </Button>
                </SheetClose>
                <SheetClose className="" asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </div>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProductModal;
