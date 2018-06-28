import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import LocalOffer from '@material-ui/icons/LocalOffer';
import FindReplace from '@material-ui/icons/FindReplace';
import Done from '@material-ui/icons/Done';

import Compare from './Compare';
import PeriodList from './PeriodList';
import UploadFile from './uploadFile';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 3
  },
  titlePaper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit,
    paddingLeft: 40,
    paddingRight: 65
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 500,
    padding: theme.spacing.unit * 2,
    whiteSpace: 'pre'
  },
  floatButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    zIndex: 1
  },
  floatButtonSecondary: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    zIndex: 1
  }
});

class Home extends Component {
  state = {
    hide: false,
    selected: [],
    Career: '',
    hasDataSelected: false
  };

  handleHideElement = () => {
    this.setState({ hide: !this.state.hide });
  };

  handleSelectedAndCareer = (selected, Career) => {
    this.setState({ selected, Career });
  };

  handleHasDataSelected = () => {
    this.setState({ hasDataSelected: !this.state.hasDataSelected });
  };

  handleShowHasDataSelected = () => {
    this.setState({ hasDataSelected: !this.state.hasDataSelected, selected: [] });
  };

  render() {
    const { classes } = this.props;
    const { hide, selected, Career, hasDataSelected } = this.state;

    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12} sm className={classes.titlePaper}>
            <div className={classes.title}>
              <span>{hide ? 'Añadir estudiante' : 'Comparar periodos'}</span>
            </div>

            <div>
              {/* Desktop button */}
              <Hidden xlUp smDown>
                {hide ? (
                  <Fragment>
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleHideElement}>
                      <LocalOffer />
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {hasDataSelected ? (
                      <Button
                        variant="fab"
                        style={{ marginRight: 50 }}
                        color="secondary"
                        aria-label="add"
                        onClick={this.handleShowHasDataSelected}
                      >
                        <Done />
                      </Button>
                    ) : (
                      <Button
                        variant="fab"
                        color="secondary"
                        aria-label="add"
                        style={{ marginRight: 50 }}
                        disabled={selected.length !== 2}
                        onClick={this.handleHasDataSelected}
                      >
                        <FindReplace />
                      </Button>
                    )}
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleHideElement}>
                      <AddIcon />
                    </Button>
                  </Fragment>
                )}
              </Hidden>

              {/* Mobile button */}
              <Hidden mdUp>
                <Zoom
                  in
                  style={{
                    transitionDelay: 0
                  }}
                  unmountOnExit
                >
                  {hide ? (
                    <Fragment>
                      <Button
                        className={classes.floatButton}
                        variant="fab"
                        color="secondary"
                        onClick={this.handleHideElement}
                      >
                        <LocalOffer />
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {hasDataSelected ? (
                        <Button
                          variant="fab"
                          className={classes.floatButtonSecondary}
                          color="secondary"
                          aria-label="add"
                          onClick={this.handleShowHasDataSelected}
                        >
                          <Done />
                        </Button>
                      ) : (
                        <Button
                          variant="fab"
                          className={classes.floatButtonSecondary}
                          color="secondary"
                          aria-label="add"
                          disabled={selected.length !== 2}
                          onClick={this.handleHasDataSelected}
                        >
                          <FindReplace />
                        </Button>
                      )}
                      <Button
                        className={classes.floatButton}
                        variant="fab"
                        color="secondary"
                        onClick={this.handleHideElement}
                      >
                        <AddIcon />
                      </Button>
                    </Fragment>
                  )}
                </Zoom>
              </Hidden>
            </div>
          </Grid>
          {hide ? (
            <UploadFile />
          ) : hasDataSelected ? (
            <Compare selected={selected} Career={Career} />
          ) : (
            <PeriodList onHandleSelectedAndCareer={this.handleSelectedAndCareer} />
          )}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
