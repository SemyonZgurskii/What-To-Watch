import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import GenreMenu from "./genre-menu";
import {Genre} from "../../constants";

configure({adapter: new Adapter()});

const MAX_MENU_ITEMS_COUNT = 10;

const genres: Array<Genre> = [
  Genre.AllGenres,
  Genre.Crime,
  Genre.Comedies,
  Genre.Documentary,
  Genre.Dramas,
  Genre.Horror,
  Genre.KidsAndFamily,
  Genre.Romance,
  Genre.SciFi,
  Genre.Thrillers
];

describe("test GenreMenu", () => {
  it("Shouldn't render more than defined count of menu items", () => {
    const tree = shallow(
      <GenreMenu
        activeGenre={Genre.AllGenres}
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
        activeGenre={Genre.AllGenres}
        setActiveGenre={testCallback}
        genres={genres}
      />
    )

    tree.find(".catalog__genres-link").first().simulate("click", {preventDefault: () => {}});

    expect(testCallback).toBeCalledTimes(1);
  })
})
