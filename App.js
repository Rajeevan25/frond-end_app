import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,Button, ImageBackground ,ScrollView ,Modal ,TouchableOpacity  } from 'react-native';
import {useState , useRef} from 'react';
import * as ImagePicker  from "expo-image-picker"
//import { printToFileAsync } from "expo-print"
//import Feather from "@expo/vector-icons/Feather"
import * as MediaLibrary from 'expo-media-library'
import ImageViewer from './src/ImageViewer';

import { Camera ,CameraType } from 'expo-camera';
import Button1 from './src/Button1';
import Login from './src/Login';
import Form from './src/Form';
const Img1 = require('./assets/1.png'); 


export default function App() {
  const [isModalVisible,setisModalVisible] =useState(false);
  const [isModal1Visible,setisModal1Visible] =useState(false);
  
  const [isModal2Visible,setisModal2Visible] =useState(false);
  const [isModal3Visible,setisModal3Visible] =useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [flash ,setFlash] = useState(Camera.Constants.FlashMode.off)
  const [type ,setType] = useState(Camera.Constants.Type.back) //Camera.Constants.Type.back
  const cameraRef = useRef(null);
  const [permission , requestPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();
  
  const pickImageAsync = async() =>{
       let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 1,
                    
        });
        if (!result.canceled) {
                    setSelectedImage(result.assets[0].uri);
                    //console.log(result);
        } else {
                    alert('You did not select any image.');
  }
  }
  const takePicture = async () => {
    if (cameraRef) {
      try {  
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const savePicture = async () => {
    if (image) {
      try {
         // const asset = await MediaLibrary.createAssetAsync(image);
        MediaLibrary.saveToLibraryAsync(image);
        alert('wait for some minutes......! 🎉');
        setImage(null);
        console.log('wait for some minutes......');
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  if(! permission || !permission.granted){
    return <View style={styles.container} >
      <Text>
        No permission
      </Text>
      <Button title={"Get permission"} onPress={()=> requestPermission()}></Button>
    </View>
  }
  //if(! permissionResponse || !permissionResponse.granted){
  //  return <View style={styles.container}>
  //    <Text>
  //      No permission
  //    </Text>
  //    <Button title={"Get Media permission"} onPress={()=> requestPermissionMedia()}></Button>
  //  </View>
 // }
//style={ {position:'absolute',left:0,top:0}}
  return (
    <View style={styles.container}>
     

     

            <View style={
              {width :'100%' , height : '10%' , backgroundColor : 'red', alignItems: 'center',top:12}
            }>
                  <Text style={styles.head}>Image TO Word</Text>
                  
            </View>
            
            <Text style={styles.text}>Open your account and select the type of document you want to extract text from. Upload the images and wait for the platform to extract text Once uploaded, open the image to check if the extracted text aligns with your expectations. Export the data as a word, text, or CSV file.</Text>
      
            <View>
                            <Button title='Choose the Photo'  onPress={() => setisModal2Visible(true)} color={'midnightblue'}/>
            </View>

            <View>
                            <Button title='Open the camera' onPress={() => setisModal3Visible(true)} color={'blue'}/>
            </View>
      
            
            <View >
                            <Button title='Login' onPress={() => setisModalVisible(true)} color={'blue'}/>
            </View>

            <View >
                            <Button title='First fill the form' onPress={() => setisModal1Visible(true)} color={'blue'}/>
            </View>



      <Modal visible= {isModalVisible} onRequestClose={() => setisModalVisible(false) } animationType='fade'>
                <View style={
                  {backgroundColor : 'Green', alignItems: 'center', padding : 15}
                }>
                     <Login/>
                </View>
      </Modal>



      <Modal visible= {isModal1Visible} onRequestClose={() => setisModal1Visible(false) } animationType='fade'>
                <View style={
                  {backgroundColor : 'Green', alignItems: 'center', padding : 15}
                }>
                    <Form/>
                </View>
      </Modal>



      <Modal visible= {isModal2Visible} onRequestClose={() => setisModal2Visible(false) }>
     
      {selectedImage ? (
        <View style={styles.imageContainer}>
              <ImageViewer 
                  placeholderImageSource={Img1} 
                  selectedImage={selectedImage}
              />
               
       </View>):(
               <Text style={styles.head}>Open your account and select the type of document you want to extract text from. Upload the images and wait for the platform to extract text Once uploaded, open the image to check if the extracted text aligns with your expectations. Export the data as a word, text, or CSV file.</Text>
       )}
       
                           <Button title='Select the Photo'  onPress={pickImageAsync} color={'blue'}/>
                           <Button title='Digtalization'  color={'royalblue'}/>
                           <Button title='Close the tap'  color={'midnightblue'} onPress={() => setisModal2Visible(false)}/>


      </Modal>

      <Modal visible= {isModal3Visible} onRequestClose={() => setisModal3Visible(false) } animationType='fade'>
                
        <View style={styles.containerC}>
      
                  {!image ? (
                    <Camera
                                      style={styles.camera}
                                      type={type}
                                      ref={cameraRef}
                                      flashMode={flash}               />
                  ) : (
                                    <Image source={{ uri: image }} style={styles.camera} />
                  )}

                  <View style={styles.controlsContainer}>
                    {image ? (
                      <View
                        style={styles.controlsContainer}
                      >
                        <Button1
                                        title="Re-take"
                                        onPress={() => setImage(null)}
                                        icon="retweet"
                        />
                        <Button1 title="Digitalize" onPress={savePicture} icon="check" />
                      </View>
                    ) : (
                
                <View style={styles.controlsContainer}> 

                        <Button1
                            title=""
                            icon="flash"
                            onPress={() =>{
                                              setFlash(
                                                flash === Camera.Constants.FlashMode.off
                                                ? Camera.Constants.FlashMode.on
                                                : Camera.Constants.FlashMode.off
                                                      );
                                          }
                                    }
                          
                            color={flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
                          />
                        <Button1  onPress={takePicture} icon="camera" />     
                        <Button1
                              title=""
                              icon="retweet"
                              onPress={() => {
                                                setType(
                                                  type === CameraType.back ? CameraType.front : CameraType.back
                                                );
                              }}
                        />          
                      </View>
                    )}
                  </View>
                  <Button title='Back'  color={'blue'} onPress={() => setisModal3Visible(false) }/>
        </View>
                            
      </Modal>

      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    fontSize : 22,
    justifyContent: 'center',
    padding : 30
  },
  containerC: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',

  },
  controlsContainer:
  {
    //flex: 1,
    height:"15%",
    width :'100%' ,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'gray',
    alignItems: 'center',
    position:"absolute",
    bottom: 0,
    left:0,
    right:0,
    paddingBottom : 50,
   
  },
  takePictureButton:{
 
    backgroundColor: 'white',
    width : 70,
    height: 70,
    borderRadius: 35,
    marginVertical:10
  },
  text: {
    flex: 1,
    fontSize : 22,
    color : 'white',
    justifyContent: 'center',
    padding : 15,
    alignItems: 'center',
  },
  head: {
    flex: 1,
    fontSize : 42,
    color : 'yellow',
    fontWeight : 'bold',
    justifyContent: 'center',
 
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems :'center',
    top:10,
    width:'100%',
  },
  camera: {
    width:'100%',height:"85%",
    //paddingTop:73,
    
  
  },
});
