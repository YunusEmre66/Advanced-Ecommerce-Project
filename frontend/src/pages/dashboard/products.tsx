import ProductList from "@/components/product/product-list";
import { LayoutsTypes } from "@/layouts/Types";
import React from "react";

const Products: LayoutsTypes = () => {
  return (
    <>
      <ProductList />
    </>
  );
};

Products.Layout = "Dashboard";
export default Products;
