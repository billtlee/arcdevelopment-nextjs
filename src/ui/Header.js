import { cloneElement, useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import Link from '../Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/styles';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
    zIndex: 1302,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  expansion: {
    '&.Mui-expanded': {
      margin: 0,
      borderBottom: 0,
    },
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.common.blue,
  },
  expansionDetails: {
    padding: 0,
    backgroundColor: theme.palette.primary.light,
  },
  expansionSummary: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    paddind: '0 24px 0 16px',
    backgroundColor: (props) =>
      props.value === 1 ? 'rgba(0, 0, 0, 0.14)' : 'inherit',
  },
}));

export default function Header(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [previousURL, setPreviousURL] = useState('');

  const path = typeof window !== 'undefined' ? window.location.pathname : null;

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const menuOptions = [
    {
      name: 'Custom Software Development',
      link: '/customSoftware',
      activeIndex: 1,
      selectedIndex: 0,
    },
    {
      name: 'iOS/Android App Development',
      link: '/mobileApps',
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: 'Website Development',
      link: '/websites',
      activeIndex: 1,
      selectedIndex: 2,
    },
  ];

  const routes = [
    { name: 'Home', link: '/', activeIndex: 0 },
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaPopup: anchorEl ? true : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
    { name: 'About Us', link: '/about', activeIndex: 3 },
    { name: 'Contact Us', link: '/contact', activeIndex: 4 },
  ];

  const activeIndex = () => {
    const found = routes.find(({ link }) => link === path);
    const menuFound = menuOptions.find(({ link }) => link === path);

    if (menuFound) {
      props.setValue(1);
      props.setSelectedIndex(menuFound.selectedIndex);
    } else if (found === undefined) {
      props.setValue(false);
    } else {
      props.setValue(found.activeIndex);
    }
  };

  useEffect(() => {
    if (previousURL !== window.location.pathname) {
      setPreviousURL(window.location.pathname);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    activeIndex();
  }, [path]);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const tabs = (
    <>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            href={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
            onMouseLeave={() => setOpenMenu(false)}
          />
        ))}
      </Tabs>
      <Button
        component={Link}
        href='/estimate'
        variant='contained'
        color='secondary'
        className={classes.button}
        onClick={() => {
          props.setValue(5);
          ReactGA.event({
            category: 'Estimate',
            action: 'Desktop Header Pressed',
          });
        }}
      >
        Free Estimate
      </Button>

      <Popper
        open={openMenu}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        placement='bottom-start'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'top-left',
            }}
          >
            <Paper classes={{ root: classes.menu }} elevation={0}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  onMouseOver={() => setOpenMenu(true)}
                  autoFocusItem={false}
                  id='simple-menu'
                  onMouseLeave={handleClose}
                  disablePadding
                  onKeyDown={handleListKeyDown}
                >
                  {menuOptions.map((option, i) => (
                    <MenuItem
                      key={`${option}${i}`}
                      component={Link}
                      href={option.link}
                      classes={{ root: classes.menuItem }}
                      onClick={(event) => {
                        handleMenuItemClick(event, i);
                        props.setValue(1);
                        handleClose();
                      }}
                      selected={
                        i === props.selectedIndex &&
                        props.value === 1 &&
                        window.location.pathname !== '/services'
                      }
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {/* <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      ></Menu> */}
    </>
  );

  const drawer = (
    <>
      <SwipableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) =>
            route.name === 'Services' ? (
              <Accordian
                key={route.name}
                elevation={0}
                classes={{ root: classes.expansion }}
              >
                <AccordianSummary
                  classes={{ root: classes.expansionSummary }}
                  expandIcon={<ExpandMoreIcon color='secondary' />}
                >
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    style={{ opacity: props.value === 1 ? 1 : null }}
                    onClick={() => {
                      setOpenDrawer(false);
                      props.setValue(route.activeIndex);
                    }}
                  >
                    <Link color='inherit' href={route.link}>
                      {route.name}
                    </Link>
                  </ListItemText>
                </AccordianSummary>
                <AccordianDetails classes={{ root: classes.expansionDetails }}>
                  <Grid container direction='column'>
                    {menuOptions.map((route) => (
                      <Grid item>
                        <ListItem
                          divider
                          key={`${route}${route.selectedIndex}`}
                          button
                          component={Link}
                          href={route.link}
                          selected={
                            props.selectedIndex === route.selectedIndex &&
                            props.value === 1 &&
                            window.location.path !== '/services'
                          }
                          classes={{ selected: classes.drawerItemSelected }}
                          onClick={() => {
                            setOpenDrawer(false);
                            props.setSelectedIndex(route.selectedIndex);
                          }}
                        >
                          <ListItemText
                            className={classes.drawerItem}
                            disableTypography
                          >
                            {route.name
                              .split(' ')
                              .filter((word) => word !== 'Development')
                              .join(' ')}
                            <br />
                            <span style={{ fontSize: '0.75rem' }}>
                              Development
                            </span>
                          </ListItemText>
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordianDetails>
              </Accordian>
            ) : (
              <ListItem
                divider
                key={`${route}${route.activeIndex}`}
                button
                component={Link}
                href={route.link}
                selected={props.value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  props.setValue(route.activeIndex);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            )
          )}
        </List>
        <List>
          <ListItem
            className={classes.drawerItemEstimate}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
              ReactGA.event({
                category: 'Estimate',
                action: 'Mobile Header Pressed',
              });
            }}
            divider
            button
            component={Link}
            href='/estimate'
            selected={props.value === 5}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              href='/'
              onClick={() => props.setValue(0)}
              className={classes.logoContainer}
            >
              <img
                alt='company logo'
                src='/assets/logo.svg'
                className={classes.logo}
              />
            </Button>
            <Hidden mdDown>{tabs}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
