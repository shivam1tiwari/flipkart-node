import React, { ReactNode } from "react";
import "./Card.css";
import products from "../../constant/product.ts";
import { useNavigate } from "react-router-dom";
import category from "../../constant/category.ts";

const Card = ({ product }) => {
  const location = useNavigate();
  const handleData = (e) => {
    const id = e.target.dataset.id;
    // const catIndex = category.findIndex((val) => val.category_id == id);
    // const productName = category[catIndex].category_name;
    const productName = product.brand;
    // const product = products.filter((val)=>val.category_id === id);
    // const product = {name:productName,category_id:id}
    console.log(productName,"from====")
    location(`/brand?key=${productName}&value=${product.brand}`);
  };
  return (
    <div
      className="card__container"
      data-id={product.category_id}
      onClick={(e) => handleData(e)}
    >
      <div data-id={product.category_id} className="card__content">
        <div className="card__img">
          <img data-id={product.category_id} src={product.image_url} alt="" />
        </div>
        <div data-id={product.category_id} className="card__text">
          <p>{product.brand}</p>
          <p>{product.name}</p>
          <p>Rs.{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
