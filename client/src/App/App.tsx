import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navigation from './Components/Navigation/Navigation'
import PrivateRoute from './Components/PrivateRoute';
import Info from './Pages/Info/Info';
import Users from './Pages/Users/Users';
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

import styles from './App.module.css';
import './CommonCSS/normalize.css';
import './CommonCSS/themes.css';
import './CommonCSS/common.css';
function App() {
    let location = useLocation();
    let switchRef = React.createRef<HTMLDivElement>();
    return (
        <div className={styles.App}>
            <div className={styles.PageContainer}>
                <TransitionGroup component={null}>
                <CSSTransition
                    nodeRef={switchRef}
                    key={location.pathname}
                    classNames={{...styles}}
                    timeout={500}>
                    <div className={styles.animationContainer} ref={switchRef}>
                        <Switch location={location}>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <PrivateRoute exact path="/">
                                <Home />
                            </PrivateRoute>
                            <PrivateRoute path="/users">
                                <Users />
                            </PrivateRoute>
                            <Route path="/info">
                                <Info />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </CSSTransition>
                </TransitionGroup>
            </div>
            <Navigation />
        </div>
    );
}

export default App;
