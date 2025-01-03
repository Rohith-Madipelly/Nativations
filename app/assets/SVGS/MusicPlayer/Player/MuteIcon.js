import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function MuteIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
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
        width={40}
        height={40}
      >
        <Path fill="#D9D9D9" d="M0 0H40V40H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M33 37.668l-5.041-5.042a13.85 13.85 0 01-2.208 1.146c-.778.32-1.584.577-2.417.771v-3.417c.389-.139.77-.277 1.146-.416.375-.14.729-.306 1.062-.5l-5.541-5.542v8.667L11.667 25H5.001v-10h5.333l-8-8 2.333-2.333 30.667 30.667-2.333 2.333zm-.333-9.667l-2.416-2.416c.472-.861.826-1.764 1.062-2.709a11.98 11.98 0 00.354-2.916c0-2.611-.764-4.945-2.291-7-1.528-2.056-3.542-3.445-6.042-4.167V5.376c3.444.778 6.25 2.521 8.417 5.23C33.917 13.313 35 16.431 35 19.96c0 1.472-.202 2.889-.604 4.25A14.672 14.672 0 0132.667 28zm-5.583-5.583l-3.75-3.75v-5.417a6.919 6.919 0 013.063 2.75 7.611 7.611 0 011.104 4 7.13 7.13 0 01-.417 2.417zm-7.083-7.083L15.667 11l4.334-4.333v8.667zm-3.334 9.916v-3.916l-3-3H8.334v3.333h4.75l3.583 3.583z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default MuteIcon
