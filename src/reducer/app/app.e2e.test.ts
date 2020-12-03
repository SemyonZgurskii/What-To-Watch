import {reducer, ActionCreator, Type} from "./app";
import {Genre} from "../../constants";

const initialState: Type["STATE"] = {
  activeGenre: Genre.AllGenres,
}

describe("test AppReducer", () => {
  it("action should correctly change state", () => {
    const resultState = reducer(initialState, ActionCreator.setActiveGenre(Genre.Crime));

    expect(resultState).toEqual({activeGenre: Genre.Crime});
  })
})
