import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  let d= new Date();
  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href={"/"} legacyBehavior>
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Image src="/main.png" alt="logo" width={256} height={10}/>
              
            </a>
            </Link>
            <p className="mt-2 text-sm text-gray-500 px-5">
              Premium Quality Clothing and Accessories
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                SHOP
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/tshirts'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">Tshirts</a></Link>
                </li>
                <li>
                  <Link href={'/hoodies'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">Hoodies</a></Link>
                </li>
                <li>
                  <Link href={'/stickers'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">Stickers</a></Link>
                </li>
                <li>
                  <Link href={'/mugs'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">Mugs</a></Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CUSTOMER SERVICE
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'/contact'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">Contact Us</a></Link>
                </li>
                <li>
                  <Link href={'/about'} legacyBehavior><a className="text-gray-600 hover:text-gray-800">About Us</a></Link>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Return Policy</a>
                </li>
                
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                POLICY
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
                </li>
                
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {d.getFullYear()} Clothesify.com — All Right Reserved.
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
