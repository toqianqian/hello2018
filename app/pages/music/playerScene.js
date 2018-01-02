import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import Player from './player';
import * as TextTool from './../../components/TextTool';
import { screen, color, tools } from './../../utils';
import { NEEDLEIP6, DISCIP6, SLIDERBTN } from './../../utils/staticImages';

const { Normal, Tip, H3 } = TextTool;

export default class PlayerScene extends Component {

    static navigationOptions = ( {navigate} ) => ({
        header: <View style={{width: 0, height: 0}} />,
    })

    state = {
        rotateValue: new Animated.Value(0),
        duration: 1,                              // 歌曲时长(秒为单位)
        playTime: '00:00',                        // 歌曲时长
        currentTime: '00:00',                     // 当前播放的时间
        sliderProgress: 0,                        // 进度条比例
    }

    componentDidMount() {
        this.circling();
    }

    circling = () => {
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear
        }).start(() => this.circling());
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    // 播放器
    setDuration = (obj) => {
        this.setState({
            playTime: tools.transTime(obj.duration),
            duration: obj.duration,
        })
    };

    setTime = (time) => {
        this.setState({
            currentTime: tools.transTime(time.currentTime),
            sliderProgress: time.currentTime / this.state.duration,
        })
    };

    render() {
        const { params } = this.props.navigation.state;
        const { currentTime, playTime, sliderProgress } = this.state;

        return (
            <View style={styles.container}>
                <Image style={styles.bgImg} blurRadius={8} source={{uri: params.detail.al && params.detail.al.picUrl + '?param=200y200'}} />
                <View style={{zIndex: 5, flex: 1}}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Icon name="ios-arrow-back-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Normal color={color.white}>{params.detail.name}</Normal>
                            <Tip color={color.white} style={{fontSize: 9}}>{params.detail.ar[0].name}</Tip>
                        </View>
                        <TouchableOpacity>
                            <Icon name="ios-redo-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cdContainer}>
                        <View style={styles.needle}>
                            <Image source={NEEDLEIP6} style={{width: 100, height: 140}}/>
                        </View>
                        <ImageBackground source={DISCIP6} style={styles.disc}>
                            <Animated.Image
                                source={{uri: params.detail.al && params.detail.al.picUrl + '?param=200y200'}}
                                style={[{width: screen.width - 152, height: screen.width - 152, borderRadius: (screen.width - 152) / 2}, {transform: [
                                    {rotate: this.state.rotateValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                ]}]}
                            />
                        </ImageBackground>
                    </View>
                    <View style={styles.topBtn}>
                        <TouchableOpacity>
                            <Icon name="ios-heart-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                        <Icon name="ios-cloud-download-outline" size={25} color={color.white} />
                        <Icon name="ios-chatbubbles-outline" size={25} color={color.white} />
                        <TouchableOpacity>
                            <Icon name="md-more" size={25} color={color.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sliderBtn}>
                        <Tip style={{width: 35}} color={color.white}>{currentTime}</Tip>
                        <Slider
                            maximumTrackTintColor={color.white}
                            minimumTrackTintColor={color.theme}
                            thumbStyle={styles.thumb}
                            trackStyle={{height: 2}}
                            style={{width: screen.width - 100}}
                            value={sliderProgress}
                        />
                        <Tip style={{width: 35}} color="#ffffff">{playTime}</Tip>
                    </View>
                </View>
                <Player
                    id={params.detail.id}
                    setTime={this.setTime}
                    setDuration={this.setDuration}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    bgImg: {
        width: screen.width,
        height: screen.height,
        position: 'absolute',
        zIndex: 1,
        opacity: 0.8,
    },
    headerContainer: {
        height: 50,
        width: screen.width,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: screen.onePixel,
        borderColor: 'rgba(245, 245, 245, 0.21)',
    },
    cdContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    needle: {
        position: 'absolute',
        top: 0,
        left: 34,
        width: screen.width,
        alignItems: 'center',
        zIndex: 18,
    },
    disc: {
        width: screen.width - 40,
        height: screen.width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    topBtn: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    sliderBtn: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: color.theme,
        borderColor: color.white,
        borderWidth: 7,
        borderRadius: 10,
    },
})
