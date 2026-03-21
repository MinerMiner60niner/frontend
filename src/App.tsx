import { useEffect, useState } from "react";
import { fetchSlides } from "./api";
import type { Slide } from "./types";
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;

    if (diff > 50) prev();      // vilciens pa labi → iepriekšējais slaids
    if (diff < -50) next();     // vilciens pa kreisi → nākamais slaids

    setTouchStart(null);
  };

  return (
    <div className="slider">
      <button className="arrow left" onClick={prev}>‹</button>

      <div
        className={`slide ${direction}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`http://localhost:3000/images/${current.imageFile}`}
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

      <button className="arrow right" onClick={next}>›</button>
    </div>
  );
}

export default App;
