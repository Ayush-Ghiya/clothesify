/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import Router, { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsonwebtoken from "jsonwebtoken";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart, clearCart }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));

    if (user?.token) {
      setUser(user);
      setEmail(user.email);
      fetcher(user)
    }
  }, []);
  const fetcher=async(user)=>{
    let data = { jwt:user.token};
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
     let response = await res.json();
   
    setName(response.name)
    setAddress(response.address)
    setPincode(response.pincode)
    setPhone(response.phone)
    getPincode(response.pincode)
    
  }
  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      pincode.length > 3 &&
      address.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, phone, pincode, address]);
const getPincode = async(pincode)=>{
  let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinsJson = await pins.json();
        if (Object.keys(pinsJson).includes(pincode)) {
          setCity(pinsJson[pincode][0]);
          setState(pinsJson[pincode][1]);
        } else {
          setCity("");
          setState("");
        }
}
  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value)
      } else {
        setCity("");
        setState("");
      }
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    let orderids = uuidv4();
    const data = {
      orderids,
      email,
      address,
      subTotal,
      cart,
      phone,
      pincode,
      city,
      state,
      phone,
      name,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addorders`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.success == true) {
      toast.success("Order initiated", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push({
          pathname: "/order",
          query: { orderid: orderids },
        });
      }, 4000);

      clearCart();
    } else {
      toast.error(response.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (res.status === 400) {
        clearCart();
        setTimeout(() => {
          router.push({
            pathname: "/",
          });
        }, 4000);
      }
    }
  };
  return (
    <div className={`container mx-auto mt-24 px-2 ${loading && "cursor-wait"}`}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <div className="">
        <h2 className="font-bold text-xl my-4">1. Delivery Details</h2>
        <div className="mx-auto flex font-semibold my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email Address
              </label>
              {user && (
                <input
                  readOnly
                  value={user.email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border  border-gray-300 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-not-allowed"
                />
              )}
              {!user && (
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-2 w-full font-semibold my-2">
          <div className=" mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              onChange={handleChange}
              value={address}
              cols="30"
              rows="10"
              id="address"
              name="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        <div className="mx-auto flex font-semibold my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                onChange={handleChange}
                value={phone}
                type="number"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600"
              >
                Pincode
              </label>
              <input
                onChange={handleChange}
                value={pincode}
                type="number"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex font-semibold my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                value={state}
                onChange={handleChange}
                type="text"
                id="state"
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                value={city}
                onChange={handleChange}
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-xl my-4 ">2.Review Cart Items</h2>
        <div className=" w-auto  px-8 py-2 sidecart  bg-blue-100 rounded-md mb-6">
          <ol className=" list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="text-center m-2 text-gray-500 ">
                No items in the cart. 😢
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex justify-between items-center my-2">
                    <div className="flex items-center justify-start">
                      <div className="mr-2 flex font-semibold">
                        <img
                          src={cart[k].img}
                          alt="ecommerce"
                          className=" rounded-full object-contain object-top border bg-white shadow-lg h-16 w-16"
                        />
                      </div>
                      <div className="font-semibold">
                        {cart[k].name} ({cart[k].size}/{cart[k].variant})
                      </div>
                    </div>
                    <div className="flex  items-center justify-center font-semibold bg-white rounded-md my-2 p-2 ">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
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
                            cart[k].variant
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
        </div>
        <button
          disabled={disabled}
          onClick={handleClick}
          className="disabled:bg-indigo-400 disabled:cursor-not-allowed flex my-4 text-white bg-indigo-600 hover:bg-indigo-500 border-0 py-2 px-2 focus:outline-none rounded text-md "
        >
          <BsBagCheckFill className="m-1" />
          Pay ₹{subTotal}{" "}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
