import React, { FC, useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import styles from "../../styles/SideBarStyles";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import UpdatePhoto from "./UpdatePhoto";

interface Props {
  classes: any;
}

const Sidebar: FC<Props> = ({ classes }) => {
  const user = useSelector((state: State) => state.auth.user);
  const [img, setImg] = useState("");

  useEffect(() => {
    if (!user) return;
    setImg(user.image.url);
  }, []);
  const setProfilePic = (image: string) => {
    setImg(image);
  };
  const history = useHistory();
  const handleLocation = (id: string) => {
    history.push(`/${id}`);
  };

  if (!user) return <div></div>;
  return (
    <div className={classes.root}>
      <Container className={classes.imgContainer} maxWidth="sm">
        <Typography variant="h5" color="primary">
          {user.fullName}
        </Typography>
        <img className={classes.profilePic} src={img} alt="profile-pic" />
        <UpdatePhoto setImage={setProfilePic} />
      </Container>
      <Divider />
      <Container className={classes.friendList} maxWidth="sm">
        {user.friendList.map((friend: { fullName: string; _id: string }) => (
          <div
            onClick={handleLocation.bind(this, friend._id)}
            key={friend._id}
            className={classes.friendsImg}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <Typography>{friend.fullName}</Typography>
          </div>
        ))}
      </Container>
      <Divider />
      <div className={classes.viewFriends}>
        <Link to="/">View friends</Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
