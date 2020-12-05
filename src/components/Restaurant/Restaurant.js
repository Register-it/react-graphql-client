import React from "react"
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import { Link, useParams } from "react-router-dom"
import Error from "../Error/Error"
import Loading from "../loading/Loading"
import StarRating from "./StarRating"
import Reviews from "./Reviews"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { CardMedia } from "@material-ui/core"
import { useRestaurant } from "./RestaurantApi"
import {
  getRestaurantImage,
  getRestaurantImageCredit
} from "./RestaurantImages"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  reviews: {
    display: "flex",
    alignItems: "center"
  },
  image: {
    maxWidth: "100%",
    width: "800px",
    height: "300px"
  }
})

const useStyles = makeStyles(styles)

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <Link to="/">
          <IconButton aria-label="close" className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Link>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

export default function Restaurant() {
  const [open, setOpen] = React.useState(true)
  const { id } = useParams()
  const classes = useStyles()
  const { loading, restaurant, error } = useRestaurant(id)

  const handleClose = () => {
    setOpen(false)
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
      fullScreen={isMobile}
    >
      {error && <Error />}
      {loading && <Loading />}
      {restaurant && (
        <>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography variant="h3">{restaurant.name}</Typography>
            <div className={classes.reviews}>
              <StarRating stars={restaurant.stars} /> (
              {restaurant.numberOfReviews})
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <CardMedia
              className={classes.image}
              image={getRestaurantImage(id)}
              title={restaurant.name}
            />
            <a
              href={getRestaurantImageCredit(id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Image Credit
            </a>
            <Reviews reviews={restaurant.reviews} restaurant={id} />
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
