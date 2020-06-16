const styles = theme => ({
  Card: {
    // borderBottomRightRadius: 100,
    cursor: 'pointer',
    borderRadius: 15,
    height: '100%',
    border: 20,
    boxShadow: 'none',
    padding: '0px 18px',
    backgroundColor: 'transparent',
    // boxShadow: '0 32px 124px 0 rgba(26, 58, 98, 0.08)',
    '&&:hover': {
      backgroundColor: '#ffffff',
      // borderBottomRightRadius: 100,
      boxShadow: '0 32px 85px 0 rgba(27, 28, 31, 0.05)'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 320
    }
  },
  Media: {
    height: 236,
    borderRadius: 15,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 212
    }
  },
  MediaSubscribe: {
    height: 142,
    borderRadius: 15,
    objectFit: 'cover',
    marginTop: 21,
    [theme.breakpoints.down('sm')]: {
      height: 92
    }
  },
  SubscribeButton: {
    width: '100%',
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3577d4',
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    // fontWeight: 600,
    lineHeight: 1.8,
    textTransform: 'none',
    boxShadow: 'none',
    '&&:hover': {
      backgroundColor: '#3577d4'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      width: 185,
      height: 56
    }
  },
  ItemSummary: {
    opacity: 1,
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    lineHeight: 1.75,
    color: '#434d5c'
  },
  ItemCategory: {
    height: 38,
    borderRadius: 6,
    backgroundColor: '#f4e9fb',
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 2.29,
    color: '#9846dd',
    textTransform: 'uppercase',
    padding: 5,
    textAlign: 'center'
  },
  TimeReading: {
    opacity: 1,
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    textAlign: 'right',
    color: '#8d9299'
  },
  ItemTitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 23,
    fontWeight: 600,
    lineHeight: 1.5,
    color: '#0f2440'
  },
  ItemDescription: {
    opacity: 0.56,
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    lineHeight: 1.88,
    color: '#0f2440'
  },
  SubscribeInput: {
    maxWidth: 494,
    fontFamily: 'Gilroy-Medium',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    color: '#0f2440',
    backgroundColor: 'transparent',
    '& input': {
      fontSize: 20,
      fontFamily: 'Gilroy-Light',
      backgroundColor: 'transparent',
      '&::placeholder': {
        color: '#8d9299',
        fontFamily: 'Gilroy-Regular',
        fontSize: 16,
        opacity: 1
      }
    }
  },
  input: {
    backgroundColor: 'transparent'
  }
});

export default styles;
