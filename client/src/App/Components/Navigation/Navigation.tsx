import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';

import styles from './Navigation.module.css';
import home from 'App/Icons/home.svg';
import info from 'App/Icons/info.svg';
import padlock from 'App/Icons/padlock.svg';
import register from 'App/Icons/register.svg';

import { RootState } from 'App/Store/Store';
import { isLoggedIn } from 'App/Store/User/Selectors';

const mapStateToProps = (state: RootState) => {
	return {
		isLoggedIn: isLoggedIn(state)
	}
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Navigation({isLoggedIn}: PropsFromRedux) {

	let links;
	if ( isLoggedIn ) {
		links = (<>
			<NavLink to="/" activeClassName={styles.active}><img src={home} alt="home" /></NavLink>
		</>);
	} else {
		links = (<>
			<NavLink to="/login" activeClassName={styles.active}><img src={padlock} alt="login" /></NavLink>
			<NavLink to="/register" activeClassName={styles.active}><img src={register} alt="register" /></NavLink>
			<NavLink to="/info" activeClassName={styles.active}><img src={info} alt="info"/></NavLink>
		</>);
	}
	
	return (
		<div className={styles.Navigation}>
			{links}
		</div>
	)
}

export default connector(Navigation);
