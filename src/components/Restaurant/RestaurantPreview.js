import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import StarRating from "./StarRating"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    margin: theme.spacing(),
    width: 450,
    maxWidth: "100%",
    padding: 45,
    [theme.breakpoints.down(480)]: {
      padding: 16
    }
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    maxWidth: "100vw"
  },
  cover: {
    width: 140,
    height: 140
  },
  ratings: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  link: {
    color: "inherit",
    textDecoration: "none"
  }
}))

export default function MediaControlCard({ restaurant }) {
  const { name, stars, address, city, numberOfReviews, id } = restaurant
  const classes = useStyles()

  return (
    <Link className={classes.link} to={`/restaurant/${id}`}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>
            <div className={classes.ratings}>
              {stars > 0 ? (
                <>
                  <StarRating stars={stars} />{" "}
                  <small>({numberOfReviews})</small>
                </>
              ) : (
                <Button size="small" variant="outlined">
                  review
                </Button>
              )}
            </div>
            <Typography variant="subtitle1" color="textSecondary">
              {address} - {city}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={`https://source.unsplash.com/240x120/daily?${name
            .split(" ")
            .join(",")}`}
          title={name}
        />
      </Card>
    </Link>
  )
}
