type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export function SlideNavigation({ onPrev, onNext }: Props) {
  return (
    <>
      {/* LEFT ARROW */}
      <button
        onClick={onPrev}
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-red-500
          text-[56px] md:text-[80px]
          font-bold
          cursor-pointer
          select-none
          bg-transparent border-none outline-none
          [text-shadow:0_0_10px_rgba(255,0,0,0.9),0_0_20px_rgba(255,0,0,0.7),0_0_35px_rgba(255,0,0,0.5)]
          transition-transform transition-shadow
          duration-150
          hover:scale-110
          hover:[text-shadow:0_0_15px_rgba(255,0,0,1),0_0_30px_rgba(255,0,0,0.9),0_0_45px_rgba(255,0,0,0.8)]
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={onNext}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-red-500
          text-[56px] md:text-[80px]
          font-bold
          cursor-pointer
          select-none
          bg-transparent border-none outline-none
          [text-shadow:0_0_10px_rgba(255,0,0,0.9),0_0_20px_rgba(255,0,0,0.7),0_0_35px_rgba(255,0,0,0.5)]
          transition-transform transition-shadow
          duration-150
          hover:scale-110
          hover:[text-shadow:0_0_15px_rgba(255,0,0,1),0_0_30px_rgba(255,0,0,0.9),0_0_45px_rgba(255,0,0,0.8)]
        "
      >
        ›
      </button>
    </>
  );
}
