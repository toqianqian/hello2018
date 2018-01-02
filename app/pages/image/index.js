import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from './../../components/HeaderTitle';

export default class ImageShow extends Component {

    static navigationOptions = ( {navigate} ) => ({
        headerTitle: <HeaderTitle title={'美图'}/>,
        tabBarLabel: ({ focused, tintColor }) => (
            <Text style={{color: focused ? tintColor : '#666'}}>美图</Text>
        ),
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="md-heart-outline" size={25} color={focused ? tintColor : '#666'} />
        ),
    })

    page = 1;

    state = {
        comments: [],
    }

    componentDidMount() {
        this.fetchBeautifulPic(1);
    }

    fetchBeautifulPic = (page = 1) => {
        const url = `http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=${page}`;

        try {
            (async () => {
                const res = await fetch(url);
                const picLists = await res.json();
                this.setState({
                    comments: this.state.comments.concat(picLists.comments),
                })
            })()
        } catch (e) {
            alert(e);
        }
    }

    keyExtractor = (item, key) => {
        return item.comment_ID
    }

    renderItem = ({item}) => {
        return (
            <Image source={{uri: item.pics[0]}} style={{width: 40, height: 40}}/>
        )
    }

    reachEndToLoad = () => {
        this.page = this.page + 1;
        this.fetchBeautifulPic(this.page);
    }

    scrollToOffset(...args) {
        this.scroll.scrollToOffset(...args);
    }

    render() {
        const { comments } = this.state;

        return (
            <FlatList
                ref={(c) => {this.scroll = c;}}
                data={comments}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                onEndReachedThreshold={1}
                onEndReached={this.reachEndToLoad}
            />
        )
    }
}

const styles = StyleSheet.create({
})
