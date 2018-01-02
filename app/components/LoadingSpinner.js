import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { screen } from './../utils';

export default LoadingSpinner = ({ animating }) => (
	<View style={styles.container}>
		<ActivityIndicator
			animating={animating}
			color='#1e90ff'
			size='large'
		/>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
