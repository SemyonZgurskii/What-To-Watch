import * as React from "react";
import Rating from "../rating/rating";
import {useState, useEffect} from "react";
import {Movie, PostReviewData} from "../../types";
import history from "../../history";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants";

interface Props {
  postReview: (movieId: number, review: PostReviewData) => void,
  movieData: Movie
}

// TODO: обработать ошибки при запросах
//
// При нажатии кнопки «Post» и отправки данных форма должна блокироваться. Разблокировка формы происходит
// в случае успешной отправки или при возникновении ошибки.
//   В случае успешной отправки формы пользователь перенаправляется в карточку текущего фильма.
//   В случае возникновения ошибки следует уведомить пользователя. Способ отображения ошибки остаётся на усмотрение разработчика.

function AddReview(props: Props) {
  const {postReview, movieData} = props;

  if (movieData === null) {
    return null;
  }

  const {backgroundImage, name, posterImage, id} = movieData;

  const [text, changeReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isValid, setValidStatus] = useState(false);

  useEffect(() => {
    if(text.length > 50 &&
      text.length < 400 &&
      rating > 0
    ) {
      setValidStatus(true);
    } else {
      setValidStatus(false);
    }
  },[text, rating]);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link href="main.html" className="logo__link"
                  to={AppRoute.MAIN}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link"
                   onClick={(evt) => {
                     evt.preventDefault();
                     history.goBack();
                   }}
                >{name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              <Rating
                onValueSelect={(value) => setRating(value)}
              />
            </div>
          </div>

          <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                        onChange={(evt) => changeReviewText(evt.target.value)}
              ></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"
                      disabled={!isValid}
                      onClick={(evt) => {
                        evt.preventDefault();
                        postReview(id, {rating, comment: text})
                        history.goBack();
                      }}
              >Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  )
}

export default AddReview;
