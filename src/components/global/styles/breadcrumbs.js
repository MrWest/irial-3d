const styles = (theme) => ({
  container: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 130,
    paddingBottom: 25,
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
  breadcrumbs: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
    "& a": {
      textDecoration: "underline",
      color: "#434c5f",
    },
  },
  separator: {
    marginRight: "5px",
    marginLeft: "5px",
  },
});

export default styles;
