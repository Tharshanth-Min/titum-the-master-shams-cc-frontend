import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import PublicRoute from './Public';
import PrivateRoute from './Private';
import AdminRoute from './Admin';
import ModeratorRoute from './Moderator';
import UserRoute from './User';
import SplitRoute from './Split';

const Routes = () => (
    <Switch>
        {routes.map((route) => {
            if (route.auth && route.fallback) {
                return <SplitRoute key={route.path} {...route} />;
            }
            if (route.auth) {
              return <PrivateRoute key={route.path} {...route} />;
            }
            // if (route.auth && route.role === "user") {
            //     return <UserRoute key={route.path} {...route}/>
            // }
            // if (route.auth && route.role === "moderator") {
            //     return <ModeratorRoute key={route.path} {...route}/>
            // }
            // if (route.auth && route.role === "admin-user" ) {
            //     return <AdminRoute key={route.path} {...route}/>
            // }
            return <PublicRoute key={route.path} {...route} />;
        })}
    </Switch>
);

export default Routes;
