import React, { FC, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import useFormState from "../../hooks/useFormState";
import { Button, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Register from "./Register";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/user/authActions";
import { clearErros } from "../../redux/actions/errorActions";
import { connect } from "react-redux";
import styles from "../../styles/auth/LoginStyles";

interface Props {
  props: any;
  classes: any;
  login: Function;
  error: any;
  isAuthenticated: boolean | null;
}
const Login: FC<Props> = ({
  props,
  classes,
  login,
  error,
  isAuthenticated,
}) => {
  const [email, setEmail] = useFormState("");
  const [password, setPassword] = useFormState("");
  const [message, setMessage] = useState(null);
  const [msgRegister, setmsgRegister] = useState(null);
  const history = useHistory();

  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    login(user);
  };
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMessage(error.msg.info.message);
    } else if (error.id === "REGISTER_FAIL") {
      setmsgRegister(error.msg.message);
    } else {
      setMessage(null);
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, error, history]);
  return (
    <div className={classes.root}>
      <Paper>
        <ValidatorForm onSubmit={onSubmit} noValidate className={classes.form}>
          {!message ? null : (
            <Alert className={classes.alert} severity="error">
              {message}
            </Alert>
          )}
          <div className={classes.inputs}>
            <TextValidator
              fullWidth
              variant="outlined"
              onChange={setEmail}
              value={email}
              name="email"
              placeholder="Email"
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
              placeholder="Password"
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
          <Register {...props} errorMsg={msgRegister} />
        </ValidatorForm>
      </Paper>
    </div>
  );
};
const mapStateToProps = (state: any): any => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErros })(
  withStyles(styles)(Login)
);
