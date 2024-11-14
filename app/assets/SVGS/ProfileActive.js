import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileActive(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke="#030370"
        strokeWidth={1.5}
      />
      <Path
        d="M7.5 17c2.332-2.442 6.643-2.557 9 0m-2.005-7.5c0 1.38-1.12 2.5-2.503 2.5a2.502 2.502 0 01-2.504-2.5c0-1.38 1.12-2.5 2.504-2.5a2.502 2.502 0 012.503 2.5z"
        stroke="#030370"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ProfileActive

