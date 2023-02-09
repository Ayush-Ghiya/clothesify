import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null,email: null });
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      if (token) {
        setUser({ value: token.token,email:token.email });
      }
      setKey(Math.random());
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null });
    router.push("/");
  };
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };
  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    if(Object.keys(cart).length==0){

      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const removeFromCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    console.log("Cart has been clear");
    setCart({});
    saveCart({});
  };
  const buyNow = (itemCode, qty, price, name, size, variant, img) => {
    saveCart({});
    let newCart = cart;
    newCart[itemCode]={ qty: 1, price, name, size, variant, img };
    // let newCart = {  qty: 1, price, name, size, variant, img  };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };
  return (
    <>
     <Head>
        <title>Clothesify{router.pathname}</title>
        <meta name="description" content="Clothesify.com- Coded wears" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Clothesify-1.png" />
      </Head>
      <LoadingBar
        color="#0046E5"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && (
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      )}
      <Component
        
        buyNow={buyNow}
        cart={cart}
        logout={logout}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
