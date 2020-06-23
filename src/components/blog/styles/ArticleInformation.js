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
    }
  },
  ArticleStats: {
    paddingTop: 50,
    paddingBottom: 50,
    borderBottom: '1px solid #d4d9e2'
  },
  LikesCounter: {
    opacity: 0.56,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 600,
    color: '#0f2440',
    '&::before': {
      background: "url('../images/blog/circleRocket.svg') no-repeat",
      content: '""',
      display: 'inline-block',
      height: '40px',
      position: 'relative',
      verticalAlign: 'middle',
      width: '4%',
      right: '0.5em'
    }
  },
  TitleText: {
    opacity: 0.56,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 600,
    color: '#0f2440'
  },
  AboutAuthor: { paddingTop: 50, paddingBottom: 50, borderBottom: '1px solid #d4d9e2' },
  BigAvatar: {
    width: 64,
    height: 64
  },
  AuthorName: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.6,
    color: '#0f2440',
    paddingTop: 7,
    paddingBottom: 7
  },
  AuthorTitle: {
    opacity: 0.56,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 600,
    color: '#0f2440'
  },
  SocialMedia: {
    width: 190,
    float: 'right'
  }
});

export default styles;
