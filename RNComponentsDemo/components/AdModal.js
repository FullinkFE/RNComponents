import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native'
import {Images} from './res';

/**
 * 传入参数
 * show，显示与否
 * adInfo，图片，点击url，等数据
 * touchCallBack，点击回调，回调中控制不显示
 * closeCallBack，关闭调，回调中控制不显示
 */


export default class AdModal extends Component {

    touched() {
        if(this.props.touchCallBack){
            this.props.touchCallBack();
        }
    }

    close(){
        if(this.props.closeCallBack){
            this.props.closeCallBack();
        }
    }

    render() {
        let picUrl = this.props.adInfo && this.props.adInfo['picUrl'];
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.show}>
                <View style={styles.modal}>
                    <View style={{backgroundColor:'transparent',
                    justifyContent:'center',alignItems:'center',marginTop: 100}}>
                        <TouchableOpacity onPress={() => {
                            if (picUrl && picUrl.length>0) {
                                this.touched()
                            }
                        }}>
                            <Image style={styles.image} resizeMode={'contain'}
                                   source={{uri: picUrl}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeBtn}
                                          onPress={() => this.close()}>
                            <Image style={styles.close}
                                   source={Images.common.ic_pop_k_close} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>)
    }
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    image:{
        width:321,
        height:400,
    },
    closeBtn:{
        width:40,
        height:40,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',

    },
    close:{
        width:40,
        height:40,
    }

})