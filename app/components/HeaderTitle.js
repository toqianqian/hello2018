import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { screen } from './../utils';

export default HeaderTitle = ({title}) => {
    return (
        <View style={styles.navTitle}>
            <Text style={styles.navText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navTitle: {
        width: screen.width * 0.5,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    navText: {
        fontSize: 18,
        color: '#fff',
    },
})
