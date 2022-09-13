import React, { useState } from 'react'
import { TouchableOpacity, View, StyleSheet, PermissionsAndroid, Image } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import ModalComp from '@components/ModalComp'

const RenderChoice = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                <Button mode='contained' onPress={() => {
                    props.camera()
                    props.onClose()
                }} >Abrir Camera</Button>
                <Button mode='contained' onPress={() => {
                    props.gallery()
                    props.onClose()
                }}>Abrir Galeria</Button>
            </View>
        </View>
        
    )
}


export default (props) => {
    const [imageData, setImageData] = useState(props.image)
    const [showModal, setShowModal] = useState(false)

    const styles = StyleSheet.create({
        container: {
            height: props.size,
            width: props.size,
            borderRadius: props.size / 2,
        },
        img: {
            height: props.size, 
            width: props.size, 
            borderRadius: props.size / 2,
        },
    })

    const cameraPicker = async () => {
        const options = {
            mediaType: 'photo',
            saveToPhotos: true,
            includeBase64: true,
        }
        // try {
        //     const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        //         title: "App Camera Permission",
        //         message:"App needs access to your camera ",
        //         buttonNeutral: "Ask Me Later",
        //         buttonNegative: "Cancel",
        //         buttonPositive: "OK"
        //     })
        //     if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        //         console.warn('Persmission given')
        //         const result = await launchCamera(options)
        //         if (!result.didCancel && !result.errorCode && !result.errorMessage)
        //             setImageData(result.assets)
    
        //     }
    
            
    
    
        // } catch(e) {
        //     console.warn(e)
        // }
        const result = await launchCamera(options)
            if (!result.didCancel && !result.errorCode) {
                const [data] = result.assets 
                setImageData(data.base64)
                props.saveImage(data.base64)
            }
                
    }

    const imagePicker = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        }

        const result = await launchImageLibrary(options)
        if (!result.didCancel && !result.errorCode) {
            const [data] = result.assets 
            setImageData(data.base64)
            props.saveImage(data.base64)
        }

    }

    const onPress = () => setShowModal(true)

    return (
        <TouchableOpacity onPress={onPress} >
            <ModalComp isVisible={showModal} 
                onClose={() => setShowModal(false)} 
                component={<RenderChoice onClose={() => setShowModal(false)} camera={cameraPicker} gallery={imagePicker}/>}
            /> 
            <View style={styles.container} >
                {imageData 
                ? <Image source={{ uri: 'data:image/jpeg;base64,' + imageData }} style={styles.img}/>
                :<Avatar.Icon icon='account' size={props.size} /> }
                
            </View>
        </TouchableOpacity>
        
    )
}