import React, { Component } from 'react';
import { withStyles, Grid, TextField, Fab } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { addComment } from '../../actions';
import styles from './styles/Comments';

const Comment = ({ classes, author, text }) => (
  <div className={classes.Comment}>
    <h3 className={classes.CommentAuthor}>{author}</h3>
    <p className={classes.CommentText}>{text}</p>
  </div>
);

const crappyText =
  'In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew. Now hands are wanted here, and then again hands are wanted there. There is no staying in any one place;';

const someComments = [
  { key: 1, author: 'Bartoloměj Dohnal', text: crappyText },
  { key: 2, author: 'Daisy Murphy', text: crappyText },
  { key: 3, author: 'Tua Manuera', text: crappyText }
];

const CommentsList = ({ classes }) => (
  <div className={classes.CommentsList}>
    {someComments.map(c => (
      <Comment key={c.key} classes={classes} author={c.author} text={c.text} />
    ))}
    <div className={classes.LoadMoreContainer}>
      <Fab className={classes.LoadMore}>Load more comments</Fab>
    </div>
  </div>
);

class Comments extends Component {
  state = { comment: '' };

  handleTextChanged = ({ target: { value } }) => {
    this.setState({ comment: value });
  };

  handleOnSubmit = async () => {
    const { post } = this.props;
    const { comment } = this.state;
    const rslt = await addComment({ post: post.id, comment, date: new Date() });
    console.log(rslt);
  };

  render() {
    const { classes } = this.props;
    const { comment } = this.state;
    return (
      <div className={classes.Comments}>
        <div className={classes.CommentsStats}>
          <span className={classes.CommentsCounter}>Comments (43)</span>
        </div>
        <ValidatorForm onSubmit={this.handleOnSubmit}>
          <div className={classes.CommentTool}>
            <Grid container alignItems="baseline" spacing={4}>
              <Grid item xs>
                <TextValidator
                  id="standard-bare"
                  className={classes.CommentInput}
                  margin="normal"
                  placeholder="Write your comment"
                  inputProps={{ 'aria-label': 'bare' }}
                  value={comment}
                  onChange={this.handleTextChanged}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item>
                <div className={classes.CommentActions}>
                  <Fab type="submit" className={classes.CommentButton}>
                    Post
                  </Fab>
                </div>
              </Grid>
            </Grid>
          </div>
        </ValidatorForm>
        <CommentsList classes={classes} />
      </div>
    );
  }
}

export default withStyles(styles)(Comments);
