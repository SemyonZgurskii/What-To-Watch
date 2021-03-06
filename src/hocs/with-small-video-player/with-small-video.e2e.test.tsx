import * as React from "react";
import withSmallVideo from "./with-small-video";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount, shallow} from "enzyme";

interface MockComponentProps {
  onMouseOut: () => void,
  onMouseEnter: () => void,
}
// TODO:
//  * тест на наличие ref
//  * тест на реагирование на событие onMouseEnter, onMouseOut, учитывая интервалы

configure({adapter: new Adapter()});



describe("test withSmallVideo", () => {
  it("should return component with video element", () => {
    const MockComponent = (props: React.PropsWithChildren<MockComponentProps>) => {
      const {onMouseOut, onMouseEnter, children} = props;

      return (
        <div
          className="testDiv"
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
        >{children}</div>
      );
    };

    const WrappedMockComponent = withSmallVideo(MockComponent);

    HTMLMediaElement.prototype.pause = () => {};


    const renderedComponent = shallow(<WrappedMockComponent
      id={0}
      previewVideoLink = ""
      previewImage = ""
      name = ""
    />);

    expect(renderedComponent.find("video").exists()).toBe(true);
  });

  // it("in 1sec after mouseEnter event happened, video player should start playing", (done) => {
  //   // TODO: выяснить как эмитировать задержку курсора над элементом на определённое время
  //
  //   const MockComponent = (props: React.PropsWithChildren<MockComponentProps>) => {
  //     const {onMouseOut, onMouseEnter, children} = props;
  //
  //     return (
  //       <div
  //         className="testDiv"
  //         onMouseEnter={onMouseEnter}
  //         onMouseOut={onMouseOut}
  //       >{children}</div>
  //     );
  //   };
  //
  //   const WrappedMockComponent = withSmallVideo(MockComponent);
  //
  //   HTMLMediaElement.prototype.pause = () => {};
  //
  //   const renderedComponent = mount(<WrappedMockComponent
  //     previewVideoLink = ""
  //     previewImage = ""
  //     name = ""
  //   />);
  //
  //   const mockPlayFunction = jest.fn();
  //   HTMLMediaElement.prototype.play = mockPlayFunction;
  //   const videoElement = renderedComponent.find('video');
  //   const testElement = renderedComponent.find('.testDiv');
  //
  //   console.log(renderedComponent.state());
  //   // videoElement.getDOMNode().play();
  //
  //   testElement.simulate("mouseEnter");
  //   setTimeout(()=> {
  //     expect(mockPlayFunction).toHaveBeenCalledTimes(2);
  //     done()
  //   }, 1000);
  // })
})
