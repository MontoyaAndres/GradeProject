import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  center: {
    textAlign: "center"
  }
});

const Loading = ({ classes }) => (
  <div className={classes.center}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
);

export default withStyles(styles)(Loading);
