import * as React from "react";
import ShowMoreButton from "../../components/show-more-button/show-more-button";
import {useEffect, useState} from "react";
import {BASIC_MOVIES_COUNT, MOVIES_PER_CLICK} from "../../constants";

interface HocProps<T> {
  basicData: Readonly<Array<T>>,
}

export interface ComponentProps<T> {
  processedData: Readonly<Array<T>>,
  children: React.ReactNode,
}

function withShowMoreButton<T>(Component: React.ComponentType<ComponentProps<T>>): React.ComponentType<HocProps<T>> {
 return function(props) {
   const {basicData} = props;

   const [showedItemsCount, setShowedItemCount] = useState(BASIC_MOVIES_COUNT);
   const itemsToShow = showedItemsCount < basicData.length ?
     basicData.slice(0, showedItemsCount) :
     basicData;

   function handleShowMoreButtonClick() {
     setShowedItemCount(showedItemsCount + MOVIES_PER_CLICK);
   }

    return (
      <Component processedData={itemsToShow}>
        {itemsToShow.length !== basicData.length &&
          <ShowMoreButton onShowMoreButtonClick={handleShowMoreButtonClick}/>
        }
      </Component>
    )
  }
}

export default withShowMoreButton;
