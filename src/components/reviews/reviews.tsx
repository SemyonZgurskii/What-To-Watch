import * as React from "react";
import Review from "../review/review";
import {connect} from "react-redux";
import {Reviews, GlobalState, Movie} from "../../types";
import {Operation} from "../../reducer/data/data";
import {getMovieReviews} from "../../reducer/data/selector";
import {useEffect, useState} from "react";

interface Props {
  reviews: Reviews,
  loadReviews: (id) => void,
  id: Movie["id"],
}

function Reviews(props: Props) {
  const {reviews, loadReviews, id} = props;

  const [leftSideReviews, setLeftSideReviews] = useState(null);
  const [rightSideReviews, setRightSideReviews] = useState(null);

  useEffect(() => loadReviews(id), [id]);

  useEffect(() => {
    if (reviews.length >= 2) {
      setLeftSideReviews(reviews.slice(0, Math.floor(reviews.length/2)));
      setRightSideReviews(reviews.slice(Math.floor(reviews.length/2), reviews.length - 1));
    } else {
      setLeftSideReviews(reviews);
    }
  }, [reviews]);

  return (
    <>
      {leftSideReviews &&

      <div className="movie-card__reviews movie-card__row">

        <div className="movie-card__reviews-col">
          {leftSideReviews.map((review) => {
            return <Review review={review} key={review.user.id}/>
          })}
        </div>

        <div className="movie-card__reviews-col">
          {rightSideReviews &&
            rightSideReviews.map((review) => {
              return <Review review={review} key={review.user.id}/>
          })}
        </div>

      </div>
      }
    </>
  )
}

function mapStateToProps(store: GlobalState) {
  return {
    reviews: getMovieReviews(store),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadReviews(id) {dispatch(Operation.loadMovieReviews(id))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
