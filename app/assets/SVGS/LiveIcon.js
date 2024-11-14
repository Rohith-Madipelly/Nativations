import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LiveIcon(props) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 8v8l7-4-7-4zm12-4h-7.58L15.71.71 15 0l-4 4h-.03l-4-4-.69.71L9.56 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V6h18v12z"
        fill="#64748B"
      />
    </Svg>
  )
}

export default LiveIcon
