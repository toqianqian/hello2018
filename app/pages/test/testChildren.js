import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TestParent from './testParent';

export default class TestChildren extends TestParent {

    componentDidMount() {
        console.log('---------children-----');
    }

    testFunc = () => {
        console.log('-------children func');
    }

    // render() {
    //     this.testParentFunc()
    //
    //     return (
    //         <View>
    //             <Text>test children View!</Text>
    //         </View>
    //     )
    // }
}
