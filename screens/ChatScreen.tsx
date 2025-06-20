import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import { useEffect } from 'react';
  import { useChatStore } from '../store/chatStore';
  import ChatHeader from '../components/ChatHeader';
  import ChatBubble from '../components/ChatBubble';
  import MessageInput from '../components/MessageInput';
  
  export default function ChatScreen() {
    const { messages, fetchMessages, tripDetails, isLoading } = useChatStore();
  
    useEffect(() => {
      fetchMessages();
    }, []);
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0} // Adjust this based on your header/nav height
      >
        <View style={styles.container}>
          <ChatHeader
            title={tripDetails?.name ?? 'Trip'}
            from={tripDetails?.from ?? '—'}
            to={tripDetails?.to ?? '—'}
          />
  
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble msg={item} />}
            inverted
            onEndReached={fetchMessages}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              isLoading ? <ActivityIndicator style={{ marginVertical: 10 }} /> : null
            }
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }} // ✅ Add this to enable proper scrolling
          />
  
          {/* Wrap only the input in TouchableWithoutFeedback */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <MessageInput />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAF5',
    },
    listContent: {
      paddingVertical: 12,
    },
  });
  