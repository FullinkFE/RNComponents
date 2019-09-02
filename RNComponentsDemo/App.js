/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import AdModal from './components/AdModal'
import CheckBox from './components/CheckBox'
import ProtocolView from './components/ProtocolView'
import Empty from './components/Empty'
import Ruler from './components/Ruler'
import SelectView from './components/SelectView'
import Steps from './components/Steps';
import UpdateModal from './components/UpdateModal'


const {width, height} = Dimensions.get('window');

const adInfo = {
  picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567404793672&di=f8078a4a18bbf92b62d428959da8a7fc&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131206%2F12483715_143815299000_2.jpg'
}

const protocols = [
  {
    name:'用户注册协议',        //协议名称
    contentType:'htmlUrl',    //内容格式（pdfText,htmlText,htmlUrl）
    contentKey:'http://www.baidu.com',           //内容key（pdfText,htmlText是协议的type，htmlUrl是url地址）
  },
]

const occupationData = [
  '上班族',
  '学生',
  '自由职业',
  '无业'
]

const updateInfo = {
  updateType:2,
  downloadUrl:'http://www.baidu.com',
  remark:'bug修复',
}


export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.alterShowed = false;
    this.state = {
      adModalVisible:false,
      occupationInfo:null,
      rulerResult:0,
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* 尺子 */}
          <Text style={styles.header}>Ruler </Text>
          <View style={styles.content}>
            <Text style={{color:'red',alignSelf:'center',marginVertical:10}}>{this.state.rulerResult}</Text>
            <Ruler max={50000}
                   min={0}
                   step={5}
                   width={width*0.92}
                   onSelected={(result)=> this.setState({rulerResult:result})}
            />
          </View>

          {/* 选择器 */}
          <Text style={styles.header}>SelectView </Text>
          <View style={styles.content}>
            <SelectView
              title={'职业信息'}
              bottomBorderStyle={{marginLeft:0}}
              value={this.state.occupationInfo}
              pickerList={occupationData}
              pickerConfirmCallBack={ (data) => {
                this.setState({occupationInfo: data[0]})
              }}
            />
          </View>


          {/* 协议及协议勾选 */}
          <Text style={styles.header}>CheckBox && ProtocolView </Text>
          <View style={[styles.content,{alignItems:'center'}]}>
            <View  style={styles.protocolBack}>
              <CheckBox
                isChecked={this.state.checkBoxChecked}
                onChange={(checked) => this.setState({
                  checkBoxChecked:checked,
                })}
              />
              <ProtocolView
                frontText={'我已阅读并同意'}
                protocols={protocols}
              />
            </View>
          </View>

          {/* 广告弹窗 */}
          <Text style={styles.header}>AdModal</Text>
          <View style={[styles.content,{alignItems:'center'}]}>
            <TouchableOpacity onPress={()=>{
              if(!this.state.adModalVisible){
                this.setState({adModalVisible:true})
              }
            }}>
              <Text style={{color:'blue'}}>显示广告弹框</Text>
            </TouchableOpacity>
          </View>

          {/* 更新弹窗 */}
          <Text style={styles.header}>UpdateModal</Text>
          <View style={[styles.content,{alignItems:'center'}]}>
            <TouchableOpacity onPress={()=>{
              if(!this.alterShowed){
                this.refs.updateModal.show()
                this.alterShowed = true;
              }
            }}>
              <Text style={{color:'blue'}}>显示更新弹框</Text>
            </TouchableOpacity>
          </View>


          {/* 进件步骤 */}
          <Text style={styles.header}>Step </Text>
          <View style={[styles.content,{alignItems:'center'}]}>
            <Steps curStep={0}/>
            <Steps curStep={1}/>
          </View>


          {/* 列表为空时视图 */}
          <Text style={styles.header}>list is Empty </Text>
          <View style={[styles.content,{alignItems:'center'}]}>
            <Empty word={'暂无数据'} />
          </View>

        </ScrollView>

        <AdModal
          show={this.state.adModalVisible}
          adInfo={adInfo}
          touchCallBack={() => {
            this.setState({adModalVisible: false})
            //do something other
            console.log('ad touched')
          }}
          closeCallBack={() =>{
            this.setState({adModalVisible: false})
            //do something other
            console.log('ad touched')
          }}
        />
        <UpdateModal
          ref={'updateModal'}
          updateInfo={updateInfo}
          closeCallBack={() => {
            this.alterShowed = false
            console.log('close updateModal')
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    marginLeft:5,
    marginTop:20
  },
  content:{
    paddingVertical:10,
    justifyContent:'center',
    backgroundColor:'#fff',
  },
  protocolBack:{
    flexDirection:'row',
    alignItems:'flex-start',
    marginLeft:5,
    marginRight:30,
    marginVertical:40,
  }
});
