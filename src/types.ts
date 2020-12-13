import {State as dataState} from "./reducer/data/data";
import {State as appState} from "./reducer/app/app";
import NameSpace from "./reducer/name-space";
import {Genre} from "./constants";

export type Movie = Readonly<{
  backgroundColor: string,
  backgroundImage: string,
  description: string,
  director: string,
  genre: Genre,
  id: number,
  isFavorite: boolean,
  name: string,
  posterImage: string,
  previewImage: string,
  previewVideoLink: string,
  rating: number,
  releaseDate: number,
  runTime: number,
  scoreCount: number,
  starring: Array<string>,
  videoLink: string,
}>

export type Review = Readonly<{
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
}>

export type Reviews = ReadonlyArray<Review>;

export type MoviesData = Readonly<Array<Movie>> | null;

export interface GlobalState {
  [NameSpace.APP]: appState,
  [NameSpace.DATA]: dataState,
}
