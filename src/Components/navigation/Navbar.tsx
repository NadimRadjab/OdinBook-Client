import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NavbarItems from "./NavbarItems";
import ChatList from "../Chat/ChatList";
import styles from "../../styles/navigation/NavbarStyles";

interface Props {
  classes: any;
}

const Navbar: React.FC<Props> = ({ classes }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <NavbarItems openDrawer={handleDrawerOpen} />

      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ChatList handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </div>
  );
};

export default withStyles(styles)(Navbar);
