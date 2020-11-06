import React from "react"
import { Paper, makeStyles } from "@material-ui/core"

export default function () {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <h2>Ops, an unexcpected error occurred, try again later.</h2>
    </Paper>
  )
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "3px solid orange",
    backgroundColor: `rgb(255,165,0, .4)`,
    padding: 32,
    margin: 32
  }
})
