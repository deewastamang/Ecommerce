"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import React from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useCreateProductMutation } from "@/features/productSlice/product.slice";
import { toast } from "sonner";
import { createProductValidationSchema as validationSchema } from "@/lib/validation/adminProductValidate";
import ImageUpload from "./ImageUpload";


const CreateProductModal = ({ refetch, isOpen, closeCreateModal }) => {
  const [createProduct, { isLoading, isSuccess, isError }] =
    useCreateProductMutation();
  const initialValues = {
    title: "",
    new: false,
    oldPrice: 0,
    price: 0,
    description: "",
    category: "",
    image: [],
    stock: 0,
  };



  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const res = await createProduct(values);
        //res output: {
        //data: {
        //data: {title: 'foo', new: false, oldPrice: 0, price: 0, description: '', …},
        // msg:"Product created successfully"
        // success:true}
        // }
        if (res.data.success) {
          toast.success(`Product ${res.data.data.title} is added successfully`);
          refetch();
          closeCreateModal();
          resetForm();
        } else {
          throw new Error("Post method failed");
        }
      } catch (error) {
        console.error("Failed to create product: ", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fieldStyleClass =
    "col-span-3 flex h-10 w-full rounded-[5px] border border-input bg-background px-2 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Sheet open={isOpen}>
      <SheetContent className="bg-slate-100 overflow-y-auto">
        <SheetHeader className="border-b-[1px] border-b-slate-300 pb-2">
          <SheetTitle className="text-orange-600">
            Create a New Product
          </SheetTitle>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formik.touched.title && formik.errors.title && (
              <div className="col-span-4 my-0 text-center text-red-600 text-sm">
                {formik.errors.title}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formik.touched.description && formik.errors.description && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formik.touched.price && formik.errors.price && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.price}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formik.touched.oldPrice && formik.errors.oldPrice && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.oldPrice}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <select
              as="select"
              name="category"
              type="text"
              id="category"
              className={fieldStyleClass}
              // value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="others">Others</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.category}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
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
            {formik.touched.stock && formik.errors.stock && (
              <div className="col-span-4 text-center text-red-600 text-sm">
                {formik.errors.stock}
              </div>
            )}
          </div>
          <ImageUpload formik={formik} />

          <div className="flex justify-center py-4 items-center gap-x-2">
            <Button type="submit" disabled={isLoading} variant="primary">
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

export default CreateProductModal;

// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetClose,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { TbLayoutGridAdd } from "react-icons/tb";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useCreateProductMutation } from "@/features/productSlice/product.slice";
// import { toast } from "sonner";

// const CreateProductModal = ({ refetch }) => {
//   const [createProduct, { isLoading, isSuccess, isError }] =
//     useCreateProductMutation();
//   const initialValues = {
//     title: "",
//     new: false,
//     oldPrice: 0,
//     price: 0,
//     description: "",
//     category: "",
//     image: "",
//     stock: 0,
//   };

//   const fieldStyleClass =
//     "col-span-3 flex h-10 w-full rounded-[5px] border border-input bg-background px-2 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-orange-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

//   return (
//     <Sheet>
//       <SheetTrigger className="flex gap-x-2 items-center text-sm bg-black text-white rounded px-4 py-3 whitespace-nowrap hover:bg-orange-600 duration-200">
//         <TbLayoutGridAdd className="text-xl" />
//         Add a new product
//       </SheetTrigger>
//       <SheetContent className="bg-slate-100">
//         <SheetHeader className="border-b-[1px] border-b-slate-300 pb-2">
//           <SheetTitle className="text-orange-600">
//             Create a New Product
//           </SheetTitle>
//         </SheetHeader>
//         <Formik
//           initialValues={initialValues}
//           // validationSchema
//           onSubmit={async (values, { setSubmitting }) => {
//             try {
//               setSubmitting(true);
//               const res = await createProduct(values);
//               //res output: {
//               //data: {
//               //data: {title: 'foo', new: false, oldPrice: 0, price: 0, description: '', …},
//               // msg:"Product created successfully"
//               // success:true}
//               // }
//               if (res.data.success) {
//                 toast.success(
//                   `Product ${res.data.data.title} is added successfully`
//                 );
//                 refetch();
//                 setSubmitting(false);
//               } else {
//                 throw new Error("Post method failed");
//               }
//             } catch (error) {
//               console.error("Failed to create product: ", error.message);
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="title" className="text-right">
//                   Title
//                 </Label>
//                 <Field
//                   name="title"
//                   type="text"
//                   id="title"
//                   className={fieldStyleClass}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="description" className="text-right">
//                   Description
//                 </Label>
//                 <Field
//                   name="description"
//                   type="text"
//                   id="description"
//                   className={fieldStyleClass}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="price" className="text-right">
//                   Price
//                 </Label>
//                 <Field
//                   name="price"
//                   type="number"
//                   id="price"
//                   className={fieldStyleClass}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="oldPrice" className="text-right">
//                   Old Price
//                 </Label>
//                 <Field
//                   name="oldPrice"
//                   type="number"
//                   id="oldPrice"
//                   className={fieldStyleClass}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="category" className="text-right">
//                   Category
//                 </Label>
//                 <Field
//                   as="select"
//                   name="category"
//                   type="text"
//                   id="category"
//                   className={fieldStyleClass}
//                 >
//                   <option value="men">Men</option>
//                   <option value="women">Women</option>
//                   <option value="kids">Kids</option>
//                   <option value="others">Others</option>
//                 </Field>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="stock" className="text-right">
//                   Stock
//                 </Label>
//                 <Field
//                   name="stock"
//                   type="number"
//                   id="stock"
//                   className={fieldStyleClass}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="image" className="text-right">
//                   Image
//                 </Label>
//                 <Field
//                   name="image"
//                   type="text"
//                   id="image"
//                   className={fieldStyleClass}
//                 />
//               </div>

//               <div className="flex justify-center py-4 items-center gap-x-2">
//                 <SheetClose className="" asChild>
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting || isLoading}
//                     variant="primary"
//                   >
//                     Save changes
//                   </Button>
//                 </SheetClose>
//                 <SheetClose className="" asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </SheetClose>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default CreateProductModal;
