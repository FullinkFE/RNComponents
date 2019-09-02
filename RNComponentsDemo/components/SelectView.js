import React, {Component} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native'
import Picker from 'react-native-picker'
import {Images} from './res';

/**
 * 行视图，左边显示标题（标题前可显示icon），右边显示值，点击行弹出picker来选择值
 *
 * icon                      标题左边icon
 * iconStyle                 标题左边icon样式
 * title                     标题
 * titleStyle                标题样式
 * value                     值
 * valueStyle                值样式
 * placeholder               value为空时显示的值，默认是'请选择'
 * hideBottomBorder          是否隐藏底部边框
 * bottomBorderStyle         底部边框样式
 * pickerList                弹出的picker可选列表
 * pickerConfirmCallBack     picker选中后的回调
 * onError                   pickerList为空时提示
 *
 */
export default class SelectView extends Component {

    componentWillUnmount(){
        Picker.hide();
    }

    render() {
        let iconView = this.props.icon?<Image style={[styles.defaultIcon,this.props.iconStyle]} source={this.props.icon}/>:null
        let valueView =  this.props.value?<Text style={[styles.defaultValue,this.props.valueStyle]}>{this.props.value}</Text> : <Text style={{color: '#C3CAD9',fontSize:15}}>{this.props.placeholder||'请选择'}</Text>
        let borderBottmStyle = this.props.hideBottomBorder?{}:[styles.defaultBottomBorder,this.props.bottomBorderStyle]

        return (
            <View style={[styles.defaultContainer,this.props.style]}>
                <TouchableOpacity style={{flex:1,justifyContent:'center',paddingHorizontal:15}}
                    onPress={this.onTouched}>
                    <View style={styles.content}>
                        <View style={styles.contentLeft}>
                            {iconView}
                            <Text style={[styles.defaultTitle,this.props.titleStyle]}>{this.props.title}</Text>
                        </View>
                        <View style={styles.contentRight}>
                            {valueView}
                            <Image style={{width:8,height:12,marginLeft: 10}}
                                   source={Images.common.ic_arrow}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={borderBottmStyle}/>
            </View>)
    }


    onTouched = () =>{
        if (this.props.pickerList && this.props.pickerList.length > 0) {
            this.onPicker()
        } else if(this.props.onError){
            this.props.onError('正在获取数据,请稍后再试！')
        }
    }

    onPicker() {
        Picker.hide()
        let initValue = this.props.value?[this.props.value]:[];
        let pickerConfirm = (data) => {
            if(this.props.pickerConfirmCallBack){
                this.props.pickerConfirmCallBack(data)
            }
        }
        Picker.init({
            pickerData: this.props.pickerList,
            selectedValue:initValue,
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: this.props.title,
            onPickerConfirm:pickerConfirm,
        });
        Picker.show();
    }
}

const styles = StyleSheet.create({
    defaultContainer: {
        height:50,
        backgroundColor:'#fff',
    },
    defaultTitle:{
        fontSize:15,
        color:Constants.themeTextColor,
        marginLeft:8
    },
    defaultValue:{
        fontSize:15,
        color:Constants.themeTextColor
    },
    defaultIcon:{
        width:16,
        height:16
    },
    defaultBottomBorder:{
        borderBottomWidth:1,
        borderColor:Constants.themeLineColor,
        height:1,
        marginLeft:15
    },
    content:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    contentLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    contentRight:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
    }

})