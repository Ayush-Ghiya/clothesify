/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = ({ props, resdata }) => {
  const [data, setData] = useState(resdata.order);
  
  const router = useRouter();
  const {
    query: { orderid },
  } = router;
  const date = new Date(data.createdAt)
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="mt-8">
      <section className="text-gray-600 body-font overflow-hidden ">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CLOTHESIFY.COM
              </h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">
                Order ID: {data.orderid}
              </h1>

              <p className="leading-relaxed mb-4">
                Your order has been placed successfully placed.Your Payment
                status is <code>{data.status}</code>.
              </p>
              <p className="leading-relaxed mb-4">
                Order placed ON: <code>{date.toLocaleString("en-US",options)}</code>.
              </p>
              {/* <div className="flex mb-4">
                <a className="flex-grow  text-center w-3/6  border-b-2 border-gray-300 py-2 text-lg px-2">
                  Item Description
                </a>
                <a className="flex-grow  text-center w-1/6 border-b-2 border-gray-300 py-2 text-lg px-2">
                  Quantity
                </a>
                <a className="flex-grow text-center  w-1/6 border-b-2 border-gray-300 py-2 text-lg px-2">
                  Item Total
                </a>
              </div> */}

<div className="overflow-auto lg:overflow-visible">
  <table className="min-w-full">
    <thead className="">
      <tr>
        <th
          scope="col"
          className="text-sm font-medium  text-gray-900 px-2 py-4 text-left"
        >
          Item Description
        </th>

        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-2 py-4 text-center"
        >
          Quantity
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-2 py-4 text-center"
        >
          Item Total
        </th>
        
      </tr>
    </thead>
    <tbody>
              {Object.keys(data.products).map((product) => {
                return (
                        <tr
                        key={data.products[product]}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                          <img src={data.products[product].img} alt="" width={50} height={50} className="object-cover"/>
                       {data.products[product].name} (
                      {data.products[product].size}/
                      {data.products[product].variant})
                          </td>
                          <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap text-center">
                            {data.products[product].qty}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap text-center">
                          ₹
                       {data.products[product].price *
                         data.products[product].qty}
                          </td>
                          
                        </tr>
                           );
               })}
                      </tbody>
                    </table>
                  </div>

              

              <div className="flex mt-10">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: ₹{data.amount}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            {/* <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorder`, {
    method: "POST", // or 'PUT'

    body: context.query.orderid,
  });
  const resdata = await res.json();
  return {
    props: { resdata: JSON.parse(JSON.stringify(resdata)) }, // will be passed to the page component as props
  };
}

export default Order;