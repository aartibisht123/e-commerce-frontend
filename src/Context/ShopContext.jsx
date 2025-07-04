import React, { createContext, useEffect, useState } from "react"



export const  ShopContext = createContext(null);

  const getDefaultCard = ()=>{
        let cart = {};
       for (let index = 0; index < 300+1; index++) {
        cart[index] = 0 ;
          }

          return cart ;
    }

const ShopContextProvider = (props) =>{

const [all_product, setAll_Product] = useState([]);

const [cartItems, setCartItems] = useState(getDefaultCard());

useEffect(()=>{
fetch('https://e-commerce-backend-1-ix83.onrender.com/allproduct').then((response)=>response.json()).then((data)=>setAll_Product(data))

if(localStorage.getItem('auth-token')){
    fetch('https://e-commerce-backend-1-ix83.onrender.com/getcart',{
        method:'POST',
       headers:{
            Accept:'application/from-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
        },
body: "",

    }).then((response)=>response.json()).then((data)=>setCartItems(data));
}
},[])


   const addTOCart = (itemId) =>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
// console.log(cartItems);
if(localStorage.getItem('auth-token')){
    fetch('https://e-commerce-backend-1-ix83.onrender.com/addtocart',{
        method:'POST',
        headers:{
            Accept:'application/from-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
            
        },
        body:JSON.stringify({"itemId":itemId}),
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}
   };

      const removeFromCart = (itemId) =>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
if(localStorage.getItem('auth-token')){
      fetch('https://e-commerce-backend-1-ix83.onrender.com/removefromcart',{
        method:'POST',
        headers:{
            Accept:'applocation/from-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
            
        },
        body:JSON.stringify({"itemId":itemId}),
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}
   };

const getTotalCartAmount = () => {
  let totalAmount = 0;

  if (!Array.isArray(all_product) || all_product.length === 0) {
    console.warn("Product list is empty. Skipping total calculation.");
    return 0;
  }

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = all_product.find(
        (product) => Number(product.id) === Number(item)
      );

      if (!itemInfo) {
        console.warn(`Product with id ${item} not found in all_product`);
        continue; // Skip to next item
      }

      if (typeof itemInfo.new_price !== "number") {
        console.warn(`Product with id ${item} has invalid price:`, itemInfo);
        continue;
      }

      totalAmount += itemInfo.new_price * cartItems[item];
    }
  }

  return totalAmount;
};


  
   // const getTotalCartAmount = () =>{
   //  let totalAmount = 0;
   //  for(const item in cartItems){
   //      if(cartItems[item]>0){
   //          let itemInfo = all_product.find((product)=>product.id===Number(item))
   //          totalAmount += itemInfo.new_price * cartItems[item];
   //      } 
   //  }
   //      return totalAmount;
   // }

   // const getTotalCartItems = () =>{
   //  let totalItem = 0;
   //  for(const item in cartItems){
   //      if(cartItems[item]>0){
   //          totalItem += cartItems[item];
   //      }
   //  }
   //  return totalItem;
   // }


       const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTOCart,removeFromCart}; 
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
