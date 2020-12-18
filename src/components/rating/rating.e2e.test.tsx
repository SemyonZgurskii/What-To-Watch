import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Rating from "./rating";

configure({adapter: new Adapter()});

describe("test Rating", () => {
  it("click on rating item should trigger callback and put its value in it", () => {
    const TESTING_ITEM_NUMBER = 2;
    const mockFunction = jest.fn((value) => value);

    const tree = shallow(<Rating onValueSelect={mockFunction}/>);

    tree.find(".rating__input").at(TESTING_ITEM_NUMBER).simulate("click");

    expect(mockFunction.mock.results[0].value).toBe(TESTING_ITEM_NUMBER);
  })
})
