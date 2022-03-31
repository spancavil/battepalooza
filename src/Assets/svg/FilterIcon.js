import * as React from "react"

const FilterIcon = (props) => (
  <svg
    width={34}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.91 14.51V2.05M4.91 25.87v-7.106M23 16.341V2.05M23 25.87v-5.296"
      stroke="#fff"
      strokeWidth={2.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.955 4.431V2.05"
      stroke="#fff"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.955 25.87V8.861"
      stroke="#fff"
      strokeWidth={2.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.447 14.51h4.574M20.713 16.355h4.573M11.668 8.276h4.573"
      stroke="#fff"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default FilterIcon;