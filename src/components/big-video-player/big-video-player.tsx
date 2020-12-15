import * as React from "react";
import history from "../../history";
import {AppRoute} from "../../constants";

function formatTimeDuration(basicValue: number): string {
  const hours = Math.floor(basicValue / (60 * 60));
  const minutes = Math.floor((basicValue % (60 * 60)) / 60);
  const seconds = Math.floor(basicValue % 60);

  return `${hours}:${minutes}:${seconds}`;
}

function getRatio(value: number, target: number, maxScaleValue: number): number {
  return Math.floor(value / target * maxScaleValue);
}

interface Props {
  onFullScreenButtonClick: () => void;
  duration: number,
  currentTime: number,
  children: React.ReactNode,
  onPlayButtonClick: () => void;
  onExitButtonClick: () => void;
  isPlaying: boolean,
}

function PauseButton() {
  return (
    <>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </>
    )
}

function PlayButton() {
  return (
    <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>
  )
}

// TODO: найти и встроить кнопку Play

function BigVideoPlayer(props: Props) {
  const {currentTime, duration, children, onPlayButtonClick, isPlaying, onFullScreenButtonClick, onExitButtonClick} = props;
  const formattedDuration = formatTimeDuration(duration);
  const progressValue = getRatio(currentTime, duration, 100);

  return (
    <div className="player">
      {children}

      <button type="button" className="player__exit"
              onClick={() => {
                onExitButtonClick();
                history.goBack();
              }}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={`${progressValue}`} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressValue}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formattedDuration}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
                  onClick={onPlayButtonClick}
          >
            {isPlaying && <PauseButton/>}
            {!isPlaying && <PlayButton/>}
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen"
                  onClick={onFullScreenButtonClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BigVideoPlayer;
