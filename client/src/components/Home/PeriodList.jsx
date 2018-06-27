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
import { downloadFilePeriod } from '../../utils/api';
import SelectData from '../../utils/SelectData';

// Query
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.career !== this.state.career) {
      // If the checkbox was changed and then the career will be change
      // so, the function "onHandleSelectedAndCareer" needs to update!
      this.props.onHandleSelectedAndCareer(this.state.selected, this.state.career);
    }
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  handleToggle = (index, compare) => () => {
    const { checked, selected, career } = this.state;
    const { onHandleSelectedAndCareer } = this.props;

    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newChecked.push(index);
      newSelected.push(compare);
    } else {
      newChecked.splice(currentIndex, 1);
      newSelected.splice(compare, 1);
    }

    // When someone click a lot the checkbox, the "newSelect" has the same value.
    // So, this "newSelect" and "newChecked" will be formated and same way the state too.
    if (newSelected[0] === newSelected[1]) {
      this.setState({ checked: [], selected: [] });
      newChecked.splice(currentIndex, 1);
      newSelected.splice(compare, 1);
    } else {
      this.setState({
        checked: newChecked,
        selected: newSelected
      });
    }

    onHandleSelectedAndCareer(newSelected, career);
  };

  render() {
    const { classes } = this.props;
    const { career, checked } = this.state;

    return (
      <Query query={studentDistinct} variables={{ param: 'TipoSemestre' }}>
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
                      <IconButton aria-label="Download File" onClick={() => downloadFilePeriod(career, value)}>
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
