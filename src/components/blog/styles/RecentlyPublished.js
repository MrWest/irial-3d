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
  tabsWrapper: {
    paddingTop: 56,
    paddingBottom: 56,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 24,
    },
  },
  Title: {
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#0f2440",
    paddingBottom: 62,
    paddingTop: 160,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
      paddingBottom: 16,
      paddingTop: 56,
    },
  },
  TitleTrap: {
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#0f2440",
    paddingBottom: 62,
    paddingTop: 160,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
      paddingBottom: 16,
      paddingTop: 56,
    },
  },
  CardContainer: {
    padding: "40px 40px 40px 0px",
  },

  indicator: {
    backgroundColor: "#188218",
  },
  TabLabel: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.8,
    textAlign: "center",
    color: "#188218",
    textTransform: "capitalize",
  },
});

export default styles;
