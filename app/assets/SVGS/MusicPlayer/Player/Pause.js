import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function PauseIcon(props) {
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
        <Path fill={props.color||"#D9D9D9"} d="M0 0H40V40H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M21.667 31.667V8.334h10v23.333h-10zm-13.333 0V8.334h10v23.333h-10zm16.667-3.333h3.333V11.667h-3.333v16.667zm-13.334 0h3.334V11.667h-3.334v16.667z"
          fill={props.color||"#fff"}
        />
      </G>
    </Svg>
  )
}

export default PauseIcon
