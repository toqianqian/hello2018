import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ArticleShow from './app/pages/article';
import ArticleContent from './app/pages/article/content';
import ImageShow from './app/pages/image';
import MusicShow from './app/pages/music';
import PlayerScene from './app/pages/music/playerScene';
import MusicList from './app/pages/music/musicList';

const Tab = TabNavigator(
    {
        Article: { screen: ArticleShow },
        Image: { screen: ImageShow },
        Music: { screen: MusicShow },
    }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#1e90ff',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {
                height: 0,  // 去掉Android中tab选中时底部有一条线
            },
            lazy: true,   
        }
    }
)

export default App = StackNavigator(
    {
        Tab: { screen: Tab },
        ArticleContent: { screen: ArticleContent },
        MusicList: { screen: MusicList },
        PlayerScene: { screen: PlayerScene },
    }, {
        headerMode: 'float',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#1e90ff',
                height: 45,
            },
        }
    }
);
