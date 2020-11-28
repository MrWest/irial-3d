import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { imageResizedUrl } from "../../helpers/utils";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import styles from "./styles/promoItems";

const PromoItems = ({ classes, models }) =>
  models ? (
    <Grid container>
      <Grid item>
        <div
          className={classes.itemsPanel}
          style={{ background: "rgba(0,0,0,0.8)" }}
        >
          <Grid container alignItems="center">
            <Grid item>
              <div
                className={classes.downloadViewContainer}
                style={{ height: "auto", background: "transparent" }}
              >
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Grid item>
                    <ArrowUpward
                      style={{ fontSize: 24, fontWeight: "bolder" }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: "100%", width: "100%" }}
              >
                <Grid item>
                  <p className={classes.newProducts}>New Products</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.itemsPanel}>
          <Grid container alignItems="center">
            <Grid item>
              <div className={classes.downloadViewContainer}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Grid item>
                    <p className={classes.appDonwload}>
                      App <br /> Download{" "}
                    </p>
                    <ArrowDownward style={{ fontSize: 56 }} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs style={{ maxWidth: 792, overflow: "hidden" }}>
              <Grid container style={{ width: 99999 }}>
                {models.slice(2, 6).map((item) => (
                  <Grid key={item.id} item>
                    <div className={classes.itemViewContainer}>
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{ height: "100%", width: "100%" }}
                      >
                        <Grid item>
                          <div className={classes.itemView}>
                            <img
                              src={imageResizedUrl(item.images[0].url, 150)}
                              className={classes.itemImg}
                              alt={item.name}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  ) : (
    <div />
  );

export default withStyles(styles)(PromoItems);
