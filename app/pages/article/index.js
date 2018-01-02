import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from './../../components/Slider';
import HeaderTitle from './../../components/HeaderTitle';
import LoadingSpinner from './../../components/LoadingSpinner';
import { fetchGet } from './../../service/httpRequest';

export default class ArticleShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliders: [],  //  轮播数据源
            articleList: [],
            loading: false, // 加载数据
        }
    }

    static navigationOptions = () => ({
        headerTitle: <HeaderTitle title={'知乎'}/>,
        tabBarLabel: ({ focused, tintColor }) => (
            <Text style={{color: focused ? tintColor : '#666'}}>知乎</Text>
        ),
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="md-home" size={25} color={focused ? tintColor : '#666'} />
        ),
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
    })

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = () => {
        // 知乎日报首页 api
		let url = 'http://news-at.zhihu.com/api/4/news/latest';

        try {
            (async () => {
                this.setState({
                    loading: true,
                })

                const res = await fetch(url);
                const articleData = await res.json();
                // 优化：判断articleData是否改变（后续优化）
                this.setState({
                    loading: false,
                    sliders: articleData.top_stories,
                    articleList: articleData.stories
                })
            })()
        } catch (e) {
            alert(e);
        }
    }

    touchToContent = (id) => {
        const { navigate } = this.props.navigation;
        navigate('ArticleContent', { articleId: id})
    }

    renderArticleList = (list) => {
        return (
            <View>
                {
                    list.map((item, key) => (
                        <TouchableOpacity key={key} style={styles.touchList} onPress={() => this.touchToContent(item.id)}>
                            <View style={styles.slide}>
                                <Text style={styles.slideText}>{item.title}</Text>
                                <Image source={{uri: item.images[0]}} style={styles.uriImage}/>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    render() {
        const { sliders, articleList, loading } = this.state;
        const { navigation } = this.props;

        if (articleList.length === 0) return <LoadingSpinner animating={true} />

        return (
            <ScrollView
                style={styles.listView}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={this.fetchArticles}
                        colors={['#1e90ff']}
                    />
                }
            >
                <Slider
                    sliders={sliders}
                    navigation={navigation}
                />
                <View style={styles.articles}>
                    { this.renderArticleList(articleList) }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#fff',
    },
    articles: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
    },
    touchList: {
        marginBottom: 20,
        paddingBottom: 5,
        borderBottomWidth: .5,
        borderBottomColor: '#ccc',
    },
    slide: {
        flex: 1,
        flexDirection: 'row',
		backgroundColor: 'transparent',
	},
    slideText: {
        flex: 1,
    },
    uriImage: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
