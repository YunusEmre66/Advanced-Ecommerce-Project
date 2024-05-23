import { useGetMenuQuery } from "@/services/menu";
import { RootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  // ** Selector **
  const user: any = useSelector((state: RootState) => state.userState);
  const basket: any = useSelector((state: RootState) => state.basketState);
  const { data: menu, isSuccess } = useGetMenuQuery("");

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isSuccess &&
              menu.list
                ?.filter((k: any) => k.menuId === null)
                .map((item: any, index: number) => {
                  const subMenu = menu.list.filter(
                    (t: any) => t.menuId === item.id
                  );
                  if (subMenu.length > 0) {
                    return (
                      <li key={index}>
                          <a>{item.title}</a>
                          <ul className="p-2">
                            {subMenu.map((subItem: any, index: number) => {
                              return (
                                <li key={index}>
                                  <Link href={subItem.seo}>
                                    {subItem.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <Link href={item.seo}>{item.title}</Link>
                      </li>
                    );
                  }
                })}
              {/* <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li> */}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {isSuccess &&
              menu.list
                ?.filter((k: any) => k.menuId === null)
                .map((item: any, index: number) => {
                  const subMenu = menu.list.filter(
                    (t: any) => t.menuId === item.id
                  );
                  if (subMenu.length > 0) {
                    return (
                      <li key={index}>
                        <details>
                          <summary>{item.title}</summary>
                          <ul className="p-2">
                            {subMenu.map((subItem: any, index: number) => {
                              return (
                                <li key={index}>
                                  <Link href={subItem.seo}>
                                    {subItem.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <Link href={item.seo}>{item.title}</Link>
                      </li>
                    );
                  }
                })}
            {/* <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {basket.basket.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {basket.basket.length} Items
                </span>
                <span className="text-info">
                  Subtotal:{" "}
                  {basket.basket.reduce(
                    (acc: number, o: any) => acc + parseFloat(o.total),
                    0
                  )}
                </span>
                <div className="card-actions">
                  <Link href="/view-cart">View cart</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">{user.user.name}</a>
              </li>
              <li>
                <Link href="/my-cart">My Cart</Link>
              </li>
              <li>
                <Link href="/my-orders">My Orders</Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
