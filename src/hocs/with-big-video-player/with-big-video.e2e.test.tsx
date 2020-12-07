import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withBigVideo, {ComponentProps} from "./with-big-video";
import {moviesData} from "../../mock";

configure({adapter: new Adapter});

let WrappedTestComponent: ReturnType<typeof withBigVideo>;

describe("test withBigVideo", () => {
  beforeEach(() => {
    function TestComponent(props: ComponentProps) {
      const {children, onPlayButtonClick, onFullScreenButtonClick} = props;

      return(
        <div>
          {children}
          <button onClick={onPlayButtonClick} className="play-button" ></button>
          <button onClick={onFullScreenButtonClick} className="full-screen-button" ></button>
        </div>
      )
    }

    WrappedTestComponent = withBigVideo(TestComponent);

  })

  it("wrapped component should contain html video player", () => {
    const tree = shallow(<WrappedTestComponent
      movieData={moviesData[0]}
    />);

    expect(tree.find("video").exists()).toBe(true);
  })

  it("activate callback should trigger PLAY video", () => {
    HTMLMediaElement.prototype.pause = () => {}; // < исключительно для того чтобы консоль не ругалась на то, что метод не объявлен

    const tree = mount(<WrappedTestComponent
      movieData={moviesData[0]}
    />);

    const mockPlayFunction = jest.fn();
    HTMLMediaElement.prototype.play = mockPlayFunction;

    tree.find(".play-button").simulate("click");

    expect(mockPlayFunction).toHaveBeenCalledTimes(1);
  })

  it("activate callback should trigger PAUSE video", () => {
    const tree = mount(<WrappedTestComponent
      movieData={moviesData[0]}
    />);

    tree.find(".play-button").simulate("click");

    tree.update();

    const mockPauseFunction = jest.fn();
    HTMLMediaElement.prototype.pause = mockPauseFunction;

    tree.find(".play-button").simulate("click");

    expect(mockPauseFunction).toHaveBeenCalledTimes(1);
  })

  it("activate callback should trigger fullscreen mode", () => {
    const tree = mount(<WrappedTestComponent
      movieData={moviesData[0]}
    />);

    const mockFullScreenFunction = jest.fn();
    HTMLMediaElement.prototype.requestFullscreen = mockFullScreenFunction;

    tree.find(".full-screen-button").simulate("click");

    expect(mockFullScreenFunction).toHaveBeenCalledTimes(1);
  })
})
