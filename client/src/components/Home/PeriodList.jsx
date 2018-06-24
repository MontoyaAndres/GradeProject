import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import FileDownload from '@material-ui/icons/FileDownload';

import Loading from '../Global/Loading';
import { downloadFile } from '../../utils/api';
import SelectData from '../../utils/SelectData';

// query
import { studentDistinct } from '../../graphql/query';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class PeriodList extends Component {
  state = {
    career: 'ADFU',
    checked: [],
    selected: []
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleToggle = (value, compare) => () => {
    const { checked, selected } = this.state;
    const { onHandleSelected } = this.props;

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newChecked.push(value);
      newSelected.push(compare);
    } else {
      newChecked.splice(currentIndex, 1);
      newSelected.splice(compare, 1);
    }

    this.setState({
      checked: newChecked,
      selected: newSelected
    });

    onHandleSelected(newSelected);
  };

  render() {
    const { classes } = this.props;
    const { career, checked } = this.state;

    return (
      <Query query={studentDistinct}>
        {({ loading, data: { StudentDistinct } }) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <div className={classes.root}>
              <List>
                {StudentDistinct.map((value, index) => (
                  <ListItem key={index} dense button>
                    <Checkbox onChange={this.handleToggle(index, value)} checked={checked.indexOf(index) !== -1} />
                    <ListItemText style={{ fontSize: 18 }} primary={value} />
                    <ListItemSecondaryAction>
                      <Select
                        inputProps={{
                          id: 'career',
                          name: 'career'
                        }}
                        value={career}
                        onChange={this.handleChange}
                        native
                      >
                        {SelectData.Carreras.map((data, i) => (
                          <option value={data} key={i}>
                            {data}
                          </option>
                        ))}
                      </Select>
                      <IconButton aria-label="Download File" onClick={() => downloadFile(career, value)}>
                        <FileDownload style={{ fontSize: 30 }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(PeriodList);
