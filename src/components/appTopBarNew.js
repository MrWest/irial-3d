import React, { Component } from "react";
import PropTypes from "prop-types";
import Link  from "./buttons/extension";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import _ from "lodash";
import LanguageSelector from "./languageSelector";
import { HashLink } from 'react-router-hash-link';
import {
  isLogged,
  selectAccountView
} from "../actions/index";
import { isServer } from '../apis/tools';
import styles from './publicStyles/appTopBar';

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
    const { classes, language, signInfo } = this.props;
   

    const { anchorEl, open, transparency } = this.state;

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
        to: '/#aboutus',
        hash: true
      },
      {
        name: language.Contact,
        to: '/#contactus',
        hash: true
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
                  <Grid item>
                      <Link
                      aria-owns={open ? "render-props-menu" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle}
                      to={signInfo.isLogged? "#":"/signin"}
                    >
                      <div className={classes.appBarButton}>
                         {language.Account}
                      </div>
                     
                    </Link>
                    {signInfo.isLogged &&
                    <Popper
                      id="render-props-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                      className={classes.paper}
                      placement={"bottom-end"}
                      style={{ width: 282, paddingLeft: 30, paddingRight: 40 }}
                    >
                    {signInfo.loginInfo && signInfo.loginInfo.type !== "visitor" &&
                    <MenuItem
                        id={0}
                        onClick={this.handleClose}
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                        {language.Profile} 
                      </MenuItem>}
                    {signInfo.loginInfo && signInfo.loginInfo.type !== "visitor" && <MenuItem
                        id={1}
                        onClick={this.handleClose}
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                      {language.Business}  
                      </MenuItem>}
                      <MenuItem
                        onClick={this.handleCloseNLogout}
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                        {language.SignOut}
                      </MenuItem>
                    </Popper>
                  
                    } 
                </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" style={{ height: '100%' }}>
                    <Grid item>
                       {/* <LanguageSelector /> */}
                    </Grid>
                  </Grid>
                </Grid>
           </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

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
