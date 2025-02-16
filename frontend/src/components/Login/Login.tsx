import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Login.css";
import { setUser } from "../../Redux/ActionCreator.ts";
import { State } from "../../pages/ProductDetails/ProductDetails.tsx";
import useFetch from "../../utils/fetch-data.tsx";
const Login = () => {
  const [error, setError] = useState({
    inValid:"",
    mobile:"",
    password:""
  });
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userLogin = useSelector((state:State) => state.user);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false)
  useEffect(()=>{
    if(formData.mobile === ""){
      return;
    }
    const fetchData = async() => {
      try{
        const response = await fetch('http://localhost:5011/login',{method:'POST', headers: {
       'Content-Type': 'application/json',
      },body:JSON.stringify({mobile_number:formData.mobile,password:formData.password})})
      // console.log(response)
      const data = await response.json();
      console.log(data);
      if(data["Authorization"]){
        dispatch(setUser({id:data["user_id"],name: data["name"],email:data["email"],pincode: data["pincode"], username:formData.mobile, gender:data["gender"]}));
        const token = data.Authorization.split(" ")[1];
        localStorage.setItem("token", token);
        sessionStorage.setItem("login",JSON.stringify({id:data["user_id"],name: data["name"],email:data["email"],pincode: data["pincode"], username:formData.mobile, gender:data["gender"]}))
        redirect("/");
      }
      if(!data["Authorization"]){
        setError({
              ...error,
              inValid:"Mobile Number or Password is incorrect!",
              mobile:"",
              password:""
            })
      }
      }catch(err){
        throw err; 
      }
    }
    fetchData() 
  },[isSubmit])

  const handleInputChange = (e) => {
    
    if (error) {
      setError({
        ...error,
        inValid:"",
        mobile:"",
        password:""
      });
    }
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.mobile === "" && formData.password === "" )return setError({
      ...error,
      inValid:"",
      mobile:"Mobile Number required",
      password:"Password required"
    })

    if(formData.mobile === "")return setError({
      ...error,
      inValid:"",
      mobile:"Mobile Number required",
      password:""
    })

    if(formData.password === "" )return setError({
      ...error,
      inValid:"",
      mobile:"",
      password:"Password required"
    })
    setIsSubmit(!isSubmit);

    // if (
    //   dBData.mobile === formData.mobile &&
    //   dBData.password === formData.password
    // ) {
    //   dispatch(setUser(dBData));
    //   console.log(dBData, "data after set");
    //   sessionStorage.setItem('login',JSON.stringify(dBData) )

    //   redirect("/")
    // }

    // if (
    //   dBData.mobile !== formData.mobile ||
    //   dBData.password !== formData.password
    // ) 
    // {
    //   setError({
    //     ...error,
    //     inValid:"Mobile Number or Password is incorrect!",
    //     mobile:"",
    //     password:""
    //   });
    // }
  };

  return (
    <div className="login__container">
      <div className="login__container_left">
        <div className="login__content">
          <div className="login__content_upper">
            <h1>Login</h1>
            <p>Get access to your Orders,Wishlist and Recommendations</p>
          </div>
          <div className="login__content_lower">
            <img src="./images/login/login_img.png" alt="login-png" />
          </div>
        </div>
      </div>
      <div className="login__container_right">
        <p className={` ${error.inValid ? "invalidlogin" : "appearence-1"}`}>
          Mobile Number or Password is incorrect !
        </p>
        <div className="right__content">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label  htmlFor="username"></label>
            
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="mobile"
              className="login__input_field"
              id="mobile"
              type="text"
              placeholder="Enter Mobile Number"
              autoComplete="off"
            />
             <p className="red">{error.mobile}</p>
            <label className="appearence" htmlFor="password"></label>
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="password"
              className="login__input_field"
              id="password"
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
            />
            <p className="red">{error.password}</p>
            <p>
              By continuing, You agree to Flikart's <span>Terms of use</span>{" "}
              and <span>privacy policy.</span>
            </p>
            <div className="button">
              <button id="login_button" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="sign_up">
            <Link to={"/sign-up"}>
              <span>New to Flipkart? Create an account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
