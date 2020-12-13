import * as React from "react";
import {Review} from "../../types";

interface Props {
  review: Review,
}

function Review(props: Props) {
  const {review} = props;
  const {rating, comment, date, user} = review;
  const {name} = user;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime="2016-12-24">{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  )
}

export default Review;
