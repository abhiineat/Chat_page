import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';

export default function ChatScreen() {
  const { messages, fetchMessages, tripDetails, isLoading } = useChatStore();

  useEffect(() => {
    fetchMessages(); // Fetch initial page
  }, []);

  return (
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
      />

      <MessageInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF5',
  },
  listContent: {
    paddingVertical: 8,
  },
});
