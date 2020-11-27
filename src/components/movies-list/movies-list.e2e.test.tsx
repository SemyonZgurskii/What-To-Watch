import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import MoviesList from "./movies-list";
import {moviesData} from "../../mock";

configure({adapter: new Adapter()});

describe("test MoviesList", () => {
  it("should render correct count of movie cards", () => {
    HTMLMediaElement.prototype.pause = () => {};

    const tree = mount(
      <MoviesList processedData={moviesData}/>
    )

    const movieCardElements = tree.find(".small-movie-card");

    expect(movieCardElements.length).toEqual(moviesData.length);
  });


})
