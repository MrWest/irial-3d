import React from "react";
import { withStyles, Grid, Avatar } from "@material-ui/core";
import styles from "./styles/ArticleInformation";
import Comments from "./Comments";

const Socials = ({ classes, post }) => (
  <Grid item xs={12} sm={4} md={6}>
    <div className={classes.SocialMedia}>
      <div className={classes.TitleText}>Share to the world</div>
      <Grid container style={{ paddingTop: 20 }}>
        <Grid item xs={3}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=vinalestraveler.com/posts/${post.slug}`}
          >
            <img
              src="/static/images/public/circle-facebook.svg"
              alt="Facebook"
            />
          </a>
        </Grid>
        <Grid item xs={3}>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=https://vinalestraveler.com/posts/${post.slug}`}
          >
            <img
              src="/static/images/public/circle-linkedin.svg"
              alt="LinkedIn"
            />
          </a>
        </Grid>
        <Grid item xs={3}>
          <a
            href={`https://twitter.com/share?text=${post.title}&url=https://vinalestraveler.com/posts/${post.slug}&hashtags=vinalestraveler`}
          >
            <img src="/static/images/public/circle-twitter.svg" alt="Twitter" />
          </a>
        </Grid>
        {/* <Grid item xs={3}>
          <a href="mailto:author@mail.com">
            <img src="/static/images/blog/circle-mail.svg" alt="Mail" />
          </a>
        </Grid> */}
      </Grid>
    </div>
  </Grid>
);

const Author = ({ classes, author, post }) => (
  <div className={classes.AboutAuthor}>
    <Grid container>
      <Grid item xs={12} md={6}>
        <div className={classes.TitleText}>About the Author</div>
        {author && (
          <Grid container style={{ paddingTop: 20 }}>
            <Grid item xs={4} md={2}>
              <div className={classes.AvatarContainer}>
                <Avatar
                  alt={author.fullname}
                  src={author.avatar}
                  className={classes.BigAvatar}
                />
              </div>
            </Grid>
            <Grid item xs={8} md={10} style={{ paddingLeft: 8 }}>
              <div className={classes.AuthorName}>{author.fullname}</div>
              <div className={classes.AuthorTitle}>{author.title}</div>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Socials classes={classes} post={post} />
    </Grid>
  </div>
);

const ArticleInformation = ({ classes, post }) => (
  <div className={classes.ArticleInformation}>
    <div className={classes.ArticleStats}>
      {/* <img src="./images/blog/circleRocket.svg" alt="Likes" /> */}
      <span className={classes.LikesCounter}>32 people like this Article</span>
    </div>
    <Author classes={classes} author={post.author} post={post} />
    {/* <Comments post={post} /> */}
  </div>
);

export default withStyles(styles)(ArticleInformation);
