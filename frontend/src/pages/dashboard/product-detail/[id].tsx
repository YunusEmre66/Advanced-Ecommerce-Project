import ProductDetail from "@/components/product/product-detail";
import { LayoutsTypes } from "@/layouts/Types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProductDetailPage: LayoutsTypes = () => {
  const [id, setId] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) 
      setId(router.query.id);
  }, [router]);

  return <ProductDetail seo={`${id}`} />;
};

ProductDetailPage.Layout = "Dashboard";
export default ProductDetailPage;
