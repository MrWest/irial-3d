import React, { Component } from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCartOpen, removeFromCart, emptyCart } from "../../actions";
import { thousandsSeparatedAndFixed } from '../../helpers/utils';
import { StylessButton } from '../buttons';
import Remove from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import styles from './styles/cart';

const CartItem = ({ classes, item, onRemove}) => (
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
        <StylessButton onClick={() => onRemove(item.id)}><Remove className={classes.deleteIcon} /></StylessButton>
      </Grid>
    </Grid>
  </div>
);

class Cart extends Component {
  render() {
    const { classes, cart, toggleCartOpen, removeFromCart, emptyCart } = this.props;

    if(!cart.open) return <div />;
    return (
      <div className={classes.container}>
        <Grid container justify="center" spacing={0} style={{ height: '100%' }}>
          <Grid item xs style={{ background: 'rgba(0,0,0,0.1)', height: '100%' }}></Grid>
          <Grid item className={classes.center} style={{ height: '100%' }}>
            <Grid container justify="flex-end" style={{ height: '100%' }}>
              <Grid item style={{ height: '100%' }}>
                <div className="in-right" style={{ zIndex: 99999, width: 396,
                   backgroundColor: '#ffffff', height: '100%', paddingTop: 64, position: 'fixed', right: 240 }}>
                  
                  
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item >
                          <StylessButton onClick={() => toggleCartOpen(!cart.open)}><Close style={{ marginLeft: 8, marginTop: 4 }} className={classes.cartLightText}/> </StylessButton>
                        </Grid>
                        <Grid item xs>
                          <p className={classes.cartTitle}>Cart</p>
                        </Grid>
                        <Grid item>
                          <StylessButton onClick={emptyCart} className={classes.emptyCart} >Empty Cart</StylessButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ paddingLeft: 24 }}>
                        {cart.items.map(item => <CartItem key={item.id} classes={classes} item={item} onRemove={removeFromCart} />)}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs style={{ background: '#ffffff', height: '100%' }}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { toggleCartOpen, removeFromCart, emptyCart })(withStyles(styles)(withRouter(Cart)));
