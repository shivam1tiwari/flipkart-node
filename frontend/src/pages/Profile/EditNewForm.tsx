import React from "react";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/ActionCreator.ts";

const EditNewForm = ({data, set, state}) =>{
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id:data["id"],
    name: data["name"],
    mobile: data["mobile"],
    pincode: data["pincode"],
    locality: data["locality"],
    address: data["address"],
    city: data["city"],
    state: data["state"],
  });
  const [error, SetError] = useState({ mobile: "", pincode: "" });

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleAddAddress = (e) => {
    e.preventDefault();
   
    setFormData({
      id:data["id"],
      name: data["name"],
      mobile: data["mobile"],
      pincode: data["pincode"],
      locality: data["locality"],
      address: data["address"],
      city: data["city"],
      state: data["state"],
    })
    set();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id,"internal")
    if(e.target.dataset.id !==""){
      if (formData.mobile.length !== 10) {
        SetError({ ...error, mobile: "Mobile number should be 10 digit" });
        return;
      }
      if (formData.pincode.length !== 6) {
        SetError({ ...error, pincode: "Pincode number should 6 digit" });
        return;
      }
      
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:5011/address/${e.target.dataset.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, user_id: user.id}),
          });
          set()
          if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
          }   
        } catch (error) {
          console.error('Fetch user error:', error);
        }
  
      };
     fetchUser()
      // const user = JSON.parse(localStorage.getItem("user")!);
      //   const ind = user.address.findIndex((val)=>{console.log(val.id,"hyyyy");  return val.id == e.target.dataset.id ;})
      //   console.log(ind,"indicess")
      //   user.address[ind] = {...formData,id:e.target.dataset.id }
      //   localStorage.setItem("user", JSON.stringify(user));
        // setOpenForm(false);
        return;
    
    };
     // Errors in mobile or pincod field
    //  const handleErrors = () => {
    //   SetError({ ...error, mobile: "", pincode: "" });

    // }
    if (formData.mobile.length !== 10) {
      SetError({ ...error, mobile: "Mobile number should be 10 digit" });
      // alert("enter mobile");
      return;
    }
    if (formData.pincode.length !== 6) {
      SetError({ ...error, pincode: "Pincode number should 6 digit" });
      return;
    }
    // const user = JSON.parse(localStorage.getItem("user")!);
    // if (user) {
    //   // const obj = { ...user, address: [...user["address"], {...formData,id:user["address"].length }] };
    //   // localStorage.setItem("user", JSON.stringify(obj));
    //   // setOpenForm(false);
    //   set();
    //   console.log(obj);
    // }
    const fetchAddress = async () => {
      try {
        const response = await fetch('http://localhost:5011/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: 5,addressData:{...formData} }),
        });
        set();
        if (!response.ok) {
          throw new Error(`Error fetching address: ${response.statusText}`);
        }
        const address = await response.json();
        
        dispatch(setUser({...user, ["address"]: address}))
        
      } catch (error) {
        console.error('Fetch address error:', error);
      }

    };
   fetchAddress();
  };
   // Errors in mobile or pincod field
   const handleErrors = () => {
    SetError({ ...error, mobile: "", pincode: "" });
  };

  return(
    <div className="add_address__box "
  >
    <p id="form-ad-address">{`${state?"ADD A NEW":"EDIT" } ADDRESS`}</p>
    <form
      data-id = {data["id"]}
      onChange={(e) => onChange(e)}
      onSubmit={(e) => handleFormSubmit(e)}
      name="new-address"
      action=""
      autoComplete="off"
    >
      <div className="ad-input">
        <input
          name="name"
          type="text"
          value={formData.name}
          placeholder="Name"
          required
        />
        <input
          name="mobile"
          type="number"
          value={formData.mobile}
          placeholder="Mobile-Number"
          required
          onChange={() => handleErrors()}
          
        />
        <p id="errors">{error.mobile}</p>
      </div>
      <div className="ad-input">
        <input
          name="pincode"
          type="number"
          value={formData.pincode}
          placeholder="Pincode"
          required
          onChange={() => handleErrors()}
        />
        <input name="locality" value={formData.locality} type="text" placeholder="Locality" />
      </div>
      <p id="errors1">{error.pincode}</p>
      <div className="ad-input">
       <textarea id="ad-address" name="address" value={formData.address} cols={20} rows={4} required placeholder="Address(Area and Street)" >

       </textarea>
      </div>
      <div className="ad-input">
        <input name="city" type="text" value={formData.city} placeholder="City" />
        <input name="state" type="text" value={formData.state} placeholder="State" />
      </div>
      {/* <div className="ad-input">
    <input name="state" type="text" />
    <input type="text" />
    </div> */}

      <button id="ad_sub_but" type={"submit"}>
        SAVE
      </button>
      <button id="ad_canc_but" onClick={(e) => handleAddAddress(e)}>
        CANCEL
      </button>
    </form>
  </div>
  )
}

export default EditNewForm;