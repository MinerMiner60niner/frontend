import { useState } from "react";
import type { Slide } from "../types";
import { SlideNavigation } from "./SlideNavigation";
import { SlideImage } from "./SlideImage";
import { SlideText } from "./SlideText";
import { CommentsPanel } from "../../comments/components/CommentsPanel";
import { LikeButton } from "../../../components/LikeButton";

type Props = {
  slides: Slide[];
};

export function SlideViewer({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [commentsOpen, setCommentsOpen] = useState(false);

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const slide = slides[index];

  let startX = 0;

  const handleStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) prev();
    if (diff < -50) next();
  };

  return (
    <>
      <SlideNavigation onPrev={prev} onNext={next} />

      <CommentsPanel
        slideId={slide.id}
        open={commentsOpen}
        closePanel={() => setCommentsOpen(false)}
      />

      <div
        className="
          w-full
          h-screen
          overflow-y-auto
          flex
          flex-col
          items-center
          justify-start
          pt-4
        "
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        style={{
          backgroundImage: "url('https://backend-so4g.onrender.com/images/Background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`
            max-w-[700px]
            w-[90%]
            text-center
            transition-transform duration-300
            ${direction === "right" ? "animate-slideRight" : "animate-slideLeft"}
          `}
        >
          <SlideImage title={slide.title} url={slide.imageUrl} />
          <h2 className="mt-4 text-2xl font-bold">{slide.title}</h2>
          <SlideText lines={slide.lines} />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setCommentsOpen(true)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Comments
            </button>

            <LikeButton slideId={slide.id} />
          </div>
        </div>
      </div>
    </>
  );
}
