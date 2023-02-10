import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = ({logout}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [indicate, setIndicate] = useState();
  const [currentpassword, setCurrentpassword] = useState("");
  const [user, setUser] = useState()

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"))
    if(user && user.token){
      setUser(user)
      setEmail(user.email)
      fetcher(user)
    }
    if (!user) {
      router.push("/");
    }
    

  }, [email, router]);


  const fetcher=async(user)=>{
    let data = { jwt:user.token};
    let res = await fetch(`/api/getuser`, {
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
    
  }

  const handleUserSubmit = async() =>{
    
    let data = { jwt:user.token,address,name,phone,pincode};
    let res = await fetch(`/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
     let response = await res.json();
 
    if (response.success == true) {
      toast.success("Details updated succesfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      

   
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

      
    }
    
  }
 
  const handlePasswordSubmit = async() =>{
    
    let data = { jwt:user.token,password,currentpassword,cpassword};
    let res = await fetch(`/api/updatepassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
     let response = await res.json();
 
    if (response.success == true) {
      toast.success("Password updated succesfully", {
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
        logout();
        router.push({
          pathname: "/login"
        });
      }, 2000);

   
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
      setPassword('')
      setCpassword('')
      setCurrentpassword('')

    }
    
  }
 
  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
      
    }
     else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
     else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
     else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
     else if (e.target.name === "currentpassword") {
      setCurrentpassword(e.target.value);
    }
  };
  
  return (
    
    <div className="container  mt-32 md:mt-20  mx-auto">
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
      <h1 className="text-3xl text-center font-bold">Update your Account</h1>
      <div className="">
        <h2 className="font-bold text-xl my-4">1.Default Delivery Details</h2>
        <div className="mx-auto flex font-semibold my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
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
                Email
                <code className="text-slate-400"> (cannot be updated)</code>
              </label>

              {user &&  <input
                readOnly
                value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border  border-gray-300 text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-not-allowed"
              />}
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
                placeholder="Your 10 digit phone number"
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
        <button onClick={handleUserSubmit} className="disabled:bg-indigo-400  flex my-4 text-white bg-indigo-600 hover:bg-indigo-500 border-0 py-2 px-2 focus:outline-none rounded text-md ">
          Submit
        </button>
      </div>



      <div className="">
        <h2 className="font-bold text-xl my-4">2. Change password</h2>
        <div className="mx-auto flex font-semibold my-2">
          <div className="px-2 w-1/3">
            <div className=" mb-4">
              <label htmlFor="currentpassword" className="leading-7 text-sm text-gray-600">
                Current Password
              </label>
              <input
                onChange={handleChange}
                value={currentpassword}
                type="password"
                id="currentpassword"
                name="currentpassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className=" mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                New password
         
              </label>

              <input
                onChange={handleChange}
            
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className=" mb-4">
              <label
                htmlFor="cpassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm new password 
           
              </label>

              <input
                onChange={handleChange}
                value={cpassword}
                type="password"
                id="cpassword"
                name="cpassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
           
        <button onClick={handlePasswordSubmit} className="disabled:bg-indigo-400  flex my-4 text-white bg-indigo-600 hover:bg-indigo-500 border-0 py-2 px-2 focus:outline-none rounded text-md ">
          Submit
        </button>
      </div>
    </div>
  );
};


export default Myaccount;
