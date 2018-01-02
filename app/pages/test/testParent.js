import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TestParent extends Component {

    render() {
        console.log('------parent render');
        this.testFunc();

        return (
            <View style={{flex: 1, height: 200, backgroundColor: '#ccc'}}>
                <Text>test parent View!</Text>
            </View>
        )
    }
}
