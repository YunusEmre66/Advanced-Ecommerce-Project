import { useGetProductsQuery } from "@/services/product";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { ProductType } from "@/types/productType";

const ProductList = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useGetProductsQuery("product/dashboard-products");

  const router = useRouter();
 
  const handleClickProductDetail = (item: ProductType) => {
    router.push(`/dashboard/product-detail/${item.seo}`);
    console.log(item);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              products.list.map((item: ProductType, index: number) => {
                return (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              width={50}
                              height={50}
                              src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div>{item.title}</div>
                          <div>
                            {item.barcode}-{item.stockCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.price?.price}</td>
                    <td>{item.price?.discountPrice}</td>
                    <td>{item.price?.discountRate}</td>
                    <td>{item.tax}</td>
                    <td>{item.confirm ? "true" : "false"}</td>
                    <td>
                      {moment(item.updatedAt).format("DD.MM.YYYY")}{" "}
                      <span className="text-sm">
                        {moment(item.updatedAt).format("HH:mm")}
                      </span>
                    </td>
                    <th>
                      <button
                        onClick={() => handleClickProductDetail(item)}
                        className="btn btn-ghost btn-xs"
                      >
                        details
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ProductList;
