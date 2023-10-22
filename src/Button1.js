import { StyleSheet, View, Pressable, Text , TouchableOpacity} from 'react-native';

import * as React from 'react'
import {Entypo} from '@expo/vector-icons' 

export default function Button1({ title,onPress ,icon , color }) {
 
    return (
      <TouchableOpacity  onPress={onPress} style ={styles.button}>
        <Entypo name = {icon} size ={28} color = {color ? color :'#f1f1f1' }/>
        <Text style= {styles.text}>{title}</Text>
        
      </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
  
  button: {
    
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text : {
    fontWeight : 'bold',
    fontSize : 16,
    color : '#f0f',
    marginLeft : 10,

  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
