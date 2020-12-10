import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Review from "./Review"
import { List } from "@material-ui/core"
import CreateReviewButton from "./CreateReview/CreateReviewButton"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}))

function byId(a, b) {
  return b.id - a.id
}

export default function Reviews({ reviews, restaurant }) {
  const classes = useStyles()
  return (
    <section>
      <h3>Reviews</h3>
      <CreateReviewButton restaurant={restaurant} />
      <List className={classes.root}>
        {reviews.sort(byId).map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </List>
    </section>
  )
}
