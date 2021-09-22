import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useFormState from "../../hooks/useFormState";
import { Alert } from "@material-ui/lab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "../../styles/RegisterStyles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { register } from "../../redux/actions/user/authActions";

interface Props {
  classes: any;
  register: Function;
  isAuthenticated: boolean | null;
  errorMsg: boolean | null;
  error: any;
}
const Register: FC<Props> = ({ classes, register, errorMsg }) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useFormState("");
  const [password, setPassword] = useFormState("");
  const [firstName, setFirstName] = useFormState("");
  const [lastName, setLastName] = useFormState("");
  const [value, setValue] = React.useState("female");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const user = {
      email,
      password,
      firstName,
      lastName,
      gender: value,
    };
    register(user);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        {!errorMsg ? null : (
          <Alert className={classes.alert} severity="error">
            {errorMsg}
          </Alert>
        )}
        <ValidatorForm className={classes.form} onSubmit={onSubmit}>
          <DialogContent>
            <TextValidator
              onChange={setFirstName}
              autoFocus
              validators={["required"]}
              errorMessages={["First Name is not valid!"]}
              margin="dense"
              label="firstName"
              name="firstName"
              value={firstName}
              type="text"
              fullWidth
            />
            <TextValidator
              data-test="first-name"
              margin="dense"
              name="lastName"
              label="Last Name"
              validators={["required"]}
              errorMessages={["Last Name is not valid!"]}
              onChange={setLastName}
              value={lastName}
              type="text"
              fullWidth
            />
            <TextValidator
              onChange={setEmail}
              margin="dense"
              name="email"
              label="Email Address"
              value={email}
              type="email"
              fullWidth
              validators={["required", "isEmail"]}
              errorMessages={["this field is required!", "Email is not valid!"]}
            />
            <TextValidator
              margin="dense"
              name="password"
              label="Password"
              onChange={setPassword}
              value={password}
              validators={["required"]}
              errorMessages={["Password is required!"]}
              type="password"
              fullWidth
            />
            <FormLabel className={classes.genderLabel} component="legend">
              Gender
            </FormLabel>
            <RadioGroup
              className={classes.genderContainer}
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Register
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state: any): any => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(
  withStyles(styles)(Register)
);
