import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
  addToCart,
} from "../../Redux/ActionCreator.ts";
import { useNavigate } from "react-router-dom";
import { State } from "../ProductDetails/ProductDetails.tsx";
import Category from "../../constant/category.ts";
import Categorys from "../../components/category/Category.tsx";
import useFetch from "../../utils/fetch-data.tsx";
/**
 * This is store from where user can see which product selected to purchase
 * @returns 
 */
const Cart = () => {
  const location = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart);
  const user = useSelector((state: State) => state.user);
  // const pro = useSelector((state)=>state.products);
  const [fetchD, setFetchD] = useState(0)

    useEffect(() => {
      const updateQuantity = async () => {
        try {
         const response =  await fetch(`http://localhost:5011/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id: user.id, items: cart.items})
          });
         const value = await response.json();
          console.log(value,"dddd");
        } catch (err) {
          console.error('Error updating cart:', err);
        }
      };
      updateQuantity();
  }, [fetchD])

const handleUdateQuantity = (e) => {
    const item = cart.items.filter(
      (item) => item.product.product_id === e.target.dataset.id
    );
    let quantity;
    if (e.target.dataset.button === "max") {
      quantity = item[0].quantity + 1;
    }
    if (e.target.dataset.button === "min") {
      if (item[0].quantity === 1) {
        quantity = 1;
      } else {
        quantity = item[0].quantity - 1;
      }
    }
    dispatch(updateCartQuantity(e.target.dataset.id, quantity));
    setFetchD(fetchD + 1)
  };
// // handle clear cart
//   const handleClearCart = () => {
//     dispatch(clearCartItem());
//   };

// Handle Removing Item
  const handleRemoveItem = (e) => {
    const prodId = e.target.dataset.id;
    console.log(prodId);
    dispatch(removeFromCart(prodId));
    setFetchD(fetchD + 1)
  };

// Handle place order
  const handlePlaceOrder = (e) => {
    location("/checkout");
  };

  return ( 
    !user?<p style={{textAlign:"center"}}>OOPS! USER NOT FOUND. PLEASE LOGIN</p>:
    <>
    <Categorys noImg=""/>
    <div className="cart-page">
      
       {cart.items.length === 0 ? (
        <>
        {/* <Categorys noImg={""}/> */}
        <p>Your cart is empty!</p>
        </>
      ) : 
     ( <>
     <h4>Flipkart</h4>
      <div className="user__info_in_cart">
        <p>Login to: <span>{user.username}</span></p>
      </div>
          <div className="cart-items">
            <div className="description_section">
              {cart.items.map((item) => (
                <div className="cart-item" key={item.product.product_id}>
                  <div className="right">
                    <div>
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="item-image"
                      />
                      <div className="quantity-controls">
                        <button
                          className="control-butt"
                          data-button={"min"}
                          data-id={item.product.product_id}
                          onClick={(e) => handleUdateQuantity(e)}
                        >
                          -
                        </button>
                        <p className="quantity-variable">{item.quantity}</p>
                        <button
                          className="control-butt"
                          data-button={"max"}
                          data-id={item.product.product_id}
                          onClick={(e) => handleUdateQuantity(e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-details">
                      <Link 
                      className="link"
                        to={`/products/product-details?key=${item.product.product_id}`}
                      >
                        {" "}
                        <h2>
                          {item.product.name} {item.product.description.substring(0,20)}...
                        </h2>
                      </Link>
                      <p>
                        <h3> Rs.{item.totalPrice}</h3>
                      </p>
                      <button
                        className="remove-butt"
                        data-id={item.product.product_id}
                        onClick={(e) => handleRemoveItem(e)}
                      >
                        REMOVE ITEM
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="left_cart">
                {/* <div className="cart-summary">
            <h3>Total: Rs{cart.total}</h3>
          </div> */}
                {/* This section from checkout page */}
                <div className="checkbox__product_total_price">
                  <div className="checkout_price_details">
                    <div className="checkout__price">
                      <p>Price </p>
                      <p>Rs. {cart.total} </p>
                    </div>
                    <div className="checkout__price">
                      <p>Delhivery Charges</p>
                      <p>Rs FREE</p>
                    </div>
                    <div className="checkout__price">
                      <p>Secure Packing Charge</p>
                      <p>Rs 0</p>
                    </div>
                    <div className="checkout__price">
                      <h3>
                        {" "}
                        <p>Total Amount</p>
                      </h3>
                      <h3>
                        {" "}
                        <p>Rs.{cart.total} </p>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
       )}
      <div   className={`cart_button_section `}>
        <button className="invisible" >
          Clear Cart
        </button>
        <button id={`place__button`} style={cart.items.length === 0 ? {display:"none"}:{} }  onClick={(e) => handlePlaceOrder(e)}>Place Order</button>
      </div>
    </div>
    </>
);
};

export default Cart;
