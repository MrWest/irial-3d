import React from "react";
import { withStyles, Grid, Fab, FormControl } from "@material-ui/core";
import { HashLink } from "react-router-hash-link";
import styles from "./styles/Subscribe";

const thisYear = () => new Date().getFullYear();

const Socials = ({ classes }) => (
  <Grid item className={classes.SubscribeDescription}>
    <div className={classes.SocialMedia}>
      <p>Follow along on our journey!</p>
      <Grid container justify="flex-start">
        <Grid item xs={1}>
          <a
            href="https://www.facebook.com/vinalestraveler"
            className={classes.mobileSocials}
          >
            <img
              className={classes.mobileSocials}
              src="../static/images/public/facebook.svg"
            />
          </a>
        </Grid>
        <Grid item xs={1}>
          <a
            href="https://www.tripadvisor.com/company/swagup"
            className={classes.mobileSocials}
          >
            <img
              className={classes.mobileSocials}
              src="../static/images/public/tripadvisor.svg"
            />
          </a>
        </Grid>
        <Grid item xs={1}>
          <a
            href="https://www.instagram.com/swagup"
            className={classes.mobileSocials}
            style={{ paddingLeft: 16 }}
          >
            <img
              className={classes.mobileSocials}
              src="../static/images/public/linkedin.svg"
            />
          </a>
        </Grid>
      </Grid>
    </div>
  </Grid>
);

const PagesList = ({ classes }) => (
  <ul className={classes.PagesList}>
    <li>© {thisYear()} Swagup, LLC</li>
    <li>orders@swagup.com</li>
    <li>-</li>
    <li>
      Made amongst the
      <span role="img" aria-label="stars">
        ✨
      </span>
      <span role="img" aria-label="spider">
        👾
      </span>
      <span role="img" aria-label="rocket">
        🚀
      </span>
    </li>
  </ul>
);

let Subscriber = ({ classes, handleChange, email }) => (
  <div style={{ paddingRight: 64 }}>
    <h1 className={classes.SubscribeTitle}>Be the first to know</h1>
    <FormControl fullWidth>
      {/* <TextValidator
        onChange={handleChange}
        className={classes.SubscribeInput}
        name="email"
        value={email}
        placeholder="Your email"
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      /> */}
    </FormControl>
    <div className={classes.SubscribeActions}>
      <Fab type="submit" className={classes.SubscribeButton}>
        Subscribe
      </Fab>
    </div>
  </div>
);

Subscriber = withStyles(styles)(Subscriber);

const FooterMain = ({ classes }) => (
  <div className={classes.mainContainer}>
    <div className={classes.LogoContainer}>
      <img src="/static/images/blog/black.svg" alt="Swagup" />
    </div>
    <PagesList classes={classes} />
  </div>
);

export default withStyles(styles)(({ classes }) => (
  <div className={classes.Subscribe}>
    <Grid container justify="center">
      <main className={classes.center}>
        <div className={classes.sectionContainer}>
          <Grid container>
            <Grid item xs={12} md={10} style={{}}>
              <h3 className={classes.SubscribeTitle}>You are always welcome</h3>
              <Grid container>
                <Grid item xs>
                  <div className={classes.SubscribeActions}>
                    <HashLink
                      to="/#contactus"
                      className={classes.SubscribeButton}
                    >
                      Contact Us
                    </HashLink>
                  </div>
                </Grid>
                <Grid>
                  <Socials classes={classes} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </main>
    </Grid>
  </div>
));
