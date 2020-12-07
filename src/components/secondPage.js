import React from "react"

import PropTypes from "prop-types";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Toolbar,
  Typography
} from '@material-ui/core'

import {
  Info as InfoIcon,
  Inbox as InboxIcon,
  Toc as TocIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
} from '@material-ui/icons'

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

// import logo from './flame-1267.png';
import './second.css';

import allTable from './allBranch'

import Branch from './Branch'

const branches = [
  {
    branchName: 'ซีคอนบางแค',
    path: '/seacon-bangkae',
  },
  {
    branchName: 'เอสพลานาด',
    path: '/esplanade',
  },
  {
    branchName: 'อุดรธานี',
    path: '/udonthani',
  },
]

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#14274E",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 238,
    borderColor: "#F1F6F9",
    color: "#14274E"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));
function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <label className="lab">ยอดขายตามสาขา</label>
      <List>
        {
          branches.map((branch, index) => (
            <ListItem
              key={index}
              to={'/pages' + branch.path}
              button
              component={Link}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={branch.branchName} />
            </ListItem>
          ))
        }
      </List>
      <Divider />
        <label className="lab2" >ผลรวมยอดขาย</label>
          <List>
            <ListItem button component={Link} to={'/pages/all-branches'}>
              <ListItemIcon>
                <TocIcon />
              </ListItemIcon>
              <ListItemText primary="ผลรวมยอดขาย" />
            </ListItem>
          </List>

      <Divider />
        <label className="lab2" >อื่น ๆ</label>
          <List>
            <ListItem button component="a" href="https://app.powerbi.com/view?r=eyJrIjoiNjAzMWE3M2QtNGRlZC00MWU4LTg0MjktMjUyMTcwMmUyZTVhIiwidCI6IjliYzU4NWY5LWE4YjgtNDMxYy05MDEzLWVmYTdiMmI0MGNkZiIsImMiOjEwfQ%3D%3D">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
    </div>
  );

  // render
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            <span>Mana Outlet</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route
              exact path="/pages"
              render={() => (
                <div style={{ textAlign: 'center' }}>
                  <InfoIcon fontSize="large" style={{ marginBottom: '1rem' }}/>
                  <h4>กรุณาเลือกรายการ จากเมนูทางด้านซ้าย</h4>
                </div>
              )}
            />
            <Route path="/pages/all-branches" component={allTable} />
            {
              branches.map((branch, index) => (
                <Route
                  key={index}
                  path={'/pages' + branch.path}
                  render={() => (
                    <Branch branchName={branch.branchName}/>
                  )}
                />
              ))
            }

          </Switch>

        </main>
      </BrowserRouter>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;
