import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import StarRating from "../StarRating"
import { useNotifications } from "../../../Store"

import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Loading from "../../loading/Loading"
import Error from "../../Error/Error"

const ADD_REVIEW = gql`
  mutation createReview($message: String, $restaurantId: ID!, $stars: Int!) {
    createReview(
      input: { message: $message, stars: $stars, restaurantId: $restaurantId }
    ) {
      id
      message
      stars
    }
  }
`

export default function CreateReviewButton({ restaurant }) {
  const [open, setOpen] = React.useState(false)
  const { addNotification } = useNotifications()

  const [stars, setStars] = React.useState()
  const [message, setMessage] = React.useState("")

  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    onError: () => {},
    onCompleted: (data) => {
      setOpen(false)
      addNotification("Your review has been added")
    },
    variables: {
      restaurantId: restaurant,
      message,
      stars
    }
  })

  const handleClickOpen = (event) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function submitReview() {
    addReview()
  }

  function onStarsChangeHandler(newValue) {
    setStars(newValue)
  }

  function onMessageChangeHandler(event) {
    setMessage(event.target.value)
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
        disabled={loading}
      >
        write a review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="review-dialog-title"
      >
        <DialogTitle id="review-dialog-title">Write a review</DialogTitle>
        <DialogContent>
          {loading && <Loading />}
          <DialogContentText>
            Tell us what you think about this restaurant.
          </DialogContentText>
          <TextField
            autoFocus
            disabled={loading}
            margin="dense"
            id="message"
            label="Your message"
            type="text"
            fullWidth
            value={message}
            onChange={onMessageChangeHandler}
          />
          <StarRating onChange={onStarsChangeHandler} readOnly={false} />
          {error && <Error />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={submitReview}
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            Submit your review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
