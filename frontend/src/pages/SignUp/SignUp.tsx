import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const inputfields = [
    "mobile",
    "username",
    "password",
    "confirm_password",
    "email",
    "pincode",
  ];
  const location = useNavigate();
  const handleFocus = () => {};
  const [formData, setFormData] = useState({
    username: "",
    mobile:"",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    pincode: "",
    gender: "",
  });
  const [error, setError] = useState({});

  //  Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError({});
  };

  //Handle Gender Change
  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const validation = () => {
    const error = {};
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailValidation.test(formData.email);
    inputfields.map((val) => {
      if (!formData[val]) {
        error[val] = `${
          val.slice(0, 1).toLocaleUpperCase() + val.slice(1) + (val === "mobile" ? "Number":"" )
        } required`;
      }
    });
    if (!formData["gender"]) {
      error["gender"] = `Gender required`;
    }
    if(formData.mobile.length !== 10 && formData.mobile !==""){
      error["mobile"] = `Mobile Number Should be 10-digit.`
    }
    if (formData.password.length < 6 && formData.password !== "") {
      error["password"] = `Password required min 6 character`;
    } else if (formData.password.length >= 6) {
      // checking for lower, upper, digit , specialcharacter and space
      const checks = [/[a-z]/, /[A-Z]/, /\d/, /[@.#$!%^&*.?]/, /^[^\s]*$/];
      const isValid = checks.every((val) => val.test(formData.password));

      if (!isValid) {
        error["password"] = `Password required special character`;
      }
    }
 
    if (formData.confirm_password !== formData.password) {
      error["confirm_password"] = `Password not matched`;
    }

    if (formData.email !== "" && !isEmailValid) {
      error["email"] = `Email is not valid`;
    }

    if (formData.pincode.length < 6 && formData.pincode !== "") {
      error["pincode"] = `Pincode  is not valid`;
    }

    return error;
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    setError(isValid);
    if (Object.keys(isValid).length === 0) {
      const obj = { address: "",
        city: "",
        locality: "",
        mobile: "",
        name: "",
        pincode:"", 
        state:"",
        id:0,
        }
      // added for type script
      const fetchUser = async () => {
        const data = {
          name: formData.username,
          email:formData.email,
          gender: (formData.gender == "male") ? 1 : 2 , 
          password: formData.password,
          mobile_number: formData.mobile,
          pincode: formData.pincode
        }
        try {
          const response = await fetch('http://localhost:5011/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data}),
          });
          if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
          }
          const addressess = await response.json();
         
          
        } catch (error) {
          console.error('Fetch user error:', error);
        }
  
      };
     fetchUser();
      // const user = { ...formData, address: [{...obj,address:formData.address}] };
      // localStorage.setItem("user", JSON.stringify(user));
      location("/login");
    }
  };

  return (
    <div className="sign_up__container">
      <div className="sign_up__container_left">
        <div className="sign_up__content">
          <div className="sign_up__content_upper">
            <h1>Looks like you're new here!</h1>
            <p>Sign up with your mobile number to get started </p>
          </div>
          <div className="sign_up__content_lower">
            <img src="./images/login/login_img.png" alt="login-png" />
          </div>
        </div>
      </div>
      <div className="sign_up__container_right">
        <div className="right__content-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            {inputfields.map((inputfield, i) => (
              <div key={i}>
                <label htmlFor={inputfield}>{error[inputfield]}</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="common_input"
                  name={inputfield}
                  id={inputfield}
                  type={
                   inputfield === "mobile"?"number":(inputfield === "password" || inputfield === "confirm_password"
                      ? "password"
                      : "text")
                  }
                  placeholder={`Enter ${
                    inputfield.slice(0, 1).toLocaleUpperCase() +
                    inputfield.slice(1) +(inputfield === "mobile"?" Number":"" )
                  }`}
                  autoComplete={"off"}
                  onFocus={() => handleFocus()}
                />
              </div>
            ))}
            <div className="gender_box">
              <div className="gender">
                <label htmlFor="gender">Male</label>
                <input
                  onChange={(e) => handleGenderChange(e)}
                  id="gender"
                  type="radio"
                  name="gender"
                  value={"male"}
                />
              </div>
              <div className="gender">
                <label htmlFor="gender">Female</label>
                <input
                  onChange={(e) => handleGenderChange(e)}
                  id="gender"
                  type="radio"
                  name="gender"
                  value={"female"}
                />
              </div>
              <div style={{ color: "red" }}>{error["gender"]}</div>
            </div>
            <p>
              By continuing, You agree to Flikart's <span>Terms of use</span>{" "}
              and <span>privacy policy.</span>
            </p>
            <div className="button">
              <button id="sign_up_button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
