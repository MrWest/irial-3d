const styles = theme => ({
  center: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
      paddingLeft: '0 !important',
      minWidth: '1280px'
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: '1120px',
      paddingLeft: '0 !important',
      minWidth: '1120px'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '0px 24px !important',
      minWidth: '100%'
    }
  },
  mobileSocials: {
    width: '100%',
    objectFit: "cover"
  },
  Subscribe: { 
    padding: '120px 0px',
    backgroundImage: "url(../static/images/sign/sign.svg)",
    backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    backgroundPosition: "right",
    backgroundSize: "contain"
   },
  PurpleBlock: {
    width: 408,
    height: 520,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    backgroundColor: '#188218'
  },
  StayInLoopDescription: {
    padding: '0 65px'
  },
  NewsLetter: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 2,
    letterSpacing: 'normal',
    color: '#188218',
    textTransform: 'uppercase',
    paddingTop: 30,
    '&::before': {
      backgroundColor: '#188218',
      content: '""',
      display: 'inline-block',
      height: '1px',
      position: 'relative',
      verticalAlign: 'middle',
      width: '21%',
      right: '1em'
      //   marginLeft: '-50%'
    }
  },
  SubscribeTitle: {
    fontFamily: 'Roboto',
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.14,
    color: '#188218',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.15)",
    marginBottom: 23,
    marginTop: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      marginBottom: 12
    }
  },
  SubscribeSummary: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
    color: '#434c5f',
    paddingBottom: 40
  },
  SubscribeActions: {
    paddingTop: 50
  },
  mainContainer: {
    width: 368
  },
  topBarSection: {
    padding: 0
  },
  barTitle: {
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: 24,
    color: '#434c5f'
  },
  regularText: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 20,
    color: '#434c5f'
  },
  SubscribeButton: {
    width: 186,
    height: 76,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    color: '#188218',
    border: '2px solid #188218',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.8,
    padding: '16px 32px',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.15)",
    boxShadow: '0 8px 32px 0 rgba(24, 130, 24, 0.22)',
    textTransform: 'none',
    '&&:hover': {
      backgroundColor: '#FFFFFF'
    },
    [theme.breakpoints.down('sm')]: {
      height: 56,
      fontSize: 20,
      marginBottom: 12
    }
  },
  SubscribeInput: {
    width: 494,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    color: '#434c5f',
    '& input': {
      '&::placeholder': {
        color: '#434c5f',
        opacity: 1
      }
    }
  },
  SocialMedia: {
    width: 350,
    margin: '0px auto',
    paddingLeft: 32,
    float: 'right',
    '& p': {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.33,
      color: '#188218',
      textShadow: "1px 1px 0 rgba(0, 0, 0, 0.15)",
      paddingBottom: 32
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 56,
      paddingLeft: 0,
      marginBottom: 56
    }
  },
  PagesList: {
    listStyle: 'none',
    padding: 0,
    '& li': {
      fontFamily: 'AvenirNext',
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.8,
      color: '#434c5f'
    }
  },
  ListLink: {
    fontFamily: 'AvenirNext',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.8,
    color: '#434c5f',
    textDecoration: 'none'
  },
  SmallSectionTitle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    color: '#434c5f'
  }
});

export default styles;
