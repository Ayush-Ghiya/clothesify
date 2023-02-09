/* eslint-disable @next/next/no-img-element */
import mongoose from "mongoose";
import ProductDetails from "../../models/ProductDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Post = ({ buyNow, addToCart, product, variants,error }) => {
  
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(product?.color);
  const [size, setSize] = useState(product?.size);


  useEffect(() => {
    if(!error)
    {setColor(product.color)
    setSize(product.size)}
  }, [router.query])
  
  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinsJson = await pins.json();

    if (Object.keys(pinsJson).includes(pin)) {
      toast.success('Yay! We do deliver to your address.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setService(true);
    } else {
      setService(false);
      toast.error('Sorry! We do not deliver to your address yet.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };
  const refreshVariants = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    router.push(url)
  };

 if(error==404){
  return <Error statusCode={404}/>
 }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}{" "}
                <span className="text-gray-500 text-sm title-font">
                  ({product.size}/{product.color})
                </span>
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "white");
                        }}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none ${
                          color === "white" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "red");
                        }}
                        className={`border-2 rounded-full bg-red-700 w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "green");
                        }}
                        className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "blue");
                        }}
                        className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "yellow");
                        }}
                        className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "yellow" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "black");
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("purple") &&
                    Object.keys(variants["purple"]).includes(size) && (
                      <button
                        onClick={(e) => {
                          refreshVariants(size, "purple");
                        }}
                        className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "purple" ? "border-black" : "border-gray-30"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariants(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variants[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeinejoin="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex ">
                {!product.availableQty<=0 && <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>}
                {product.availableQty<=0 && <span className="title-font font-medium text-2xl text-gray-900">
                  Out of stock!
                </span>}
                <button
                  onClick={(e) => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color,
                      product.img
                    );
                  }}
                  disabled={product.availableQty<=0}
                  className="flex disabled:bg-indigo-300 ml-3 md:ml-auto text-white bg-indigo-500 border-0 py-2 px-5 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color,
                      product.img
                    );
                    
                  }}
                  disabled={product.availableQty<=0}
                  className="flex disabled:bg-indigo-300 ml-2 md:ml-8 text-white bg-indigo-500 border-0 py-2 px-5 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  type="number"
                  placeholder="Enter pincode"
                  className="appearance-none px-2 border-2 border-indigo-100 rounded-md focus:bg-indigo-100"
                />
                <button
                  onClick={checkServiceability}
                  className="flex ml-auto text-white  bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Check
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let error=404;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await ProductDetails.findOne({ slug: context.params.slug });
  if(product==null){
    return {
      props: {
        error:error
      }
  }}
  let variants = await ProductDetails.find({ title: product.title,category: product.category });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Post;
