import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from './../../components/HeaderTitle';
import PersonalItem from './../../components/PersonalItem';
import { PERSONALIZED, PLAYLIST_DETAIL } from './../../api';

export default class MusicShow extends Component {

    static navigationOptions = ( {navigate} ) => ({
        headerTitle: <HeaderTitle title={'歌单'} />,
        tabBarLabel: ({ focused, tintColor }) => (
            <Text style={{color: focused ? tintColor : '#666'}}>歌单</Text>
        ),
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="md-musical-notes" size={25} color={focused ? tintColor : '#666'} />
        ),
    })

    state = {
        dataList: [],
        refreshing: true,
    }

    componentDidMount() {
        try {
            (async () => {
                const datas = [];

                // 推荐音乐
                const res = await fetch(PERSONALIZED);
                const personalized = await res.json();

                datas.push({
                    title: '推荐音乐',
                    data: personalized.result.map((item) => ({...item, title: item.name, picUrl: item.picUrl + '?param=140y140'}))
                })

                this.setState({
                    dataList: [...datas],
                    refreshing: false
                });
            })()
        } catch (e) {
            alert(e)
        }
    }

    renderItem = ({item}) => {
        const { data, title } = item;
        return (
            <PersonalItem
                dataList={data}
                title={title}
                navigation={this.props.navigation}
            />
        )
    }

    render() {
        const { dataList, refreshing } = this.state;

        return (
            <FlatList
                data={dataList}
                refreshing={refreshing}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
})
