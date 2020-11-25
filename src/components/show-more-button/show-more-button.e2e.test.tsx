import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import ShowMoreButton from "./show-more-button";

describe("test ShowMoreButton", () => {
  it("click event should trigger callback", () => {
    const testFunction = jest.fn();

    const tree = shallow(
      <ShowMoreButton
        onShowMoreButtonClick={testFunction}
      />
    )
    tree.simulate("click");

    expect(testFunction).toHaveBeenCalledTimes(1);
  })
})
