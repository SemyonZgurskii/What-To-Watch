import * as React from "react";

interface Props {
  onValueSelect: (value: number) => void;
}

function Rating(props: Props) {
  const {onValueSelect} = props;

  const MAX_RATING = 5;

  function createDots(count, callback) {
    return Array.from(new Array(count), (item, index) => {
      return (
        <React.Fragment key={`input ${index + 1}`}>
          <input className="rating__input"
                 id={`star-${index + 1}`}
                 type="radio"
                 name="rating"
                 value={index + 1}
                 onClick={() => callback(index + 1)}
          />
          <label className="rating__label"
                 htmlFor={`star-${index + 1}`}
          >
            {`Rating ${index + 1}`}
          </label>
        </React.Fragment>
      )
    })
  }

  return (
    <div className="rating">
      <div className="rating__stars">
        {createDots(MAX_RATING, onValueSelect)}
      </div>
    </div>
  )
}

export default Rating;
