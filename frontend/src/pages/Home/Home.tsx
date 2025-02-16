import React, { JSX, useEffect, useState } from "react";
import Category from "../../components/category/Category.tsx";
import Slider from "../../components/slider/Slider.tsx";
import Top from "../../components/top/Top.tsx";
import { useLocation } from "react-router-dom";
import "./Home.css";
import useFetch from "../../utils/fetch-data.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, initialCart, setProducts, updateCartQuantity } from "../../Redux/ActionCreator.ts";
import { State } from "../ProductDetails/ProductDetails.tsx";
export interface Product {
  product_id: string;
  name: string;
  brand: string;
  category_id: string;
  description: string;
  price: number;
  size: string;
  rating: number;
  stock_quantity: number;
  image_url: string;
  material: string | null;
  color: string | null;
  style: string | null;
  subcategory_name: string | null;
}
/**
 * 
 * @returns {JSX.Element}
 */
const Home:React.FC = () => {
  interface state {
    brand: number;
    grocery: number;
    mobiles: number;
    electronics: number;
    fashion: number;
  }

  const [direction, setDirection] = useState<state>({
    brand: 0,
    grocery: 0,
    mobiles: 0,
    electronics: 0,
    fashion: 0,
  });
  
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state:State)=>state.user)
  const products = useSelector((state: State)=>state.products);
 /**
  * This effect fetch products and set into redux
  */
 useEffect(()=>{
  const fetchData = async() => {
    try{
      const response = await fetch(`http://localhost:5011/products`,{method:'GET'})
      const value = await response.json()
      // setProduct([...value])
      dispatch(setProducts([...value]))
     
    }catch(err){
      throw err;
    }
  }
  setTimeout(() => {
    fetchData()
  }, 1000);
  
 },[])
  
  // const {state, error} = useFetch('http://localhost:5011/products',{method:'GET'});


 
  // let products:Product[] = [];
  // if(state){
  //   products = state;
  //   dispatch(setProducts([...products]));
  // }else{
  //   if(error){
  //     return <div>{"Please refresh the page"}</div>
  //   }
    
  // }
  

  if(products.length == 0){
    return <div style={{textAlign:"center",margin:"25vh"}}>Loading...</div>
  }
  const brand = products.filter((pro) => pro.rating > 4.7);
  const grocery = products.filter((pro) => pro.category_id === "C001");
  const mobiles = products.filter((pro) => pro.category_id === "C002");
  const fashion = products.filter((pro) => pro.category_id === "C003");
  const electronics = products.filter((pro) => pro.category_id === "C004");
  const appliances = products.filter((pro) => pro.category_id === "C006");

  const product = [brand, grocery, mobiles, fashion, electronics, appliances];
  /**
   * 
   * @param e event param
   * return 
   */
  const handleInd = (e) => {
    console.log(e.target.value);
    const l: string = e.target.dataset.id;

    if (e.target.value == "next") {
      setDirection((prev) => {
        console.log(l);
        let value = prev[l] == 2 ? 2 : prev[l] + 1;

        return { ...prev, [l]: value };
      });
    }

    if (e.target.value == "prev") {
      setDirection((prev) => {
        let value = prev[l] == 0 ? 0 : prev[l] - 1;
        return { ...prev, [l]: value };
      });
    }
  };
  
  return (
    <>
      <Category noImg={" "} />
      <Slider />
      {["brand", "grocery", "mobiles", "fashion", "electronics"].map(
        (val, i) => (
          <div key={val} className="top_product_home">
            <Top
              key={i}
              noOfProd={direction[val]}
              brandName={val}
              product={product[i]}
            />
            <button
              className={`top_product_home_but-next ${
                direction[val] == 2 ? "invisible" : ""
              }`}
              onClick={(e) => handleInd(e)}
              data-id={val}
              value={"next"}
            >
              <img src="/images/icon/arrow-down.svg" alt="" />
            </button>
            <button
              className={`top_product_home_but-prev ${
                direction[val] == 0 ? "invisible" : ""
              }`}
              onClick={(e)=>handleInd(e)}
              data-id={val}
              value={"prev"}
            >
              <img src="/images/icon/arrow-down.svg" alt="arrowButton" />
            </button>
          </div>
        )
      )}
    </>
  );
};

export default Home;
