const styles = (theme) => ({
  container: {
    paddingTop: 107,
    paddingBottom: 130,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
      paddingTop: 56,
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
});

export default styles;
