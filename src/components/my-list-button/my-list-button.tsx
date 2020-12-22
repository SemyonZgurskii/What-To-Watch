import * as React from "react";

interface Props {
  isFavorite: boolean,
  onButtonClick: () => void,
}

function MyListButton(props: Props) {
  const {onButtonClick, isFavorite} = props;

  function getIcon(isFavorite) {
    if (!isFavorite) {
      return (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    )
  }

  return (
    <button className="btn btn--list movie-card__button" type="button"
            onClick={() => onButtonClick()}
    >
      {getIcon(isFavorite)}
      <span>My list</span>
    </button>
  )
}

export default MyListButton;
