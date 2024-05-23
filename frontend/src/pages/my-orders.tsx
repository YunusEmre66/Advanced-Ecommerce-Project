import { useGetUserOrdersMutation } from "@/services/movement";
import React, { useEffect } from "react";
import moment from "moment";

const MyOrders = () => {
  const [getUserOrders, result] = useGetUserOrdersMutation();

  useEffect(() => {
    getUserOrders("");
  }, []);

  return (
    <div>
      {result.isSuccess && (
        <>
          {result.data.list
            .filter((k: any) => k.movementId === null)
            .sort((a: any, b: any) => (b?.id >= a?.id) ? 1 : -1)
            .map((item: any, index: number) => {
              return (
                <>
                  <div className="p-5" key={index}>
                    <div className="card w-full bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title justify-between">
                          <span>Sipariş ({item.id})</span>
                          <span>{moment(item.updatedAt).format('DD.MM.YYYY')} <span className="text-sm">{moment(item.updatedAt).format('HH:mm')}</span></span>
                          <span>{item.description}</span>
                          <button className="btn">
                            Tutar
                            <div className="badge badge-secondary">
                              {item.total}
                            </div>
                          </button>
                        </h2>
                        {result.data.list
                          .filter((k: any) => k.movementId === item.id)
                          .map((v: any, i: number) => {
                            return (
                              <div key={i} className="inline-flex justify-between">
                                <span>{v.product.title}</span>
                                <span>({v.quantity}) {v.total}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default MyOrders;
