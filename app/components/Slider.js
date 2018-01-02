import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { screen } from './../utils';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibale: false
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({visibale: true});
        // }, 0)
    }

    touchToContent = (id) => {
        const { navigate } = this.props.navigation;
        navigate('ArticleContent', { articleId: id})
    }

    render() {
        const { sliders } = this.props;

        // if (!this.state.visibale) return null;

        return (
            <Swiper
                style={styles.swiper}
                height={280}
                autoplay={true}>
                {
                    sliders.map((item, key) => (
                        <TouchableOpacity key={key} style={styles.slide} onPress={() => this.touchToContent(item.id)}>
                            <Image source={{uri: item.image}} style={styles.slideImage}/>
                        </TouchableOpacity>
                    ))
                }
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    swiper: {
        flex: 1,
        backgroundColor: '#999',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slideImage: {
        width: screen.width,
        height: 280,
    }
})
