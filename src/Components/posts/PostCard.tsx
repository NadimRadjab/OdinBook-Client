import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Comment from "./Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 550,
      margin: "1.5rem",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },

    avatar: {
      backgroundColor: red[500],
    },
  })
);
const PostCard: FC<any> = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(post);
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.author.firstName} ${post.author.lastName}`}
        subheader={new Date(post.date).toUTCString().substr(0, 17)}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body1" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Like">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography>Comment</Typography>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post.comments.map((c: {}) => (
            <Comment comment={c} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

// const mapStateToPorps = (state: any) => ({
//   allPosts: state.posts.post,
// });
// export default connect(mapStateToPorps, { getPosts })(withStyles(styles)(PostCard));
export default PostCard;
