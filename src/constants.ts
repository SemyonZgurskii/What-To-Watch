export const BASIC_MOVIES_COUNT = 8;
export const MOVIES_PER_CLICK = 8;
export const MAX_GENRES_COUNT = 9;
export const MAX_SIMILAR_MOVIES_COUNT= 4;

export enum Genre {
  AllGenres = "All genres",
  Comedies = "comedies",
  Crime = "crime",
  Documentary = "documentary",
  Dramas = "dramas",
  Horror = "horror",
  KidsAndFamily = "kids & family",
  Romance = "romance",
  SciFi = "sci-fi",
  Thrillers = "thrillers",
}

export enum AppRoute {
  MAIN = "/",
  PLAYER = "/play",
  MOVIE_INFO = "/movie-info",
  SIGN_IN = "/sign-in",
  ADD_REVIEW = "/add-review",
  MY_LIST = "/my-list",
}

export enum UserListAction {
  ADD = 1,
  DELETE = 0.1,
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
