import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import {Images} from './res';

/**
 * 进件进度组件,总共2步
 * 传入参数
 * curStep，当前认证到哪一步，以0为起点
 */

const stepTexts = ['身份认证','信用认证']
//当前步骤图标
const curStepImage = Images.common.ic_step_current
const finishedStepImage = Images.common.ic_step_finished
const unfinishedStepImage = Images.common.ic_step_unfinished


export default class Steps extends Component {

    renderStep(index){
        let stepImage = ''
        let stepImageStyle = null
        if (index ==  this.props.curStep){
            stepImage = curStepImage;
            stepImageStyle = styles.stepImg
        }else if(index < this.props.curStep){
            stepImage = finishedStepImage
            stepImageStyle = styles.stepImg2
        }else {
            stepImage = unfinishedStepImage
            stepImageStyle = styles.stepImg2
        }
        return (
            <Image  style={stepImageStyle} source={stepImage}/>
        )
    }


    renderLine(curStep){
        let lineColor = curStep>0? Constants.themeColor:'#DCE1EA'
        return <View style={[styles.line,{backgroundColor:lineColor}]} />
    }



    renderText(index){
        let textStyle = ''
        if (index ==  this.props.curStep){
            textStyle = styles.processTxt
        }else if(index < this.props.curStep){
            textStyle = styles.processTxt
        }else {
            textStyle = styles.processNoTxt
        }
        return (
            <Text style={textStyle}>{stepTexts[index]}</Text>
        )
    }

    render() {
        let curStep = this.props.curStep || 0;
        return (
            <View style={{backgroundColor: 'transparent', height:112,alignItems:'center',justifyContent:'center'}}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                }}>
                    {this.renderStep(0)}
                    {this.renderLine(curStep)}
                    {this.renderStep(1)}
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:12,width:242
                }}>
                    {this.renderText(0)}
                    {this.renderText(1)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    line:{
        width:176,
        height:2,
    },
    stepImg: {
        width: 14,
        height:14
    },
    stepImg2: {
        width: 8,
        height:8
    },
    processTxt: {
        color: Constants.themeColor,
        fontSize:14,
    },
    processNoTxt: {
        color: '#C5CCD8',
        fontSize:14
    },
})