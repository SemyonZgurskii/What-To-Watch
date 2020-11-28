import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreMenu from "./genre-menu";

configure({adapter: new Adapter()});

const MAX_MENU_ITEMS_COUNT = 10;

const genres: ReadonlyArray<string> = [
  "All genres",
  "Comedies",
  "Crime",
  "Documentary",
  "Dramas",
  "Horror",
  "Kids & Family",
  "Romance",
  "Sci-Fi",
  "Thrillers"
];

describe("test GenreMenu", () => {
  it("Shouldn't render more than defined count of menu items", () => {
    const tree = shallow(
      <GenreMenu
        setActiveGenre={() => {}}
        genres={genres}
      />
    )

    expect(tree.find(".catalog__genres-link").length).toBeLessThanOrEqual(MAX_MENU_ITEMS_COUNT);
  })

  it("Click on menu item should trigger callback", () => {
    const testCallback = jest.fn();

    const tree = shallow(
      <GenreMenu
        setActiveGenre={testCallback}
        genres={genres}
      />
    )

    tree.find(".catalog__genres-link").first().simulate("click");

    expect(testCallback).toBeCalledTimes(1);
  })
})
