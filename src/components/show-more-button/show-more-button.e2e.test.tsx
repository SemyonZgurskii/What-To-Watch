import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import ShowMoreButton from "./show-more-button";

configure({adapter: new Adapter()})

describe("test ShowMoreButton", () => {
  it("click event should trigger callback", () => {
    const testFunction = jest.fn();

    const tree = shallow(
      <ShowMoreButton
        onShowMoreButtonClick={testFunction}
      />
    )

    const buttonElement = tree.find(".catalog__button")

    buttonElement.simulate("click");

    expect(testFunction).toHaveBeenCalledTimes(1);
  })
})
