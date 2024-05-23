import { useRemoveBasketMutation } from "@/services/basket";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyCart = () => {
  const [removeBasket, result] = useRemoveBasketMutation();
  // ** Selector **
  const basket: any = useSelector((state: RootState) => state.basketState);

  // ** State **
  const [selected, setSelected] = useState<number[]>([]);

  const handleChangeChecked = (item: any) => {
    const _selected = selected.find((k: number) => k === parseInt(item.id));
    if (_selected) {
      console.log(_selected);
      setSelected(selected.filter((k: number) => k !== parseInt(item.id)));
    } else {
      console.log(_selected);
      setSelected([...selected, item.id]);
    }
  };

  const handleChangeAllChecked = () => {
    if (selected.length > 0) {
      setSelected([]);
    } else {
      basket.basket.map((item: any, index: number) => {
        selected.push(item.id);
      });
      setSelected([...selected]);
    }
  };

  const handleClickMovementDelete = (item: any) => {
    removeBasket({ movements: [item.id] }); // [11,12,13]
  };

  const handleSelectedDelete = () => {
    removeBasket({ movements: selected }); // [11,12,13]
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleChangeAllChecked()}
                    className="checkbox"
                    checked={selected.length === basket.basket.length ? true : false}
                  />
                </label>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {basket.basket.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          selected.find((k: number) => k === item.id)
                            ? true
                            : false
                        }
                        onChange={() => handleChangeChecked(item)}
                        className="checkbox"
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.discountPrice}</td>
                  <td>{item.quantity}</td>
                  <th>{item.total}</th>
                  <td>
                    <button onClick={() => handleClickMovementDelete(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>
              <button onClick={handleSelectedDelete}>
                      Delete
                    </button>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyCart;
