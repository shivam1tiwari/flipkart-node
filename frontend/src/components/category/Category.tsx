import React, { useEffect } from "react";
import "./Category.css";
import CategoryPop from "../../utils/CategoryPop.tsx";
// import category from "../../constant/category.ts";
import { useNavigate } from "react-router-dom";
import useFetch from "../../utils/fetch-data.tsx";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartQuantity } from "../../Redux/ActionCreator.ts";
import { State } from "../../pages/ProductDetails/ProductDetails.tsx";
export interface Category{
  category_id: string;
  category_name: string;
  image_url: string;
}
/**
 * @typedef {Object} Category
 * @property {string} category_id - Unique identifier for the category.
 * @property {string} category_name - Name of the category.
 * @property {string} image_url - URL for the category's image.
 */

/**
 * Category component that fetches and displays categories with functionality
 * for navigation and cart management.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.noImg - Flag to determine whether to show images or not.
 * 
 * @returns {JSX.Element} The rendered category component.
 */
const Category = ({noImg}) => {
  const location = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state:State) => state.products);
  const user = useSelector((state:State) =>state.user);
  useEffect(()=>{
   
    if(user){
      const fetchData = async() => {
        try{
          const response = await fetch(`http://localhost:5011/cart?user_id=${user.id}`,{method:'GET'})
          const value = await response.json()
          if(value.data.length > 0){
          for(let product of value.data){
            const proD =  products.filter((val) => val.product_id === product.product_id);
                  dispatch(addToCart(proD[0]));
                  dispatch(updateCartQuantity(product.product_id, product.quantity))
        };
        }
        }catch(err){
          throw err;
        }
      }
      fetchData()
    }
  },[user])

  const {state, error} = useFetch('http://localhost:5011/category',{method:'GET'});
  let category:Category[] = [];
  if(state){
    category = state;
  }else{
    if(error){
      return <div>{"Please Refresh the page"}</div>
    } 
  }
 /**
   * Handles the category click event to navigate to the appropriate category page.
   * 
   * @param {React.MouseEvent} e - The event object.
   */
  const handleCategory = (e) => {
    e.stopPropagation();
    const value = e.target.dataset.value;
    if(e.target.dataset.id == 'Beauty Toy & More' ){
      return;
    }
    const id = e.target.dataset.id;
    if(!id){
      return
    }
    if(id == 'C001' || id == 'C002'|| id == 'C003' || id == 'C004'||id == 'C005' || id == 'C006'||id == 'C007' || id == 'C008'|| id == 'C009'){
      return;
    }
    if(value){ location(`/products?key=${id}&values=${value}`);}
    if(!value){ location(`/products?key=${id}`);}
  };

  return (
    <div className={`category__container ${noImg?"":"category__container_noImg"}`}>
      {category.map((val, i) => (
        <div
          data-id={val.category_id}
          onClick={(e) => handleCategory(e)}
          key={val.category_id}
          id={val.category_name}
          className="common__category"
        >
          <div
            key={i}
            data-id={val.category_id}
            className={`${
              val.category_name === "Electronics" ||
              val.category_name === "Fashion"
                ? `${noImg?"category_pop-hover":"category_pop-hover1"}` 
                : "invisible"
            }`}
          >
            <div>
              <CategoryPop
                key={val.category_id}
                cat={val.category_name}
                categoryPopName={val.category_name === 'Fashion'?["Women's","Men's","Kid's"]:["Laptop","TV","Drones","Airpods","Camera","Tablets"]}
              />
            </div>
          </div>
          <div className="content-box">
            <div className={`cat_img ${noImg?"":"no_img_nav"}`}>
              <img data-id={val.category_name} src={val.image_url} alt="" />
            </div>
            <div className="cat_text">
              <div  className="with_arrow">
                <span
                  data-id={val.category_name}
                  onClick={(e) => {
                    handleCategory(e);
                  }}
                >
                  {" "}
                  {val.category_name}
                </span>
                <span data-id={val.category_name} >
                  <img
                    data-id={val.category_name}
                    className={
                      val.category_name === "Electronics" ||
                      val.category_name === "Fashion"
                        ? " "
                        : "invisible"
                    }
                    src={"/images/icon/arrow-down.svg"}
                    alt="arrow"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
