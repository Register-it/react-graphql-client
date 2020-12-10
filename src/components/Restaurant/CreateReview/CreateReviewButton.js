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
import Loading from "../../loading/Loading"
import Error from "../../Error/Error"
import { useAddReview } from "../RestaurantApi"

export default function CreateReviewButton({ restaurant }) {
  const [open, setOpen] = React.useState(false)
  const { addNotification } = useNotifications()

  const [stars, setStars] = React.useState()
  const [message, setMessage] = React.useState("")

  function onComplete(data) {
    setOpen(false)
    setStars()
    setMessage("")
    addNotification("Your review has been added")
  }

  const [addReview, { loading, error }] = useAddReview(
    restaurant,
    message,
    stars,
    onComplete
  )
  
  function submitReview() {
    addReview()
  }

  const handleClickOpen = (event) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
            autoComplete="off"
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
