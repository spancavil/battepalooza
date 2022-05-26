import * as React from "react"

function DialogCross(props) {
  return (
    <svg
      width={22}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.242 1.702L21 21.459M1.242 1.702L21 21.459M1.242 21.46L21 1.701M1.242 21.46L21 1.701"
        stroke="#fff"
        strokeOpacity={0.38}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DialogCross
