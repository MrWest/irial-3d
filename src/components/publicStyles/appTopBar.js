
const styles = theme => ({
    root: {
      width: "100%",
      boxShadow: "none",
      right: 0,
      top: 0,
      left: 0,
      // textAlign: "center",
      // height: 48,
      // backgroundImage: "linear-gradient(0deg,black, transparent)",
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: 'bottom',
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed",
      justifyContent: "center"
    },
    appbar: {
      backgroundColor: "transparent !important",
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
      padding: "10px 15px",
      [theme.breakpoints.up("lg")]: {
        height: 35
      }
    },
    logo: {
      outline: "none",
      textDecorationLine: "none !important",
      height: 24,
      objectFit: 'contain'
    },
    logoText: {
      fontFamily: 'Arial',
      fontSize: 18,
      color: '#1c5375'
    },
    logoTextBlue: {
      fontFamily: 'Arial',
      fontSize: 20,
      color: '#1c5375'
    },
    userLoggingText: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 10
      }
    },
    lastNameText: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    center: {
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1280px",
        paddingLeft: "0 !important"
      },
      [theme.breakpoints.down("lg")]: {
        maxWidth: "1180px",
        paddingLeft: "0 !important"
        // minWidth: "1100px"
      }
    },
    topBar: {
      height: 28
    },
    topBarWhite: {
      backgroundColor: '#ffffff',
      height: 28
    },
    bottomBar: {
      backgroundColor: '#032D46',
      height: 28
    },
    grow: {
      width: "100%",
      flexGrow: 1
    },
    appBarButtonArea: {
      float: "right !important"
    },
    proofImg: {
      maxWidth: "72px",
      maxHeight: "72px"
    },
    proofsMessage: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "1.43",
      letterSpacing: "normal",
      color: "#596377",
      padding: "15px"
    },
    seeProofs: {
      textDecorationLine: "none !important",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: "bold",
      paddingTop: 14,
      paddingBottom: 14,
      width: "100%",
      display: "block",
      cursor: "pointer",
      color: "#3577d4 !important"
    },
    signInButton: {
      display: "table-cell",
      minHeight: "56px !important",
      minWidth: "80px !important",
      marginRight: 20,
      verticalAlign: "middle",
      color: "#434c5f",
      fontWeight: "bold",
      "&: hover": {
        color: " #3577D4",
        textDecorationLine: "underline",
        fontWeight: "bold"
      },
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        minHeight: "56px !important",
        minWidth: "80px !important",
        fontSize: 12
      }
    },
    notiButton: {
      display: "table-cell",
      minHeight: "56px !important",
      paddingRight: 5,
      paddingLeft: 5,
      color: "#434c5f",
      fontWeight: "bold",
      outline: "none",
      "&: hover": {
        color: " #3577D4",
        textDecorationLine: "underline"
      },
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        fontSize: 12
      }
    },
    menuItemButton: {
      textDecorationLine: "none !important",
      color: "#434c5f !important",
      textAlign: "center",
      width: 158
    },
    appBarButton: {
      padding: "5px 12px",
      height: '100%',
      fontSize: 16,
      fontFamily: "Arial",
      // textShadow: "1px 1px 0 rgba(255, 255, 255, 0.75)",
      color: "#ffffff",
      textDecorationLine: "none !important",
      '&&:hover': {
        backgroundColor: '#ffffff',
        color: "#000000"
      }
    },
    appBarButtonHovered: {
      padding: "4px 12px",
      paddingBottom: 5,
      fontSize: 16,
      height: '100%',
      fontFamily: "Arial",
      // textShadow: "1px 1px 0 rgba(255, 255, 255, 0.75)",
      backgroundColor: '#ffffff',
      color: "#000000",
      textDecorationLine: "none !important"
    },
    menuButton: {
      paddingBottom: 5,
      paddingTop: 5,
      color: "#434c5f",
      position: "relative",
      fontFamily: "Futura",
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "inline"
      }
    },
    menu: {
      padding: "5px 0px 0px 0px"
    },
    paper: {
      marginTop: 0,
      width: 384,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: "24px 24px",
      outline: "none"
    },
    menuItem: {
      color: "#434c5f",
      backgroundColor: "434c5f",
      padding: "5px 12px",
      "&: hover": {
        backgroundColor: "#434c5f",
        color: " #ffffff",
        fontWeight: "bold"
      }
    },
    signUpButton: {
      display: "table",
      minWidth: "180px !important",
      minHeight: "56px !important",
      borderRadius: 4,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
      color: "#3577d4",
      border: "2px solid #3577d4",
      "&: hover": {
        backgroundColor: "434c5f",
        color: " #ff00ff",
        fontWeight: "bold"
      },
      [theme.breakpoints.down("sm")]: {
        position: "relative",
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: "40px !important",
        minWidth: "80px !important"
      }
    },
    ripplingLogoStyle: {
      width: 167,
      height: 29
    },
    siteBar: {
      paddingLeft: "8%",
      paddingRight: "8%"
    },
    alert: {
      paddingLeft: 10,
      verticalAlign: "middle",
      outline: "none"
    },
    notiPop: {
      background: "#ffa926",
      position: "absolute",
      padding: 3,
      border: "1px solid #434c5f",
      right: -10,
      top: -10,
      height: 16,
      width: 16,
      borderRadius: 8,
      fontSize: 8
    },
    bagContainer: {
      maxHeight: "200px",
      overflowY: "auto",
      minHeight: "100px"
    },
    inputSearch: {
      background: 'white',
      height: 22,
      borderRadius: 11,
      border: '1px solid rgba(0,0,0, 0.5)',
      padding: '0px 12px',
      outline: 'none',
      '&&:hover': {
        border: '1px solid rgba(0,0,0, 0.8)',
      }
    }
  });

  export default styles;