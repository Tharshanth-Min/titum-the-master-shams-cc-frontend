import SignIn from "../_components/SignIn/SignIn";
import Dashboard from "../_components/Dashboard/Dashboard";
import Home from "../_components/Home/Home";
import NoMatch from '../_components/NoMatch/NoMatch';

const admin = "admin";
const moderator = "moderator";
const user = "user";

const routes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Dashboard,
        fallback: Home,
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: SignIn,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },
];

export default routes;
