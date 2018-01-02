import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from './../../components/HeaderTitle';
import GridItem from './../../components/GridItem';
import LoadingSpinner from './../../components/LoadingSpinner';
import { PERSONALIZED, PLAYLIST_DETAIL } from './../../api';

export default class MusicList extends Component {

    static navigationOptions = ( {navigate} ) => ({
        headerTitle: <HeaderTitle title={'歌曲列表'} />,
        headerRight: (<TouchableWithoutFeedback><View></View></TouchableWithoutFeedback>)
    })

    state = {
        hotLists: [], // 热歌列表
    }

    componentDidMount() {
        try {
            (async () => {
                const { params } = this.props.navigation.state;
                const res = await fetch(PLAYLIST_DETAIL +　params.listId);
                const playListDetail = await res.json();
                const { playlist } = playListDetail;

                const lists = [];
                for (let i = 0; i < playlist.tracks.length; i++) {
                    lists.push({key: i + 1, data: playlist.tracks[i]});
                }

                this.setState({
                    hotLists: lists
                })
            })()
        } catch (e) {
            alert(e)
        }
    }

    renderItem = ({item}) => {
        const { key, data } = item;
        return (
            <GridItem
                index={key}
                item={data}
                navigation={this.props.navigation}
            />
        )
    }

    render() {
        const { hotLists } = this.state;

        if (hotLists.length === 0) return <LoadingSpinner animating={true} />
        
        return (
            <FlatList
                data={hotLists}
                renderItem={this.renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
})
