import React from "react"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import StarRating from "./StarRating"

export default function Review({ review }) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<StarRating stars={review.stars} />}
          secondary={<React.Fragment>{review.message}</React.Fragment>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
