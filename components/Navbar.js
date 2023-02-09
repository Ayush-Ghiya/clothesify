/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { FiShoppingCart } from "react-icons/fi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  const exempted =['/checkout','/order','/orders','/login','/signup','/forgot','/myaccount']
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    if(exempted.includes(router.pathname) ){
      setSidebar(false)
    }
  
  }, [])
  
  const toggleCart = () => {
    setSidebar(!sidebar);
    
  };
  const ref = useRef();
  return (
    <div className="fixed top-0  z-50 wt-0 flex flex-col justify-center items-center md:flex-row md:justify-start py-2 shadow-md  w-full  bg-white">
      
      <div className="logo md:mx-5 mr-auto ">
        <Link href="/">
          <Image src="/main.png" alt="logo" width={150} height={10} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex space-x-4 font-bold  md:text-md ">
          <Link href={"/tshirts"} legacyBehavior>
            <a>
              <li className="hover:text-indigo-700">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"} legacyBehavior>
            <a>
              <li className="hover:text-indigo-700">Hoodies</li>
            </a>
          </Link>
          <Link href={"/mugs"} legacyBehavior>
            <a>
              <li className="hover:text-indigo-700">Mugs</li>
            </a>
          </Link>
          <Link href={"/stickers"} legacyBehavior>
            <a>
              <li className="hover:text-indigo-700">Stickers</li>
            </a>
          </Link>
        </ul>
      </div>

      <div className="cart absolute items-center right-0 top-4 mx-5 flex">
        <span onClick={()=>{setDropdown(true)}}
            onMouseLeave={()=>{setDropdown(false)}}>

      {dropdown && <div onClick={()=>{setDropdown(true)}}
             className="absolute right-9 top-6 bg-white border-2 shadow-md rounded-md px-5 py-2 w-32">
        <ul>
          <Link href={'/myaccount'} legacyBehavior><a><li className="py-1 text-sm hover:text-indigo-600 border-b-2 border-gray-100">My Account</li></a></Link>
          <Link href={'orders'} legacyBehavior><a><li className="py-1 text-sm hover:text-indigo-600 border-b-2 border-gray-100">Orders</li></a></Link>
          <li onClick={logout} className="py-1 text-sm hover:text-indigo-600 cursor-pointer ">Logout</li>
        </ul>
      </div>}
        {user.value && (
          <MdAccountCircle
          
          className="text-xl md:text-2xl cursor-pointer mx-3"
          />
          )}
          </span>
        
        {!user.value && (
          <Link href={"/login"}>
            <button className="flex text-white bg-indigo-600 hover:bg-indigo-500 border-0 py-1 px-2 mr-3  focus:outline-none  rounded text-sm">
              Login
            </button>
          </Link>
        )}
        <FiShoppingCart
          className="text-xl md:text-2xl cursor-pointer"
          onClick={toggleCart}
        />
      </div>
      

      <div
        ref={ref}
        className={`w-full top-0 md:w-1/3 h-screen overflow-y-auto px-8 py-10 sidecart absolute  bg-blue-100  transition-all ${
          sidebar ? " right-0" : "-right-full"
        } `}
        onMouseLeave={toggleCart}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-xl cursor-pointer text-indigo-600 hover:text-indigo-500"
        >
          <AiFillCloseCircle />
        </span>
       
        <ol className=" list-decimal font-semibold ">
          {Object.keys(cart).length == 0 && (
            <div className="text-center mt-2 text-gray-500 ">
              No items in the cart. 😢
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="w-20 ml-20 h-7 flex items-center justify-center font-semibold bg-white rounded-md my-2 ">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant,
                          cart[k].img
                        );
                      }}
                      className="mx-2 text-xl text-indigo-600 hover:text-indigo-500  cursor-pointer"
                    />
                    {cart[k].qty}
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant,
                          cart[k].img
                        );
                      }}
                      className="mx-2 text-xl text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {Object.keys(cart).length != 0 && (
          <div className="total w-fit font-bold bg-white rounded-md my-3 p-2 ">
            Total : {subTotal}
          </div>
        )}
        <div className="flex items-center justify-center mt-5">
          <Link href={"/checkout"} legacyBehavior>
            <a>
              <button disabled={Object.keys(cart).length===0} className="disabled:cursor-not-allowed disabled:bg-indigo-300 flex mx-auto  text-white bg-indigo-600 hover:bg-indigo-500 border-0 py-2 px-2 focus:outline-none  rounded text-md">
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>
            </a>
          </Link>
          <button
            onClick={clearCart}
            disabled={Object.keys(cart).length===0}
            className="disabled:bg-slate-500 disabled:cursor-not-allowed flex mx-auto text-white bg-black hover:bg-gray-600 border-0 py-2 px-5 focus:outline-none  rounded text-md"
          >
            <AiFillDelete className="m-1" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
