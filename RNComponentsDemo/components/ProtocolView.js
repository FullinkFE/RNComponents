import React, {Component} from 'react'
import {
  Linking,
  StyleSheet,
  Text,
} from 'react-native'
import './GlobalConstants'
//import {Actions} from 'react-native-router-flux'

/**
 * 展示协议视图
 *
 * frontText,协议前显示的文案
 * frontStyle,协议前显示的文案样式
 * protocolStyle，协议显示样式
 * style,组件样式
 * protocols,协议数组,数组元素结构如下
   {
       name:'',          //协议名称
       contentType:'',    //内容格式（pdfText/htmlText/htmlUrl）
       contentKey:'',     //内容key（pdfText,htmlText是协议的type，htmlUrl是url地址）
       params:{},         // 查询参数
   }
 */

export default class ProtocolView extends Component {

    render() {
        let containerStyle =  this.props.style||styles.defaultContainer
        let frontStyle = this.props.frontStyle||styles.defaultFrontStyle
        return (
                <Text style={containerStyle}>
                    <Text style={frontStyle}>{this.props.frontText||''}</Text>
                    {this.props.protocols.map((item,index)=>this.renderProtocol(item,index))}
                </Text>
           )
    }

    renderProtocol(item,index){
        const protocolStyle = this.props.protocolStyle||styles.defaultProtocolStyle
        if(index == 0){
            return <Text key={item.name} style={protocolStyle} onPress={()=>this.loadProtocol(item)}>{`《${item.name}》`}</Text>
        } else{
            return <Text key={item.name}>
                <Text style={protocolStyle}>、</Text>
                <Text style={protocolStyle} onPress={()=>this.loadProtocol(item)}>{`《${item.name}》`}</Text>
            </Text>
        }
    }


    loadProtocol(item){
        const {name,contentType,contentKey,params} = item
        switch (contentType) {
            case 'pdfText':
                this.loadPdfText(name,contentKey,params)
                break
            case 'htmlText':
                this.loadHtmlText(name,contentKey,params)
                break
            case 'htmlUrl':
                this.loadHtmlUrl(name,contentKey)
                break
        }
    }

    loadPdfText(name,type,params){
        // Actions.push('RnPdfView', {
        //     title: name,
        //     type: type,
        //     ...params
        // })
    }

    loadHtmlText(name,type,params){
        // Actions.push('RnHtmlView',{
        //     title: name,
        //     type: type,
        //     ...params
        // })
    }

    loadHtmlUrl(name,url){
        // Actions.push('RnWebView', {
        //     title: name,
        //     URL: url,
        // });
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('无法打开该URI: ' + url);
        }
      })
    }
}
const styles = StyleSheet.create({
    defaultContainer: {
        flexWrap:'wrap',
        paddingRight:20,
        marginLeft:5,
    },
    defaultFrontStyle: {
        fontSize: 14,
        color: '#666',
        lineHeight:18
    },
    defaultProtocolStyle: {
        fontSize:13,
        color:Constants.themeColor

    },
})