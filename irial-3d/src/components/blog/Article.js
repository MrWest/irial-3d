import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styles from './styles/Article';
import ArticleInformation from './ArticleInformation';

const Article = ({ classes, post }) => (
  <section>
    <div className={classes.Article}>
      <Grid container justify="center">
        <main className={classes.center}>
          <div className={classes.sectionContainer}>
            <Grid container>
              <Grid item xs={12}>
                <article id="the-article" className="entry">
                  <div className="entry-content">
                    <div dangerouslySetInnerHTML={{ __html: post.rendered }} />
                  </div>
                </article>

                <ArticleInformation post={post} />
              </Grid>
            </Grid>
          </div>
        </main>
      </Grid>
    </div>
    <style jsx>{`
    @import url('//solutiontriangle.com/wp-includes/css/dist/block-library/style.css?ver=5.2.3');
    @import url('//solutiontriangle.com/wp-content/themes/enfold/css/grid.css?ver=2');
    
    
    
    
   article h2,h1 {
      font-family: Roboto;
      font-size: 36px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.06;
      letter-spacing: normal;
      color: #0f2440;
    }

    article p,
    li {
      font-family: Roboto;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.67;
      letter-spacing: normal;
      color: #8898a8;
    }
    article img {
      border-top-left-radius: 100px;
		  border-bottom-right-radius
    }

    footer > span {
       margin: 0px !important;
       padding: 0px !important;
       background-color: transparent !important;
     }

    footer > a {
      background-color: transparent !important;
     }

    `}</style>
  </section>
);
export default withStyles(styles)(Article);
