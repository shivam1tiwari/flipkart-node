import React from 'react'
import './Contact.css'
import { useState } from 'react'
import Category from '../../constant/category'
import Categorys from '../../components/category/Category.tsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { State } from '../ProductDetails/ProductDetails.tsx'
const Contact = () => {
  const location = useNavigate();
  const [formData, setFormData] = useState(
    {name:"",
    email:"",
    message:""
  })
   const user = useSelector((state:State)=>state.user)
   const handleOnChange = (e) =>{
    const {name, value} = e.target;
    setFormData({
      ...formData,[name]:value
    })
   };
   console.log(user.id, "udsjhddcjsncsj")
   const handleSubmit = (e) =>{
    e.preventDefault()
    // localStorage.setItem("message",JSON.stringify(formData));

const sendData = async () => {
  try {
      const response = await fetch('http://localhost:5011/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({...formData, user_id:user.id}) 
      });
      location("/")
      // const result = await response.json(); 
      // console.log('Response:', result);
  } catch (error) {
      console.error('Error:', error);
  }
};
sendData();

   }

  return(
    <>
    <Categorys noImg={""} />
    <div className="contact__container">
      <div className="contact__container_left">
        <div className="contact__content">
          <div className="contact__content_upper">
            <h1>Welcome! We’d love to hear from you.</h1>
            <p>If you have any questions, suggestions, or feedback, please feel free to get in touch. We're here to assist you! </p>
            </div>
          <div className="contact__content_lower">
            <img src="./images/login/login_img.png" alt="login-png" />
          </div>
        </div>
      </div>
      <div className="contact__container_right">
        <div className="right__content">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
            <label htmlFor="username"></label>
            <input onChange={(e)=>handleOnChange(e)} className='common_input' id='username' type="text" name='name' placeholder='Enter Name' autoComplete={"off"} />
            </div>
            <div>
            <label htmlFor="email"></label>
            <input onChange={(e)=>handleOnChange(e)} className='common_input' id='email' type="text" name='email' placeholder='Enter Email' autoComplete="off"/>
            </div>
            <div>
            <label htmlFor="address"></label>
            <textarea onChange={(e)=>handleOnChange(e)} className='common_input' id='address' name='message' cols={50} rows={20} placeholder='Write message...' autoComplete="off"/>
            </div>
            <p>By contact us, You agree to Flikart's <span>Terms of use</span> and <span>privacy policy.</span></p>
            <div className='button'>
            <button id='contact_button' type="submit">Contact Us</button>
            </div>
          </form>
        </div>

      </div>
    </div>
    </>
  )
}

export default Contact;