import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
/**
 * 
 * @returns only bottom UI
 */
const Footer = () => {
  const footerListArrCol1 = [];
  const footerListArrCol2 = [];
  const footerListArrCol3 = [];
  const footerListArrCol4 = [];
  return (
    <div className="footer__container">
      <div className="footer__container_upper">
        <div className="single-box">
          <p>ABOUT</p>
          <ul>
            <Link style={{ color: "white" }} className="link" to={"/contact"}>
              {" "}
              <li>Contact Us</li>
            </Link>
            <Link style={{ color: "white" }} className="link" to={"/about"}>
              <li>About Us</li>
            </Link>
            <li>Careers</li>
            <li>Flipkat Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <div className="single-box">
          <p>GROUP COMPANIES</p>
          <ul>
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>
        <div className="single-box">
          <p>HELP</p>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="single-box">
          <p>Policy</p>
          <ul>
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>ERP Compliance</li>
          </ul>
        </div>
        <div className="mail single-box">
          <p>MAIL Us:</p>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkat Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
          <p>Social</p>
        </div>
        <div className="single-box">
          <p>Resistered office Address:</p>
          <ul>
            <li>Flipkart internet Private Limited</li>
            <li>Buildings Alyssa, Begonia &</li>
            <li>Clove Embassy Tech Village,</li>
            <li>Outer Ring Road, Devarabeesanhalli Village</li>
            <li>Bengaluru, 560103,</li>
            <li>Karnataka, India</li>
            <li>CIN: U51109KA2012PTC066107</li>
            <li>tELEPHONE: 044-45614700/044-67415800</li>
          </ul>
        </div>
      </div>
      <div className="footer__container_lower">
        <ul className="lower_list">
          <li>
            <span>
              <img src="./images/footer/sellerFooter.svg" alt="" />
            </span>
            Become a Seller
          </li>
          <li>
            <span>
              <img src="./images/footer/advertise-image-footer.svg" alt="" />
            </span>
            Advertise
          </li>
          <li>
            <span>
              <img src="./images/footer/gift-cards-image-footer.svg" alt="" />
            </span>
            Gift Cards
          </li>
          <li>
            <span>
              <img src="./images/footer/help-centre-image-footer.svg" alt="" />
            </span>
            Help Center
          </li>
          <li>
            <span>&copy;</span> 2007-2024 Flipkart.com
          </li>
          <p>
            <span>
              <img
                id="img"
                src="./images/footer/payment-method-footer.svg"
                width="10rem"
                height="10rem"
                alt=""
              />
            </span>
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
