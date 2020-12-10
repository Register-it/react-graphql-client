import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000aa",
    color: theme.palette.secondary.contrastText,
    zIndex: 9000
  }
}))

export default function Loading() {
  const classes = useStyles()

  return <div className={classes.root}><img src="/images/loading.gif" alt="Loading, please wait"></img></div>
}
