import React, { useEffect, useState, useRef } from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  alpha,
} from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 1rem 0",
      width: "27%",
    },
    text: {
      padding: theme.spacing(1, 2, 0),
    },
    paper: {
      overflow: "auto",
      height: "300px",
    },
    header: {
      display: "flex",
      backgroundColor: "white",
      margin: "1rem",
      alignItems: "center",
    },
    list: {
      marginBottom: theme.spacing(1),
      width: "85%",
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      backgroundColor: "#3f50b5",
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      "&& button": {
        display: "none",
      },
      marginRight: theme.spacing(4),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "23ch",
      },
    },
  })
);
interface Props {
  chat: {
    _id: string;
    participants: [];
  };
}
interface Message {
  _id: string;
  sender: string;
  chatId: string;
  createdAt: Date;
  message: string;
}

const ChatBox: React.FC<Props> = ({ chat }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const messages = useSelector((state: State) => state.conversation.messages);
  const currentUser = useSelector((state: State) => state.mainUser.user);
  const [message, setMessage] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      messages.some(
        (message: { chatId: string }) => message.chatId === chat._id
      )
    )
      return;

    dispatch(getMessages(chat._id));
  }, [dispatch]);

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
          {messages
            .filter(
              (message: { chatId: string }) => message.chatId === chat._id
            )
            .map((message: Message) => (
              <div key={message._id} ref={scrollRef}>
                <Message
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
            <form onSubmit={handelSubmit}>
              <InputBase
                multiline
                onChange={handelChange}
                onKeyDown={onEnterPress}
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
              <button ref={buttonRef} type="submit"></button>
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

export default ChatBox;
