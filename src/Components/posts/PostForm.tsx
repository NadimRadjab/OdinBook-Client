import React, { FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useFormState from "../../hooks/useFormState";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/posts/postActions";
import UploadImage from "./UploadImage";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  addBtn: {
    width: 80,
  },
}));
const PostForm: FC<any> = ({ addPost }) => {
  const classes = useStyles();
  const [text, setText, resetText] = useFormState("");

  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newText = {
      text,
    };

    addPost(newText);
    resetText();
  };
  return (
    <Card className={classes.root}>
      <ValidatorForm onSubmit={onSubmit}>
        <CardContent>
          <TextValidator
            fullWidth
            value={text}
            onChange={setText}
            name="text"
            type="text"
            validators={["required"]}
            errorMessages={["Text is required"]}
            label={`Whats's on your mind today?`}
          />
        </CardContent>

        <CardActions className={classes.addBtn}>
          <Button type="submit" size="small" color="primary">
            Add Text
          </Button>
        </CardActions>
      </ValidatorForm>
      <UploadImage />
    </Card>
  );
};
const mapStateToProps = (state: any) => ({
  allPosts: state.posts.posts,
});

export default connect(mapStateToProps, { addPost })(PostForm);
