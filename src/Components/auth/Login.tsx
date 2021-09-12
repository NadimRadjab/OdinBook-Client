import React, { FC } from "react";
import { withStyles } from "@material-ui/styles";
import useFormState from "../../hooks/useFormState";
import styles from "../../styles/LoginStyles";
import { Button, Paper } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Register from "./Register";

interface Props {
  classes: any;
}
const Login: FC<Props> = ({ classes }) => {
  const [email, setEmail] = useFormState("");
  const [password, setPassword] = useFormState("");
  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
  };
  return (
    <div className={classes.root}>
      <Paper>
        <ValidatorForm onSubmit={onSubmit} noValidate className={classes.form}>
          <div className={classes.inputs}>
            <TextValidator
              fullWidth
              variant="outlined"
              onChange={setEmail}
              value={email}
              name="email"
              label="Email"
              type="email"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "Email is not valid!"]}
            />
            <TextValidator
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
              onChange={setPassword}
              validators={["required"]}
              errorMessages={["Password is required"]}
              type="password"
              value={password}
            />
          </div>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </div>
          <Register />
        </ValidatorForm>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Login);
