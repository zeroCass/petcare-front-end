import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'

import ModalLimit from '@components/ModalLimit'

export default (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <ModalLimit {...props} onClose={props.onClose} />
            <View style={styles.centerView}>
                    <ModalLimit {...props} onClose={props.onClose} />
                    <View style={styles.contentView}>
                        <View style={styles.container}>
                            {props.component}
                        </View>
                    </View>
                    <ModalLimit {...props} onClose={props.onClose} />
            </View>
            <ModalLimit {...props} onClose={props.onClose} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    centerView: {
        flex: 4,
        flexDirection: 'row',
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

})