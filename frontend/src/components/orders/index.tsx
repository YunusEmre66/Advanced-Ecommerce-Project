import { useGetUsersOrdersMutation } from "@/services/movement";
import React, { useEffect } from "react";
import moment from "moment";

const UsersOrders = () => {
  const [getUserOrders, result] = useGetUsersOrdersMutation();

  useEffect(() => {
    getUserOrders("");
  }, []);

  const handleOrderEvent = (event: any) => {
    console.log(event);
    
  }

  return (
    <div>
      {result.isSuccess && (
        <>
          {result.data.list
            .filter((k: any) => k.movementId === null)
            .sort((a: any, b: any) => (b?.id >= a?.id ? 1 : -1))
            .map((item: any, index: number) => {
              return (
                <>
                  <div className="p-5" key={index}>
                    <div className="card w-full bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title justify-between">
                          <span>
                            Sipariş ({item.id}){" "}
                            <span className="text-sm">({item.user.name})</span>
                          </span>
                          <span>
                            {moment(item.updatedAt).format("DD.MM.YYYY")}{" "}
                            <span className="text-sm">
                              {moment(item.updatedAt).format("HH:mm")}
                            </span>
                          </span>
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
                              <div
                                key={i}
                                className="inline-flex justify-between"
                              >
                                <span>{v.product.title}</span>
                                <span>
                                  ({v.quantity}) {v.total}
                                </span>
                              </div>
                            );
                          })}
                        <div>
                          <div className="inline-flex">
                            <select 
                            onChange={handleOrderEvent}
                            className="items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                              <option>Seçiniz</option>
                              <option>Sipariş Hazırlandı</option>
                              <option>Paketlendi</option>
                              <option>Kargo</option>
                              <option>Teslim Edildi</option>
                            </select>
                          </div>
                        </div>
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

export default UsersOrders;
