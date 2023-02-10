
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const router = useRouter();
  const [allorders, setAllorders] = useState();
    useEffect(() => {
      const fetchOrders = async()=>{
        let a =  await fetch(`/api/myorders`, {
          method: "POST", // or 'PUT'
          headers:{
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({token:localStorage.getItem('token')}),
        });
        let res =  await a.json()
        setAllorders(res.orders);
      }
      if(!localStorage.getItem('token')){
        router.push('/')
      }else{
        fetchOrders();
       
      }
     
    
      
    }, [router])
    
  return (
    <div className="container mt-32 md:mt-12    mx-auto ">
      <h1 className="font-semibold text-xl text-center p-8">My Orders</h1>
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
            
            {!(allorders==0) && <div className="overflow-hidden min-h-screen">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #id
                    </th>
                    
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {allorders?.map((item)=>{

                  return(<tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.orderid}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ₹ {item.amount}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:text-blue-500">
                      <Link href={'/order?orderid='+item.orderid}>Details</Link>
                    </td>
                  </tr>)
                  })}

                  
                </tbody>
              </table>
            </div>}
            {allorders==0 && <div className="text-center m-2 text-gray-500 ">
            No orders yet. 😢
          </div>}
          </div>
        </div>
      </div>
    </div>
  );
};
// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   let orders = await OrderB.find({ });
//   return {
//     props: {
//       orders:orders
//     }, // will be passed to the page component as props
//   };
// }

export default Orders;
