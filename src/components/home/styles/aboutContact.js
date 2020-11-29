const styles = (theme) => ({
  aboutContent: {
    paddingTop: 56,
    paddingBottom: 0,
    height: "100%",
  },
  offerContent: {
    paddingTop: 24,
    paddingBottom: 92,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 56,
    },
  },
  center: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      minWidth: "1100px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  cover: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      // backgroundImage: "url(../static/images/home/about-contact.jpg)",
      backgroundRepeat: "no-repeat !important",
      display: "inherit",
      // backgroundSize: "cover",
      backgroundPosition: "right  !important",
      backgroundSize: "contain !important",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundOpacity: 0.5,
    },
  },
  coverContact: {
    backgroundImage: "url(../static/images/home/about-us-background.png)",
    backgroundRepeat: "no-repeat !important",
    display: "inherit",
    backgroundSize: "cover",
    backgroundPosition: "left top  !important",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundOpacity: 0.5,
  },
  aboutPic: {
    backgroundImage: "url(../static/images/home/city-hill.svg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
  },
  hrBar: {
    background: "#fafafa",
    borderColor: "#fafafa",
    color: "#fafafa !important",
    marginTop: 0,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important",
  },
  hrBarGold: {
    background: "#e3a304",
    borderColor: "#e3a304",
    color: "#e3a304 !important",
    marginTop: 0,
    marginBottom: 20,
    height: 3,
    width: "25%",
    textAlign: "left !important",
  },
  followUs: {
    color: "#e3a304",
    fontSize: 32,
    marginBottom: 32,
  },
  typographyText: {
    textAlign: "left",
    margin: "20px 0px",
    marginBottom: 0,
    fontSize: 28,
    color: "#e3a304",
    fontFamily: "Gloss",
    letterSpacing: 2,
    textShadow: "1px 1px 0 rgba(20, 20, 20, 0.75)",
  },
  typographyTextBlue: {
    textAlign: "left",
    margin: "20px 0px",
    marginBottom: 0,
    fontSize: 28,
    color: "#1c5375",
    fontFamily: "Gloss",
    letterSpacing: 2,
    textShadow: "1px 1px 0 rgba(20, 20, 20, 0.75)",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  formContainer: {
    paddingTop: 32,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 56,
    },
  },
  noMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  typographyTextSmall: {
    textAlign: "left",
    fontFamily: "Arial",
    marginBottom: 0,
    fontSize: 18,
  },
  typographyTextSmallBlue: {
    textAlign: "left",
    fontFamily: "Arial",
    color: "#1c5375",
    marginBottom: 32,
    fontSize: 18,
  },
  contactUsForm: {
    paddingLeft: 56,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 24,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 16,
    },
  },
});

export default styles;
