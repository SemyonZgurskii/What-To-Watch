import * as React from "react";
import withSmallVideoPlayer from "./with-small-video-player";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount, shallow} from "enzyme";

interface MockComponentProps {
  handleMouseOut: () => void,
  handleMouseEnter: () => void,
}
// TODO:
//  * тест на наличие ref
//  * тест на реагирование на событие onMouseEnter, onMouseOut, учитывая интервалы

configure({adapter: new Adapter()});



describe("test WithSmallVideoPlayer", () => {
  it("should return component with video element", () => {
    const MockComponent = (props: React.PropsWithChildren<MockComponentProps>) => {
      const {handleMouseOut, handleMouseEnter, children} = props;

      return (
        <div
          className="testDiv"
          onMouseEnter={handleMouseEnter}
          onMouseOut={handleMouseOut}
        >{children}</div>
      );
    };

    const WrappedMockComponent = withSmallVideoPlayer(MockComponent);

    HTMLMediaElement.prototype.pause = () => {};


    const renderedComponent = shallow(<WrappedMockComponent
      previewVideoLink = ""
      previewImage = ""
      name = ""
    />);

    expect(renderedComponent.find("video").exists()).toBe(true);
  });

  it("in 1sec after mouseEnter event happened, video player should start playing", (done) => {
    // TODO: выяснить как эмитировать задержку курсора над элементом на определённое время

    const MockComponent = (props: React.PropsWithChildren<MockComponentProps>) => {
      const {handleMouseOut, handleMouseEnter, children} = props;

      return (
        <div
          className="testDiv"
          onMouseEnter={handleMouseEnter}
          onMouseOut={handleMouseOut}
        >{children}</div>
      );
    };

    const WrappedMockComponent = withSmallVideoPlayer(MockComponent);

    HTMLMediaElement.prototype.pause = () => {};

    const renderedComponent = mount(<WrappedMockComponent
      previewVideoLink = ""
      previewImage = ""
      name = ""
    />);

    const mockPlayFunction = jest.fn();
    HTMLMediaElement.prototype.play = mockPlayFunction;
    const videoElement = renderedComponent.find('video');
    const testElement = renderedComponent.find('.testDiv');

    console.log(renderedComponent.state());
    // videoElement.getDOMNode().play();

    testElement.simulate("mouseEnter");
    setTimeout(()=> {
      expect(mockPlayFunction).toHaveBeenCalledTimes(2);
      done()
    }, 1000);
  })
})
