import React, { RefObject, useEffect, useRef } from "react";
import "./Checkout.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State } from "../ProductDetails/ProductDetails";
import EditNewForm from "../Profile/EditNewForm.tsx";
import Category from "../../components/category/Category.tsx";
import { setUser } from "../../Redux/ActionCreator.ts";

const Checkout = () => {
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [error, setError] = useState({
    address: "",
    method: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const cart = useSelector((state: State) => state.cart);
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const location = useNavigate();
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch('http://localhost:5011/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: 5 }),
        });
        if (!response.ok) {
          throw new Error(`Error fetching address: ${response.statusText}`);
        }
        const address = await response.json();
        console.log("rajuuu")
        dispatch(setUser({...user, ["address"]: address}))
        
      } catch (error) {
        console.error('Fetch address error:', error);
      }

    };
   setTimeout(()=>{fetchAddress();},500) 
  //  setUserInfo({
  //   ...user,["address"]:address
  // });
  }, [editAddress]);
  
  const handleAddAddress = (e) => {
    // e.preventDefault();
    // setOpenForm(!openForm);
    setEditAddress(!editAddress);
    setFormData({
      id:"",
      name: "",
      mobile: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
    })
  };
  // 

  const handleNewAddress = () => {
    setEditAddress(!editAddress);
  };

  // const handleFormSubmit = () => {
  //   console.log(ref1.current?.value);
  //   const obj = {
  //     ...userInfo,
  //     address: [...userInfo["address"], ref1.current?.value],
  //   };
  //   setUserInfo({
  //     ...userInfo,
  //     address: [...userInfo["address"], ref1.current?.value],
  //   });
  //   localStorage.setItem("user", JSON.stringify(obj));
  //   setEditAddress(!editAddress);
  // };
  const handleOrderAddres = (e) => {
    const { value } = e.target;
    ref2.current = JSON.parse(value);
    setError({ ...error, address: "" });
    console.log(ref2.current);
  };

  const handleOrderPayMeth = (e) => {
    const { value } = e.target;
    ref3.current = value;
    setError({ ...error, method: "" });
  };

  // const handlePay = (e) => {
  //   if (!ref2.current && !ref3.current)
  //     return setError({
  //       ...error,
  //       address: "Address required",
  //       method: "Payment method required",
  //     });
  //   if (!ref2.current)
  //     return setError({ ...error, address: "Address required" });
  //   if (!ref3.current)
  //     return setError({ ...error, method: "Payment method required" });

  //   const now = new Date();
  //   const day = String(now.getDate()).padStart(2, "0");
  //   const month = String(now.getMonth() + 1).padStart(2, "0");
  //   const year = now.getFullYear();

  //   const orderDate = `${day}-${month}-${year}`;
  //   const obj = {};
  //   obj["date"] = orderDate;
  //   obj["name"] = userInfo["username"];
  //   obj["email"] = userInfo["email"];
  //   obj["address"] = ref2.current;
  //   obj["orderId"] = "Z" + cart.total + ref3.current;
  //   obj["items"] = cart.items;
  //   obj["payment"] = ref3.current;
  //   obj["total"] = cart.total;
  //   if (localStorage.getItem("orders")) {
  //     const array = JSON.parse(localStorage.getItem("orders")!);
  //     localStorage.setItem("orders", JSON.stringify([...array, obj]));
  //   } else {
  //     localStorage.setItem("orders", JSON.stringify([obj]));
  //     localStorage.removeItem("cart");
  //   };
  //   location("/orders");
  // };
  /**
   * 
   * @param e event object
   * This function handle placed order
   * @returns 
   */
  const handlePay = async (e) => {
    
    if (!ref2.current && !ref3.current)
      return setError({
        ...error,
        address: "Address required",
        method: "Payment method required",
      });
    if (!ref2.current)
      return setError({ ...error, address: "Address required" });
    if (!ref3.current)
      return setError({ ...error, method: "Payment method required" });
    
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
  
    const orderDate = `${day}-${month}-${year}`;
    const orderObj = {
      date: orderDate,
      name: user["username"],
      email: user["email"],
      address: ref2.current,
      orderId: "Z" + cart.total + ref3.current,
      items: cart.items,
      payment: ref3.current,
      total: cart.total,
    };
   
    try {
      // Send the order to the server to store in the database
      console.log("hh")
      const response = await fetch('http://localhost:5011/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderObj),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      // Redirect or handle success
      location("/orders");
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
 
  return Object.keys(user).length == 0 ? (
    <p>Loading...</p>
  ) : (<>
    <Category noImg={""}/>
    <div className="checkout__container">
      <div className="checkout__box">
        <div className="checkout__content">
          <div className="checkout__user__information">
            <div className="checkout__user__information_content">
              <div className="checkout__login__information">
                <p>
                  <b>1</b>. LOGIN
                  <ul>
                    <li>{user["username"]}</li>
                  </ul>
                </p>
              </div>
              <div className="info__common checkout__user__address ">
                <div className="address__header">
                  <p>
                    <b>2</b>. DELIVERY ADDRESS
                  </p>
                  {editAddress ? (
                    <button className="invisible" >OK</button>
                  ) : (
                    <button
                      className=""
                      onClick={() => handleNewAddress()}
                    >
                      + ADD NEW ADDRESS
                    </button>
                  )}
                </div>
                <span className="checkout__add__pay_error">
                  {error.address}
                </span>
                {editAddress ? (
                  // <input
                  //   ref={ref1}
                  //   type="text"
                  //   placeholder="Enter New Address"
                  // ></input>
                  <EditNewForm state={true} data={formData} set={handleAddAddress}/>
                ) : (
                  <ul>
                    {user["address"]?.slice().map((val, i) => (
                      <div key={i}>
                        <label htmlFor={`address-${i}`}>
                          <input
                            onChange={(e) => handleOrderAddres(e)}
                            id={`address-${i}`}
                            type="radio"
                            name="address"
                            value={JSON.stringify(val)}
                          />
                          <span>{val.name.substring(0,1).toLocaleUpperCase() + val.name.substring(1)}</span>
                          {", "}
                          {val.address}
                        </label>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
              <div className="checkout__order_summery">
                <div className="info__common checkout__order_summery__heading ">
                  <h3>
                    <b>3</b>. ORDER SUMMERY
                  </h3>
                </div>
                {cart.items.map((val) => (
                  <div className="checkout__order_summery__product">
                    <div id="checkout__order_summery__product_img">
                      <img src={val.product.image_url} alt="" />
                    </div>
                    <div>
                      <p>{val.product.name}</p>
                      <p>
                        Qnt. {val.quantity} Price Rs.{val.totalPrice}
                      </p>
                      <p>{val.product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="checkbox__product_total_price">
            <div className="checkout_price_details">
              <p className="price_details_checkout">PRICE DETAILS</p>
              <div className="checkout__price">
                <p>Price </p>
                <p>Rs {cart.total} </p>
              </div>
              <div className="checkout__price">
                <p>Delhivery Charges</p>
                <p>Rs FREE</p>
              </div>
              <div className="checkout__price">
                <p>Packing Charge</p>
                <p>Rs 0</p>
              </div>
              <div className="checkout__price">
                <p>Total Payable</p>
                <p>Rs {cart.total}</p>
              </div>
            </div>
            <span className="checkout__add__pay_error ">{error.method}</span>
            <div className="checkout__price paytype">
              <label htmlFor="paytype1">
                <input
                  onChange={(e) => handleOrderPayMeth(e)}
                  id="paytype1"
                  value={"COD"}
                  name="paytype"
                  type="radio"
                />
                Cash on Delivery
              </label>
              <label htmlFor="paytype2">
                <input
                  onChange={(e) => handleOrderPayMeth(e)}
                  value={"RazorPay"}
                  id="paytype2"
                  name="paytype"
                  type="radio"
                />
                RazorPay
              </label>
            </div>

            <button onClick={(e) => handlePay(e)} className="checkout_button">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Checkout;
