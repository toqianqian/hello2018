import React, { Component } from 'react';
import { StyleSheet, WebView, View, TouchableWithoutFeedback } from 'react-native';
import HeaderTitle from './../../components/HeaderTitle';
import LoadingSpinner from './../../components/LoadingSpinner';
import { fetchGet } from './../../service/httpRequest';

export default class ArticleContent extends Component {

    static navigationOptions = ( {navigate} ) => ({
        headerTitle: <HeaderTitle title={'文章内容'} />,
        headerRight: (<TouchableWithoutFeedback><View></View></TouchableWithoutFeedback>)
    })

    state = {
        html: null,
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        // 文章内容 api
		let url = `http://news-at.zhihu.com/api/4/news/${params.articleId}`;
        fetchGet(url).then(data => {
            console.log(this.getLastHtml(data.body, data.css[0], data.image));
            this.setState({
                html: this.getLastHtml(data.body, data.css[0], data.image),
            })
        })
    }

    getLastHtml = (body, style, headerImg) => {
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>react native WebView</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
            <link rel="stylesheet" type="text/css" href="${style}" />
            <style>
                .headline .img-place-holder {
                    width: 100%;
                    height: 280px;
                    background: url(${headerImg}) no-repeat;
                    background-size: 100% 100%;
                }
            </style>
          </head>
          <body>
            ${body}
          </body>
        </html>
        `
    }

    render() {
        const { html } = this.state;
        if (!html) return <LoadingSpinner animating={true} />

        return (
            <WebView
                style={{flex: 1}}
                source={{html: html, baseUrl: ''}}
            />
        )
    }
}

const styles = StyleSheet.create({
})
