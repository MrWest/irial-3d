import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { HashLink } from 'react-router-hash-link';
import styles from './styles/home';
import { CustomWidthButtonLink } from '../buttons';
// email with corporate validation
// (?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!aol\.com)(?!outlook\.com)(?!icloud\.com)(?!inbox\.com)(?!mail\.com)
// Reusable with any other form

class Subscribe extends Component {
  state = { didSubscribe: false, email: '' };

  render() {
    const { classes } = this.props;
    return (
      <div>
         <div className={classes.SubscribeActions}>
          <HashLink to="/#contactus" className={classes.SubscribeButton}>
            Contact Us
          </HashLink>
        </div>
      </div>
      // <form onSubmit={this.handleOnSubmit}>
      //   {didSubscribe ? (
      //     <>
      //       <p className={classes.subscribeTitle}>Thank you for signing up!</p>
      //       <p className={classes.regularText} style={{ textAlign: 'left', lineHeight: 1.2 }}>
      //         We’ll be delivering content to you shortly. <br /> Welcome aboard!
      //       </p>
      //     </>
      //   ) : (
      //     <>
      //       <Subscriber handleChange={this.handleChange} email={email} />
      //     </>
      //   )}
      // </form>
    );
  }
}

export default withStyles(styles)(Subscribe);
