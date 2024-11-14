import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeActive(props) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 3.19l5 4.5v7.81h-2v-6H7v6H5V7.69l5-4.5zM10 .5l-10 9h3v8h6v-6h2v6h6v-8h3l-10-9z"
        fill="#8B8BA9"
      />
    </Svg>
  )
}

export default HomeActive
