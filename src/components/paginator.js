import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class Paginator extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      // total: -1
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  pages = (total, items) =>
    parseInt(total / items, 10) + (total % items > 0 ? 1 : 0);

  async handleNext() {
    const { items, next } = this.props;
    const { currentPage } = this.state;
    const nextPage = parseInt(currentPage, 10) + 1;
    const nextPageIndex = nextPage - 1;
    await next(parseInt(items, 10) * nextPageIndex);
    this.setState({ currentPage: nextPage });
  }

  handleTextChange({ target: { value } }) {
    const { items, total, previous } = this.props;
    const { currentPage } = this.state;
    const valueInt = parseInt(value, 10);
    if (
      total &&
      !isNaN(valueInt) &&
      parseInt(total / items, 10) + 1 >= valueInt
    ) {
      previous(parseInt(items, 10) * (valueInt - 1));
      this.setState({ currentPage: valueInt });
    } else {
      value = currentPage;
    }
  }

  handlePrevious() {
    const { items, previous } = this.props;
    const { currentPage } = this.state;
    const prevPage = parseInt(currentPage, 10) - 1;
    const prevPageIndex = prevPage - 1;
    previous(parseInt(items, 10) * prevPageIndex);
    this.setState({ currentPage: prevPage });
  }

  render() {
    const { classes, source, total, items } = this.props;
    const { currentPage } = this.state;

    return (
      <div
        style={{
          height: 65,
          width: 240,
          display: source && source.length === 0 ? "none" : "block",
        }}
      >
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={3}>
            <button
              type="button"
              onClick={this.handlePrevious}
              disabled={parseInt(currentPage, 10) === 1}
              className={classes.paginateButton}
              style={{
                color: parseInt(currentPage, 10) === 1 ? "#ccc" : "#3577D4",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              &#10094;
            </button>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0} alignItems="center">
              <Grid item>
                <input
                  type="text"
                  className={classes.TextField}
                  value={currentPage}
                  onChange={this.handleTextChange}
                />
              </Grid>
              <Grid item xs style={{ textAlign: "center" }}>
                of {this.pages(total, items)}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <button
              type="button"
              onClick={this.handleNext}
              disabled={this.pages(total, items) <= currentPage}
              className={classes.paginateButton}
              style={{
                color:
                  this.pages(total, items) <= currentPage ? "#ccc" : "#3577D4",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              &#10095;
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = () => ({
  paginateButton: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 43,
    border: "1px #ccc solid",
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 4,
    background: "transparent",
    cursor: "pointer",
  },
  TextField: {
    paddingLeft: 20,
    paddingTop: 3,
    height: 43,
    width: 52,
    fontSize: 12,
    border: "1px #ccc solid",
    background: "transparent",
    borderRadius: 0,
    borderLeft: 0,
    marginLeft: -12,
  },
});

Paginator.propTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  source: PropTypes.array.isRequired,
};

export default withStyles(styles)(Paginator);
