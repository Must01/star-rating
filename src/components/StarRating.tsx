import { useState } from "react";
import { FaStar } from "react-icons/fa";

type starProps = {
  numStar: number;
};

export default function StarRating({ numStar = 5 }: starProps) {
  const [stars, setStars] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex bg-amber-50 flex-col justify-center items-center min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        {[...Array(numStar)].map((_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              role="img"
              data-testid="star-icon"
              key={starValue}
              className={
                starValue <= (hover || stars)
                  ? "text-yellow-400 size-8 cursor-pointer"
                  : "text-gray-300 size-8 cursor-pointer"
              }
              onClick={() => setStars(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>
      <div className="p-5">
        Made with 💖 By{" "}
        <a
          className="hover:underline"
          href="https://mustaphabouddahr.netlify.app"
        >
          Mustapha Bouddahr
        </a>
      </div>
    </div>
  );
}
