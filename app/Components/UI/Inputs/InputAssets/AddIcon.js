import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        stroke="#FF6757"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.333 9.333h-2.666V6.667a.667.667 0 00-1.334 0v2.666H6.667a.667.667 0 000 1.334h2.666v2.666a.667.667 0 101.334 0v-2.666h2.666a.667.667 0 000-1.334z"
        fill="#FF6757"
      />
    </Svg>
  )
}

export default AddIcon
