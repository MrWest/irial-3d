import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import { Link } from "react-router-dom";
import Link from "next/link";
import styles from "./publicStyles/footerBar";

const IrialLogo = () => (
  <img
    src="/static/images/public/irial-transparency-logo.png"
    className="logo-footer"
    alt="Irial-3D"
  />
);

class FooterBar extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className="footerBar-root">
        <Grid className="center-server-side-render">
          <Toolbar className={classes.appbar}>
            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
              spacing={0}
            >
              <Grid item xs={12} md={5}>
                <Link href="/">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={"auto"}>
                      <IrialLogo classes={classes} />
                    </Grid>
                    <Grid item xs={12} md={"auto"} align="center">
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        style={{ height: "100%" }}
                      >
                        <Grid item>
                          <p
                            style={{
                              color: "#1c5375",
                              fontFamily: "Arial",
                              fontSize: 12,
                              textAlign: "center",
                              fontWeight: "bold",
                              textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)",
                              display: "table-cell",
                              verticalAlign: "middle",
                            }}
                          >
                            Irial 3D
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={"auto"}>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        style={{ height: "100%" }}
                      >
                        <Grid item>
                          <p
                            style={{
                              color: "#1c5375",
                              fontSize: 12,
                              textAlign: "center",
                              fontWeight: "bold",
                              textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)",
                            }}
                          >
                            {" "}
                            © 2020{" "}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  alignContent="center"
                >
                  <Grid item md xs={12}></Grid>
                  <Grid item xs={12} md={"auto"}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      alignContent="center"
                      style={{ height: "100%" }}
                    >
                      <Grid item md={"auto"} xs={12}>
                        <p className="ptextmobile">
                          powered by WildWest Company{" "}
                          <span className="mobileNo">
                            , Proudly based in Pinar del Rio • 535-488-4414 •
                            irial3d@gmail.com
                          </span>
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={"auto"}>
                    <div style={{ paddingLeft: 15 }}>
                      <a
                        href="https://www.facebook.com/vinalestraveler"
                        className="mobileSocials"
                      >
                        <img src="../static/images/public/facebook.svg" />
                      </a>
                      <a
                        href="https://www.tripadvisor.com/company/swagup"
                        className="mobileSocials"
                      >
                        <img src="../static/images/public/tripadvisor.svg" />
                      </a>

                      <a
                        href="https://www.instagram.com/swagup"
                        className="mobileSocials"
                      >
                        <img src="../static/images/public/linkedin.svg" />
                      </a>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </Grid>
      </div>
    );
  }
}

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterBar);
