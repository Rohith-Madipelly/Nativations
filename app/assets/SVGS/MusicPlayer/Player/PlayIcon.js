import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function PlayIcon(props) {
  return (
    <Svg
    width={35}
    height={35}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={35}
        height={35}
      >
        <Path
          transform="matrix(-1 0 0 1 40 0)"
          fill="#D9D9D9"
          d="M0 0H40V40H0z"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M13.333 31.667l18.333-11.666L13.333 8.334v23.333zm3.333-6.083V14.417l8.75 5.584-8.75 5.583z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default PlayIcon
