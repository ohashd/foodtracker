import React, { useState } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import type { ConnectedProps } from 'react-redux';
import type { Location } from 'history';

import { RootStore } from 'App/Store/Store';
import { UserAction, loginRequest } from 'App/Store/Actions';
import { isLoggedIn } from 'App/Store/Selectors';

import icon_user from 'App/Icons/user.svg';
import icon_pass from 'App/Icons/pass.svg';
import icon_next from 'App/Icons/next.svg';

import styles from './Login.module.css';

const mapStateToProps = (state: RootStore) => {
	return { isLoggedIn: isLoggedIn(state) };
}

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
	return bindActionCreators({ loginRequest }, dispatch)
}

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({loginRequest, isLoggedIn}: PropsFromRedux) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	let location: Location<{from?: string}> = useLocation();
	let { from = "/" } = location.state || {from: "/"};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	return (
		isLoggedIn ?
		<Redirect to={{pathname: from}} /> :
			<form className={styles.Login} onSubmit={handleSubmit}>
				<div className={styles.InputGroups}>
					<div className={styles.InputGroup}>
						<img src={icon_user} alt="username" className={styles.InputIcon}/>
						<input
						 name="username"
						 placeholder="Email"
						 type="text"
						 className={styles.InputField}
						 value={username}
						 onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div className={styles.InputGroup}>
						<img src={icon_pass} alt="password" className={styles.InputIcon}/>
						<input
						 name="password"
						 placeholder="Password"
						 type="password"
						 className={styles.InputField}
						 value={password}
						 onChange={(e) => setPassword(e.target.value)} />
					</div>
				</div>
				<input type="image" src={icon_next} alt="Login" className={styles.Button} />
			</form>
    )
}

export default connector(Login);