import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useFormState from "../../hooks/useFormState";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import UploadImage from "./UploadImage";
const useStyles = makeStyles({
  root: {
    width: 550,
  },
});
const PostForm: FC<any> = ({ addPost }) => {
  const classes = useStyles();
  const [text, setText, resetText] = useFormState("");
  const [image, setImage] = useState({});

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

        <CardActions>
          <Button type="submit" size="small" color="primary">
            Add
          </Button>
          <UploadImage setImage={setImage} />
          {/* <Button size="small" color="primary">
            Learn More
          </Button> */}
        </CardActions>
      </ValidatorForm>
    </Card>
  );
};
const mapStateToProps = (state: any) => ({
  allPosts: state.posts.posts,
});

export default connect(mapStateToProps, { addPost })(PostForm);
