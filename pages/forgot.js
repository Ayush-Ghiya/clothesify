import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { HiLockClosed } from 'react-icons/hi';

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    
  }, [router]);

  const resetPassword = async () => {
    if (password === cpassword) {
      let data = {
        password,
        sendMail: false,
      };
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let response = await res.json();
      if (response.success == true) {
        console.log("Password has been changed");
      } else {
        console.log("Error ");
      }
    }else{
      console.log("Enter correct passwords ");
    }
  };
  const sendEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    if (response.success == true) {
      console.log("Password reset instruction have been sent to your email ");
    } else {
      console.log("Error ");
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
  };
  return (
    <div className="container mt-24 mx-auto min-h-screen">
      <div className="flex md:flex-row flex-col min-h-full items-center justify-center md:justify-around py-12 px-4 sm:px-6 lg:px-8">
        <div className="img md:w-1/2 w-full max-w-md space-y-8">
          <Image
            className="mx-auto  w-[18rem] h-auto md:h-[60vh] md:w-auto"
            src="/forgot-password.gif"
            alt="Clothesify"
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="md:w-1/2 w-max max-w-md space-y-8 md:border md:p-8 rounded-md md:bg-slate-100">
          <div>
            <Image
              className="mx-auto  w-auto mb-10 hidden md:block"
              src="/main.png"
              alt="Clothesify"
              width={150}
              height={10}
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Recover Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href={"/login"} legacyBehavior>
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </a>
              </Link>
            </p>
          </div>
          {router.query.token && (
            <div className="mt-8 sformpace-y-6">
              
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label htmlFor="cpassword" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={cpassword}
                      onChange={handleChange}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                  disabled={!(password && password === cpassword)}
                    onClick={resetPassword}
                    type="submit"
                    className="group relative flex disabled:bg-indigo-300 w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>
                </div>
                {password != cpassword && <code className="text-red-600">Passwords dont match</code>}
                {password && password == cpassword && <code className="text-green-600">Passwords matched</code>}
             
            </div>
          )}
          {!router.query.token && (
            <div className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none  rounded-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={sendEmail}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgot;
