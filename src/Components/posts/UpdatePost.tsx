import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useFormState from "../../hooks/useFormState";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/actions/postActions";
const useStyles = makeStyles({
  root: {
    width: 550,
  },
});
const UpdatePost: FC<any> = ({ handleUpdate, text, id }) => {
  const classes = useStyles();
  const [updateText, setUpdateText, resetText] = useFormState(text);
  const dispatch = useDispatch();
  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newText = {
      text: updateText,
    };
    dispatch(updatePost(id, newText));
    handleUpdate();
    resetText();
  };
  return (
    <Card className={classes.root}>
      <ValidatorForm onSubmit={onSubmit}>
        <CardContent>
          <TextValidator
            fullWidth
            value={updateText}
            onChange={setUpdateText}
            name="text"
            type="text"
            validators={["required"]}
            errorMessages={["Text is required"]}
            label={`Whats's on your mind today?`}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" size="small" color="primary">
            Update
          </Button>
        </CardActions>
      </ValidatorForm>
    </Card>
  );
};

export default UpdatePost;
