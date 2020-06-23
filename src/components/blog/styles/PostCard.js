const styles = theme => ({
  Card: {
    // borderBottomRightRadius: 100,
    cursor: 'pointer',
    borderTopLeftRadius: 100,
    minHeight: 572,
    '&&:hover': {
      borderBottomRightRadius: 100,
      boxShadow: '0 40px 140px 0 rgba(26, 58, 98, 0.22)'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 320
    }
  },
  Media: {
    height: 257,
    width: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: 124
    }
  },
  PostCategory: {
    height: 38,
    borderRadius: 6,
    backgroundColor: '#f4e9fb',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 2.29,
    color: '#188218',
    textTransform: 'uppercase',
    padding: 5,
    textAlign: 'center'
  },
  TimeReading: {
    opacity: 0.56,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    textAlign: 'right',
    color: '#0f2440',
    padding: 10
  },
  PostTitle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    color: '#0f2440'
  },
  PostDescription: {
    opacity: 0.56,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.88,
    color: '#0f2440'
  }
});

export default styles;
