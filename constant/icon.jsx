import { StyleSheet, Text, View } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Icons = {
    index: (props) => <Feather name="home" size={24} {...props} />,
    'emoji-mood-screen': (props) => <MaterialIcons name="mood" size={24}  {...props}/>,
    'about': (props) => <MaterialIcons name="mood" size={24}  {...props}/>
    
  }

export default Icons

const styles = StyleSheet.create({})