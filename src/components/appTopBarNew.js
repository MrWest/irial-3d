import React, { Component } from "react";
import PropTypes from "prop-types";
import Link  from "./buttons/extension";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { withRouter } from "react-router-dom";
// import store from "../reducers";
import { Grid, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {IconVTLogo} from "./icons"
import { connect } from "react-redux";
import _ from "lodash";
import LanguageSelector from "./languageSelector";
import { HashLink } from 'react-router-hash-link';
import {
  isLogged,
  selectAccountView
} from "../actions/index";
import { isServer } from '../apis/tools';

const IrialLogo = ({ classes }) => ( 
  <img
    src="/static/images/public/irial-transparency-logo.png"
    className={classes.logo}
    alt="Irial-3D"
  />
);

class AppTopBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      modalOpen: false,
      modalOpenProofs: false,
      menu: false,
      anchorEl: null,
      toClose: null,
      transparency: true,
      isHovered: ""
    };


    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.resetDropdown = this.resetDropdown.bind(this);
    this.resetDropdown2 = this.resetDropdown2.bind(this);
    this.resetDropdown3 = this.resetDropdown3.bind(this);

   if(!isServer) {

    window.addEventListener('scroll', this.listenToScroll);
    this.listenToScroll();
    
   }

  }

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height && !isServer &&  this.props) {
      const scrolled = winScroll / height;
      const { location } = this.props;
      this.setState({
        transparency: scrolled === 0 && location.pathname === '/'
      });
    }
    else if(!isServer &&  this.props) {
      this.setState({
        transparency: location.pathname === '/'
      });
    }
  };

  componentDidMount() {
    
    this.listenToScroll();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if(prevProps.location.pathname !== location.pathname)
     this.listenToScroll();
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleToggle = event => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState(state => ({ open: !state.open }));
    document.addEventListener("click", this.resetDropdown);
  };

  handleClose = event => {
    // store.dispatch({
    //   type: "SELECT_ACCOUNT_VIEW",
    //   accountView: event.target.id
    // });
    this.props.selectAccountView(event.target.id);
    this.setState({ open: false });
    this.setState({ anchorEl: null });
    this.props.history.push("/account")
  };

  handleCloseNLogout = event => {
    this.setState({ open: false });
    this.props.isLogged(false);
    this.props.history.push("/")
  };

  resetDropdown() {
    this.setState({ open: false });
    document.removeEventListener("click", this.resetDropdown);
  }
  resetDropdown2() {
    this.setState({ modalOpen: false });
    document.removeEventListener("click", this.resetDropdown2);
  }
  resetDropdown3() {
    this.setState({ modalOpenProofs: false });
    document.removeEventListener("click", this.resetDropdown3);
  }

  
  handleToggleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState(state => ({ menu: !state.menu }));
  };

  handleCloseMenu = url => {
    this.setState({ menu: false });

    const {history} = this.props;
    history.push(url);
  };

  render() {
    const { classes, language } = this.props;
   

    const { anchorEl, isHovered, transparency } = this.state;

    const links = [
      {
        name: language.Models,
        to: '/models/all'
      },
      {
        name: language.Projects,
        to: '/projects/all'
      },
      {
        name: language.Textures,
        to: '/textures/all'
      },
      {
        name: language.Scenes,
        to: '/scenes/all'
      },
      {
        name: language.About,
        to: '/#aboutus'
      },
      {
        name: language.Contact,
        to: '/#contactus'
      },
      {
        name: 'Blog',
        to: '/blog'
      }
    ];

    return (
      <div className={classes.root} >
        <Grid container justify="center" className={transparency? classes.topBar : classes.topBarWhite}>
          <Grid container alignItems="center" className={classes.center}>
            <Grid item>
              <Link to="/">
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IrialLogo classes={classes} />
                </Grid>
                <Grid item xs>
                  <p className={transparency? classes.logoText : classes.logoTextBlue }>Irial 3D</p>
                </Grid>
              </Grid>
              </Link>
            </Grid>
            <Grid item xs />
              <Grid item>
                <input className={classes.inputSearch} placeholder={language.Search}></input>
              </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.bottomBar}>
          <Grid container className={classes.center}>
           <Grid container alignItems="stretch" style={{ height: '100%' }}>
             <Grid item xs>
                <Grid container alignItems="stretch" style={{ height: '100%' }}>
                  {links.map(link => (
                    <Grid key={link.name} item>
                    {link.hash? (
                      <HashLink smooth    to={link.to} >
                        <div className={classes.appBarButton}>
                          {link.name}
                        </div>
                      </HashLink>
                    ):
                    (
                      <Link to={link.to} >
                        <div className={classes.appBarButton}>
                         {link.name}
                        </div>
                    </Link>
                    )}
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <LanguageSelector />
                </Grid>
           </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

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
    fontFamily: 'Futura',
    fontSize: 16,
    color: '#ffffff',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
  },
  logoTextBlue: {
    fontFamily: 'Futura',
    fontSize: 16,
    color: '#337ab7',
    textShadow: "1px 1px 0 rgba(0, 0, 0, 0.75)",
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
    backgroundColor: '#000000',
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
    padding: "4px 12px",
    paddingBottom: 5,
    fontSize: 16,
    fontFamily: "MONOSPACE",
    // textShadow: "1px 1px 0 rgba(255, 255, 255, 0.75)",
    color: "#ffffff",
    fontWeight: "bold",
    textDecorationLine: "none !important",
    '&&:hover': {
      backgroundColor: '#ffffff',
      color: "#000000"
    }
  },
  appBarButtonHovered: {
    padding: "0px 12px",
    fontSize: 16,
    fontFamily: "MONOSPACE",
    // textShadow: "1px 1px 0 rgba(255, 255, 255, 0.75)",
    backgroundColor: '#ffffff',
    color: "#000000",
    fontWeight: "bold",
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
    marginTop: 22,
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
      minWidth: "80px !important",
      fontSize: 12
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

    right: -12,
    top: -12,
    height: 20,
    width: 20,
    borderRadius: 10,
    fontSize: 10,
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

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    signInfo: state.sign,
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  { isLogged, selectAccountView }
)(withStyles(styles)(withRouter(AppTopBar)));
