import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useFormState from "../../hooks/useFormState";
import { addComment } from "../../redux/actions/commentActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 550,
  },
});
const AddComment: FC<any> = ({ id }) => {
  const classes = useStyles();
  const [text, setText, resetText] = useFormState("");
  const dispatch = useDispatch();

  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newComment = {
      text,
    };
    dispatch(addComment(id, newComment));
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
            label={`Add a comment `}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" size="small" color="primary">
            Add
          </Button>
        </CardActions>
      </ValidatorForm>
    </Card>
  );
};

export default AddComment;
