import * as React from "react";
import {Genre, MAX_GENRES_COUNT} from "../../constants";

const ACTIVE_CLASS = "catalog__genres-item--active";

interface Props {
  activeGenre: Genre,
  genres: ReadonlyArray<Genre>,
  setActiveGenre: (genre) => void,
}

function GenreMenu (props: Props): React.ReactElement {
  const {genres, setActiveGenre, activeGenre} = props;
  let trimmedGenres = genres.slice(0, MAX_GENRES_COUNT);
  trimmedGenres.unshift(Genre.AllGenres);

  return (
    <ul className="catalog__genres-list">
      {trimmedGenres.map((genre) => {
        const modifier = genre === activeGenre ? ACTIVE_CLASS : "";

        return (
          <li className={`catalog__genres-item ${modifier}`}
              key={genre}>
            <a href="#"
               className="catalog__genres-link"
               onClick={(evt) => {
                   evt.preventDefault();
                   setActiveGenre(genre)
                 }
               }
            >{genre}</a>
          </li>
        )
      })}
    </ul>
  )
}

export default GenreMenu;
