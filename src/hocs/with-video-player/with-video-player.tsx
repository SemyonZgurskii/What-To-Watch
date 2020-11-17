import * as React from "react";

function withVideoPlayer(Component: React.ComponentType): (props: object) => React.ReactElement {
  return function (props) {
    return (
      <Component {...props}>
        <video src="">
        </video>
      </Component>
    )
  }
}

export default withVideoPlayer;