import { useSetUseCouponMutation } from "@/services/coupon";
import { useAddPaymentMutation } from "@/services/payment";
import { RootState } from "@/store";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useGetBasketCampaignsQuery } from "@/services/campaign";
import Image from "next/image";

const ViewCart = () => {
  const [setUseCoupon, resultCoupon] = useSetUseCouponMutation();
  const [addPayment, resultPayment] = useAddPaymentMutation();

  const { data: basketCampaigns, isSuccess: isSuccessBasketCampaigns } =
    useGetBasketCampaignsQuery("");

  // ** Selector **
  const basket: any = useSelector((state: RootState) => state.basketState);

  // ** State **
  const [coupon, setCoupon] = useState("");

  const formik = useFormik({
    initialValues: {
      cardName: "Test User",
      cardNumber: "0000111122223333",
      expMonthYear: "12/24",
      cvCode: "000",
      coupon: "",
      campaign: 0,
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      cardNumber: Yup.string()
        .max(16, "Must be 16 characters or less")
        .min(16, "Must be 16 characters or more")
        .required("Required"),
      expMonthYear: Yup.string()
        .max(5, "Must be 5 characters or less")
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      cvCode: Yup.string()
        .max(3, "Must be 3 characters or less")
        .min(3, "Must be 3 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      values.coupon = coupon;
      values.campaign = basketCampaigns.list.reduce(
        (acc: number, o: any) => acc + parseFloat(o.price),
        0
      );
      addPayment(values);
    },
  });
  const formikCoupon = useFormik({
    initialValues: {
      code: "COUPON_O01",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .max(10, "Must be 10 characters or less")
        .min(5, "Must be 5 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setUseCoupon(values);
      setCoupon(values.code);
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap">
          <div className="w-3/5 p-2">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {basket.basket.map((item: any, index: number) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image src={"https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"}
                                width={100}
                                height={100}
                                  alt="Avatar Tailwind CSS Component"/>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {item.product.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.discountPrice}</td>
                        <td>{item.quantity}</td>
                        <th>{item.total}</th>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end">
                    Toplam Tutar
                  </td>
                  <td className="text-white">
                    {basket.basket.reduce(
                      (acc: number, o: any) => acc + parseFloat(o.total),
                      0
                    )}
                  </td>
                </tr>
                {isSuccessBasketCampaigns &&
                  basketCampaigns.list.map((item: any, index: number) => {
                    return (
                      <>
                        <tr>
                          <td colSpan={3} className="text-end">
                            {item.title}
                          </td>
                          <td>{item.price}</td>
                        </tr>
                      </>
                    );
                  })}
                {isSuccessBasketCampaigns && (
                  <>
                    <tr>
                      <td colSpan={3} className="text-end">
                        İndirimli Tutar
                      </td>
                      <td>
                        {basket.basket.reduce(
                          (acc: number, o: any) => acc + parseFloat(o.total),
                          0
                        ) - basketCampaigns.list.reduce(
                          (acc: number, o: any) => acc + parseFloat(o.price),
                          0
                        )}
                      </td>
                    </tr>
                  </>
                )}
                {resultCoupon.isSuccess && (
                  <>
                    <tr>
                      <td colSpan={3} className="text-end">
                        Coupon Tutarı
                      </td>
                      <td>{resultCoupon.data?.data?.price ?? 0}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end">
                        İndirimli Tutar
                      </td>
                      <td>
                        {basket.basket.reduce(
                          (acc: number, o: any) => acc + parseFloat(o.total),
                          0
                        ) - (Number(resultCoupon.data?.data?.price ?? 0) + Number(basketCampaigns.list.reduce(
                          (acc: number, o: any) => acc + parseFloat(o.price),
                          0
                        )))}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td colSpan={2} className="text-end">
                    Kupon Kodu
                  </td>
                  <td colSpan={2}>
                    <form onSubmit={formikCoupon.handleSubmit}>
                      <div className="flex gap-x-1">
                        <div>
                          <div>
                            <input
                              id="code"
                              name="code"
                              type="text"
                              autoComplete="text"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={formikCoupon.handleChange}
                              onBlur={formikCoupon.handleBlur}
                              value={formikCoupon.values.code}
                            />
                          </div>
                          {formikCoupon.touched.code &&
                          formikCoupon.errors.code ? (
                            <div className="block text-sm font-medium text-red-700">
                              {formikCoupon.errors.code}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          {resultCoupon.isLoading ? (
                            "Loading..."
                          ) : (
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Send
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="w-2/5 p-2">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name Surname
                </label>
                <div className="mt-1">
                  <input
                    id="cardName"
                    name="cardName"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardName}
                  />
                </div>
                {formik.touched.cardName && formik.errors.cardName ? (
                  <div className="block text-sm font-medium text-red-700">
                    {formik.errors.cardName}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <div className="mt-1">
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardNumber}
                  />
                </div>
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <div className="block text-sm font-medium text-red-700">
                    {formik.errors.cardNumber}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap">
                <div className="w-1/2">
                  <label
                    htmlFor="expMonthYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Expire Date
                  </label>
                  <div className="mt-1 pr-1">
                    <input
                      id="expMonthYear"
                      name="expMonthYear"
                      type="text"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.expMonthYear}
                    />
                  </div>
                  {formik.touched.expMonthYear && formik.errors.expMonthYear ? (
                    <div className="block text-sm font-medium text-red-700">
                      {formik.errors.expMonthYear}
                    </div>
                  ) : null}
                </div>
                <div className="w-1/2 pl-1">
                  <label
                    htmlFor="cvCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card CVV
                  </label>
                  <div className="mt-1">
                    <input
                      id="cvCode"
                      name="cvCode"
                      type="text"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cvCode}
                    />
                  </div>
                  {formik.touched.cvCode && formik.errors.cvCode ? (
                    <div className="block text-sm font-medium text-red-700">
                      {formik.errors.cvCode}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                {resultPayment.isLoading ? (
                  "Loading..."
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Pay
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCart;
