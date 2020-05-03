import React, { Component } from 'react';
import { withStyles, Grid, Button, Fab } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCartOpen, removeFromCart, emptyCart } from "../../actions";
import { thousandsSeparatedAndFixed } from '../../helpers/utils';
import { StylessButton } from '../buttons';
import Remove from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCart from "@material-ui/icons/RemoveShoppingCart";
import { AttachMoney as MoneySharp } from '@material-ui/icons';

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
    const { classes, cart, toggleCartOpen, removeFromCart, emptyCart, language } = this.props;

    if(!cart.items.length) return <div/>
    if(!cart.open) return (
      <Grid container justify="center">
        <Grid item>
          <div className={classes.center} style={{ backgroundColor: 'transparent' }}>
            <Grid container justify="flex-end">
              <Grid item style={{ position: 'relative' }}>
               
                  <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
                        <Grid item>
                          
                            <Fab onClick={() => toggleCartOpen(true)} className={classes.shoppingCart} ><ShoppingCart  style={{ color: '#ffffff', fontSize: 46 }} /></Fab>
                        
                        </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </div>

        </Grid>
      </Grid>
    );

    return (
      <div className={classes.container}>
        <Grid container justify="center" spacing={0} style={{ height: '100%' }}>
          <Grid item xs style={{ background: 'rgba(0,0,0,0.1)', height: '100%' }}></Grid>
          <Grid item className={classes.center} style={{ height: '100%' }}>
            <Grid container justify="flex-end" style={{ height: '100%' }}>
              <Grid item style={{ height: '100%', position: 'relative' }}>
                <div className="in-right" style={{ zIndex: 99999, width: '40vw',
                   backgroundColor: '#ffffff', height: '100%', paddingTop: 64, position: 'fixed', right: 0 }}>
                  
                  <Grid container>
                    <Grid item>
                      <div style={{ width: 394 }}>
                      <Grid container>
                          <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={3}>
                              <Grid item >
                                <StylessButton onClick={() => toggleCartOpen(!cart.open)}><Close style={{ marginLeft: 8, marginTop: 4 }} className={classes.cartLightText}/> </StylessButton>
                              </Grid>
                              <Grid item xs>
                                <p className={classes.cartTitle}>{language.ShoppingCart}</p>
                              </Grid>
                              <Grid item>
                                <StylessButton onClick={emptyCart} className={classes.emptyCart} >{language.EmptyCart} <RemoveShoppingCart style={{ fontSize: 12, marginBottom: -2 }}/></StylessButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ padding: '24px 0px 124px 24px' }}>
                              {cart.items.map(item => <CartItem key={item.id} classes={classes} item={item} onRemove={removeFromCart} />)}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div style={{ padding: '24px 0px 124px 24px' }}>
                              <Grid container alignItems="center">
                                <Grid item xs>
                                
                                    <p className={classes.cartItemPrice}><span className={classes.cartSmaltext} style={{ fontSize: 18 }}>Total cost:</span> ${thousandsSeparatedAndFixed(cart.items.reduce((sum, i) => sum + parseFloat(i.price), 0))}</p>
                                
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className={classes.actionButton}
                                        endIcon={<MoneySharp className={classes.actionIcon}/>}
                                      >
                                        {language.Buy}
                                    </Button>
                                </Grid>
                              </Grid>
                           </div>
                          </Grid>
                        </Grid>
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
  cart: state.cart,
  language: state.language
});

export default connect(mapStateToProps, { toggleCartOpen, removeFromCart, emptyCart })(withStyles(styles)(withRouter(Cart)));
