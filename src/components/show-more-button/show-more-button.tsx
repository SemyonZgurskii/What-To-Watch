import * as React from "react";

interface Props {
  onShowMoreButtonClick: () => void,
}

function ShowMoreButton(props: Props): React.ReactElement {
  const {onShowMoreButtonClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
              onClick={onShowMoreButtonClick}
      >Show more</button>
    </div>
  );
}

export default ShowMoreButton;
