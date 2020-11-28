const styles = (theme) => ({
  table: {
    display: "table",
    height: "100%",
  },
  promoField: {
    backgroundImage: "url(../static/images/home/irial-3d-font-city-blue.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top-left",
    width: "100%",
    display: "flex",
    minHeight: "90vh",
    paddingTop: 52,
    objectFit: "cover",
    color: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "scale",
    },
  },
  themePadding: {
    border: "1px solid #ff1333",
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1440,
    },
  },
  downloadButton: {
    background: "green",
    cursor: "pointer",
  },
  appDonwload: {
    fontFamily: "Roboto",
    fontSize: 14,
    textAlign: "center",
  },
  newProducts: {
    fontFamily: "Gloss",
    fontSize: 20,
    margin: "8px 22px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
      margin: "4px 12px",
    },
  },
  itemsPanel: {
    width: "auto",
    background: "rgba(0,0,0,0.5)",
  },
  itemViewContainer: {
    height: 156,
    width: 198,
    [theme.breakpoints.down("sm")]: {
      height: 92,
      width: 104,
    },
  },
  downloadViewContainer: {
    height: 156,
    width: 92,
    background: "green",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      height: 92,
      width: 72,
    },
  },
  itemView: {
    height: 104,
    width: 156,
    cursor: "pointer",
    "&&:hover": {
      height: 132,
      width: 198,
    },
    [theme.breakpoints.down("sm")]: {
      height: 72,
      width: 104,
    },
  },
  itemImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
});

export default styles;
