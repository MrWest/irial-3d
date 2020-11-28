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
      paddingLeft: "0 !important",
      minWidth: "100%",
    },
  },
  subcribeContent: {
    paddingTop: 164,
    paddingBottom: 56,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 56,
      paddingBottom: 102,
    },
  },
  subscribeTitle: {
    color: "#434c5f",
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    textAlign: "left",
    marginBottom: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
      textAlign: "left",
      marginBottom: 8,
    },
  },
  subscribeContent: {
    paddingTop: 125,
    paddingBottom: 72,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 32,
      paddingBottom: 0,
    },
  },
  regularText: {
    color: "#434c5f",
    fontFamily: "Roboto",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  subscribeInnerContent: {
    [theme.breakpoints.down("sm")]: {
      padding: "72px 56px",
      paddingBottom: 102,
    },
  },
});

export default styles;
