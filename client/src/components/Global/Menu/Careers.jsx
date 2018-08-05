import React, { PureComponent } from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grade from "@material-ui/icons/Grade";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// List of the careers
import CareerList from "./CareerList";

class Carreras extends PureComponent {
  state = { open: false };

  handleClick = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  render() {
    const { onHandleClose } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <Grade />
          </ListItemIcon>
          <ListItemText inset primary="Carreras" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Every single career */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CareerList onHandleClose={onHandleClose} />
          </List>
        </Collapse>
      </div>
    );
  }
}

export default Carreras;
