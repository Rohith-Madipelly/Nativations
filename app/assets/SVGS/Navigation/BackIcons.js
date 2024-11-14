



import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcons(props) {
  return (
    <Svg
      width={10}
      height={14}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.705 10.59L3.125 6l4.58-4.59L6.295 0l-6 6 6 6 1.41-1.41z"
        fill="#030370"
      />
    </Svg>
  )
}

export default BackIcons
