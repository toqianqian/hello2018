import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as TextTool from './TextTool';
import { color, screen } from './../utils';

const { H3, Small, Normal } = TextTool;

const width = 0.325;
const height = 0.325;

export default class PersonalItem extends PureComponent {

    toMusicList = (id) => {
        const { navigate } = this.props.navigation;
        navigate('MusicList', { listId: id });
    }

    render() {
        const { title, dataList } = this.props;

        const calculateCount = count => count > 10000 && ((count / 10000).toFixed(0) + '万') || count;

        return (
            <View style={[styles.containerList, {marginTop: title ? 10 : 0}]}>
                {
                    title && (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 2, height: 10, backgroundColor: color.theme, marginRight: 10}} />
                            <H3 title={`${title} >`} />
                        </View>
                    )
                }
                <View style={styles.gridContainer}>
                    {
                        dataList.map((item, key) => (
                            <TouchableOpacity key={key} style={styles.container} onPress={() => this.toMusicList(item.id)}>
                                <View style={styles.imgContainer}>
                                    <Image source={{uri: item.picUrl}} style={styles.img} />
                                    <View style={styles.tipText} >
                                        <Icon name="ios-volume-down-outline" color="#ffffff" size={16} />
                                        <Small title={calculateCount(item.playCount)} style={{color: '#ffffff'}} />
                                    </View>
                                </View>
                                <View style={styles.textContainer}>
                                    <Normal title={item.title} />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    container: {
        marginTop: 10,
        width: screen.width * width
    },
    imgContainer: {
        width: screen.width * width,
        height: screen.width * height,
        backgroundColor: 'transparent'
    },
    img: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    tipText: {
        position: 'absolute',
        top: 2,
        right: 5,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        width: screen.width * width,
        padding: 5,
    }
})
