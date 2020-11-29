import React from "react";
import { withStyles, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import CommentIcon from "@material-ui/icons/CommentSharp";
import { Link } from "react-router-dom";
import { setRedirectUrl, getUserRate } from "../../actions";
import StarRatingComponent from "react-star-rating-component";
import { getFacebookFreeUserProfileUrl } from "../../apis/tools";
import { StylessButton } from "../buttons";

class CommentsTool extends React.Component {
  state = {
    isAdding: false,
    toEdit: undefined,
    newComment: "",
    rating: -1,
  };

  componentWillReceiveProps() {
    // alert("crap")
    const { signInfo, getUserRate, idService, service } = this.props;
    if (signInfo.isLogged && signInfo.loginInfo) {
      getUserRate({
        id_service: idService,
        id_user: signInfo.loginInfo.id,
        service,
      });
    }
  }

  onStarClick(nextValue, prevValue, name) {
    const { onRate } = this.props;
    this.setState({ rating: nextValue });

    onRate(nextValue);
  }

  handleOnClickAdd() {
    if (this.state.newComment) {
      const {
        addComment,
        idService,
        signInfo: {
          loginInfo: { id, first_name, last_name, picture, type },
        },
      } = this.props;
      addComment({
        id_service: idService,
        comment: this.state.newComment,
        id_user: id,
        user_first_name: first_name,
        user_last_name: last_name,
        user_picture: picture,
        user_type: type,
      });

      this.setState({ newComment: "", isAdding: false });
    }
  }

  handleOnClickEdit(event) {
    if (this.state.toEdit) {
      this.props.updateComment({
        id: event.target.id,
        comment: this.state.newComment,
      });

      this.setState({ newComment: "", toEdit: undefined });
    } else this.setState({ toEdit: event.target.id });
  }

  handleOnClickDelete(event) {
    this.props.deleteComment(event.target.id);
  }

  handleChange(event) {
    this.setState({ newComment: event.target.value });
  }

  render() {
    const {
      comments,
      classes,
      signInfo,
      language,
      idService,
      setRedirectUrl,
      serviceUrl,
      rate,
      serviceRate,
    } = this.props;
    const { rating } = this.state;
    return (
      <div style={{ color: "#434c5f" }}>
        <Grid container style={{ paddingBottom: 8 }}>
          <Grid itemn xs={5}>
            <p> {language.CurrentRate}</p>
            <StarRatingComponent
              name="rate1"
              editing={false}
              starCount={5}
              value={rate}
              emptyStarColor={
                "#ccc"
              } /* color of non-selected icons, default `#333` */
              // onStarClick={this.onStarClick.bind(this)}
            />
          </Grid>
          <Grid item xs={7}>
            {!signInfo.isLogged ? (
              <div align="right">
                <p
                  align="right"
                  className={classes.bottomText}
                  style={{
                    fontSize: 16,
                    display: "table-cell",
                    verticalAlign: "middle",
                  }}
                >
                  {language.ToLeaveComment}

                  <Link
                    className={classes.link}
                    to="/signin"
                    onClick={() => setRedirectUrl(serviceUrl + idService)}
                  >
                    {language.SignInYou}
                  </Link>
                </p>
              </div>
            ) : (
              <div align="right">
                <p> {language.RateThis}</p>
                <StarRatingComponent
                  name="rate1"
                  editing={true}
                  starCount={5}
                  value={rating < 0 ? serviceRate : rating}
                  emptyStarColor={
                    "#ccc"
                  } /* color of non-selected icons, default `#333` */
                  onStarClick={this.onStarClick.bind(this)}
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <div style={{ display: "table" }}>
              <p
                style={{
                  fontWeight: "bold",
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                {language.Comments}:
              </p>
            </div>
          </Grid>
          <Grid item xs={8} align="right" alignItems="center">
            {signInfo.isLogged && (
              <div style={{ display: "table" }}>
                <p
                  align="right"
                  className={classes.bottomText}
                  style={{
                    fontSize: 16,
                    display: "table-cell",
                    verticalAlign: "top",
                  }}
                >
                  {language.AddComment}
                </p>
                <Link
                  className={classes.link}
                  to={serviceUrl + idService}
                  onClick={() => this.setState({ isAdding: true })}
                >
                  <CommentIcon
                    color="#337ab7"
                    style={{
                      marginTop: -4,
                      fontSize: 32,
                      color: "#337ab7",
                      background: "#ffffff",
                    }}
                  ></CommentIcon>
                </Link>
              </div>
            )}
          </Grid>
          {/* <Grid item>
         <h3 style={{fontWeight: "bold"}}>{this.props.language.Comments}:</h3>
       </Grid> */}
        </Grid>

        {this.state.isAdding && (
          <div className={classes.commentContainer}>
            <Grid container spacing={4}>
              <Grid item xs={2} md={1}>
                <img
                  style={{ height: 32, width: 32, borderRadius: 16 }}
                  src={
                    signInfo.loginInfo.picture &&
                    signInfo.loginInfo.picture !== "/images/public/user.png"
                      ? getFacebookFreeUserProfileUrl(
                          signInfo.loginInfo.picture
                        )
                      : "../static/images/public/user.png"
                  }
                  alt="user"
                />
              </Grid>
              <Grid item xs={10} md={11}>
                <p style={{ fontSize: 16, marginBottom: 8 }}>
                  {signInfo.loginInfo.first_name +
                    " " +
                    signInfo.loginInfo.last_name}
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  label={language.AddComment}
                  multiline
                  rows="4"
                  rowsMax="4"
                  value={this.state.multiline}
                  onChange={this.handleChange.bind(this)}
                  className={classes.textField}
                  margin="none"
                  // helperText="hello"
                  variant="outlined"
                  color="disable"
                />
              </Grid>

              <Grid item xs={12} align="right">
                <p>
                  <StylessButton
                    className={classes.link}
                    style={{
                      marginRight: 8,
                      fontSize: 16,
                      cursor: "pointer",
                      fontWeight: "normal",
                    }}
                    onClick={this.handleOnClickAdd.bind(this)}
                  >
                    Post
                  </StylessButton>
                  |
                  <StylessButton
                    className={classes.link}
                    style={{
                      marginLeft: 0,
                      color: "#3577d4",
                      fontSize: 16,
                      cursor: "pointer",
                      fontWeight: "normal",
                    }}
                    onClick={() => this.setState({ isAdding: false })}
                  >
                    Cancel
                  </StylessButton>
                </p>
              </Grid>
            </Grid>
          </div>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className={classes.commentContainer}>
            <Grid container spacing={4}>
              <Grid item xs={2} md={1}>
                <img
                  style={{ height: 32, width: 32, borderRadius: 16 }}
                  src={
                    comment.user_picture === "/images/public/user.png"
                      ? "../static/images/public/user.png"
                      : getFacebookFreeUserProfileUrl(comment.user_picture)
                  }
                  alt="user"
                />
              </Grid>
              <Grid item xs={10} md={11}>
                <p align="left" className={classes.commentAuthor}>
                  {comment.user_first_name + " " + comment.user_last_name}
                </p>
                <p align="left" className={classes.commentDate}>
                  {new Date(comment.date_created).toDateString()}
                </p>

                {parseInt(this.state.toEdit) === parseInt(comment.id) ? (
                  <div style={{ paddingTop: 12 }}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label={language.EditComment}
                      multiline
                      rows="4"
                      rowsMax="4"
                      defaultValue={comment.comment}
                      onChange={this.handleChange.bind(this)}
                      className={classes.textField}
                      margin="none"
                      // helperText="hello"
                      variant="outlined"
                      color="disable"
                    />
                  </div>
                ) : (
                  <p
                    align="left"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: "normal",
                      fontStyle: "normal",
                      fontStretch: "normal",
                      lineHeight: "normal",
                      letterSpacing: "normal",
                      color: "#434c5f",
                      paddingTop: "10px",
                    }}
                  >
                    {comment.comment}
                  </p>
                )}
              </Grid>

              {signInfo.loginInfo &&
                parseInt(signInfo.loginInfo.id) ===
                  parseInt(comment.id_user) && (
                  <Grid item xs={12} align="right">
                    <p style={{ fontSize: 14 }}>
                      <StylessButton
                        id={comment.id}
                        className={classes.link}
                        style={{
                          marginRight: 8,
                          color: "#3577d4",
                          fontSize: 12,
                          cursor: "pointer",
                          fontWeight: "normal",
                        }}
                        onClick={this.handleOnClickEdit.bind(this)}
                      >
                        {language.Edit}
                      </StylessButton>
                      |
                      {this.state.toEdit ? (
                        <StylessButton
                          className={classes.link}
                          style={{
                            marginLeft: 0,
                            color: "#434c5f",
                            fontSize: 12,
                            cursor: "pointer",
                            fontWeight: "normal",
                          }}
                          onClick={() =>
                            this.setState({ newComment: "", toEdit: undefined })
                          }
                        >
                          {language.Cancel}
                        </StylessButton>
                      ) : (
                        <StylessButton
                          id={comment.id}
                          className={classes.link}
                          style={{
                            marginLeft: 0,
                            color: "#f44336",
                            fontSize: 12,
                            cursor: "pointer",
                            fontWeight: "normal",
                          }}
                          onClick={this.handleOnClickDelete.bind(this)}
                        >
                          {" "}
                          {language.Delete}
                        </StylessButton>
                      )}
                    </p>
                  </Grid>
                )}
            </Grid>
          </div>
        ))}
      </div>
    );
  }
}

const styles = (theme) => ({
  textField: {
    width: "100%",
  },
  link: {
    color: "#337ab7",
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingLeft: "8px !important",
    fontSize: 18,
  },
  commentContainer: { paddingBottom: "24px" },
  commentAuthor: {
    verticalAlign: "middle",
    marginTop: 6,
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
  },
  commentDate: {
    verticalAlign: "middle",
    marginTop: 3,
    opacity: "0.54",
    fontFamily: "Roboto",
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
  },
  commentContent: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#434c5f",
    paddingTop: "10px",
  },
});

const mapStateTopProps = (state) => {
  return {
    signInfo: state.sign,
    language: state.language,
    serviceRate: state.serviceRate,
  };
};

export default connect(mapStateTopProps, { setRedirectUrl, getUserRate })(
  withStyles(styles)(CommentsTool)
);
