import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import {MoviesData} from "../../types";
import {MAX_SIMILAR_MOVIES_COUNT} from "../../constants";

interface Props {
  moviesData: MoviesData,
}

function MoreLikeThis(props: Props) {
  const {moviesData} = props;
  const trimmedData = moviesData.slice(0, MAX_SIMILAR_MOVIES_COUNT);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

        <MoviesList processedData={trimmedData}/>

    </section>
  )
}

export default MoreLikeThis;
