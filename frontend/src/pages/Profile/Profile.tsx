import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import EditNewForm from "./EditNewForm.tsx";
// import Category from "../../constant/category.ts";
import Categorys from "../../components/category/Category.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/ActionCreator.ts";
import { useNavigate } from "react-router-dom";
// import List from "../../utils/List.tsx";


export interface Address {
  address: string;
  city: string;
  locality: string;
  mobile: number;
  name: string;
  pincode: number;
  state: string;
  id: number;
  }

export interface UserInfo {
address: Address[];
confirm_password: number; 
email: string; 
gender: string; 
password: number; 
pincode: number; 
username: string;
}


const Profile = () => {
  const user = useSelector((state)=>state.user);
  const location = useNavigate();
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isEdit, setIsEdit] = useState({
    personel: false,
    email: false,
    pincode: false,
  });
  const [addressEdit, setAddressEdit] = useState(null)
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
  const [newAddress, setNewAddress] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [inputName, setInputName] = useState({
    id:"",
    username: "",
    email: "",
    pincode: "",
    gender: "",
  });
  const [error, SetError] = useState({ mobile: "", pincode: "" });
  const [isDelet, setIsDelet] = useState(false);
  const [updateUI, setUpadateUI] = useState(false)
  const [address, setAddress] = useState([]);
  const handleCloseEditForm = ()=>{
    setAddressEdit(null);
    setUpadateUI(!updateUI);
}
  useEffect(() => {
   
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // setError("User is not authenticated");
        location("/login");
        return 
      }
      try {
        const response = await fetch('http://localhost:5011/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id:user.id }),
        });
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const addressess = await response.json();
        console.log(addressess,"address-set");
        setAddress(addressess)
        // dispatch(setUser({...userUp}));
        
      } catch (error) {
        console.error('Fetch user error:', error);
      }

    };
   fetchUser();
 
    setUserInfo({ ...user });
    setInputName({
      ...inputName,
      id:user["id"],
      username: user["name"],
      email: user["email"],
      pincode: user["pincode"],
      gender: (user["gender"] == 1) ? 'male':'female',
    });
  }, [openForm, isEdit,isDelet, updateUI]);
  const handleAddressEdit = (e) =>{
    e.preventDefault()
    console.log(e.target.dataset.id);
    setAddressEdit(e.target.dataset.id)
  }
  const handleEdit = (e) => {
    const edit = e.target.dataset.id;
    setIsEdit({
      ...isEdit,
      [edit]: !isEdit[edit],
    });
  };

  const handleOnClickManageAddr = () => {
    setNewAddress(true);
  };
  const handleInformation = () => {
    setNewAddress(false);
    setOpenForm(false);
  };

  const onChangeInp = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setInputName((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,id:user["id"]
      };
    });
  };
  const onSaveInp = (e) => {
    const obj = { ...userInfo, ...inputName };

    // localStorage.setItem("user", JSON.stringify(obj));
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5011/edit-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...obj }),
        });
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const userUp = await response.json();
        setInputName({
          ...inputName,
          id:userUp["id"],
          username: userUp["name"],
          email: userUp["email"],
          pincode: userUp["pincode"],
          gender: (userUp["gender_id"] == 1) ? 'male':'female',
        });
        dispatch(setUser({...userUp}));
        
      } catch (error) {
        console.error('Fetch user error:', error);
      }

    };
   fetchUser()
   
    setIsEdit({
      ...isEdit,
      personel: false,
      email: false,
      pincode: false,
    });
  };

  // const onChange = (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  // Form toggle
  const handleAddAddress = (e) => {
    setOpenForm(!openForm);
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
    setUpadateUI(!updateUI);
  };

  // const stateChange = ()=>{
  //   setOpenForm(!openForm)
  // }

  // close form
  // const handleCloseEditForm = ()=>{
  //        setAddressEdit(null);
  //        setUpadateUI(!updateUI);
  // }
  // submit new address form
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.mobile.length !== 10) {
  //     SetError({ ...error, mobile: "Mobile number should 10 digit" });
  //     // alert("enter mobile");
  //     return;
  //   }
  //   if (formData.pincode.length !== 6) {
  //     SetError({ ...error, pincode: "Pincode number should 6 digit" });
  //     // alert("enter mobile");
  //     return;
  //   }
  //   const user = JSON.parse(localStorage.getItem("user")!);
  //   if (user) {
  //     const obj = { ...user, address: [...user["address"], {id:user["address"].length,...formData }] };
  //     localStorage.setItem("user", JSON.stringify(obj));
  //     setOpenForm(false);
  //     setIsDelet(!(isDelet))
  //     console.log(obj);
  //   }
  // };
  // Errors in mobile or pincod field
  // const handleErrors = () => {
  //   SetError({ ...error, mobile: "", pincode: "" });
  // };
  const handleAddressDelete = (e) =>{
    const addressId = e.target.dataset.id;
    // const user = JSON.parse(localStorage.getItem("user")!);
        // const ind = user.address.findIndex((val)=>{console.log(val.id,"hyyyy");  return val.id == e.target.dataset.id ;})
        // user.address.splice(ind, 1);
        // localStorage.setItem("user", JSON.stringify(user));
        const fetchUser = async () => {
          try {
            const response = await fetch(`http://localhost:5011/address/${addressId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            setIsDelet(!isDelet);
            if (!response.ok) {
              throw new Error(`Error fetching id: ${response.statusText}`);
            }
            // const id = await response.json();
            
          } catch (error) {
            console.error('Fetch id error:', error);
          }
    
        };
       fetchUser();
  }
  return (
    <>
    <Categorys noImg={""}/>
    <div className="profile__container">
      <div className="profile__container__left">
        <div className="profile_head">
          <div className="profile_img">
            <img src="./images/icon/profile-pic-male.svg" alt="" />
          </div>
          <div>
            <h1>Hello</h1>
          </div>
        </div>
        <div className="profile_order">
          <Link className="link" to={"/orders"}>
            <h4>MY ORDERS</h4>
          </Link>
        </div>
        <div className="profile_order">
          <h4>ACCOUNT SETTING</h4>
          <p onClick={() => handleInformation()}>Profile Information</p>
          <p onClick={() => handleOnClickManageAddr()}>Manage Addresses</p>
        </div>
      </div>
      <div className="profile__container__right">
        {newAddress ? (
          <div className="manage__addresses">
            <h3>Manage Addresses</h3>
            <div className="add_address__box adrs_style">
              <p id="add_address__box-font" className={`${openForm?"invisible":""}`} onClick={(e) => handleAddAddress(e)}>+ ADD A NEW ADDRESS</p>
             {openForm?<EditNewForm  state= {true} set={handleAddAddress} data={formData} />:""}
            </div>
            {/* <div className="old_address_box adrs_style">
              <p>
                {userInfo.username} <span></span>
              </p>
              <p>address:{userInfo.address[0]} </p>
            </div> */}
            {address?.slice().map((val, i) => (
              <div key={val.id} className="old_address_box adrs_style">
               <div className={`${(addressEdit == i)? "invisible":""}`}>
                <h5>{val.name[0].toLocaleUpperCase() + val.name.slice(1)} {val.mobile}</h5>
                <h5 style={{fontWeight:"500"}} >{val.address} - {val.pincode}</h5>
               </div>
               <div className="address_img-box">
                <img className={`${(addressEdit == i)? "invisible":""}`} src="/images/about/header_3verticalDots.svg" alt="" />
                <div className="address-delete">
                <p data-id ={i} onClick={(e)=>handleAddressEdit(e)}>Edit</p>
                <p data-id = {val.id} onClick={(e)=>handleAddressDelete(e)}>Delete</p>
                </div>
               </div>

              <div  className={`${(addressEdit == i )? "editable":"invisible"}`}> <EditNewForm key={val.id} set={handleCloseEditForm} state={false} data={val} /> </div>
              
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>
              <h3 className="personal-info_head">
                Personal Information
                <span data-id={"personel"} onClick={(e) => handleEdit(e)}>
                  {!isEdit.personel ? "Edit" : "Cancel"}
                </span>
              </h3>
            </div>
            {/* <div></div> */}
            <div className="profile_information">
              <div className="profile_name common-div">
                <div className="profile_name border_class">
                  <input
                    value={inputName.username.substring(0, 1).toLocaleUpperCase() +inputName.username.substring(1) }
                    name="username"
                    onChange={(e) => onChangeInp(e)}
                    type="text"
                    disabled = {!isEdit.personel ? true :false}
                    autoComplete="off"
                  />
                </div>
                {/* <div className="profile_name border_class" > <input className={`${!isEdit.personel?"visible":""}`} type="text"  /></div>  */}
                <button
                  className={`${!isEdit.personel ? "visible" : ""}`}
                  onClick={(e) => onSaveInp(e)}
                >
                  SAVE
                </button>
              </div>

              <div className="profile_gender common-div">
                <p>Your Gender</p>
                <label htmlFor="">
                  <input
                    onChange={(e) => onChangeInp(e)}
                    checked={inputName.gender == "male"}
                    disabled={!isEdit.personel}
                    value="male"
                    name="gender"
                    type="radio"
                  />
                  Male
                </label>
                <label htmlFor="">
                  <input
                    onChange={(e) => onChangeInp(e)}
                    checked={inputName.gender == "female"}
                    disabled={!isEdit.personel}
                    value="female"
                    name="gender"
                    type="radio"
                  />
                  Female
                </label>
              </div>
              <div className="profile_email common-div">
                <div>
                  <p>
                    Email Address
                    <span data-id={"email"} onClick={(e) => handleEdit(e)}>
                      {!isEdit.email ? "Edit" : "Cancel"}
                    </span>
                  </p>
                </div>
                <div className="email_1">
                  <div className=" border_class">
                    <input
                      className={`${!isEdit.email ? "" : ""}`}
                      value={inputName.email}
                      onChange={(e) => onChangeInp(e)}
                      name="email"
                      type="text"
                      disabled = {!isEdit.email ? true :false}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    className={`${!isEdit.email ? "visible" : ""}`}
                    onClick={(e) => onSaveInp(e)}
                  >
                    SAVE
                  </button>
                </div>
              </div>
              <div className="profile_mobile common-div">
                <div>
                  <p>
                    Pincode{" "}
                    <span data-id={"pincode"} onClick={(e) => handleEdit(e)}>
                      {!isEdit.pincode ? "Edit" : "Cancel"}
                    </span>{" "}
                  </p>
                </div>
                <div className="email_1">
                  <div className=" border_class  ">
                    {/* <p className="middle">{`${
                      !isEdit.pincode ? userInfo.pincode : ""
                    }`}</p> */}
                    <input
                      value={inputName.pincode}
                      onChange={(e) => onChangeInp(e)}
                      name="pincode"
                      type="text"
                      disabled = {!isEdit.pincode ? true :false}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    className={`${!isEdit.pincode ? "visible" : ""}`}
                    onClick={(e) => onSaveInp(e)}
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_faq">
              <h4> FAQs </h4>
              <h5>
                What happens when I update my email address (or mobile number)?
              </h5>
              <p>
                {" "}
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number).
              </p>
              <h5>
                {" "}
                When will my Flipkart account be updated with the new email
                address (or mobile number)?
              </h5>
              <p>
                {" "}
                It happens as soon as you confirm the verification code sent to
                your email (or mobile) and save the changes.
              </p>
              <h5>
                {" "}
                What happens to my existing Flipkart account when I update my
                email address (or mobile number)?
              </h5>
              <p>
                {" "}
                Updating your email address (or mobile number) doesn't
                invalidate your account. Your account remains fully functional.
                You'll continue seeing your Order history, saved information and
                personal details.
              </p>
              <h5>
                {" "}
                Does my Seller account get affected when I update my email
                address?
              </h5>
              <p>
                {" "}
                Flipkart has a 'single sign-on' policy. Any changes will reflect
                in your Seller account also.
              </p>

              {/* <button >Deactivate Account</button> 
              <button>Delete Account</button>  */}
              <div className="profile_footer-img">
                <img src="/images/footer/myProfileFooter_4e9fe2.png" alt="" />
              </div>
            </div>{" "}
          </>
        )}
      </div>
      {/* nice */}
    </div>
    </>
  );
};

export default Profile;
