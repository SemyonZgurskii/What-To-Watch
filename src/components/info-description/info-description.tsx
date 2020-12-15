import * as React from "react";
import Overview from "../overview/overview";
import {Movie} from "../../types";
import Details from "../details/details";
import InfoMenu from "../info-menu/info-menu";
import {useState} from "react";
import Reviews from "../reviews/reviews";

const MenuItem = {
  OVERVIEW: "Overview",
  DETAILS: "Details",
  REVIEWS: "Reviews",
}

interface Props {
  movieData: Movie,
}

function InfoDescription(props: Props) {
  const {movieData} = props;
  const {description, starring, director, scoreCount, rating, runTime, releaseDate, genre, id} = movieData;

  const [activeItem, setActiveItem] = useState(MenuItem.OVERVIEW);

  return (
    <div className="movie-card__desc">
      <InfoMenu
        menuNames={Object.values(MenuItem)}
        activeItemName={activeItem}
        onMenuItemClick={(name) => setActiveItem(name)}
      />

      {activeItem === MenuItem.OVERVIEW &&
        <Overview
          description={description}
          rating={rating}
          scoreCount={scoreCount}
          director={director}
          starring={starring}
        />
      }

      {activeItem === MenuItem.DETAILS &&
        <Details
          runTime={runTime}
          starring={starring}
          director={director}
          releaseDate={releaseDate}
          genre={genre}
        />
      }

      {activeItem === MenuItem.REVIEWS &&
        <Reviews
          id={id}
        />
      }
    </div>
  )
}

export default InfoDescription;
