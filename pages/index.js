import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="md:mt-10 mt-20">
      <Head>
        <title>Clothesify</title>
        <meta name="description" content="Clothesify.com- Coded wears" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Clothesify-logos.jpeg" />
      </Head>
      <div>
        <img src="/temp.webp" alt="temp" className="mx-auto"/>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Dress Coded with Clothesify.
              </h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                Whatever you want is coded on cloths.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/3 md:w-1/2 w-full p-4 ">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-3xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <desc></desc>
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14.004 6a2 2 0 1 0 -4 0c.003 1.667 .67 3 2.004 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Premium Clothing
                  </h2>
                  <p className="leading-relaxed text-base">
                  Our tshirts are 100% made of cotton.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 w-full p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Finest Cutting
                  </h2>
                  <p className="leading-relaxed text-base">
                    Our cloths are made by our own tailor with good experience.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 w-full p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Customer Support
                  </h2>
                  <p className="leading-relaxed text-base">
                    We provid 24/7 customer support.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 w-full p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                    
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 640 512"
                      className="text-2xl"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Free Shipping
                  </h2>
                  <p className="leading-relaxed text-base">
                  We ship all over India for FREE.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 w-full p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      className="text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Exciting Offers
                  </h2>
                  <p className="leading-relaxed text-base">
                  We provide amazing offers & discounts on our products.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 w-full p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-800 mb-4">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                   Data Protection Guarantee
                  </h2>
                  <p className="leading-relaxed text-base">
                    We assure you that we dont save any payment details or your card information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
