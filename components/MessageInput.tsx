import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Pressable,
  } from 'react-native';
  import { useState } from 'react';
  import * as ImagePicker from 'expo-image-picker';
  import * as DocumentPicker from 'expo-document-picker';
  import clipIcon from '../assets/images/clip.png';
  import cameraIcon from '../assets/images/camera.png';   // you’ll need to provide this
  import videoIcon from '../assets/images/video.png';     // and this
  import fileIcon from '../assets/images/file.png';       // and this
  
  export default function MessageInput() {
    const [message, setMessage] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
  
    const pickImage = async () => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      setIsMenuVisible(false);
      if (!result.canceled) console.log('Image picked:', result.assets[0]);
    };
  
    const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync();
      setIsMenuVisible(false);
      if (!result.canceled && result.assets?.[0]) {
        console.log('File picked:', result.assets[0]);
      }
    };
  
    const handleSend = () => {
      if (message.trim()) {
        console.log('Sending:', message);
        setMessage('');
      }
    };
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          quality: 1,
        });
        setIsMenuVisible(false);
        if (!result.canceled) {
          console.log('Video picked:', result.assets[0]);
          // you can now send this to the backend or play it
        }
      };
      
  
    return (
      <View style={styles.container}>
        {/* Popover Menu */}
        {isMenuVisible && (
          <View style={styles.menuWrapper}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={pickImage} >
              <Image
  source={cameraIcon}
  style={styles.menuIcon}
  resizeMode="contain" // ✅ fixes stretching/clipping
/>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickVideo}>
  <Image source={videoIcon} style={styles.menuIcon} resizeMode="contain" />
</TouchableOpacity>

              <TouchableOpacity onPress={pickDocument}>
                <Image source={fileIcon} style={styles.menuIcon} resizeMode="contain"/>
              </TouchableOpacity>
            </View>
            <View style={styles.pointer} />
          </View>
        )}
  
        {/* Input Row */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setIsMenuVisible(!isMenuVisible)}>
          <Image source={clipIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} >
          <Image
            source={require('../assets/images/send.png')}
            style={[styles.icon, ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderColor: '#e5e7eb',
      backgroundColor: '#ffffff',
      alignItems: 'center',
      gap: 8,
    },
    input: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
    },
    
    icon: {
      width: 20,
      height: 20,
    },
    menuWrapper: {
      position: 'absolute',
      bottom: 60,
      right: 20,
      alignItems: 'center',
      zIndex: 999,
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#008000',
        paddingHorizontal: 8,
        paddingVertical: 14,      // ✅ make this bigger
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2, // ✅ add some space below the menu
      },
      menuIcon: {
        width: 20,                // ✅ or try 24 if it's still tight
        height: 20,
        marginHorizontal: 14,     // ✅ more spacing between icons
        tintColor: 'white',
      },
    pointer: {
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#008000',
      marginTop: -2,
    },
  });
  