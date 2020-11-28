const styles = theme => ({
    table: {
      display: "table",
      height: "100%"
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
      } 
    },
    themePadding: {
      border: "1px solid #ff1333",
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        maxWidth: 1440
      }
    },
    center: {
     
      [theme.breakpoints.up("xl")]: {
        maxWidth: "1280px",
        paddingLeft: "0 !important"
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1180px",
        paddingLeft: "0 !important",
        minWidth: "1100px"
      }
    },
    downloadButton: {
      background: 'green',
      cursor: 'pointer'
    },
    appDonwload: {
      fontFamily: 'Roboto',
      fontSize: 14,
      textAlign: 'center'
    },
    newProducts: {
      fontFamily: 'Gloss',
      fontSize: 20,
      margin: '8px 0px',
      marginLeft: 22,
      marginRight: 22
    },
    itemsPanel: {
      width: 'auto',
      background: 'rgba(0,0,0,0.5)'
    },
    itemViewContainer: {
      height: 156,
      width: 198
    },
    downloadViewContainer: {
      height: 156,
      width: 92,
      background: 'green',
      cursor: 'pointer'
    },
    itemView: {
      height: 104,
      width: 156,
      cursor: 'pointer',
      '&&:hover': {
        height: 132,
        width: 198,
      }
    },
    itemImg: {
      height: '100%',
      width: '100%',
      objectFit: 'cover'
    }
  });

  export default styles;