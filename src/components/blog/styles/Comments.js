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
  CommentsStats: {
    paddingTop: 50,
    paddingBottom: 46,
  },
  CommentsCounter: {
    opacity: 0.56,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    color: "#434c5f",
  },
  CommentsList: {
    paddingTop: 63,
  },
  Comment: {
    paddingBottom: 42,
  },
  CommentActions: {
    textAlign: "right",
    paddingTop: 6,
  },
  CommentInput: {
    width: 806,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 1.33,
    color: "#434c5f",
    "& input": {
      paddingBottom: 20,
      border: "0px solid #000",
      outline: "none !important",
      paddingLeft: 0,
      "&::placeholder": {
        fontFamily: "Roboto",
        color: "#d4d9e2",
        opacity: 1,
      },
    },
  },
  CommentButton: {
    width: 138,
    height: 56,
    borderRadius: 45,
    backgroundColor: "#188218",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.8,
    textTransform: "none",
    "&&:hover": {
      backgroundColor: "#188218",
    },
  },
  CommentAuthor: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 0.7,
    color: "#434c5f",
  },
  CommentText: {
    opacity: 0.54,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.71,
    color: "#434c5f",
  },
  LoadMoreContainer: {
    textAlign: "center",
    paddingTop: 42,
  },
  LoadMore: {
    width: 232,
    height: 56,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    color: "#434c5f",
    border: "1px solid #434c5f",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: "none",
    "&&:hover": {
      backgroundColor: "#FFFFFF",
    },
  },
});

export default styles;
