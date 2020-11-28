import React, { Component } from "react";
// import OrderDisplayTool from "./orderDisplayTool";
import { Grid, Button } from "@material-ui/core";
import { AttachMoney as MoneySharp, AddShoppingCart } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import {
  selectModel,
  addModelComment,
  updateModelComment,
  deleteModelComment,
  rateModel,
  getCategory,
  addToCart,
} from "../../actions";
// import  ModelBookingForm  from "../forms/modelBookingForm";
import CommentsTool from "../tools/commentsTool";
import Loader from "../global/loader";
import { isServer, isInCart } from "../../apis/tools";
import { imageResizedUrl } from "../../helpers/utils";
import styles from './styles/modelsDetails';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Tag = ({ classes, tag }) => (
  <div className={classes.tagContainer}>{tag.name}</div>
);

const RelatedModelCard = ({ classes, model }) => (
  <Link to={`/model/${model.id}`}>
    <div style={{ padding: 4, border: "1px solid #dddddd", borderRadius: 4, cursor: "pointer" }} >
      <div className={classes.modelCard}>
        <img src={imageResizedUrl(model.image, 150)} className={classes.modelCardImg} alt={model.name} />
      </div>
      <p style={{ textAlign: "center",  marginTop: 4, color: "#4d4e53", fontFamily: "Arial" }}>
        {model.name}
      </p>
    </div>
  </Link>
);

const ItemDetails = ({ classes, model, section, category, language }) => (
  <div>
      <p className={classes.modelName}>{model.name}</p>
        <p
          className={classes.modelText}
        >{`${section.name}/${category.name}`}</p>
        <p className={classes.modelText}>{model.full_description}</p>
        <p className={classes.modelText}>
          <strong>{language.LumionVersion}: </strong>
          {model.lumion_version}
        </p>
        <p className={classes.modelPrice}>
          <strong>{language.Price}: </strong>
          {`${model.price} ${model.currency}`}
        </p>
  </div>
)

class ModelDetails extends Component {
  state = {
    idModel: -1,
    category: {},
    busy: true,
  };

  componentWillMount() {
    if (!isServer) {
      const { id } = this.props.match.params;
      this.props.selectModel(id).then((rslt) => {
        this.props.getCategory(rslt.id_category).then(() => {
          this.setState({ busy: false });
        });
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    if (parseInt(this.state.idModel) !== parseInt(id)) {
      this.props.selectModel(id);
      this.setState({ idModel: id });
    }
  }

  getCategory(value) {
    let category = "All";

    this.props.categories.map((cat) => {
      if (parseInt(cat.id) === parseInt(value)) {
        category = cat.name;
      }
    });

    return category;
  }

  handleOnRateClick = (value) => {
    const { rateModel, model, sign } = this.props;
    rateModel({ id_model: model.id, id_user: sign.loginInfo.id, rate: value });
  };

  handleAddItem = (openCart) => {
    const { model, category, section, addToCart } = this.props;
    addToCart(
      {
        id_item: model.id,
        name: model.name,
        image: model.images[0].url,
        price: model.price,
        lumion_version: model.lumion_version,
        section,
        category,
        destination: model.ownerInfo.stripe_account_id,
        file: model.server_path,
        type: "model",
      },
      openCart
    );
  };

  render() {
    const {
      classes,
      model,
      category,
      section,
      language,
      addModelComment,
      updateModelComment,
      deleteModelComment,
    } = this.props;
    const { busy } = this.state;

    if (!model.name) return <div />;

    const cantAddToCart = isInCart(model);
    return (
      <main className={classes.container}>
        <Helmet>
          <title>Lumion Models |{model.name}</title>
          <meta name="description" content={model.general_description} />
        </Helmet>
        <Grid container justify="center">
          <Grid container spacing={3} className={classes.center}>
            <Grid item xs={12} className={classes.onMobile}>
              <Grid container>
                <Grid item xs={8}>
                 <ItemDetails classes={classes} model={model} section={section} language={language} category={category} />
                </Grid>
                <Grid item xs={4}>
                      <Button
                        className={
                          cantAddToCart
                            ? classes.actionButtonDisabled
                            : classes.actionButton
                        }
                        endIcon={
                          <AddShoppingCart
                            className={
                              cantAddToCart
                                ? classes.actionIconDisabled
                                : classes.actionIcon
                            }
                          />
                        }
                        onClick={this.handleAddItem}
                        disabled={cantAddToCart}
                      >
                        {language.AddToCart}
                  </Button>
                   <div style={{ height: 8 }} />
                  <Button
                        className={classes.actionButton}
                        endIcon={
                          <MoneySharp
                            className={
                              cantAddToCart
                                ? classes.actionIconDisabled
                                : classes.actionIcon
                            }
                          />
                        }
                        onClick={() => {
                          if (!cantAddToCart) this.handleAddItem(false);
                        }}
                        to={cantAddToCart || "/payment"}
                        disabled={cantAddToCart}
                      >
                        {language.Buy}
                      </Button>
                </Grid>
              </Grid>
               
            </Grid>
            <Grid item md={8} xs={12}>
              <ImageGallery
                items={model.images.map((image) => ({
                  original: imageResizedUrl(image.url, 475),
                  thumbnail: imageResizedUrl(image.url, 150),
                }))}
              />
              <div style={{ paddingTop: 20 }}>
                <CommentsTool
                  service="model"
                  comments={model.comments}
                  idService={model.id}
                  serviceUrl={"/model/"}
                  onRate={this.handleOnRateClick}
                  rate={model.rate}
                  addComment={addModelComment}
                  updateComment={updateModelComment}
                  deleteComment={deleteModelComment}
                ></CommentsTool>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className={classes.noMobile}>
                  <ItemDetails classes={classes} model={model} section={section} language={language} category={category} />
                  <Grid container spacing={2} style={{ paddingTop: 24 }}>
                <Grid item xs={6}>
                  <Link
                    endIcon={
                      <MoneySharp
                        className={
                          cantAddToCart
                            ? classes.actionIconDisabled
                            : classes.actionIcon
                        }
                      />
                    }
                    onClick={() => {
                      if (!cantAddToCart) this.handleAddItem(false);
                    }}
                    to={cantAddToCart || "/payment"}
                    disabled={cantAddToCart}
                  >
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      className={
                        cantAddToCart
                          ? classes.actionButtonDisabled
                          : classes.actionButton
                      }
                    >
                      {language.Buy}
                    </Grid>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className={
                      cantAddToCart
                        ? classes.actionButtonDisabled
                        : classes.actionButton
                    }
                    endIcon={
                      <AddShoppingCart
                        className={
                          cantAddToCart
                            ? classes.actionIconDisabled
                            : classes.actionIcon
                        }
                      />
                    }
                    onClick={this.handleAddItem}
                    disabled={cantAddToCart}
                  >
                    {language.AddToCart}
                  </Button>
                </Grid>
                {model.ownerInfo && (
                  <Grid xs={12}>
                    <p className={classes.modelText} style={{ marginTop: 24 }}>
                      <strong>{language.CreatorInfo}: </strong>
                    </p>
                    <Grid container spacing={2} itemsAlign="center">
                      <Grid item>
                        <img style={{ height: 38, width: 38, borderRadius: 19 }} src={model.ownerInfo.picture || "./static/images/public/user.png"}
                          alt="user" />
                      </Grid>
                      <Grid item>
                        <p className={classes.modelText} style={{ marginBottom: 8 }}>
                          {model.ownerInfo.first_name}
                        </p>
                        <p className={classes.modelText} style={{ marginBottom: 0 }}>
                          {model.ownerInfo.last_name}
                        </p>
                      </Grid>
                      <Grid item>
                        <p className={classes.modelText} style={{ marginBottom: 8 }} >
                          <strong>{section.name}</strong>
                        </p>
                        <p className={classes.modelText} style={{ marginBottom: 0, textAlign: "center" }} >
                          {model.ownerInfo.owner_models}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {model.tags && (
                  <Grid container>
                    <p
                      className={classes.modelText}
                      style={{ marginBottom: 16, marginTop: 24 }}
                    >
                      <strong>{language.Tags}:</strong>
                    </p>
                    <Grid container spacing={2}>
                      {model.tags.map((tag) => (
                        <Grid key={tag.name} xs={3}>
                          <Tag classes={classes} tag={tag} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
                {model.relatedModels && (
                  <Grid container>
                    <p
                      className={classes.modelText}
                      style={{ marginBottom: 16, marginTop: 24 }}
                    >
                      <strong>{language.RelatedModels}:</strong>
                    </p>
                    <Grid container spacing={2}>
                      {model.relatedModels.map((rmodel) => (
                        <Grid key={rmodel.id} item xs={6}>
                          <RelatedModelCard classes={classes} model={rmodel} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {busy && <Loader />}
      </main>
    );
  }
}

ModelDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateTopProps = (state) => ({
  model: state.selectedModel,
  categories: state.sections[1] ? state.sections[1].categories : [],
  category: state.selectedCategory,
  section: state.sections[1],
  language: state.language,
  sign: state.sign,
  cart: state.cart,
});

export default connect(mapStateTopProps, {
  selectModel,
  addModelComment,
  updateModelComment,
  deleteModelComment,
  rateModel,
  getCategory,
  addToCart,
})(withStyles(styles)(ModelDetails));
