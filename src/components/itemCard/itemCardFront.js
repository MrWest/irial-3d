import React from 'react';
import { withStyles, Grid, Card, CardContent } from '@material-ui/core';
import Link from 'next/link';
import CategoryLabel from './categoryLabel';
import { RoundedButtonLink } from '../buttons';
import { AttachMoney as MoneySharp, AddShoppingCart } from '@material-ui/icons';
import StarRatingComponent from 'react-star-rating-component';
import { isInCart } from '../../apis/tools';
import styles from './styles/itemCardFront';
import { thousandsSeparatedAndFixed } from '../../helpers/utils';

const descriptionLeverage = description =>
  description && description.length > 120 ? `${description.substring(0, 120)}...` : description;

const ItemCardFront = ({ classes, item, category, type, addToCart, addToCartText, buyItem }) => (
  
  <Link href={`/${type}/${item.id}`} >
   
      <div className="front-card-content" >
        <img
          style={{  width: '100%', height: '100%',
          minHeight: 154,
          objectFit: 'cover'}}
          src={item.images && item.images.length > 0 ? item.images[0].url : undefined}
          title={item.name}
          alt={item.name}
        />
        {!isInCart(item) && (
          <div className='item-options-front'>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <div title={buyItem}>
                  <RoundedButtonLink  color={"#ffffff"} size={24} border={0} to={`/payment`} onClick={() => addToCart(item,false)} >
                    <MoneySharp color="#ffffff" style={{fontSize: 24, color: "#ffffff"}}></MoneySharp>
                  </RoundedButtonLink>
                </div>
              </Grid>
              <Grid item>
                <div title={addToCartText}>
                  <RoundedButtonLink  color={"#ffffff"} size={24} border={0} onClick={() => addToCart(item,true)} >
                      <AddShoppingCart color="#ffffff" style={{fontSize: 24, color: "#ffffff"}}></AddShoppingCart>
                  </RoundedButtonLink>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
         <div className="item-description">
            <Grid container alignContent="center">
              <Grid item xs>
                <Grid container justify="flex-start">
                  <Grid item>
                    <Grid container justify="center" alignItems="center" className="category-front">
                      <Grid item>{item.category_name}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container justify="flex-end" alignItems="center" style={{ height: '100%' }}>
                  <Grid item>
                  <StarRatingComponent 
                      name="rate1" 
                      editing={false}
                      starCount={5}
                      value={item.rate}
                      emptyStarColor={"#ccc"} /* color of non-selected icons, default `#333` */
                      // onStarClick={this.onStarClick.bind(this)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ paddingTop: 8 }} >
              <Grid item xs style={{ maxWidth: '80%'}}>
                <p  title={item.name}>{item.name}{' '}<span style={{ fontSize: 12}}>{item.lumion_version}</span></p>
              </Grid>
              <Grid item>
                <p  >${thousandsSeparatedAndFixed(item.price)}</p>
              </Grid>
            </Grid>
          </div>
      </div>
  </Link>
   
);

export default ItemCardFront;
