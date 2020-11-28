import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "./buttons/extension";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { withRouter } from "react-router-dom";
// import store from "../reducers";
import { Grid, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IconVTLogo } from "./icons";
import { connect } from "react-redux";
import LanguageSelector from "./languageSelector";
import { HashLink } from "react-router-hash-link";
import { isLogged, selectAccountView } from "../actions/index";

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
      isHovered: "",
    };

    // store.subscribe(() => {
    //   this.setState({
    //     login: store.getState().login
    //   });
    // });

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.resetDropdown = this.resetDropdown.bind(this);
    this.resetDropdown2 = this.resetDropdown2.bind(this);
    this.resetDropdown3 = this.resetDropdown3.bind(this);

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(event) {
    if (this.state.isHovered === event.target.id)
      this.setState({
        isHovered: "xxxxx",
      });
    else
      this.setState({
        isHovered: event.target.id,
      });
  }
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleToggle = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState((state) => ({ open: !state.open }));
    document.addEventListener("click", this.resetDropdown);
  };

  handleClose = (event) => {
    // store.dispatch({
    //   type: "SELECT_ACCOUNT_VIEW",
    //   accountView: event.target.id
    // });
    this.props.selectAccountView(event.target.id);
    this.setState({ open: false });
    this.setState({ anchorEl: null });
    this.props.history.push("/account");
  };

  handleCloseNLogout = (event) => {
    this.setState({ open: false });
    this.props.isLogged(false);
    this.props.history.push("/");
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

  handleOpenModalBag = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ modalOpen: !this.state.modalOpen });
    document.addEventListener("click", this.resetDropdown2);
  };

  handleCloseModalBag = (event) => {
    this.setState({ modalOpen: false });
  };
  handleToggleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState((state) => ({ menu: !state.menu }));
  };

  handleCloseMenu = (url) => {
    this.setState({ menu: false });

    const { history } = this.props;
    history.push(url);
  };

  render() {
    const { classes, language } = this.props;
    const { anchorEl, isHovered } = this.state;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.center}
          style={{ textAlign: "center !important" }}
        >
          <div style={{ width: "100%", textAlign: "center  !important", paddingBottom: 5 }}>
            <Link className={classes.logo} color="inherit" to="/">
              <IconVTLogo
                height={60}
                width={80}
                fill1={"#e4e400"}
                fill2={"#337ab7"}
                className={classes.logo}
              />
              <p
                style={{
                  color: "#337ab7",
                  marginBottom: 0,
                  fontFamily: "Futura",
                  textDecorationLine: "none !important",
                  marginTop: -16,
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bolder",
                  textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)",
                }}
              >
                Irial 3D
              </p>
            </Link>
          </div>
          <div
            className={classes.appbar}
            style={{ borderTop: "1px #337ab7 solid", textAlign: "center" }}
          >
            <Grid style={{ position: "relative" }}>
              {this.props.signInfo.isLogged && this.props.signInfo.loginInfo && (
                <div style={{ position: "absolute", right: 0, top: -38 }}>
                  <a className={classes.userLoggingText}>
                    <span
                      style={{
                        marginRight:
                          this.props.signInfo.loginInfo &&
                          this.props.signInfo.loginInfo.picture
                            ? 20
                            : 0,
                      }}
                    >
                      {this.props.signInfo.loginInfo.first_name}{" "}
                      <span className={classes.lastNameText}>
                        {this.props.signInfo.loginInfo.last_name}
                      </span>
                    </span>
                  </a>
                  {this.props.signInfo.loginInfo &&
                    this.props.signInfo.loginInfo.picture && (
                      <a style={{ color: "#aaa" }}>
                        <img
                          style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            marginBottom: -2,
                          }}
                          src={
                            this.props.signInfo.loginInfo.picture ===
                            "/images/public/user.png"
                              ? "../static/images/public/user.png"
                              : this.props.signInfo.loginInfo.picture
                          }
                        />
                      </a>
                    )}
                </div>
              )}
              <LanguageSelector
                style={{ position: "absolute", right: 0, top: -8 }}
              ></LanguageSelector>
              <Link
                id="linkModels"
                className={
                  isHovered !== "linkModels"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/models/all"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.Models}
              </Link>
              <Link
                id="linkProjects"
                className={
                  isHovered !== "linkProjects"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/projects/all"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.Projects}
              </Link>
              <Link
                id="linkTextures"
                className={
                  isHovered !== "linkTextures"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/textures/all"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.Textures}
              </Link>
              <Link
                id="linkScenes"
                className={
                  isHovered !== "linkScenes"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/scenes/all"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.Scenes}
              </Link>
              <HashLink
                smooth
                id="linkAbout"
                className={
                  isHovered !== "linkAbout"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/#aboutus"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.About}
              </HashLink>
              <HashLink
                smooth
                id="linkContact"
                className={
                  isHovered !== "linkContact"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/#contactus"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                {language.Contact}
              </HashLink>
              <Link
                id="blog"
                className={
                  isHovered !== "blog"
                    ? classes.appBarButton
                    : classes.appBarButtonHovered
                }
                to="/blog"
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                Blog
              </Link>

              <Link
                className={classes.appBarButton}
                aria-owns={this.state.open ? "render-props-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                to={this.props.signInfo.isLogged ? "#" : "/signin"}
              >
                {language.Account}
              </Link>
              {this.props.signInfo.isLogged && (
                <Popper
                  id="render-props-menu"
                  anchorEl={anchorEl}
                  open={this.state.open}
                  onClose={this.handleClose}
                  className={classes.paper}
                  placement={"bottom-end"}
                  style={{ width: 282, paddingLeft: 30, paddingRight: 40 }}
                >
                  {this.props.signInfo.loginInfo &&
                    this.props.signInfo.loginInfo.type !== "visitor" && (
                      <MenuItem
                        id={0}
                        onClick={this.handleClose}
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                        {language.Profile}
                      </MenuItem>
                    )}
                  {this.props.signInfo.loginInfo &&
                    this.props.signInfo.loginInfo.type !== "visitor" && (
                      <MenuItem
                        id={1}
                        onClick={this.handleClose}
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                        {language.Business}
                      </MenuItem>
                    )}
                  {/* <MenuItem
                    id={2}
                    onClick={this.handleClose}
                    style={{ paddingLeft: 10, paddingRight: 0 }}
                  >
                    Billing
                  </MenuItem> */}
                  <MenuItem
                    onClick={this.handleCloseNLogout}
                    style={{ paddingLeft: 10, paddingRight: 0 }}
                  >
                    {language.SignOut}
                  </MenuItem>
                </Popper>
              )}
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                aria-owns={this.state.menu ? "render-props-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="render-props-menu"
                anchorEl={anchorEl}
                open={this.state.menu}
                onClose={this.handleCloseMenu}
                style={{
                  position: "absolute",
                  transform: "translateX(-76px)",
                  marginTop: 40,
                }}
              >
                <MenuItem
                  component="button"
                  onClick={() => this.handleCloseMenu("/tours/all")}
                  className={classes.menuItemButton}
                >
                  <div align="center" style={{ width: "100%" }}>
                    {language.Tours}
                  </div>
                </MenuItem>

                <MenuItem
                  component="button"
                  // onClick={() => this.handleCloseMenu("/#aboutus")}
                  className={classes.menuItemButton}
                >
                  <div align="center" style={{ width: "100%" }}>
                    <HashLink
                      smooth
                      id="linkAbout"
                      className={classes.appBarButtonMenu}
                      to="/#aboutus"
                      onMouseEnter={this.handleHover}
                      onMouseLeave={this.handleHover}
                    >
                      {language.About}
                    </HashLink>
                  </div>
                </MenuItem>
                <MenuItem
                  component="button"
                  onClick={() => this.handleCloseMenu("/#contactus")}
                  className={classes.menuItemButton}
                >
                  <div align="center" style={{ width: "100%" }}>
                    <HashLink
                      smooth
                      id="linkContact"
                      className={classes.appBarButtonMenu}
                      to="/#contactus"
                      onMouseEnter={this.handleHover}
                      onMouseLeave={this.handleHover}
                    >
                      {language.Contact}
                    </HashLink>
                  </div>
                </MenuItem>
                <MenuItem
                  component="button"
                  onClick={() => this.handleCloseMenu("/blog")}
                  className={classes.menuItemButton}
                >
                  <div align="center" style={{ width: "100%" }}>
                    Blog
                  </div>
                </MenuItem>
                {/* {(this.props.signInfo && (this.props.signInfo.type === "admin" || this.props.signInfo.type === "business")) && ( */}
                <MenuItem
                  component="button"
                  onClick={() =>
                    this.handleCloseMenu(
                      this.props.signInfo.isLogged ? "/account" : "/signin"
                    )
                  }
                  className={classes.menuItemButton}
                >
                  <div align="center" style={{ width: "100%" }}>
                    {language.Account}
                  </div>
                </MenuItem>

                {/* )} */}
                {this.props.signInfo.isLogged && this.props.signInfo.loginInfo && (
                  <MenuItem
                    onClick={this.handleCloseNLogout}
                    className={classes.menuItemButton}
                  >
                    <div align="center" style={{ width: "100%" }}>
                      {language.SignOut}
                    </div>
                  </MenuItem>
                )}
              </Menu>
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    boxShadow: "none",
    right: 0,
    top: 0,
    left: 0,
    textAlign: "center",
    backgroundColor: "transparent !important",
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appbar: {
    backgroundColor: "transparent !important",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    padding: "10px 15px",
    [theme.breakpoints.up("lg")]: {
      height: 35,
    },
  },
  logo: {
    outline: "none",
    textDecorationLine: "none !important",
    [theme.breakpoints.down("sm")]: {
      width: 80,
      height: 18,
    },
  },
  userLoggingText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  lastNameText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  center: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1280px",
      paddingLeft: "0 !important",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1180px",
      paddingLeft: "0 !important",
      // minWidth: "1100px"
    },
  },
  grow: {
    width: "100%",
    flexGrow: 1,
  },
  appBarButtonArea: {
    float: "right !important",
  },
  proofImg: {
    maxWidth: "72px",
    maxHeight: "72px",
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
    padding: "15px",
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
    color: "#3577d4 !important",
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
      fontWeight: "bold",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      minHeight: "56px !important",
      minWidth: "80px !important",
      fontSize: 12,
    },
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
      textDecorationLine: "underline",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      fontSize: 12,
    },
  },
  menuItemButton: {
    textDecorationLine: "none !important",
    color: "#434c5f !important",
    textAlign: "center",
    width: 158,
  },
  appBarButton: {
    padding: "2px 20px",
    fontSize: 16,
    fontFamily: "Futura",
    textShadow: "2px 2px 0 rgba(255, 255, 255, 0.75)",
    color: "#337ab7",
    fontWeight: "bold",
    textDecorationLine: "none !important",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBarButtonMenu: {
    minHeight: "100% !important",
    fontFamily: "Futura",
    fontSize: "inherit",
    textDecorationLine: "none !important",
    color: "#434c5f !important",
    height: "100%",
  },
  appBarButtonHovered: {
    padding: "2px 20px",
    fontSize: 16,
    fontFamily: "Futura",
    color: "#ffffff",
    backgroundColor: "#337ab7",
    fontWeight: "bold",
    textDecorationLine: "none !important",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    paddingBottom: 5,
    paddingTop: 5,
    color: "#434c5f",
    position: "relative",
    fontFamily: "Futura",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline",
    },
  },
  menu: {
    padding: "5px 0px 0px 0px",
  },
  paper: {
    marginTop: 22,
    width: 384,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "24px 24px",
    outline: "none",
  },
  menuItem: {
    color: "#434c5f",
    backgroundColor: "434c5f",
    padding: "5px 12px",
    "&: hover": {
      backgroundColor: "#434c5f",
      color: " #ffffff",
      fontWeight: "bold",
    },
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
      fontWeight: "bold",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      fontSize: 12,
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: "40px !important",
      minWidth: "80px !important"
    },
  },
  ripplingLogoStyle: {
    width: 167,
    height: 29,
  },
  siteBar: {
    paddingLeft: "8%",
    paddingRight: "8%",
  },
  alert: {
    paddingLeft: 10,
    verticalAlign: "middle",
    outline: "none",
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
    border: "1px solid #434c5f"
  },
  bagContainer: {
    maxHeight: "200px",
    overflowY: "auto",
    minHeight: "100px",
  },
});

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    signInfo: state.sign,
    language: state.language,
  };
};

export default connect(mapStateToProps, { isLogged, selectAccountView })(
  withStyles(styles)(withRouter(AppTopBar))
);
