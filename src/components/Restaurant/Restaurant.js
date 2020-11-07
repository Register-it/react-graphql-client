import React from "react"
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Link, useParams } from "react-router-dom"
import Error from "../Error/Error"
import Loading from "../loading/Loading"
import StarRating from "./StarRating"
import Reviews from "./Reviews"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { CardMedia } from "@material-ui/core"

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

export const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      name
      id
      address
      city
      stars
      numberOfReviews
      reviews {
        message
        stars
        id
      }
    }
  }
`

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
  const { loading, data, error } = useQuery(GET_RESTAURANT, {
    variables: { id }
  })
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
      {data && (
        <>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography variant="h3">{data.restaurant.name}</Typography>
            <div className={classes.reviews}>
              <StarRating stars={data.restaurant.stars} /> (
              {data.restaurant.numberOfReviews})
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <CardMedia
              className={classes.image}
              image={`https://source.unsplash.com/800x600/daily?${data.restaurant.name
                .split(" ")
                .join(",")}`}
              title={data.restaurant.name}
            />
            {/* <img
              className={classes.image}
              width="800"
              height="600"
              src={`https://source.unsplash.com/featured/800x600/?${data.restaurant.name
                .split(" ")
                .join(",")}`}
              alt={data.restaurant.name}
            ></img> */}
            <Reviews reviews={data.restaurant.reviews} restaurant={id} />
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
