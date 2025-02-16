import React, { useEffect, useState } from "react";
interface TimerProps {
  currentSlide: number;
  handleSlide: () => void;
}
const Timer: React.FC<TimerProps> = ({ currentSlide, handleSlide }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  useEffect(() => {
    const count = setTimeout(() => {
      handleSlide();
    }, 5000);

    return () => {
      clearTimeout(count);
    };
  }, [currentSlide, handleSlide]);

  useEffect(() => {
    const clearCount = setInterval(() => {
      setRemainingTime((prev) => {
        let newTime = prev;
        newTime += 10;
        return newTime;
      });
    }, 100);

    return () => {
      clearInterval(clearCount);
    };
  }, []);

  return (
    <div className="slide-timer">
      <progress value={remainingTime} max="500">
        {" "}
        70%{" "}
      </progress>
    </div>
  );
};

export default Timer;
