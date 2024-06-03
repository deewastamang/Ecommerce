import * as Yup from "yup";


export const createProductValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
    oldPrice: Yup.number().min(0, "Old price must be a positive number"),
    category: Yup.string().required("Category is required"),
    // image: Yup.string().url("Image must be a valid URL").required("Image is required"),
    stock: Yup.number().min(0, "Stock must be a non-negative number").required("Stock is required"),
  });