import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';

import { RootStore } from 'App/Store/Store';
import { UserAction, loginRequest, logout } from 'App/Store/Actions';
import styles from './Home.module.css';

const mapStateToProps = (state: RootStore) => {
	const { user } = state
	return { user }
}

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
	return bindActionCreators({ loginRequest, logout }, dispatch)
}

const connector = connect( mapStateToProps, mapDispatchToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

function Home(props: PropsFromRedux) {

	let header;
	if (props.user !== "") {
		header = <h1 onClick={props.logout}>{props.user}</h1>;
	} else {
		 header = <h1 onClick={() => props.loginRequest()}>Home</h1>;
	}

	return(
		<div className={styles.Home}>
			{header}
		</div>
	);
}

export default connector(Home);