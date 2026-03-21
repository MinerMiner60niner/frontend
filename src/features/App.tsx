import { useEffect, useState } from "react";
import { fetchSlides } from "./api";
import type { Slide } from "./slides/types";
import "./App.css";

function App() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    fetchSlides().then(setSlides);
  }, []);

  if (slides.length === 0) return <p>Loading...</p>;

  const current = slides[index];

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev();
    if (diff < -50) next();
    setTouchStart(null);
  };

  return (
    <div className="slider-container">

      {/* LEFT ARROW */}
      <button className="arrow arrow-left" onClick={prev}>‹</button>

      {/* LEFT WHITE LINE */}
      <div className="separator"></div>

      {/* SLIDE CONTENT */}
      <div
        className={`slide ${direction}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`https://backend-so4g.onrender.com/images/${current.imageFile}`}
          alt={current.title}
        />
        <h2>{current.title}</h2>

        {current.lines?.length > 0 && (
          <div className="lines">
            <p>{current.lines[0].jp}</p>
            <p>{current.lines[0].lv}</p>
            <p>{current.lines[0].en}</p>
          </div>
        )}
      </div>

      {/* RIGHT WHITE LINE */}
      <div className="separator"></div>

      {/* RIGHT ARROW */}
      <button className="arrow arrow-right" onClick={next}>›</button>

    </div>
  );
}

export default App;
