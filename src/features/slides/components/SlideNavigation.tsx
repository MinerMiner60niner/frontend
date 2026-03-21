type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export function SlideNavigation({ onPrev, onNext }: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 text-6xl md:text-[150px] hover:scale-110 transition"
      >
        ‹
      </button>

      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 text-6xl md:text-[150px] hover:scale-110 transition"
      >
        ›
      </button>
    </>
  );
}
