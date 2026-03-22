import { useEffect, useState } from "react";
import { fetchSlides } from "./features/api";
import type { Slide } from "./features/slides/types";
import { SlideViewer } from "./features/slides/components/SlideViewer";

function App() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetchSlides().then(setSlides);
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading…
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SlideViewer slides={slides} />
    </div>
  );
}

export default App;
