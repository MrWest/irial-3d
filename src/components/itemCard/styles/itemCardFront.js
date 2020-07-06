const styles = theme => ({
  Card: {
    // borderBottomRightRadius: 100,
    cursor: 'pointer',
    borderRadius: 0,
    height: '100%',
    border: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    // boxShadow: '0 32px 124px 0 rgba(26, 58, 98, 0.08)',
    '&&:hover': {
      backgroundColor: '#ffffff',
      // borderBottomRightRadius: 100,
      boxShadow: '0 32px 85px 0 rgba(27, 28, 31, 0.05)',
      '& .item-options-front': {
        display: 'inherit'
      },
      '& .item-description': {
        display: 'inherit'
      }
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 320
    }
  },
  Media: {
    height: 236,
    borderRadius: 0,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 212
    }
  },
  ItemTitle: {
    fontFamily: 'Delvon',
    fontSize: 22,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 1,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '90%'
  },
  ItemPrice: {
    fontFamily: 'Delvon',
    fontSize: 22,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 1,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default styles;
