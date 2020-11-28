import React, { Component } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import {
  Grid,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchModels, sortModels, addToCart } from "../../actions";
import { Helmet } from "react-helmet";
import Loader from "../global/loader";
import DisplayModelsTool from "./displayModelsTool";
import Paginator from "../paginator";
import { getLanguage } from "../../apis/tools";
import { isServer } from "../../apis/tools";

class ModelsHome extends Component {
  state = {
    sort: "all",
    filter: "all",
    category: {},
    busy: false,
  };

  loadView = async (force) => {
    if (!isServer) {
      const {
        sortModels,
        match: {
          params: { query },
        },
      } = this.props;
      const { filter, sort } = this.state;
      const settings = query.split("-");
      const queryFilter = settings[0] || "all";
      const querySort = settings[1] || "all";
      if (filter !== queryFilter || sort !== querySort || force) {
        this.setState({ filter: queryFilter, sort: querySort });
        this.setState({ busy: true });
        sortModels(queryFilter, querySort).then((response) => {
          this.setState({ busy: false, total: response });
        });
      }
    }
  };

  componentDidMount() {
    this.loadView(true);
    // this.myRef = React.createRef()   // Create a ref object
  }

  componentDidUpdate() {
    this.loadView();
  }

  handleAddItem = (item, openCart) => {
    const { categories, section, addToCart } = this.props;
    addToCart(
      {
        id_item: item.id,
        name: item.name,
        image: item.images[0].url,
        price: item.price,
        lumion_version: item.lumion_version,
        section,
        category: categories.find((c) => c.id === item.id_category),
        destination: item.ownerInfo.stripe_account_id,
        file: item.server_path,
        type: "model",
      },
      openCart
    );
  };

  handleChange = (event) => {
    if (this.state.filter !== event.target.value) {
      const { history } = this.props;
      //   this.setState({ sort: event.target.value, busy: true });
      //   this.props.sortModels(event.target.value).then(() => {
      //     this.setState({ busy: false });
      //   });

      //   this.props.categories.map(c =>{
      //     if(c.id === event.target.value)
      //       this.setState({category: c})

      // });
      history.push(`/models/${event.target.value}-${this.state.sort}`);
    }
  };

  handleSortChange = (event) => {
    if (this.state.sort !== event.target.value) {
      const { history } = this.props;
      history.push(`/models/${this.state.filter}-${event.target.value}`);
    }
  };

  paginate = async (offset) => {
    const { sortModels } = this.props;
    const { filter, sort } = this.state;
    this.setState({ busy: true });
    await sortModels(filter, sort, offset).then((response) => {
      this.setState({ busy: false, total: response });
      return response;
    });
  };

  render() {
    const { classes, section, language, models, categories } = this.props;
    const { busy, filter, total, sort } = this.state;
    if (!section) return <div />;
    return (
      <main ref={this.myRef} className={classes.container}>
        <Helmet>
          <meta name="language" content={getLanguage()} />
          <title>
            {language.PageTittle} | {language.ModelsPageTittle}{" "}
          </title>
          <meta name="description" content={language.ModelsPageDescription} />
          <meta name="keywords" content={language.ModelsPageTags} />
        </Helmet>
        <Grid container justify="center" spacing={0}>
          <Grid item className={classes.center}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.3,
                    color: "#1c5375 !important",
                    fontFamily: "Roboto !important",
                  }}
                >
                  <h1
                    variant="p"
                    align="left"
                    className={classes.categoryTittle}
                    style={{ display: "inline" }}
                  >
                    {filter === "all"
                      ? section.name + " "
                      : categories.find(
                          (c) => parseInt(c.id) === parseInt(filter, 10)
                        ).name + " "}
                  </h1>
                  {filter === "all"
                    ? section.description
                    : this.state.category.promotion}
                </p>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" className={classes.seletcTool}>
                  <InputLabel htmlFor="idsimple">{language.Filter}</InputLabel>
                  <Select
                    value={filter}
                    onChange={this.handleChange}
                    margin="none"
                  >
                    <MenuItem value={"all"}>
                      <p
                        style={{
                          fontSize: 14,
                          marginBottom: 0,
                          color: "#1c5375",
                        }}
                      >
                        <em>{language.ViewAll}</em>
                      </p>
                    </MenuItem>
                    {categories.map((category, index) => (
                      <MenuItem value={category.id}>
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: 0,
                            color: "#1c5375",
                          }}
                        >
                          <strong>{category.name}</strong>
                        </p>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl variant="outlined" className={classes.seletcTool}>
                  <InputLabel htmlFor="idsimple">
                    {this.props.language.SortBy}
                  </InputLabel>
                  <Select
                    value={sort}
                    onChange={this.handleSortChange}
                    margin="none"
                  >
                    <MenuItem value={"all"}>
                      <em style={{ color: "#1c5375" }}>
                        {this.props.language.None}
                      </em>
                    </MenuItem>
                    <MenuItem value={"sort_price"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.Price} - ${this.props.language.Ascending}`}</span>
                    </MenuItem>
                    <MenuItem value={"sort_price_desc"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.Price} - ${this.props.language.Descending}`}</span>
                    </MenuItem>
                    <MenuItem value={"sort_lumion"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.LumionVersion} - ${this.props.language.Ascending}`}</span>
                    </MenuItem>
                    <MenuItem value={"sort_capacity_desc"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.LumionVersion} - ${this.props.language.Descending}`}</span>
                    </MenuItem>
                    <MenuItem value={"sort_rating"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.Rating} - ${this.props.language.Ascending}`}</span>
                    </MenuItem>
                    <MenuItem value={"sort_rating_desc"}>
                      <span
                        style={{ color: "#1c5375" }}
                      >{`${this.props.language.Rating} - ${this.props.language.Descending}`}</span>
                    </MenuItem>
                    {/* {this.props.categories.map((category, index) => (
                      
                       <MenuItem value={category.id}>
                       <p style={{ fontSize: 14, marginBottom: 0 }}>
                         <strong>{category.name}</strong>
                       </p>
                     </MenuItem>
                      
                         
                        
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DisplayModelsTool
                models={models}
                addToCart={this.handleAddItem}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ paddingTop: 20 }}>
            <Paginator
              previous={this.paginate}
              next={this.paginate}
              items={12}
              total={total}
              source={models}
            />
          </Grid>
        </Grid>
        {busy && <Loader />}
      </main>
    );
  }
}

const styles = (theme) => ({
  container: {
    paddingTop: 56,
    paddingBottom: 130,
  },
  mobilePadding: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "24px !important",
      paddingRight: "16px !important",
    },
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
  seletcTool: {
    width: 220,
    marginTop: 20,
    "& div": {
      maxHeight: "52px !important",
    },
    "& em, p": {
      paddingRight: "8px !important",
    },
    "& label": {
      transform: "translate(14px, -14px) scale(0.75) !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
      marginLeft: 24,
      marginRight: 8,
    },
  },
  categoryTittle: {
    marginBottom: 0,
    fontFamily: "Futura",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    color: "#434c5f",
    display: "inline",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
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
      fontFamily: "Futura",
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
    backgroundColor: "#337ab7",
  },
});

ModelsHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateTopProps = (state) => {
  return {
    models: state.models,
    categories: state.sections[1] ? state.sections[1].categories : [],
    section: state.sections[1],
    language: state.language,
  };
};

export default connect(mapStateTopProps, {
  fetchModels,
  sortModels,
  addToCart,
})(withStyles(styles)(ModelsHome));
