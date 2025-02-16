import React from "react";
import "./List.css"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../pages/ProductDetails/ProductDetails";

const List = () => {
const listName = [{"url" :"/images/icon/profile-icon.svg",name:"My Profile","Link":"/profile"},{"url" :"/images/icon/profile-icon.svg",name:"orders","Link":"/orders"}]
const user = useSelector((state:State)=>state.user)
  return (
    <div className="list__container">
      <ul className="ul-list">
        {listName.map((val, i) => {
          return (
           <Link className="link" to={user?val?.Link:""}> <li className="list-item" key={val.url}>
              <div className="list-content">
                <div className="list-img">
                  <img src={val.url} alt="icon" />
                </div>
                <div className="list-value">{val.name}</div>
              </div></li></Link>
          )
        })}
      </ul>
    </div>
  )
}

export default List;