import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductType } from "@/types/productType";
import {
  useGetProductDetailQuery,
  useNewProductMutation,
  useSetProductDetailMutation,
} from "@/services/product";
import { FormProductType } from "@/types/formProductType";
import {
  useGetCategoryQuery,
  useSetCategoryMutation,
} from "@/services/category";

interface Props {
  seo: string | undefined;
}

const ProductDetail = ({ seo }: Props) => {
  const {
    data: product,
    isLoading,
    isSuccess,
  } = useGetProductDetailQuery(`product/${seo}`);

  const { data: categories } = useGetCategoryQuery("");

  const [setProductDetail, result] = useSetProductDetailMutation();
  const [newProduct] = useNewProductMutation();
  const [setCategory] = useSetCategoryMutation();

  const inputRef = useRef<HTMLSelectElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      seo: "",
      description: "",
      stockCode: "",
      barcode: "",
      associative: "",
      tax: "",
      confirm: true,
      salePrice: 0,
      discountPrice: 0,
      discountRate: 0,
    } as FormProductType,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      if (seo === "") newProduct(values);
      if (seo !== "") setProductDetail(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.setValues({
        id: product.row?.id,
        title: product.row?.title ?? "",
        seo: product.row?.seo,
        description: product.row?.description,
        associative: product.row?.associative,
        barcode: product.row?.barcode,
        stockCode: product.row?.stockCode,
        tax: product.row?.tax,
        confirm: product.row?.confirm,
        salePrice: product.row?.price?.price,
        discountPrice: product.row?.price?.discountPrice,
        discountRate: product.row?.price?.discountRate,
      } as FormProductType);
      setSelectedCategory(product.row?.productCategory.map((k: any)=> {
        return k.category_id
      }))
    }
  }, [isSuccess]);

  const handleAddCategory = () => {
    const selectedCategoryId = parseInt(inputRef.current?.value ?? "-1");

    if (selectedCategoryId > 0) {
      const selected = selectedCategory.find(
        (c: number) => c === selectedCategoryId
      );

      if (selected === undefined)
        setSelectedCategory([...selectedCategory, selectedCategoryId]);
    }
  };

  const handleRemoveCategory = (item: any) => {
    const selected = selectedCategory.filter((c: number) => c !== item.id);
    setSelectedCategory(selected);
  };

  useEffect(() => {
      setCategory({
        categories: selectedCategory ?? [],
        productId: isSuccess ? product.row?.id : 0,
      });
  }, [selectedCategory]);

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="w-full flex flex-wrap">
        <div className="w-1/2 px-2 py-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <div className="mt-1">
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.title}
            </div>
          ) : null}
        </div>
        <div className="w-1/2 px-2 py-4">
          <label
            htmlFor="seo"
            className="block text-sm font-medium text-gray-700"
          >
            Seo (Slug)
          </label>
          <div className="mt-1">
            <input
              id="seo"
              name="seo"
              type="text"
              autoComplete="title"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.seo}
            />
          </div>
          {formik.touched.seo && formik.errors.seo ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.seo}
            </div>
          ) : null}
        </div>
        <div className="w-full px-2 py-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Seo (Slug)
          </label>
          <div className="mt-1">
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="title"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="stockCode"
            className="block text-sm font-medium text-gray-700"
          >
            stockCode
          </label>
          <div className="mt-1">
            <input
              id="stockCode"
              name="stockCode"
              type="text"
              autoComplete="stockCode"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stockCode}
            />
          </div>
          {formik.touched.stockCode && formik.errors.stockCode ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.stockCode}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="barcode"
            className="block text-sm font-medium text-gray-700"
          >
            barcode
          </label>
          <div className="mt-1">
            <input
              id="barcode"
              name="barcode"
              type="text"
              autoComplete="barcode"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.barcode}
            />
          </div>
          {formik.touched.barcode && formik.errors.barcode ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.barcode}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="associative"
            className="block text-sm font-medium text-gray-700"
          >
            associative
          </label>
          <div className="mt-1">
            <input
              id="associative"
              name="associative"
              type="text"
              autoComplete="associative"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.associative}
            />
          </div>
          {formik.touched.associative && formik.errors.associative ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.associative}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="tax"
            className="block text-sm font-medium text-gray-700"
          >
            tax
          </label>
          <div className="mt-1">
            <input
              id="tax"
              name="tax"
              type="text"
              autoComplete="tax"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tax}
            />
          </div>
          {formik.touched.tax && formik.errors.tax ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.tax}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="salePrice"
            className="block text-sm font-medium text-gray-700"
          >
            salePrice
          </label>
          <div className="mt-1">
            <input
              id="salePrice"
              name="salePrice"
              type="number"
              autoComplete="salePrice"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salePrice}
            />
          </div>
          {formik.touched.salePrice && formik.errors.salePrice ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.salePrice}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="discountPrice"
            className="block text-sm font-medium text-gray-700"
          >
            discountPrice
          </label>
          <div className="mt-1">
            <input
              id="discountPrice"
              name="discountPrice"
              type="number"
              autoComplete="discountPrice"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discountPrice}
            />
          </div>
          {formik.touched.discountPrice && formik.errors.discountPrice ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.discountPrice}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="discountRate"
            className="block text-sm font-medium text-gray-700"
          >
            discountRate
          </label>
          <div className="mt-1">
            <input
              id="discountRate"
              name="discountRate"
              type="number"
              autoComplete="discountRate"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discountRate}
            />
          </div>
          {formik.touched.discountRate && formik.errors.discountRate ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.discountRate}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700"
          >
            tax
          </label>
          <div className="mt-1">
            <input
              id="confirm"
              name="confirm"
              type="checkbox"
              autoComplete="confirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm === true ? "false" : "true"}
            />
          </div>
          {formik.touched.confirm && formik.errors.confirm ? (
            <div className="block text-sm font-medium text-red-700">
              {formik.errors.confirm}
            </div>
          ) : null}
        </div>
        <div className="w-1/4 px-2 py-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <div className="mt-1 inline-flex justify-between">
            <select
              ref={inputRef}
              className="items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
            >
              <option value={-1}>Seçiniz...</option>
              {categories?.list?.map((k: any, i: number) => {
                return (
                  <option key={i} value={k.id}>
                    {k.title}
                  </option>
                );
              })}
            </select>
            <button
              onClick={handleAddCategory}
              type="button"
              className="w-full mx-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <span>
              {categories?.list
                ?.filter((k: any) => selectedCategory.includes(k.id))
                .map((item: any, i: number) => {
                  return (
                    <span
                      onClick={() => handleRemoveCategory(item)}
                      key={i}
                      className="mx-2"
                      role="button"
                    >
                      {item.title}
                    </span>
                  );
                })}
            </span>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {seo === "" ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ProductDetail;
