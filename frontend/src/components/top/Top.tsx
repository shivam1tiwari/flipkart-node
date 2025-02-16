import React, { useState } from "react";
import "./Top.css";
import Card from "../ProductCard/Card.tsx";
import { useNavigate } from "react-router-dom";

const Top = ({ noOfProd, brandName, product }) => {
  const location = useNavigate();
  const handleAllCategory = (e) =>{
        const brand = e.target.dataset.id;
        if(brand === "brand"){
        location(`/brand?key=${brand}`)
        }else{
         const brandN = brand.substring(0, 1).toUpperCase() + brand.substring(1);
         console.log(brandN)
          location(`/products?key=${brandN}`);
        }    
  }
 
  return (
    <div key={brandName} className="top__container">
      <div className="top__content">
        <div className="top__content_name">
          <div className="top__content_name-text">
            <h2>
              Top{" "}
              {brandName.substring(0, 1).toUpperCase() + brandName.substring(1)}
            </h2>
          </div>
          <div data-id={brandName} onClick={(e)=>handleAllCategory(e)} className="top__content_name-button">
            <span data-id={brandName}>
              <img data-id={brandName} src={'/images/icon/arrow-down.svg'} alt="" />
            </span>
          </div>
        </div>
        <div className="top__content_product">
          <div
            className="top__content_product-card"
            style={{ transform: `translateX(-${noOfProd * 13}rem)` }}
          >
            {product.map((val) => (
              <Card key={val.product_id} product={val} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
