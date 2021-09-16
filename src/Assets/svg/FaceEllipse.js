import * as React from "react"

function FaceEllipse(props) {
  return (
    <svg
      width={118}
      height={118}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_d)">
        <circle
          cx={59.348}
          cy={59.267}
          r={28.502}
          fill="url(#prefix__paint0_linear)"
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={41.206}
          y1={36.277}
          x2={74.737}
          y2={78.659}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#196BB1" />
          <stop offset={1} stopColor="#2F4596" />
        </linearGradient>
        <filter
          id="prefix__filter0_d"
          x={0.847}
          y={0.765}
          width={117.003}
          height={117.003}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={15} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default FaceEllipse;
