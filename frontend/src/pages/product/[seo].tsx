import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetProductDetailQuery,
  useSetAddBasketMutation,
  useSetRatingMutation,
} from "@/services/product";
import Image from "next/image";
import { useSetFavoriteMutation } from "@/services/favorite";

const ProductDetail = () => {
  const [setRating] = useSetRatingMutation();
  const [setAddBasket] = useSetAddBasketMutation();
  const [setFavorite] = useSetFavoriteMutation();
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isSuccess,
  } = useGetProductDetailQuery(`product/${router.query.seo}`);

  const [selectedColor, setSelectedColor] = useState([]);

  const handleRating = (rating: number) => {
    setRating({
      productId: product.row.id,
      rating,
    });
  };

  const ratingAverage = () => {
    return (
      product.row.ratings?.reduce((acc: any, o: any) => acc + o.rating, 0) /
        product.row.ratings?.length ?? 0
    );
  };

  const handleClickAddBasket = () => {
    setAddBasket({ productId: product.row.id, quantity: 1 });
  };

  const handleClickAddFavorite = () => {
    setFavorite({ productId: product.row.id });
  };

  const handleClickSelectedColor = (item: any) => {
    setSelectedColor(
      product.row.variations
        .filter((l: any) => l.variation_id === item.id)
        .map((l: any) => {
          return l;
        })
    );
  };

  return (
    <>
      {isLoading ? <div className="text-black">yükleniyor</div> : ""}
      {isSuccess ? (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                alt="ecommerce"
                width={500}
                height={500}
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={
                  "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
                }
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.row.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {[1, 2, 3, 4, 5].map((v: number) => {
                      return (
                        <>
                          <span
                            onClick={() => handleRating(v)}
                            className="cursor-pointer"
                            key={v}
                          >
                            {ratingAverage() < v ? (
                              <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-4 h-4 text-red-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            ) : (
                              <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-4 h-4 text-red-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            )}
                          </span>
                        </>
                      );
                    })}

                    <span className="text-gray-600 ml-3">
                      {product.row.ratings?.length ?? 0} Reviews
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.row.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    {product.row.variations
                      ?.filter((k: any) => k.variation_id === null)
                      .map((k: any, i: number) => {
                        console.log("variation >> ", k);

                        return product.row.variations
                          .filter((t: any) => t.variation_id === k.id)
                          .map((t: any, i: number) => {
                            return (
                              <>
                                <button
                                  key={i}
                                  onClick={() => handleClickSelectedColor(t)}
                                  className={`border-2 mx-1 border-gray-600 
                                bg-${
                                  t.seo === "beyaz"
                                    ? "white"
                                    : t.seo === "kirmizi"
                                    ? "red"
                                    : "pink"
                                }-500 
                                rounded-full w-6 h-6 focus:outline-none`}
                                ></button>
                              </>
                            );
                          });
                      })}
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        {selectedColor.map((item: any, index: number) => {
                          return (
                            <>
                              <option key={index}>{item.title}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    <span className="line-through text-black/50 px-3 text-3xl">
                      {product.row.price?.price ?? 0}
                    </span>
                    {product.row.price?.discountPrice ?? 0}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={handleClickAddBasket}
                  >
                    Add Basket
                  </button>
                  <button
                    onClick={handleClickAddFavorite}
                    className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-${
                      product.favorite ? "red" : "gray"
                    }-500 ml-4`}
                  >
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1 className="text-2xl text-center py-10">404 ürün bulunamadı</h1>
      )}
    </>
  );
};

export default ProductDetail;
