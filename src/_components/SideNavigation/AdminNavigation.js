
import React from "react";
import PropTypes from "prop-types";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./SideNavigation.css";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import {useHistory,} from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Face from "@material-ui/icons/Face";
import Info from "@material-ui/icons/Info";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    Menu,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ExplicitIcon from "@material-ui/icons/Explicit";
import {
    Assignment,
    DirectionsBoat,
    ChevronLeft,
    ChevronRight,
    AccountCircle,
    More,
    ListAlt,
    Contacts,
} from "@material-ui/icons";
import { DRAWER_WIDTH } from "../../_constants/meterial-ui";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    grow: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function AdminNavigation(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [listOpen, setListOpen] = React.useState(false);

    const handleClick = () => {
        setListOpen(!listOpen);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
        props.data(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        props.data(false);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        // AuthService.logout();
        history.push("/login");
    };

    const history = useHistory();

    const onClickListItem = (selected) => {
        history.push("/" + selected);
    };

    const handleSettings = () => {
        history.push("/admin/settings");
    };

    const menuId = "primary-search-account-menu";

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Titum's BizPark
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <More />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Typography variant="h6" noWrap>
                        {localStorage.getItem("LOCAL_STORAGE_USER")}
                    </Typography>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {/*{localStorage.getItem('isAuthenticated') && localStorage.getItem('userType') === "Admin"  ? (*/}
                    <>
                        <ListItem
                            button
                            key="/dashboard"
                            onClick={() => onClickListItem("dashboard")}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            key="customers"
                            onClick={() => onClickListItem("customers")}
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem
                            button
                            key="consignee-form"
                            onClick={() => onClickListItem("consignee-form")}
                        >
                            <ListItemIcon>
                                <ListAlt />
                            </ListItemIcon>
                            <ListItemText primary="Consignee Form" />
                        </ListItem>
                        <ListItem
                            button
                            key="expense-type"
                            onClick={() => onClickListItem("expense-type")}
                        >
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary="Expense Type" />
                        </ListItem>

                        <ListItem
                            button
                            key="vessel"
                            onClick={() => onClickListItem("vessel")}
                        >
                            <ListItemIcon>
                                <AllInclusiveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Vessel" />
                        </ListItem>

                        <ListItem
                            button
                            key="consignee"
                            onClick={() => onClickListItem("consignee")}
                        >
                            <ListItemIcon>
                                <BookmarkBorderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Consignee" />
                        </ListItem>

                        <ListItem
                            button
                            key="terms"
                            onClick={() => onClickListItem("terms")}
                        >
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="Terms" />
                        </ListItem>
                        {/* <ListItem button key='container' onClick={() => onClickListItem('container')}>
                            <ListItemIcon><AllInbox /></ListItemIcon>
                            <ListItemText primary="Container" />
                        </ListItem> */}
                        <ListItem
                            button
                            key="shipper"
                            onClick={() => onClickListItem("shipper")}
                        >
                            <ListItemIcon>
                                <DirectionsBoat />
                            </ListItemIcon>
                            <ListItemText primary="Shipper" />
                        </ListItem>
                        <ListItem
                            button
                            key="agent"
                            onClick={() => onClickListItem("agent")}
                        >
                            <ListItemIcon>
                                <Contacts />
                            </ListItemIcon>
                            <ListItemText primary="Agent" />
                        </ListItem>

                        <ListItem
                            button
                            key="reports"
                            onClick={() => onClickListItem("report")}
                        >
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reports" />
                        </ListItem>

                        <ListItem
                            button
                            key="search"
                            onClick={() => onClickListItem("search")}
                        >
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Petty Cash" />
                            {listOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={listOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Tooltip title="View Petty Cash">
                                    <ListItem
                                        button
                                        className={classes.nested}
                                        key="pettycash"
                                        onClick={() => onClickListItem("pettycash")}
                                    >
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="View Petty Cash" />
                                    </ListItem>
                                </Tooltip>
                                <Tooltip title="Petty Cash Expense">
                                    <ListItem
                                        button
                                        className={classes.nested}
                                        key="pettycash-expense"
                                        onClick={() => onClickListItem("pettycash-expense")}
                                    >
                                        <ListItemIcon>
                                            <ExplicitIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Petty Cash Expense" />
                                    </ListItem>
                                </Tooltip>
                                <Tooltip title="Petty Cash Type">
                                    <ListItem
                                        button
                                        className={classes.nested}
                                        key="pettycash-type"
                                        onClick={() => onClickListItem("pettycash-type")}
                                    >
                                        <ListItemIcon>
                                            <AccountBalanceWalletOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Petty Cash Type" />
                                    </ListItem>
                                </Tooltip>
                            </List>
                        </Collapse>

                        <Divider />

                        <ListItem
                            button
                            key="users"
                            onClick={() => onClickListItem("users")}
                        >
                            <ListItemIcon>
                                <Face />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>

                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Admin - privilege" />
                        </ListItem>

                        <Divider />
                        <ListItem button>
                            <ListItemText primary="About Titum" />
                        </ListItem>
                        <Divider />
                    </>
                    {/* ):(<></>)}*/}
                </List>
            </Drawer>
        </div>
    );
}

AdminNavigation.propTypes = {};

AdminNavigation.defaultProps = {};

export default AdminNavigation;
