import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import withShowMoreButton from "./with-show-more-button";
import {ComponentProps} from "./with-show-more-button";
import {moviesData as basicData} from "../../mock";
import {Movie as DataItemType} from "../../types";


configure({adapter: new Adapter()});

const BASIC_ITEMS_COUNT = 8;
const ITEMS_PER_CLICK = 8;
const TEST_ELEMENT_CLASS_NAME = "testComponent";

function TestComponent<T>(props: ComponentProps<T>): React.ReactElement {
  const {processedData, children} = props;

  return (
    <>
      {processedData.map((element, index) => {
        return (
          <div className={TEST_ELEMENT_CLASS_NAME}
               key={index}
          >{index}</div>
        )
      })}
      {children}
    </>
  )
}

describe("test withShowMoreButton", () => {
  it("the click on show more button should trigger generate of correct count of movies", () => {
    const TestComponentWrapped = withShowMoreButton<DataItemType>(TestComponent);

    const tree = mount(
      <TestComponentWrapped basicData={basicData}/>
    )

    const showMoreButtonElement = tree.find(".catalog__button")

    showMoreButtonElement.simulate("click");

    tree.update();

    const currentListElementsCount = tree.find("." + TEST_ELEMENT_CLASS_NAME).length;

  })

  it("if all of items are rendered, show more button should disappear", () => {
    const TestComponentWrapped = withShowMoreButton<DataItemType>(TestComponent);
    const trimmedData = basicData.slice(0, BASIC_ITEMS_COUNT);

    const tree = mount(
      <TestComponentWrapped basicData={trimmedData}/>
    )

    expect(tree.find(".catalog__button").exists()).toEqual(false);
  })
})
