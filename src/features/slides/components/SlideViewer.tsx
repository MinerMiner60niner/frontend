import { useState } from "react";
import type { Slide } from "../types";
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
    <div className="relative w-full h-screen flex items-center justify-center">
      <SlideNavigation onPrev={prev} onNext={next} />

      <div
        className={`
          max-w-[700px]
          w-[90%]
          text-center
          transition-transform
          duration-400
          ${direction === "right" ? "animate-slideRight" : "animate-slideLeft"}
        `}
      >
        <SlideImage title={slide.title} url={slide.imageUrl} />
        <h2 className="mt-4 text-2xl font-bold">{slide.title}</h2>
        <SlideText lines={slide.lines} />
      </div>
    </div>
  );
}
