/* eslint-disable @next/next/no-img-element */
import mongoose from "mongoose";
import ProductDetails from "../models/ProductDetails";
import Link from "next/link";
import React from "react";

const mugs = ({ mugs }) => {

  return (
    <div className="">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(mugs).length === 0 && <p>mugs are currently out of stock. New Stock coming Soon.</p>}
            {Object.keys(mugs).map((product) => {
              return (
                <div
                  className="lg:w-1/5 md:w-1/2 p-2 w-full shadow-lg m-5"
                  key={mugs[product]._id}
                >
                  <Link href={"/product/" + mugs[product].slug}>
                    <img
                      alt="ecommerce"
                      className="m-auto h-[30vh] md:h-[36vh] block object-cover  relative  rounded overflow-hidden"
                      src={mugs[product].img}
                    />

                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {mugs[product].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {mugs[product].title}
                      </h2>
                      <p className="mt-1">{mugs[product].price}</p>
                      <div className="mt-1">
                        {mugs[product].size.includes("S") && (
                          <span className="border border-gray-300 text-gray-500 px-2 mr-1">
                            S
                          </span>
                        )}
                        {mugs[product].size.includes("M") && (
                          <span className="border border-gray-300 text-gray-500 px-2 mr-1">
                            M
                          </span>
                        )}
                        {mugs[product].size.includes("L") && (
                          <span className="border border-gray-300 text-gray-500 px-2 mr-1">
                            L
                          </span>
                        )}
                        {mugs[product].size.includes("XL") && (
                          <span className="border border-gray-300 text-gray-500 px-2 mr-1">
                            XL
                          </span>
                        )}
                        {mugs[product].size.includes("XXL") && (
                          <span className="border border-gray-300 text-gray-500 px-2 mr-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        {mugs[product].color.includes("red") && (
                          <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mugs[product].color.includes("blue") && (
                          <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mugs[product].color.includes("black") && (
                          <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mugs[product].color.includes("yellow") && (
                          <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {mugs[product].color.includes("green") && (
                          <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await ProductDetails.find({ category: "mugs" });
  let mugs = {};
  for (let item of products) {
    if (item.title in mugs) {
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }

      if (
        !mugs[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        mugs[item.title].size.push(item.size);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { mugs: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
  };
}
export default mugs;
