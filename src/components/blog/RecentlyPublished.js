import React, { useState } from "react";
import {
  withStyles,
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
// import { useTheme } from '@material-ui/styles';
import style from "./styles/RecentlyPublished";
import PostCard from "./PostCard";
import { managePosts, theme } from "../../helpers/utils";

const TabPanel = ({ children, value, index }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
  >
    <Box p={3}>{children}</Box>
  </Typography>
);

const RecentlyPublished = ({ classes, posts, categories }) => {
  const [value, setValue] = useState(0);
  // const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const filteredCategories = categories.filter((category) =>
    posts.find((post) => post.category === category)
  );
  return (
    <Grid container justify="center" className={classes.containerPartnerWU}>
      <main>
        <div className={classes.sectionContainer}>
          <Grid container justify="center">
            <Grid item>
              <div className={classes.center}>
                <p variant="p" align="left" className={classes.Title}>
                  Recently published
                </p>
                <Tabs
                  value={value}
                  classes={{ indicator: classes.indicator }}
                  onChange={handleChange}
                  // indicatorColor="primary"
                  // textColor="primary"
                >
                  {filteredCategories.map((category) => (
                    <Tab
                      key={category}
                      label={
                        <span className={classes.TabLabel}>{category}</span>
                      }
                    />
                  ))}
                </Tabs>
              </div>
            </Grid>
          </Grid>
          <SwipeableViews
            axis={"x-reverse"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ width: "99vw" }}
          >
            {filteredCategories.map((category, index) => (
              <TabPanel
                key={category}
                value={value}
                index={index}
                dir={theme.direction}
              >
                <Grid container justify="center">
                  <Grid item>
                    <div className={classes.center}>
                      <div className={classes.tabsWrapper}>
                        <Grid container spacing={6}>
                          {managePosts(
                            posts.filter((pst) => pst.category === category)
                          ).map((post) => (
                            <Grid key={post.id} item xs={12} md={4}>
                              <PostCard post={post} category={category} />
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </SwipeableViews>
        </div>
      </main>
    </Grid>
  );
};

export default withStyles(style)(RecentlyPublished);
