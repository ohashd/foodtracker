import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { RootStore } from 'App/Store/Store';
import { UserAction, loginRequest, logout } from 'App/Store/Actions';
import styles from './Users.module.css';

const mapStateToProps = (state: RootStore) => {
	const { user } = state
	return { user }
}

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
	return bindActionCreators({ loginRequest, logout }, dispatch)
}

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

function Users(props: PropsFromRedux) {

	let users: {}[] = [];

	let userListComponent = <div>No users found.</div>;
	if (users.length > 0) {

	}

	return(
		<div className={styles.Users}>
			<div className={styles.Header}>
				<h1>Users</h1>
				<button className={styles.Button} onClick={() => console.log("clicked")}>+</button>
			</div>
			<ul>{userListComponent}</ul>
		</div>
	);
}

export default connector(Users);