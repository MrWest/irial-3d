
const styles = (theme) => ({
    container: {
      paddingTop: 120,
      paddingBottom: 130,
    },
    center: {
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
    noMobile: {
      [theme.breakpoints.down("sm")]: {
        display:  'none'
      }
    },
    onMobile: {
        display:  'none',
        [theme.breakpoints.down("sm")]: {
          display:  'flex'
        }
    },
    imgSet: {
      objectFit: "contain",
      width: "auto !important",
      height: "424",
    },
    imgContainer: {
      width: "100%",
      height: 420,
      "& img": {
        objectFit: "contain",
        width: "auto !important",
        height: "100%",
      },
    },
    tagContainer: {
      borderRadius: 28,
      backgroundColor: "#326787",
      border: "3px solid #dedede",
      padding: "6px 12px",
      width: "100%",
      color: "#ffffff",
      textAlign: "center",
      cursor: "pointer",
    },
    seletcTool: {
      width: 220,
      marginTop: 20,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 24,
      },
    },
    onMoblie: {
      [theme.breakpoints.down("sm")]: {
        paddingTop: "16px !important",
      },
    },
    mobilePadding: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "16px !important",
        paddingRight: "16px !important",
      },
    },
    mobileAlign: {
      textAlign: "right",
      marginTop: 16,
      [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        textAlign: "left",
      },
    },
    modelCardImg: {
      height: "100%",
      width: "100%",
      objectFit: "contain",
      borderRadius: 4,
    },
    modelCard: {
      height: 92,
      width: "100%",
      backgroundColor: "#245580",
      borderRadius: 4,
    },
    actionIcon: {
      color: "#ffffff",
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
      [theme.breakpoints.down("sm")]: {
        height: 28,
        fontSize: 16
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
      [theme.breakpoints.down("sm")]: {
        height: 28,
        fontSize: 16
      },
    },
    modelName: {
      marginBottom: 16,
      fontFamily: "Arial",
      fontSize: 28,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#1c5375",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
        fontSize: 18,
      },
    },
    modelText: {
      marginBottom: 12,
      fontFamily: "Arial",
      fontSize: 16,
      fontStyle: "normal",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
        fontSize: 12,
      },
    },
    modelPrice: {
      marginBottom: 12,
      fontFamily: "Arial",
      fontSize: 18,
      fontWeight: "normal",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
        fontSize: 14,
      },
    },
    orderList: {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    gray: {
      backgroundColor: "#dddddd",
    },
    yellow: {
      color: "#a0a010",
      backgroundColor: "#f9f9c9",
    },
    green: {
      color: "#10a000",
      backgroundColor: "#c9f999",
    },
    submitButton: {
      width: "282px",
      height: "56px",
      "& span": {
        fontFamily: "Delvon",
        fontSize: "16px",
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
      },
      textAlign: "center",
      color: "#ffffff",
      borderRadius: "4px",
      backgroundColor: "#1c5375",
    },
  });

  export default styles;