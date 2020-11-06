import React from "react"
import Rating from "@material-ui/lab/Rating"

export default function StarRating({
  stars = 0,
  readOnly = true,
  onChange = () => {}
}) {
  const [value, setValue] = React.useState(stars)

  return (
    <Rating
      name="stars"
      value={value}
      readOnly={readOnly}
      onChange={(event, newValue) => {
        setValue(newValue)
        onChange(newValue)
      }}
    />
  )
}
