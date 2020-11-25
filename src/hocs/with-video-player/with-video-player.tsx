import * as React from "react";
import {useEffect, useState} from "react";
import {Movie} from "../../types";

interface HocProps {
  previewImage: Movie["previewImage"],
  name: Movie["name"],
  previewVideoLink: Movie["previewVideoLink"],
}

interface ComponentProps {
  name: Movie["name"],
  handleMouseEnter: () => void,
  handleMouseOut: () => void,
}

function withVideoPlayer(Component: React.ComponentType<ComponentProps>): React.ComponentType<HocProps> {
  return function (props) {
    const {name, previewVideoLink, previewImage} = props;
    const video: React.RefObject<HTMLVideoElement> = React.createRef();
    let timerId: ReturnType<typeof setTimeout>;

    const [isPlaying, setPlayingStatus] = useState(false);

    function handleMouseEnter() {
      timerId = setTimeout(() => setPlayingStatus(true),1000);
    }

    function handleMouseOut() {
      setPlayingStatus(false);
      clearTimeout(timerId);
    }

    useEffect(() => {
      if (isPlaying) {
        video.current.src = previewVideoLink;
        video.current.play();
      } else {
        video.current.pause();
        video.current.src = "";
      }
    },[isPlaying])

    return (
      <Component
        name={name}
        handleMouseEnter={handleMouseEnter}
        handleMouseOut={handleMouseOut}
      >
        <video
          ref={video}
          height="175"
          width="280"
          src={previewVideoLink}
          poster={previewImage}>
        </video>
      </Component>
    )
  }
}

export default withVideoPlayer;
