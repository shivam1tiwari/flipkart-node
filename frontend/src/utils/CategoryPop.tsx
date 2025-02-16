import React from "react";
import "./CategoryPop.css";
import { Link } from "react-router-dom";

const CategoryPop = ({ cat,categoryPopName }) => {
  return (
    <div className="categoryPop__container">
      <ul className="ul-categoryPop">
        {categoryPopName.map((val, i) => {
          return (
            <Link className="link" to={`/products?key=${cat}&values=${val}`}>
              {" "}
              <li
                data-value={val}
                data-id={cat}
                className="categoryPop-item"
                key={i}
              >
                <div
                  data-value={val}
                  data-id={cat}
                  className="categoryPop-content"
                >
                  <div className="categoryPop-img arrow">
                    <img
                      data-value={val}
                      data-id={cat}
                      src={"/images/icon/arrow-down.svg"}
                      alt="icon"
                    />
                  </div>
                  <div
                    data-value={val}
                    data-id={cat}
                    // onClick={(e) => handleBrand(e)}
                    className="categoryPop-value"
                  >
                    {val}
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryPop;
