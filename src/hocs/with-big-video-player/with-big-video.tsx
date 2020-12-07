import * as React from "react";
import {createRef, useEffect, useState} from "react";
import {Movie} from "../../types";

interface HocProps {
  movieData: Movie,
}

export interface ComponentProps {
  duration: number,
  currentTime: number,
  children: React.ReactNode,
  isPlaying: boolean,
  onPlayButtonClick: () => void,
  onFullScreenButtonClick: () => void,
  onExitButtonClick: () => void,
}

function withBigVideo(Component: React.ComponentType<ComponentProps>): React.ComponentType<HocProps> {
  return function(props: HocProps) {
    const {movieData} = props;
    const {videoLink} = movieData;

    const videoRef = createRef<HTMLVideoElement>();

    const [isPlaying, setPlayingStatus] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      const video = videoRef.current;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }

      video.onloadeddata = () => {
        setDuration(video.duration);
      }

      video.ontimeupdate = () => {
        setCurrentTime(Math.floor(video.currentTime));
      }

      video.onplay = () => {
        setPlayingStatus(true);
      }

      video.onpause = () => {
        setPlayingStatus(false);
      }
    },[isPlaying, currentTime, duration])

    function handleExitButtonClick() {
      console.log("yoyo");
      videoRef.current.src = "";
      videoRef.current.onloadeddata = null;
      videoRef.current.ontimeupdate = null;
      videoRef.current.onplay = null;
      videoRef.current.onpause = null;
    }

    function handlePlayButtonClick() {
      setPlayingStatus(!isPlaying);
    }

    function handleFullScreenButtonClick() {
      videoRef.current.requestFullscreen();
    }

    return (
      <Component
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayButtonClick={handlePlayButtonClick}
        onFullScreenButtonClick={handleFullScreenButtonClick}
        onExitButtonClick={handleExitButtonClick}
      >
        <video
          ref={videoRef}
          src={videoLink}
          className="player__video"
          poster="img/player-poster.jpg"
        ></video>
      </Component>
    )
  }
}

export default withBigVideo;
