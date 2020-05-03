const styles = theme => ({
  container: {
    zIndex: 999999,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  center: {
    background: 'rgba(0,0,0,0.1)',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '1280px',
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '1180px',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '1180px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
      minWidth: '100vw'
    },
  },
  cartItemName: {
    fontWeight: 'bold'
  },
  cartItemContainer: {
    padding: '8px 12px',
    borderBottom: '1px solid #dedede',
    '&:hover': {
      background: '#dedee3'
    }
  },
  cartItemText: {
    fontFamily: 'Roboto'
  }, 
  emptyCart: {
    color: '#337ab7'
  },
  cartTitle: {
    fontWeight: 'bold',
    color: '#337ab7',
    fontSize: 18,
  },
  cartLightText: {
    fontSize: 18,
    color: '#7f7f7f'
  },
  cartSmaltext: {
    fontSize: 14,
    color: '#7f7f7f'
  },
  cartItemPrice: {
    fontWeight: 'bold'
  },
  cartItemImgContainer: {
    height: 69,
    width: 92,
    padding: 4,
    border: '1px solid #dedede'
  },
  itemImg: {
    objectFit: 'contain',
    height: '100%',
    width: '100%'
  },
  deleteIcon: {
    color: '#A12839'
  }
});

export default styles;
