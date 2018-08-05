import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grade from "@material-ui/icons/Grade";

const Graphics = ({ onHandleClose }) => (
  <Fragment>
    <Link to="/graficas" replace style={{ textDecoration: "none" }}>
      <ListItem button onClick={onHandleClose}>
        <ListItemIcon>
          <Grade />
        </ListItemIcon>
        <ListItemText inset primary="Gráficas" />
      </ListItem>
    </Link>
  </Fragment>
);

export default Graphics;
