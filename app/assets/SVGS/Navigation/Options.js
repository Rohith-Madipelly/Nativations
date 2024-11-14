import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Options(props) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.354.805h9.805M.452 7.342h14.707M.452 13.879h9.805"
        stroke="#121212"
        strokeWidth={0.830542}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default Options
