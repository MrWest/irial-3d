import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styles from './styles/categporyLabel';

// const TagOptimizer = category => {
//   if (!category) return '';
//   return category.length > 7 ? category.slice(0, 7) : category;
// };

const switchClasses = (classes, variant) => {
  switch (variant) {
    case 'small':
      return classes.PostCategorySmall;
    case 'outlined':
      return classes.PostCategoryOutlined;
    default:
      return classes.PostCategory;
  }
};

const CategporyLabel = ({ classes, category, variant }) => (
  <Grid container justify="center" alignItems="center" className={switchClasses(classes, variant)}>
    <Grid item>{category}</Grid>
  </Grid>
);
export default withStyles(styles)(CategporyLabel);
