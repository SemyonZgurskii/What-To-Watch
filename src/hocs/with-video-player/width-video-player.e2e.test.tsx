import * as React from "react";
import withVideoPlayer from "./with-video-player";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";

configure({adapter: new Adapter()});

const MockComponent = (props) => <div>{props.children}</div>;
const WrappedMockComponent = withVideoPlayer(MockComponent);

describe("test WithVideoPlayer", () => {
  it("should return component with <video/>", () => {
    const renderedComponent = mount(<WrappedMockComponent/>)

    expect(renderedComponent.find("video").exists()).toBe(true);;
  })
})