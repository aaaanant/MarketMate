import React, { useState, useEffect } from "react";
import styles from "../styles/slider.module.css";

import slide1 from "../assets/slider/slide1.jpg";
import slide2 from "../assets/slider/slide2.jpg";

const slides = [slide1, slide2];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className={styles.slider}>
      
      <button className={styles.left} onClick={prevSlide}>❮</button>
      <button className={styles.right} onClick={nextSlide}>❯</button>

      {slides.map((img, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
        >
          <img src={img} alt="slide" />
        </div>
      ))}
    </div>
  );
}

export default Slider;