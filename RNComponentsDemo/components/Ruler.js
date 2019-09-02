import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'
import {Images} from './res';

const LINE_SPACE = 5; //每小步间的x距离
const Ruler_Hight = 14;
const Text_View_Width = 30;


/**
 * max   最大值
 * min   最小值
 * step  间格数，默认内包含10个小间隔
 * width 组件宽
 * onSelected  回调函数
 *
 * 默认选中初始值为最大、最小值的中值
 *
 * 使用方式
 *
 * 引入组件
 <Ruler max={50000}
        min={0}
        step={5}
        width={300}
        onSelected={this.selected}
 />

 * 回调接收选中值
 selected = (value) =>{
    this.setState({rulerValue:value})
  }

 */
export default class Ruler extends Component {

  constructor(props){
    super(props)
    this.miniStep = this.props.step*10;
    this.stepValue = (this.props.max-this.props.min)/this.props.step; //每大步代表的值
    this.miniStepValue = this.stepValue/10; //每小步代表的值
    this.hMargin = this.props.width/2;  //左右
    this.scrollWidth = this.miniStep*LINE_SPACE + this.hMargin*2; //可滚动区域
  }


  componentDidMount(){
    const defaultStep = (this.props.max-this.props.min)/2/this.miniStepValue
    setTimeout(() => {
      this.refs.rulerScroll.scrollTo({x:defaultStep*LINE_SPACE , y: 0, animated: false})
      this.props.onSelected((this.props.max-this.props.min)/2)
    }, 0);

  }



  render () {
    return (
      <View style={[styles.container,{width:this.props.width}]}>
        <ScrollView ref={'rulerScroll'}
                    horizontal={true}
                    bounces={false}
                    pinchGestureEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.scrolled}
                    onScrollEndDrag={this.scrolled}
        >
          <View style={{height:30,width:this.scrollWidth,justifyContent:'space-between'}} >
            <View style={[styles.numberContainer,{width:this.scrollWidth}]}>
              {this.renderNumbers()}
            </View>
            <View tyle={[styles.backGround,{width:this.scrollWidth}]}>
              <View style={[styles.placeholder,{left:0,width:this.hMargin}]}/>
              <View style={[styles.content,{left:this.hMargin,width:this.miniStep*LINE_SPACE}]} >
                {this.renderContent()}
              </View>
              <View style={[styles.placeholder,{left:this.hMargin+this.miniStep*LINE_SPACE,width:this.hMargin}]}/>
            </View>
          </View>
        </ScrollView>
        <Image style={[styles.vernier,{left:this.props.width/2-11/2}]}
               source={Images.common.ic_vernier}/>
      </View>)
  }


  renderNumbers(){
    let stepNumbers =[]
    for (let i=0;i<=this.props.step;i++) {
        stepNumbers.push(
          <View key={i} style={[styles.stepTextContainer,{left:this.hMargin+i*10*LINE_SPACE-Text_View_Width/2}]}>
            <Text style={styles.stepText}>{this.props.min+ i*this.stepValue}</Text>
        </View>)
    }
    return stepNumbers
  }

  renderContent(){
    const miniStep = this.props.step*10
    let stepViews =[]
    for (let i=0;i<=miniStep;i++) {
      if (i%10 == 0) {
        stepViews.push(this.renderStep(i))
      }else{
        stepViews.push(this.renderMiniStep(i))
      }
    }
    return stepViews
  }

  renderStep(i){
    return <View key={i} style={[styles.stepLine,{left:i*LINE_SPACE}]}/>
  }

  renderMiniStep(i){
     return <View key={i} style={[styles.miniStep,{left:i*LINE_SPACE}]}/>
  }


  scrolled = (e) => {
     const offsetX = e.nativeEvent.contentOffset.x
     console.log('x:'+offsetX)

     let step = parseInt(offsetX/LINE_SPACE)
     if( offsetX % LINE_SPACE >0 ){
       step+=1;
       this.refs.rulerScroll.scrollTo({x:step*LINE_SPACE , y: 0, animated: false})
     }
    console.log('step:'+step)
     this.props.onSelected(step * this.miniStepValue)
     console.log('value:'+step * this.miniStepValue)
  }



}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  },
  backGround: {
    flexDirection:'row',
    height:Ruler_Hight,
  },
  vernier:{
    height:22,
    width:11,
    position:'absolute',
    bottom:0,
  },
  placeholder:{
    borderBottomWidth:1,
    borderColor:'#ccc',
    height:Ruler_Hight,
    position:'absolute',
    bottom:0,
  },
  content:{
    borderBottomWidth:1,
    borderColor:'#ccc',
    height:Ruler_Hight,
    position:'absolute',
    bottom:0,
  },
  numberContainer:{
    height:10,
    marginBottom:4,
  },
  stepTextContainer:{
    width:Text_View_Width,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0
  },
  stepText:{
    fontSize:9,
    color:'#ccc',
  },
  stepLine:{
    width:1,
    height:14,
    backgroundColor:'#CCCCCC',
    position:'absolute',
    bottom:0,
  },
  miniStep:{
    width:1,
    height:8,
    backgroundColor:'#CCCCCC',
    position:'absolute',
    bottom:0,
  }

})