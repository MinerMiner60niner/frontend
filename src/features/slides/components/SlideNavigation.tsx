type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export function SlideNavigation({ onPrev, onNext }: Props) {
  return (
    <>
      {/* Left arrow */}
      <button
        onClick={onPrev}
        className="
          fixed top-1/2 -translate-y-1/2
          text-red-500 text-[56px] md:text-[80px]
          font-bold select-none cursor-pointer
          bg-transparent outline-none
          transition transform hover:scale-110
        "
        style={{
          left: "16px",
          textShadow: "0 0 10px rgba(255,0,0,0.9)",
        }}
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={onNext}
        className="
          fixed top-1/2 -translate-y-1/2
          text-red-500 text-[56px] md:text-[80px]
          font-bold select-none cursor-pointer
          bg-transparent outline-none
          transition transform hover:scale-110
        "
        style={{
          right: "16px",
          textShadow: "0 0 10px rgba(255,0,0,0.9)",
        }}
      >
        ›
      </button>
    </>
  );
}
