const styles = (theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      padding: "0px 24px !important",
      minWidth: "100%",
    },
  },
  BlogHeader: {
    backgroundColor: "#f3f6fa",
    padding: "124px 84px 42px 72px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      padding: "32px 24px",
      paddingTop: 56,
    },
  },
  containerPartnerWU: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 56,
    },
  },
  StayInLoopDescription: {
    padding: "0 65px",
  },
  TimeReading: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 2,
    letterSpacing: "normal",
    color: "#188218",
    textTransform: "uppercase",
    paddingTop: 30,
    "&::before": {
      backgroundColor: "#188218",
      content: '""',
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "7%",
      right: "3em",
      //   marginLeft: '-50%'
    },
    "&::after": {
      backgroundColor: "#188218",
      content: '""',
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "7%",
      left: "3em",
      //   marginLeft: '-50%'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  BlogIntroContainer: {
    maxWidth: 780,
    margin: "0 auto",
    textAlign: "center",
  },
  BlogTitle: {
    fontFamily: "Roboto",
    fontSize: 72,
    fontWeight: 600,
    lineHeight: "normal",
    color: "#0f2440",
    marginBottom: 28,
    marginTop: 22,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
    },
  },
  BlogSummary: {
    opacity: 0.54,
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.67,
    color: "#0f2440",
    paddingBottom: 40,
    "& p": {
      color: "#0f2440",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  PostCategory: {
    height: 38,
    borderRadius: 6,
    backgroundColor: "#d7e0eb",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 2.29,
    color: "#0f2440",
    textTransform: "uppercase",
    padding: "3px 8px",
    textAlign: "center",
    margin: "0 auto",
  },
});

export default styles;
