import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withStylesMore } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Link } from "@material-ui/core";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: "transparent"
  },
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%"
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20
  },
  hrBar: {
    background: "#ffffff",
    borderColor: "#ffffff",
    color: "#ffffff !important",
    marginTop: 20,
    marginBottom: 20,
    height: 3,
    width: "20%",
    textAlign: "left !important"
  },
  typographyText: {
    color: "#ffffff !important",
    margin: "20px 0px"
  },
  typographyTextSmall: {
    color: "#ffffff !important",
    marginBottom: 40,
    fontSize: 16
  },
  linkItem: {
    fontFamily: 'MONOSPACE',
    fontSize: 24,
    color: '#ffffff',
    border: '4px solid #ffffff',
    height: 42,
    borderRadius: 21,
    marginTop: 24,
    padding: '0px 22px',
    background: 'rgba(0,0,0,0.5)',
    '&&:hover': {
      background: 'rgba(0,0,0,0.7)',
      color: '#ffff00'
    }
  }
});

class PromoLinks extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    const links = [ 
      { name: 'Desktop App', to: '/app'},
      { name: 'Best Selling', to: '/upcoming'},
      { name: 'Upcoming', to: '/upcoming'},
      { name: 'Blog', to: '/blog'}
    ]

    return (
        <Grid container direction="column" alignItems="flex-end">
          {links.map(link => (
            <Grid key={link.name} item>
              <Link href={link.to}>
                <Grid container justify="center" alignItems="center" className={classes.linkItem}>
                  {link.name}
                </Grid>
              </Link>
            </Grid>
          ))}
        </Grid>
    );
  }
}

PromoLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromoLinks);
