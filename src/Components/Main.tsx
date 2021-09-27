import React, { FC, useRef, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Home from "./Home";
import ViewUser from "./users/ViewUser";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/LayoutStyles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchUsers from "./users/SearchUsers";
import ChatBox from "./Chat/ChatBox";
import { State } from "../redux/reducers";
import { io, Socket } from "socket.io-client";
import { addSocketMessage } from "../redux/actions/chat/chatActions";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  classes: any;
  props?: any;
}

interface ISocket extends Socket {
  socket?: {};
}
const Main: FC<Props> = ({ classes, props }): JSX.Element => {
  const isToken = !!localStorage.getItem("token");
  const userLoading = useSelector((state: State) => state.auth.isLoading);
  const currentUser = useSelector((state: State) => state.mainUser.user);
  const chats = useSelector((state: State) => state.conversation.chat);
  const chatIsLoading = useSelector(
    (state: State) => state.conversation.isLoading
  );
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef<ISocket>();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current?.on("getMessage", (data) => {
      setArrivalMessage(data.message);
    });
  }, []);

  useEffect(() => {
    if (!arrivalMessage) return;
    dispatch(addSocketMessage(arrivalMessage));
  }, [dispatch, arrivalMessage]);

  useEffect(() => {
    if (!currentUser) return;

    socket.current?.emit("addUser", currentUser._id);
    socket.current?.on("getUsers", (users) => {});
  }, [currentUser]);

  const handleSocketMessage = (message: {}, reciverId: string) => {
    socket.current?.emit("sendMessage", {
      senderId: currentUser._id,
      reciverId,
      message,
    });
  };

  if (!isToken) {
    return <Redirect to="/login" />;
  }

  if (userLoading)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      <Navbar />

      <main className={classes.main}>
        <Switch>
          <Route exact path="/" render={() => <Home {...props} />} />
          <Route exact path="/s" render={() => <SearchUsers {...props} />} />
          <Route exact path="/:id" render={() => <ViewUser {...props} />} />
        </Switch>
      </main>
      {chatIsLoading ? (
        <div></div>
      ) : (
        <div className={classes.chatBox}>
          {chats.map(
            (chat: any): JSX.Element => (
              <ChatBox
                handleSocketMessage={handleSocketMessage}
                key={chat._id}
                chat={chat}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
export default withStyles(styles)(Main);
