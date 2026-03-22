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
          text-[70px] md:text-[90px]
          font-bold select-none cursor-pointer
          bg-transparent outline-none border-none
          transition transform hover:scale-110
        "
        style={{
          left: "16px",
          color: "#b30000", // dark red fill
          textShadow: "0 0 20px rgba(255,0,0,1)", // strong glow
          lineHeight: "0.7",
        }}
      >
        ⟨
      </button>

      {/* Right arrow */}
      <button
        onClick={onNext}
        className="
          fixed top-1/2 -translate-y-1/2
          text-[70px] md:text-[90px]
          font-bold select-none cursor-pointer
          bg-transparent outline-none border-none
          transition transform hover:scale-110
        "
        style={{
          right: "16px",
          color: "#b30000", // dark red fill
          textShadow: "0 0 20px rgba(255,0,0,1)", // strong glow
          lineHeight: "0.7",
        }}
      >
        ⟩
      </button>
    </>
  );
}
