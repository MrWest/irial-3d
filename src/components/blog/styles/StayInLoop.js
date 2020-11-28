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
  },
  StayInLoop: { backgroundColor: "#e9f0fa", padding: "73px 124px " },
  PurpleBlock: {
    width: 408,
    height: 520,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    backgroundColor: "#188218",
  },
  StayInLoopDescription: {
    padding: "0 65px",
  },
  NewsLetter: {
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
      width: "21%",
      right: "1em",
      //   marginLeft: '-50%'
    },
  },
  StayInLoopTitle: {
    fontFamily: "Roboto",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.14,
    color: "#434c5f",
    marginBottom: 23,
  },
  StayInLoopSummary: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
    color: "#434c5f",
    paddingBottom: 40,
  },
  StayInLoopActions: {
    paddingTop: 50,
  },
  SubscribeButton: {
    width: 185,
    height: 74,
    borderRadius: 45,
    backgroundColor: "#3577d4",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.8,
    textTransform: "none",
    "&&:hover": {
      backgroundColor: "#3577d4",
    },
  },
  SubscribeInput: {
    width: 494,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#434c5f",
    "& input": {
      "&::placeholder": {
        color: "#434c5f",
        opacity: 1,
      },
    },
  },
});

export default styles;
