type Props = {
  title: string;
  url: string;
};

export function SlideImage({ title, url }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div
        className="inline-block rounded-xl"
        style={{
          boxShadow: "0 0 105px rgba(0,0,0,0.85)", // 3× stronger shadow
        }}
      >
        <img
          src={`https://backend-so4g.onrender.com${url}`}
          alt={title}
          className="
            w-full
            max-h-[60vh]
            object-contain
            rounded-xl
            select-none

            md:w-full     /* full size on PC */
            w-[70%]       /* 30% smaller on mobile */
            mx-auto
          "
        />
      </div>
    </div>
  );
}
