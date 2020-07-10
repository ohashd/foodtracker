import React from 'react';
import { connect } from 'react-redux';
import type { ConnectedProps } from 'react-redux';

import { RootState } from 'App/Store/Store';
import styles from './Home.module.css';

const mapStateToProps = (state: RootState) => {
	const { username } = state.user
	return { username }
}

const connector = connect( mapStateToProps );
type PropsFromRedux = ConnectedProps<typeof connector>;

function Home(props: PropsFromRedux) {
	return(
		<div className={styles.Home}>
			<h1>{props.username}</h1>;
		</div>
	);
}

export default connector(Home);