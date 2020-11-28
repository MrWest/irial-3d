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
  sectionContainer: {
    paddingTop: 56,
  },
});

export default styles;
