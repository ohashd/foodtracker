import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { RouteProps } from 'react-router';
import type { ConnectedProps } from 'react-redux';

import { RootStore } from 'App/Store/Store';
import { isLoggedIn } from 'App/Store/Selectors';

const mapStateToProps = (state: RootStore) => {
    return {
        isLoggedIn: isLoggedIn(state)
    }
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteProps;

function PrivateRoute({ isLoggedIn, children, ...rest }: PropsFromRedux) {
    return (
        <Route
        {...rest}
        render = { ({ location }) =>
            isLoggedIn ?
            (children) :
            <Redirect
            to={{
                pathname: "/login",
                state: { from: location.pathname }
            }}
            />
        }
        />
    );
}

export default connector(PrivateRoute);