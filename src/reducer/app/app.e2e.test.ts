import {reducer, ActionCreator, State} from "./app";
import {Genre} from "../../constants";

const initialState: State = {
  activeGenre: Genre.AllGenres,
  selectedMovieId: null,
}

describe("test AppReducer", () => {
  it("action should correctly change state", () => {
    const resultState = reducer(initialState, ActionCreator.setActiveGenre(Genre.Crime));

    expect(resultState).toEqual({activeGenre: Genre.Crime});
  })
})
