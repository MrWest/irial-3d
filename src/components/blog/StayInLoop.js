import React from "react";
import { withStyles, Grid, Fab, FormControl } from "@material-ui/core";
import Subscribe from "../global/Subscribe";
import styles from "./styles/StayInLoop";

let Subscriber = ({ classes, handleChange, email }) => (
  <>
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
    <div className={classes.StayInLoopActions}>
      <Fab type="submit" className={classes.SubscribeButton}>
        Subscribe
      </Fab>
    </div>
  </>
);

Subscriber = withStyles(styles)(Subscriber);

const StayInLoop = ({ classes }) => (
  <div className={classes.StayInLoop}>
    <Grid container justify="center" className={classes.containerPartnerWU}>
      <main className={classes.center}>
        <div className={classes.sectionContainer}>
          <Grid container>
            <Grid item xs={5} style={{}}>
              <div className={classes.PurpleBlock} />
            </Grid>
            <Grid item xs={7} className={classes.StayInLoopDescription}>
              <div className={classes.NewsLetter}>
                Sign up to the newsletter
              </div>
              <h1 className={classes.StayInLoopTitle}>Stay in the loop</h1>
              <p className={classes.StayInLoopSummary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <Subscribe Subscriber={Subscriber} />
            </Grid>
          </Grid>
        </div>
      </main>
    </Grid>
  </div>
);

export default withStyles(styles)(StayInLoop);
