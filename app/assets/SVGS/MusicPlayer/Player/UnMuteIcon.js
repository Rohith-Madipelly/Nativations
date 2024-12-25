import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function UnMuteIcon(props) {
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
          d="M23.333 34.542v-3.417c2.5-.722 4.514-2.111 6.042-4.167 1.528-2.055 2.292-4.389 2.292-7 0-2.61-.764-4.944-2.292-7-1.528-2.055-3.542-3.444-6.042-4.166V5.375c3.445.778 6.25 2.52 8.417 5.23C33.917 13.311 35 16.43 35 19.957c0 3.528-1.083 6.646-3.25 9.355-2.167 2.708-4.972 4.45-8.417 5.229zM5 25V15h6.667L20 6.667v26.666L11.667 25H5zm18.333 1.667V13.25A6.918 6.918 0 0126.396 16a7.611 7.611 0 011.104 4 7.43 7.43 0 01-1.104 3.938 6.956 6.956 0 01-3.063 2.729zM16.667 14.75l-3.584 3.583h-4.75v3.334h4.75l3.584 3.583v-10.5z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default UnMuteIcon
