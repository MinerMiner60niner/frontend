type Props = {
  title: string;
  url: string;
};

export function SlideImage({ title, url }: Props) {
  return (
    <img
      src={`https://backend-so4g.onrender.com${url}`}
      alt={title}
      className="
        w-full
        max-h-[60vh]
        object-contain
        rounded-xl
        shadow-[0_8px_24px_rgba(0,0,0,0.6)]
      "
    />
  );
}
