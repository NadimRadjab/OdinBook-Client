import React, { useEffect, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";
import { Divider } from "@material-ui/core";
import {
  getMessages,
  closeChat,
  sendMessage,
} from "../../redux/actions/chat/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import Message from "./Message";
import { uuid } from "uuidv4";
import styles from "../../styles/chat/ChatBoxStyles";
import ForwardIcon from "@material-ui/icons/Forward";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  chat: {
    _id: string;
    participants: [];
  };
  handleSocketMessage: (
    message: { message: string; chatId: string; sender: string },
    reciverId: string
  ) => void;
  classes: any;
}
interface IMessage {
  _id: string;
  sender: string;
  chatId: string;
  createdAt: Date;
  message: string;
}

const ChatBox: React.FC<Props> = ({ classes, chat, handleSocketMessage }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: State) => state.conversation.messages);
  const currentUser = useSelector((state: State) => state.mainUser.user);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(getMessages(chat._id));
  }, [dispatch, chat._id]);

  const isUser: any[] = chat.participants.filter(
    (p: { _id: string }) => p._id !== currentUser._id
  );
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.code === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  const handelSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newObj = {
      message,
      chatId: chat._id,
      userId: isUser[0]._id,
    };
    dispatch(sendMessage(newObj));
    let socketObj = {
      _id: uuid(),
      message,
      sender: currentUser._id,
      chatId: chat._id,
      createdAt: Date.now(),
    };

    handleSocketMessage(socketObj, isUser[0]._id);

    setMessage("");
  };
  const handleCloseChat = () => {
    dispatch(closeChat(chat._id));
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) return <div></div>;
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <div className={classes.header}>
          <Avatar
            src={!isUser ? null : isUser[0].image[0].url}
            alt="Profile Picture"
          />
          <Typography className={classes.text} variant="h6" gutterBottom>
            {isUser[0].fullName}
          </Typography>
        </div>
        <Divider />
        <List className={classes.list}>
          {!messages.length
            ? null
            : messages
                .filter(
                  (message: { chatId: string }) => message.chatId === chat._id
                )
                .map((message: IMessage) => (
                  <div ref={scrollRef} key={message._id}>
                    <Message
                      userIcon={isUser[0].image[0].url}
                      currentUser={currentUser._id}
                      key={message._id}
                      message={message}
                    />
                  </div>
                ))}
        </List>
      </Paper>
      <div color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <form className={classes.forum} onSubmit={handelSubmit}>
              <InputBase
                multiline
                onChange={handelChange}
                onKeyDown={onEnterPress}
                required
                placeholder="Message..."
                value={message}
                name="message"
                type="text"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "Message" }}
              />
              <IconButton ref={buttonRef} type="submit">
                <ForwardIcon />
              </IconButton>
            </form>
          </div>
          <IconButton
            onClick={handleCloseChat}
            edge="start"
            color="inherit"
            aria-label="close drawer"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </div>
    </div>
  );
};

export default withStyles(styles)(ChatBox);
