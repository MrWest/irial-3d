import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, emptyCart } from "../../actions";
import { thousandsSeparatedAndFixed } from '../../helpers/utils';
import { StylessButton } from '../buttons';
import Remove from "@material-ui/icons/Delete";
import styles from './styles/cart';

const CartItem = ({ classes, item, removeFromCart}) => (
  <div className={classes.cartItemContainer}>
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <div className={classes.cartItemImgContainer}>
          <img src={item.image} className={classes.itemImg} />
        </div>
      </Grid>
      <Grid item xs>
        <p className={classes.cartItemName}>{item.name}</p>
        <p className={classes.cartItemText}>{`${item.section.name}/${item.category.name}`}</p>
        <p className={classes.cartItemName}>{item.lumion_version} <span className={classes.cartSmaltext}>Lumion</span></p>
      </Grid>
      <Grid item>
        <p className={classes.cartItemPrice}>${thousandsSeparatedAndFixed(item.price)}</p>
      </Grid>
      <Grid item>
        <StylessButton onClick={() => removeFromCart(item.id)}><Remove className={classes.deleteIcon} /></StylessButton>
      </Grid>
    </Grid>
  </div>
);
// const mapStateToProps = state => ({
//   cart: state.cart,
//   language: state.language
// });

export default connect(null, { removeFromCart, emptyCart })(withStyles(styles)(withRouter(CartItem)));
