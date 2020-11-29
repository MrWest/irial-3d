const styles = (theme) => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
  },
  center: {
    paddingTop: "40px !important",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1280px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "1180px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      paddingLeft: "16px !important",
      paddingRight: "16px !important",
      minWidth: "100vw",
    },
  },
  rightOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 8,
    paddingBottom: 8,
    background: "transparent",
  },
  orderButton: {
    background: "#ffffff",
    color: "#3577D4",
    fontWeight: "bold",
    width: "100%",
  },
  orderBottomButton: {
    color: "#ffffff",
    borderColor: "#ffffff",
    width: "100%",
    fontWeight: "bold",
    marginTop: 20,
  },
  hrBar: {
    background: "#e4e400",
    borderColor: "#337ab7",
    color: "#337ab7 !important",
    marginTop: 10,
    marginBottom: 10,
    height: 3,
    width: "100%",
    textAlign: "left !important",
  },
  typographyText: {
    color: "#337ab7 !important",
    textAlign: "left !important",
    fontWeight: "bold",
  },
  typographyTextSmall: {
    marginBottom: 10,
    textAlign: "left !important",
    fontSize: 12,
  },
});

export default styles;
