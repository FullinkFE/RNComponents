import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Modal, Linking,FlatList} from 'react-native'

/**
 * 更新弹框，传入参数updateInfo
 * closeCallBack
 */
export default class UpdateModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show:false,
        }
    }

    show(){
        this.setState({show:true})
    }

    hide(){
        this.setState({show:false})
        if(this.props.closeCallBack){
            this.props.closeCallBack();
        }
    }


    /**跳转到下载页
     *
     * @param url
     * @private
     */
    toUpdatePage(url) {
        this.hide()
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('无法打开该URI: ' + url);
            }
        })
    }


    render() {
        const {remark} = this.props.updateInfo
        let list = []
        if(remark && remark.length>0){
           list = remark.split("\\n");
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.show}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <View style={styles.topBg}>
                            <Text style={styles.title}>发现新版本</Text>
                        </View>
                        <View style={styles.midBg}>
                            <FlatList
                                renderItem={({item})=> <Text style={styles.text}>{item}</Text>}
                                data={list}
                                ListHeaderComponent={()=> <Text style={[styles.text,{marginBottom:5}]}>更新内容：</Text>}
                                ItemSeparatorComponent={()=>
                                    <View style={{height:5}}/>
                                }
                            />
                        </View>
                        {this.renderButtons()}
                    </View>
                </View>
            </Modal>)
    }

    renderButtons() {
        const {updateType,downloadUrl} = this.props.updateInfo
        let cancelButton = null;
        if (updateType == 2) {
            cancelButton = <TouchableOpacity style={styles.button}
                                             onPress={() => this.hide()}>
                                <Text style={styles.text}>下次再说</Text>
                            </TouchableOpacity>
        }

        let  updateButton = <TouchableOpacity style={styles.button}
                                             onPress={() => this.toUpdatePage(downloadUrl)}>
                                <Text style={styles.text}>马上更新</Text>
                            </TouchableOpacity>

        return <View style={styles.bottomBg}>
                    {cancelButton}
                    {updateButton}
               </View>
    }
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    container:{
        width:'80%',
        height:'45%',
        backgroundColor:'#fff',
        borderRadius:8,
    },
    topBg:{
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    midBg:{
        flex:1,
        paddingHorizontal:15,
    },
    bottomBg:{
        height:80,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%',
    },
    title:{
        fontSize:18,
        fontWeight:'500',
        color:'#333'
    },
    button:{
        flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#333',
        marginHorizontal:'5%'
    },
    text:{
        color:'#333333',
        fontSize:16,
    }
})