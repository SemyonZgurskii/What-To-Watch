import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import BigVideoPlayer from "./big-video-player";

configure({adapter: new Adapter});

function MockChildren() {return <div></div>}

describe("test BigVideoPlayer", () => {

  it("when props isPlaying has value equal true, player should contain pause icon", () => {
    const isPlaying = true;

    const tree = mount(
      <BigVideoPlayer
        duration={0}
        currentTime={0}
        onPlayButtonClick={() => {}}
        onFullScreenButtonClick={() => {}}
        onExitButtonClick={() => {}}
        isPlaying={isPlaying}
      >
        <MockChildren/>
      </BigVideoPlayer>
    )

    const playButton = tree.find(".player__play");
    const imageLink = playButton.find("use");

    expect(imageLink.html()).toContain(`xlink:href="#pause"`);
  })

  it("when props isPlaying has value equal false, player should contain pause icon", () => {
    const isPlaying = false;

    const tree = mount(
      <BigVideoPlayer
        duration={0}
        currentTime={0}
        onPlayButtonClick={() => {}}
        onFullScreenButtonClick={() => {}}
        onExitButtonClick={() => {}}
        isPlaying={isPlaying}
      >
        <MockChildren/>
      </BigVideoPlayer>
    )

    const playButton = tree.find(".player__play");
    const imageLink = playButton.find("use");

    expect(imageLink.html()).toContain(`xlink:href="#play-s"`);
  })

  it("play button should trigger callback", () => {
    const mockCallback = jest.fn();

    const tree = mount(
      <BigVideoPlayer
        duration={0}
        currentTime={0}
        onPlayButtonClick={mockCallback}
        onFullScreenButtonClick={() => {}}
        onExitButtonClick={() => {}}
        isPlaying={false}
      >
        <MockChildren/>
      </BigVideoPlayer>
    )

    tree.find(".player__play").simulate("click");

    expect(mockCallback).toHaveBeenCalledTimes(1);
  })

  it("fullscreen button should trigger callback", () => {
    const mockCallback = jest.fn();

    const tree = mount(
      <BigVideoPlayer
        duration={0}
        currentTime={0}
        onPlayButtonClick={() => {}}
        onFullScreenButtonClick={mockCallback}
        onExitButtonClick={() => {}}
        isPlaying={false}
      >
        <MockChildren/>
      </BigVideoPlayer>
    )

    tree.find(".player__full-screen").simulate("click");

    expect(mockCallback).toHaveBeenCalledTimes(1);
  })

  it("exit button should trigger callback", () => {
    const mockCallback = jest.fn();

    const tree = mount(
      <BigVideoPlayer
        duration={0}
        currentTime={0}
        onPlayButtonClick={() => {}}
        onFullScreenButtonClick={() => {}}
        onExitButtonClick={mockCallback}
        isPlaying={false}
      >
        <MockChildren/>
      </BigVideoPlayer>
    )

    tree.find(".player__exit").simulate("click");

    expect(mockCallback).toHaveBeenCalledTimes(1);
  })
})
