import React,{FC} from 'react'
import {withStyles} from '@material-ui/styles'
import {Link} from  "react-router-dom";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';


import styles from '../../styles/SideBarStyles'
interface Props {
    classes:any
}

const Sidebar:FC<Props>=({classes}) =>{
    return (
        <div className={classes.root} >
          <Container  className={classes.imgContainer} maxWidth="sm">
             <img className={classes.profilePic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
             <Link  to='/'>Edit Photo</Link>
          </Container>
          <Divider />
          <Container  className={classes.friendList} maxWidth="sm">
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
          <img className={classes.friendPic} src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="" />
         
          </Container>
          <Divider />
          <div className={classes.viewFriends}>
          <Link  to='/'>View friends</Link>

          </div>
         
        </div>
    )
}

export default withStyles(styles)(Sidebar)
