import React, { useState } from "react";
import "./Slider.css";
import arrow from "../../asset/arrow-down.svg";
import slide1 from "../../asset/slider/slider1.jpeg";
import slide2 from "../../asset/slider/slider2.jpeg";
import slide3 from "../../asset/slider/slider3.jpeg";
import slide4 from "../../asset/slider/slider4.jpeg";
import slide5 from "../../asset/slider/slider5.jpeg";
import slide6 from "../../asset/slider/slider6.jpeg";
import Timer from "./Timer.tsx";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3, slide4, slide5];

  const handleTimer = () => {
    setCurrentSlide((prev) => {
      if (prev == 4) {
        prev = -1;
      }
      return prev + 1;
    });
  };
  const handleSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    const direction = e.currentTarget.dataset.id;
    if (direction == "next") {
      setCurrentSlide((prev) => {
        if (prev == 4) {
          prev = -1;
        }
        return prev + 1;
      });
    }
    
    if (direction == "prev") {
      setCurrentSlide((prev) => {
        if (prev == 0) {
          prev = 1;
        }
        return prev - 1;
      });
    }
  };

  return (
    <div className="slider__container">
      <div className="slider_box">
        <div
          className={`slides`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((val) => (
            <div key={val} className="slide">
              <img src={val} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => handleSlide(e)}
        data-id="prev"
        className="slider_button-left"
      >
        <span>
          <img data-id="prev" src={arrow} alt="" />
        </span>
      </div>
      <div
        onClick={(e) => handleSlide(e)}
        data-id="next"
        className=" slider_button-right"
      >
        <span>
          <img data-id="next" src={arrow} alt="" />
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {slides.map((val, i) => (
          <div key={val} className="timer-slide">
            {currentSlide == i ? (
              <Timer
                key={val}
                currentSlide={currentSlide}
                handleSlide={handleTimer}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
