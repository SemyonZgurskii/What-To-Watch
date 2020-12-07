import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

configure({adapter: new Adapter});

describe("test MovieCard", () => {
  it("click on component and its title, should trigger callback and put movie id in it", () => {
    const id = 11;
    const onMovieCardClick = jest.fn(x => x);

    const tree = shallow(
      <MovieCard
        name="test"
        onMouseEnter={() => {}}
        onMouseOut={() => {}}
        id={id}
        onMovieCardClick={onMovieCardClick}
      >
        <div></div>
      </MovieCard>
    )

    tree.find(".small-movie-card__image").simulate("click");
    tree.find(".small-movie-card__title").simulate("click");

    expect(onMovieCardClick).toHaveBeenCalledTimes(2);
    expect(onMovieCardClick.mock.results[0].value).toBe(id);
    expect(onMovieCardClick.mock.results[1].value).toBe(id);
  })
})
