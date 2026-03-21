import { useState } from "react";
import type { Slide } from "../types.ts";
import { SlideImage } from "./SlideImage";
import { SlideText } from "./SlideText";
import { SlideNavigation } from "./SlideNavigation";

type Props = { slides: Slide[] };

export function SlideViewer({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <div className="relative w-full flex items-center justify-center">

      <SlideNavigation onPrev={prev} onNext={next} />

      <div
        className={`
          w-3/5 
          max-w-3xl 
          mx-auto 
          text-center 
          transition-all 
          duration-300 
          ${direction === "right" ? "animate-slideRight" : "animate-slideLeft"}
        `}
      >
        <SlideImage title={slide.title} url={slide.imageUrl} />
        <SlideText lines={slide.lines} />
      </div>
    </div>
  );
}
