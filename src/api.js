import { Platform } from 'react-native'

export const server = Platform.OS === 'android' ? 'http://10.0.2.2:3003' : 'http://localhost:3003'
