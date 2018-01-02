import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class GridItem extends PureComponent {
    toPlayer = (item) => {
        const { navigate } = this.props.navigation;
        navigate('PlayerScene', { detail: item });
    }

    render() {
        const { index, item } = this.props;

        return (
            <View style={styles.gridItem}>
                <Text style={styles.itemIndex}>{index}</Text>
                <TouchableOpacity style={styles.touchBox} onPress={() => this.toPlayer(item)}>
                    <View>
                        <Text style={styles.songName}>{item.name}</Text>
                        <Text style={styles.author}>{item.ar[0].name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gridItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    itemIndex: {
        width: 30,
    },
    touchBox: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    songName: {
        fontSize: 16,
    },
    author: {
        fontSize: 12
    },
})
