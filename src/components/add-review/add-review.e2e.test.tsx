import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";
import {moviesData} from "../../mock";

configure({adapter: new Adapter()});

describe("test AddReview", () => {
  it("if text size is not valid, button 'Post' should be disabled", () => {
    const NORMAL_SIZE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, repellat?adipisicing elit. Fugit, repellat?";

    const tree = mount(<AddReview
      movieData={moviesData[0]}
      postReview={() => {}}
    />)

    const postButton = tree.find(".add-review__btn");
    expect(postButton.getDOMNode().disabled).toBe(true);

    const textContainer = tree.find(".add-review__textarea");
    textContainer.getDOMNode().textContent = NORMAL_SIZE_TEXT;
    textContainer.simulate("change");

    expect(postButton.getDOMNode().disabled).toBe(false);
  })
})
