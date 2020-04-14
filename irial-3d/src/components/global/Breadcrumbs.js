import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles/breadcrumbs';

class Breadcrumbs extends Component {
  state = {
    packName: 'Starter Pack'
  };

  componentDidMount() {
    const { match } = this.props;
    const id = parseInt(match.params.id, 10);
    this.handleLastStep(id);
  }

  handleLastStep = id => {
    if (id !== undefined) {
      const { packs } = this.props;
      const pack = packs.find(p => id === p.id);
      if (pack)
        this.setState({
          packName: pack.name
        });
    }
  };

  render() {
    const { classes, location, match } = this.props;
    const { packName } = this.state;
    return (
      <div className={classes.container}>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
            <div>
              <p className={classes.breadcrumbs}>
                {location.pathname === '/presets' && (
                  <React.Fragment>
                    <Link to="/">Home</Link> <span className={classes.separator}>/</span> Select Pack
                  </React.Fragment>
                )}
                {match.path === '/packsdetails/:id' && (
                  <React.Fragment>
                    <Link to="/">Home</Link> <span className={classes.separator}>/</span>{' '}
                    <Link to="/presets">Select Pack</Link> <span className={classes.separator}>/</span> {packName}
                  </React.Fragment>
                )}
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  packs: state.packs
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Breadcrumbs)));
