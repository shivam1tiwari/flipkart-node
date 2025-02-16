import React, { useEffect, useState } from "react";
import './Orders.css';
import { Link } from "react-router-dom";
import Category from "../../constant/category";
import Categorys from "../../components/category/Category.tsx";
import { useNavigate } from "react-router-dom";
import { Items } from "../ProductDetails/ProductDetails.tsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useNavigate()
  
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        location("/login");
        return 
      }
      try {
        const response = await fetch('http://localhost:5011/orders',{headers: {
          Authorization: `Bearer ${token}`}
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    // Implement your search functionality if needed
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Categorys noImg={""} />
      <div className="order__container">
        <div className="order__container__box">
          <div className="order__container__box__upper"></div>
          <div className="order__container__box__lower">
            <div className="order__container__box__lower-left">
              <div className="order__container__box__lower-left_content">
                <div className="orders__filter">
                  <h2>Filters</h2>
                </div>
                <div className="orders__common">
                  <h4>ORDER STATUS</h4>
                  <label htmlFor=""><input type="checkbox" />On the way</label>
                  <label htmlFor=""><input type="checkbox" />Delivered</label>
                  <label htmlFor=""><input type="checkbox" />Cancelled</label>
                  <label htmlFor=""><input type="checkbox" />Returned</label>
                </div>
                <div className="orders__common">
                  <h4>ORDERS TIME</h4>
                  <label htmlFor=""><input type="checkbox" />Last 30 days</label>
                  <label htmlFor=""><input type="checkbox" />2023</label>
                  <label htmlFor=""><input type="checkbox" />2022</label>
                  <label htmlFor=""><input type="checkbox" />2021</label>
                  <label htmlFor=""><input type="checkbox" />Older</label>
                </div>
              </div>
            </div>
            <div className="order__container__box__lower-right">
              <div className="order__container__box__lower-right_search">
                <div className="order__search_box">
                  <input
                    id="orders_input"
                    placeholder="Search your orders here"
                    type="search"
                  />
                  <button id="orders_button" onClick={handleSearch}>
                    Search Orders
                  </button>
                </div>
              </div>
              <div className="order__container__box__lower-right_items">
                {orders?.map((order) =>
                  order?.items?.map((item) => (
                    <div className="item" key={item.product.product_id}>
                      <div className="item__container">
                        <div className="orders__img">
                          <img src={item.product.image_url} alt={item.product.name} />
                        </div>
                        <div className="orders__discription">
                          <div className="orders__discription_name">
                            <Link to={`/products/product-details?key=${item.product.product_id}&values=${order.order_id}`}>
                              <p>{item.product.name}</p>
                            </Link>
                            <p className="details-order-name">
                              {/* {Object.keys(item.product.attributes)?.map((val) => (
                                <span key={val}>{item.product.attributes[val]} </span>
                              ))} */
                             <span>{item.product.description}</span>
                              }
                            </p>
                          </div>
                          <div className="orders__price">
                            <p>{item.quantity} x {item.product.price}</p>
                          </div>
                          <div className="orders__status">
                            <p>{order.status || 'Pending'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
