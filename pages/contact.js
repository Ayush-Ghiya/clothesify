import React from 'react'

const Contact = () => {
  return (
    <div class="min-h-screen mt-28">
      <div class="max-w-screen-xl mt-9 px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100  rounded-lg shadow-lg">
        <div class="flex flex-col justify-center items-center">
          <div>
            <h2 class="text-center text-3xl font-bold leading-tight">Lets talk about everything!</h2>
            <img class="h-40 mx-auto py-2 object-fit" src="main.png"/>
              <p class="text-center text-xl lg:text-2xl font-medium leading-tight">Feel free to ask us anything!
              </p>
              <p class="py-4 px-4 text-md lg:text-md leading-tight text-center">If you have any questions regarding  your order, feel free to send email, call or Whatsapp us on our support number</p>

              <div class="flex flex-col md:flex-row justify-between">
                <div class="text-center px-5 md:px-0 md:text-left py-10">
                  <span class="font-bold">Corporate Address</span>
                  <br/>Dummy Address
                  <br/>94, Ghair Saifuddin Domehla Road,
                  <br/>Rampur, Uttar Pradesh, 244901
                  <br/>
                  </div>
                  <div class="text-center px-5 md:px-0 md:text-left py-10">
                    <span class="font-bold">Customer Support</span>
                    <br/>Call/Whatsapp: 
                    <a class="underline text-blue-600 " rel="noreferrer" target="_blank" href="https://wa.me/9999999999?text=Hi,%20I%20need%20to%20enquire%20about%20products%20on%20CodesWear">
                      +91 999 999 9999</a>
                      <br/>Email: dummy@Clothesify.in
                      <br/>Morning: 10AM - 8PM<br/>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
    
  )
}

export default Contact