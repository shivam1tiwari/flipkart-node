import React from "react";
import './ProductListCard.css'
import { useDispatch, UseDispatch,useSelector } from "react-redux";
import { addToCart } from "../../Redux/ActionCreator.ts";
import { useNavigate } from "react-router-dom";
import { State } from "../../pages/ProductDetails/ProductDetails.tsx";

const ProductListCard = ({product}) =>{
 
const location = useNavigate();  
const dispatch = useDispatch();
const cart = useSelector((state:State) => state.cart );
const isLogin = useSelector((state:State) => state.user )
console.log(product,"this is in product list card")
const availablePro = cart.items.filter((val)=>val.product.product_id === product.product_id);
const isAvailable = (availablePro.length !== 0);  

  const handleAddToCart = (e) => {
   
    if(!isLogin)return(location('/login'));
    console.log("after null")  
    dispatch(addToCart(product))
    location('/cart')
    
  }

  const handleProductDetails = (e) =>{
    console.log(e.target.dataset.id)
    const proId = e.target.dataset.id;
    location(`/products/product-details?key=${proId}`) 
  }
  return(
    <div  className="productListCard_container">
      <div className="productListCard_container__content">
       <div data-id={product.product_id} onClick={(e)=>handleProductDetails(e)} className="productListCard_container__content-img">
        <img  data-id={product.product_id} src={product.image_url} alt={product.name} />
        </div> 
        <div className="productListCard_container__content-name">
          <h5>{product.name}</h5>
         <p>{Object.keys(product.attributes).map((val)=><span className="attributes_D">{" "}{product.attributes[val]}</span>)}</p> 
        </div>
        <div className="productListCard_container__content-rating">
          <p>{product.rating}*</p>
        </div>
        <p><span style={{fontWeight:600}}>Rs </span> {product.price}</p>
        {!isAvailable?<button id="add_to_cart_D" data-product = {{...product}} onClick={(e)=>handleAddToCart(e)}  >ADD TO CART</button>:""}
        {/* <button data-id={product.product_id} onClick={(e)=>handleAddToCart(e)} >ADD TO CART</button> */}
        <p style={{fontSize:".8rem"}}>Free Delivery</p>
      </div>
    </div>
  )
}

export default ProductListCard;