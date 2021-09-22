import React, { FC, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, TextField, DialogTitle } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDispatch } from "react-redux";
import styles from "../../styles/UpdatePhotoStyles";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
const UploadImage: FC<any> = ({ classes, setImage }) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.mainUser.user);

  //   useEffect(() => {
  //     setImg(user.image[0].profile);
  //   }, []);
  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    setImage(data);
  };
  const handleChange = (e: React.ChangeEvent<any>) => {
    setFile(e.target.files[0]);
    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", () => {
      setImg(reader.result);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Upload Image
      </Button>
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle>
          <Typography variant="h6">Upload Image</Typography>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={classes.items} dividers>
            <img src={img} alt="edit-photo-pic" />

            <Button startIcon={<CloudUploadIcon />} color="primary">
              <label htmlFor="image">Upload Photo</label>
            </Button>
            <TextField
              name="file"
              onChange={handleChange}
              id="image"
              type="file"
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              autoFocus
              onClick={handleClose}
              color="primary"
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(UploadImage);
