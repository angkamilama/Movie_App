import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { Movie } from "@/types/movieType";

function MyCarousel({ movies }: Movie[]): JSX.Element {
  const randomIndex = Math.floor(Math.random() * movies.length);
  let movieSlide = movies.slice(randomIndex, movies.length);
  const moviesList = movieSlide?.map((movie: Movie) => {
    const { id, title, poster_path } = movie;

    return (
      <NavLink
        key={id}
        to={`/movies/${id}`}
        className="bg-slate-700 flex flex-col justify-evenly items-center w-[300px] md:w-[250px] h-[400px] "
      >
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="w-[200px] h-[300px] hover:scale-105"
          alt={`poster of ${title}`}
        />
        <p className="text-slate-400 hover:text-slate-200 text-center font-bold text-base cursor-pointer p-3">
          {title}
        </p>
      </NavLink>
    );
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 428,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings} className="text-white h-[400px] w-9/12  mx-auto">
        {moviesList}
      </Slider>
    </div>
  );
}

export default MyCarousel;
