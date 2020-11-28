import * as React from "react";
import {MAX_GENRES_COUNT} from "../../constants";

interface Props {
  genres: ReadonlyArray<string>,
  setActiveGenre: (genre) => void,
}

function GenreMenu (props: Props): React.ReactElement {
  const {genres, setActiveGenre} = props;
  let trimmedGenres = genres.slice(0, MAX_GENRES_COUNT);
  trimmedGenres.unshift("All genres");

  return (
    <ul className="catalog__genres-list">
      {trimmedGenres.map((genre) =>
        <li className="catalog__genres-item catalog__genres-item--active"
            key={genre}>
          <a href="#" className="catalog__genres-link"
            onClick={() => setActiveGenre(genre)}
          >{genre}</a>
        </li>
      )}
    </ul>
  )
}

export default GenreMenu;
