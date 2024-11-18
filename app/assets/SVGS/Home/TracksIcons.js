import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TracksIcons(props) {
  return (
    <Svg
      width={16}
      height={22}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6 .75v9.67a3.665 3.665 0 00-1.833-.503A3.666 3.666 0 00.5 13.583a3.666 3.666 0 003.667 3.667 3.666 3.666 0 003.666-3.667V4.417H11.5V.75H6zM4.167 15.417a1.839 1.839 0 01-1.834-1.834c0-1.008.825-1.833 1.834-1.833 1.008 0 1.833.825 1.833 1.833a1.839 1.839 0 01-1.833 1.834z"
        fill="#030370"
      />
    </Svg>
  )
}

export default TracksIcons