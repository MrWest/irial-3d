import React from 'react';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/loader';


const override = css`
  color: #188218;
`;

const Loader = ({ classes }) => {
  return (
    <div className={classes.Loading}>
      <FadeLoader  css={override} sizeUnit="px" size={60} color="#188218" loading />
    </div>
  );
};

export default withStyles(styles)(Loader);
