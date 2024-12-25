import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MusicIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7 .5v12.308a4.664 4.664 0 00-2.333-.641A4.665 4.665 0 000 16.833 4.665 4.665 0 004.667 21.5a4.665 4.665 0 004.666-4.667V5.167H14V.5H7zM4.667 19.167a2.34 2.34 0 01-2.334-2.334A2.34 2.34 0 014.667 14.5 2.34 2.34 0 017 16.833a2.34 2.34 0 01-2.333 2.334z"
        fill="#030370"
      />
    </Svg>
  )
}

export default MusicIcon