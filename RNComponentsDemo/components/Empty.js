/**
 * Created by Samoy on 2017/4/21.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';

/**
 * 传入参数
 * noMessageIcon，无消息图标
 * word，无消息文案
 */

import { PixelRatio } from 'react-native'
const px2dp = px=>PixelRatio.roundToNearestPixel(px);


class Empty extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{width: px2dp(428 / 2), height: px2dp(272 / 2), marginTop: px2dp(234 / 2)}}
                    source={this.props.noMessageIcon || require('./res/images/no_message.png')}
                />
                <Text style={{color:Constants.themeTextColor, fontSize: px2dp(28 / 2), marginTop: px2dp(52 / 2)}}>{this.props.word}</Text>
            </View>
        );
    }
}
export default Empty;
