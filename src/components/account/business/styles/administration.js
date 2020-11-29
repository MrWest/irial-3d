const styles = (theme) => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  grow: {
    width: "100%",
    flex: 1,
  },
  cover: {
    [theme.breakpoints.up("sm")]: {
      backgroundImage: "url(../images/sign/artwork.svg)",
      backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundSize: "contain",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    [theme.breakpoints.up("xl")]: {
      paddingBottom: "200 !important",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "85 !important",
    },
  },
  center: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      minWidth: "1280px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1120px",
      paddingLeft: "0 !important",
      minWidth: "1120px",
    },
  },
  signForm: {
    [theme.breakpoints.up("xl")]: {
      maxWidth: "486",
      paddingLeft: "60px !important",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "486",
      paddingLeft: "60px !important",
      minWidth: "400",
    },
  },
  tabItem: {
    opacity: "0.54",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    textTransform: "none",
    color: "#434c5f",
    minWidth: 140,
    width: 130,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0,
      fontSize: 12,
    },
  },
});

export default styles;
