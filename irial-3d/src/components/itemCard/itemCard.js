import React from 'react';
import { withStyles, Grid, Card, CardContent } from '@material-ui/core';
import Link from 'next/link';
import CategoryLabel from './CategoryLabel';
import StarRatingComponent from 'react-star-rating-component';
import styles from './styles/itemCard';

const descriptionLeverage = description =>
  description && description.length > 120 ? `${description.substring(0, 120)}...` : description;

const ItemCard = ({ classes, item, category, type }) => (
  <Link href={`/${type}/${item.id}`}>
    <Card className={classes.Card}>
      <img
        className={classes.Media}
        src={item.images && item.images.length > 0 ? item.images[0].url : undefined}
        title={item.name}
        alt={item.name}
      />
      {/* <CardContent> */}
      <div style={{ padding: '20px 18px' }}>
        <Grid container alignContent="center">
          <Grid item xs={6}>
            <Grid container justify="flex-start">
              <Grid item>
                <CategoryLabel category={item.category_name} variant="small" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} align="right">
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
        <h3 className={classes.ItemTitle}>{item.name}</h3>
        <p className={classes.ItemSummary}>{descriptionLeverage(item.description)}</p>
      </div>
      {/* </CardContent> */}
    </Card>
  </Link>
);

export default withStyles(styles)(ItemCard);
