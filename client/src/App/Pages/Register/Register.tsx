import React, { useState } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import type { ConnectedProps } from 'react-redux';
import type { Location } from 'history';

import { RootStore } from 'App/Store/Store';
import { UserAction, registerRequest } from 'App/Store/Actions';
import { isLoggedIn } from 'App/Store/Selectors';

import icon_user from 'App/Icons/user.svg';
import icon_pass from 'App/Icons/pass.svg';
import icon_next from 'App/Icons/next.svg';

import styles from './Register.module.css';

const mapStateToProps = (state: RootStore) => {
	return { isLoggedIn: isLoggedIn(state) };
}

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
	return bindActionCreators({ registerRequest }, dispatch)
}

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

function Register({registerRequest, isLoggedIn}: PropsFromRedux) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	let location: Location<{from?: string}> = useLocation();
	let { from = "/" } = location.state || {from: "/"};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	return (
		isLoggedIn ?
		<Redirect to={{pathname: from}} /> :
			<form className={styles.Register} onSubmit={handleSubmit}>
				<div className={styles.InputGroups}>
					<div className={styles.InputGroup}>
						<img src={icon_user} alt="username" className={styles.InputIcon}/>
						<input
						 placeholder="Email"
						 type="text"
						 className={styles.InputField}
						 value={username}
						 onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div className={styles.InputGroup}>
						<img src={icon_pass} alt="password" className={styles.InputIcon}/>
						<input
						 placeholder="Password"
						 type="password"
						 className={styles.InputField}
						 value={password}
						 onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className={styles.InputGroup}>
						<img src={icon_pass} alt="confirm password" className={styles.InputIcon}/>
						<input
						 placeholder="Confirm Password"
						 type="password"
						 className={styles.InputField}
						 value={confirmPassword}
						 onChange={(e) => setConfirmPassword(e.target.value)} />
					</div>
				</div>
				<input type="image" src={icon_next} alt="Register" className={styles.Button} />
			</form>
    )
}

export default connector(Register);