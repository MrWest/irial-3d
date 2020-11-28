
const styles = theme => ({
    firstItems: {
      height: 62,
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      }
    },
    firstItemsRight: {
      textAlign: "right",
      height: 62,
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        textAlign: "center"
      }
    },
    logo: {
      outline: "none",
      textDecorationLine: "none !important",
      height: 24,
      objectFit: 'contain'
    },
    mobileSocials: {
      width: 24,
      height: 24,
      margin: 0,
      padding: 0,
      marginLeft: 16,
      paddingTop: 0,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginRight: 16,
      }
    },
    root: {
      // zIndex: theme.zIndex.drawer + 1,
      width: "100%",
      // marginTop: 30,
      backgroundColor: "#f3f3f3",
      display: "flex", 
      alignItems: "center",
      justifyContent: "center"
    },
    table: {
      verticalAlign: "middle"
    },
    appbar: {
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
      [theme.breakpoints.up("lg")]: {
        height: 88
      }
    },
    themePadding: {
      border: "1px solid #ff1333",
      width: '100vw'
    },
    centerNew: {
      width: "100%",
      [theme.breakpoints.up("xl")]: {
        maxWidth: "1280px",
        paddingLeft: "0 !important"
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1180px",
        paddingLeft: "0 !important",
        minWidth: "1100px"
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        padding: '0px 24px !important',
        minWidth: '100%'
      }
    },
    grow: {
      flexGrow: 1
    },
    partnered: {
      fontFamily: "Arial",
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 0,
      marginRight: 10
    },
    pText: {
      fontSize: 10,
      marginLeft: 15,
      // display: "table-cell",
      verticalAlign: "middle",
      fontFamily: "Arial",
      maxHeight: 15,
      marginBottom: 0
    },
    pTextMobile: {
      marginLeft: 15,
      // display: "table-cell",
      verticalAlign: "middle",
      fontSize: '12px',
      maxHeight: 15,
      marginBottom: 0,
      [theme.breakpoints.down("sm")]: {
        marginBottom: 8,
        textAlign: 'center'
      }
    },
    pTextBold: {
      fontSize: 10,
      fontWeight: "bold",
      verticalAlign: "middle",
      marginLeft: 15
    },
    mobileNo: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    siteBar: {
      paddingLeft: "8%",
      paddingRight: "8%"
    }
  });

  export default styles;