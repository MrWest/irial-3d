const styles = (theme) => ({
  container: {
    zIndex: 999999,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  center: {
    background: "rgba(0,0,0,0.1)",
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
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
      minWidth: "100vw",
    },
  },
  cartItemName: {
    fontWeight: "bold",
  },
  cartItemContainer: {
    padding: "8px 12px",
    borderBottom: "1px solid #dedede",
    color: "#1c5375",
    "&:hover": {
      background: "#dedee3",
    },
  },
  cartItemText: {
    fontFamily: "Arial",
  },
  emptyCart: {
    color: "#1c5375",
  },
  shoppingCart: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 92,
    height: 92,
    position: "fixed",
    bottom: "5vh",
    right: "8vw",
    borderRadius: 46,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  },
  cartTitle: {
    fontWeight: "bold",
    color: "#1c5375",
    fontSize: 18,
  },
  cartLightText: {
    fontSize: 18,
    color: "#7f7f7f",
  },
  cartSmaltext: {
    fontSize: 14,
    color: "#7f7f7f",
  },
  cartItemPrice: {
    fontWeight: "bold",
  },
  cartItemImgContainer: {
    height: 69,
    width: 92,
    padding: 4,
    border: "1px solid #dedede",
  },
  itemImg: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
  deleteIcon: {
    color: "#A12839",
    zIndex: 999,
  },
  actionIcon: {
    color: "#ffffff",
    fontSize: 18,
  },
  actionButton: {
    borderRadius: 4,
    height: 36,
    width: "100%",
    fontFamily: "Delvon",
    fontSize: 22,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#ffffff",
    backgroundColor: "#1c5375",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#559cd9",
    },
  },
  actionIconDisabled: {
    color: "#5f5f5f",
  },
  actionButtonDisabled: {
    borderRadius: 4,
    height: 36,
    width: "100%",
    fontFamily: "Delvon",
    fontSize: 22,
    letterSpacing: 2,
    fontStyle: "normal",
    color: "#5f5f5f !important",
    backgroundColor: "#dedede",
    textTransform: "none",
    "&:hover": {
      cursor: "not-allowed !important",
    },
  },
});

export default styles;
