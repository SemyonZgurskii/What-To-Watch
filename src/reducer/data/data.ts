import {Movie, MoviesData, Reviews} from "../../types";
import {convertData} from "../../adapter/data";
import {Dispatch} from "redux";
import {AxiosInstance} from "axios";
import {UserListAction} from "../../constants";

export interface State {
  moviesData: MoviesData | null,
  promoMovie: Movie,
  selectedMovieReviews: Reviews,
  userMovies: MoviesData,
}

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
type Action = ReturnType<PropertiesType<typeof ActionCreator>>

const initialState: State = {
  moviesData: null,
  promoMovie: null,
  userMovies: null,
  selectedMovieReviews: [],
}

enum ActionType {
  LOAD_MOVIES_DATA = "LOAD_MOVIES_DATA",
  LOAD_PROMO_MOVIE = "LOAD_PROMO_MOVIE",
  LOAD_MOVIE_REVIEWS = "LOAD_MOVIE_REVIEWS",
  LOAD_USER_MOVIES = "LOAD_USER_MOVIES",
  ADD_TO_USER_LIST = "ADD_TO_USER_LIST",
  REMOVE_FROM_USER_LIST = "REMOVE_FROM_USER_LIST",
}

const ActionCreator = {
  setMoviesData: (moviesData: MoviesData) => {
    return {
      type: ActionType.LOAD_MOVIES_DATA,
      payload: moviesData,
    } as const
  },
  setPromoMovie: (movie: Movie) => {
    return{
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    } as const
  },
  setSelectedMovieReviews: (reviews) => {
    return {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: reviews,
    } as const
  },
  setUserMovies: (moviesData: MoviesData) => {
    return {
      type: ActionType.LOAD_USER_MOVIES,
      payload: moviesData,
    } as const
  },
  changeUserMovies: (movieData: Movie) => {
    if (movieData.isFavorite) {
      return {
        type: ActionType.ADD_TO_USER_LIST,
        payload: movieData,
      } as const
    }

    return {
      type: ActionType.REMOVE_FROM_USER_LIST,
      payload: movieData.id
    } as const
  }
}

const Operation = {
  loadMoviesData: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get("/films")
      .then((response) => {
        dispatch(ActionCreator.setMoviesData(response.data.map(convertData)));
      })
  },
  loadPromoMovie: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get("/films/promo")
      .then((response) => {
        dispatch(ActionCreator.setPromoMovie(convertData(response.data)));
      })
  },
  loadMovieReviews: (movieId: Movie["id"]) => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.setSelectedMovieReviews(response.data));
      })
  },
  loadUserMovies: () => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.get("/favorite")
      .then((response) => {
        dispatch(ActionCreator.setUserMovies(response.data.map(convertData)))
      })
  },
  updateMovieReviews: (movieId, reviewData) => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    return api.post(`/comments/${movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then((response) => {
        console.log(response.data);
        dispatch(ActionCreator.setSelectedMovieReviews(response.data));
      })
  },
  updateUserMovies: (movieId: Movie["id"], status: Movie["isFavorite"]) => (dispatch: Dispatch, getState: () => State, api: AxiosInstance) => {
    const actionId = status ? UserListAction.DELETE : UserListAction.ADD;

    return api.post(`/favorite/${movieId}/${actionId}`)
      .then((response) => {
        dispatch(ActionCreator.changeUserMovies(convertData(response.data)));
      })
  }
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.LOAD_MOVIES_DATA:
      return {...state, moviesData: action.payload};
    case ActionType.LOAD_PROMO_MOVIE:
      return {...state, promoMovie: action.payload}
    case ActionType.LOAD_MOVIE_REVIEWS:
      return  {...state, selectedMovieReviews: action.payload}
    case ActionType.LOAD_USER_MOVIES:
      return {...state, userMovies: action.payload}
    case ActionType.ADD_TO_USER_LIST:
      return {...state, userMovies: [...state.userMovies, action.payload]}
    case ActionType.REMOVE_FROM_USER_LIST:
      return {...state, userMovies: state.userMovies.filter(({id}) => id !== action.payload)}
    default:
      return state;
  }
}

export {reducer, Operation, ActionCreator};
