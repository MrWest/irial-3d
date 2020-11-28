const styles = (theme) => ({
  center: {
    width: "100%",
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
      maxWidth: "100%",
      padding: "0px 24px !important",
      minWidth: "100%",
    },
  },
  containerPartnerWU: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 56,
    },
  },
  Title: {
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#0f2440",
    marginBottom: 76,
    paddingTop: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
      marginBottom: 16,
      paddingTop: 0,
    },
  },
  noMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  onMobile: {
    display: "none",
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      display: "inline",
    },
  },
  PostImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 100,
    objectFit: "container",
    [theme.breakpoints.down("sm")]: {
      maxHeight: 360,
    },
  },
  PostDescription: {
    borderBottomRightRadius: 100,
    backgroundColor: "#188218",
    padding: "72px 72px",
    [theme.breakpoints.down("sm")]: {
      padding: "32px 16px",
    },
  },
  PostCategory: {
    height: 38,
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    color: "#188218",
    textTransform: "uppercase",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 2.29,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: 32,
      padding: 5,
      fontSize: 12,
    },
  },
  TimeReading: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 2,
    letterSpacing: "normal",
    color: "#FFFFFF",
    textTransform: "uppercase",
    "&::before": {
      backgroundColor: "#FFFFFF",
      content: '""',
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "21%",
      right: "1em",
      marginLeft: "-50%",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  FeaturedPostTitle: {
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.14,
    color: "#FFFFFF",
    marginBottom: 23,
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
    },
  },
  PostSummary: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
    color: "#FFFFFF",
    "& p": {
      color: "#FFFFFF",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  FeaturedPostActions: {
    paddingTop: 56,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 32,
      justifyContent: "center",
    },
  },
  ReadMoreButton: {
    width: 224,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    color: "#188218",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.8,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
      width: 164,
      height: 56,
      textAlign: "center",
    },
  },
});

export default styles;
