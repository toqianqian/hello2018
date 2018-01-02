import React, { PureComponent } from 'react';
import Video from 'react-native-video';
import { MUSIC_URL } from './../../api';

export default class Player extends PureComponent {
    state = {
        musicUrl: ''
    };

    componentDidMount() {
        this.getMusicUrl(this.props.id);
    }

    getMusicUrl = id => {
        try {
            (async () => {
                const res = await fetch(MUSIC_URL + id);
                const json = await res.json();
                this.setState({
                    musicUrl: json.data[0].url
                })
            })();
        } catch(err) {
            alert(err);
        }
    };


    loadStart = () => {};
    onEnd = () => {};
    videoError = () => {};
    onBuffer = () => {};
    onTimedMetadata =() => {};

    render() {
        const { musicUrl } = this.state;

        return (
            musicUrl ? (
                <Video source={{uri: musicUrl}}   // Can be a URL or a local file.
                       ref={(ref) => {
                         this.player = ref
                       }}                                      // Store reference
                       rate={1.0}                              // 0 is paused, 1 is normal.
                       volume={1.0}                            // 0 is muted, 1 is normal.
                       muted={false}                           // Mutes the audio entirely.
                       paused={false}                          // Pauses playback entirely.
                       resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                       repeat={true}                           // Repeat forever.
                       playInBackground={false}                // Audio continues to play when app entering background.
                       playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                       onLoadStart={this.loadStart}            // Callback when video starts to load
                       onLoad={this.props.setDuration}         // Callback when video loads
                       onProgress={this.props.setTime}         // Callback every ~250ms with currentTime
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.videoError}               // Callback when video cannot be loaded
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                       style={{width: 0, height: 0}}
                 />
            ) : null
        )
    }
}
