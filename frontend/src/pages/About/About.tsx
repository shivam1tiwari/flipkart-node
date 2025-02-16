import React from "react";
import "./About.css";
import Category from "../../constant/category";
import Categorys from "../../components/category/Category.tsx";

const About = () => {
  return (
    <>
    <Categorys noImg={""}/>
    <div className="about__container">
      <section className="hero_about">
        <div className="video_container">
          <video width={"100%"} preload="auto" autoPlay muted>
            <source
              src="https://corporate.flipkart.net/assets/images/48MB.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
      <section className="about_description">
        <div className="description_img">
          <div>
            <img
              src="https://corporate.flipkart.net/assets/images/flipkart-group.jpg"
              alt="Image"
            />
          </div>
        </div>
        <div className="about_content">
          <div className="about_content_text">
            <h1>The Flipkart Group</h1>
            <p>
              The Flipkart Group is one of India's leading digital commerce
              entities and includes group companies Flipkart, Myntra, Flipkart
              Wholesale, Flipkart Health+, Cleartrip and ANS C ommerce.
            </p>
          </div>
          <div className="about_button">
            <button id="about_button">ABOUT US</button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
