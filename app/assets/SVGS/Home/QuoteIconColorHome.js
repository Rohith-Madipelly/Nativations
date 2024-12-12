import * as React from "react"
import Svg, { Path } from "react-native-svg"

function QuoteIconColorHome(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.62 12h-5.24l2-4H10V0h8v7.24L15.62 12zm-2-2h.76L16 6.76V2h-4v4h3.62l-2 4zm-8 2H.38l2-4H0V0h8v7.24L5.62 12zm-2-2h.76L6 6.76V2H2v4h3.62l-2 4z"
        fill="#030370"
      />
    </Svg>
  )
}

export default QuoteIconColorHome
