import { useGetCategoryProductsQuery } from "@/services/category";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Category = () => {
  const router = useRouter();

  const {
    data: category,
    isLoading,
    isSuccess,
  } = useGetCategoryProductsQuery(`category/${router.query.slug}`);

  return (
    <>
      <h1 className="text-2xl text-center">
        {isSuccess && category.row.category.title}
      </h1>
      <h3 className="text-center">
        {isSuccess && category.row.category.description}
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {isSuccess &&
          category.row.products.map((product: any, index: number) => (
            <div key={index} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={
                    "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  }
                  width={500}
                  height={500}
                  alt={"Front of men's Basic Tee in black."}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`product/${product.seo}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-white">
                  <span className="line-through text-white/50 mx-2">
                    {product.price?.price ?? 0}
                  </span>
                  {product.price?.discountPrice ?? 0}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Category;
