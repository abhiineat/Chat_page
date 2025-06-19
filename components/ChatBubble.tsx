import { View, Text, Image, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  msg: {
    message: string;
    sender: {
      image: string;
      self: boolean;
      is_kyc_verified: boolean;
    };
  };
}

export default function ChatBubble({ msg }: ChatBubbleProps) {
  const { message, sender } = msg;
  const isSelf = sender?.self;

  return (
    <View style={[styles.container, isSelf ? styles.justifyEnd : styles.justifyStart]}>
      {!isSelf && (
        <Image
          source={{ uri: sender.image }}
          style={styles.avatar}
        />
      )}
      <View style={[styles.bubble, isSelf ? styles.bubbleSelf : styles.bubbleOther]}>
        <Text style={[styles.messageText, isSelf ? styles.textSelf : styles.textOther]}>
          {message.replace(/<br>/g, '\n')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: '75%',
  },
  bubbleSelf: {
    backgroundColor: '#2563eb', // Tailwind's bg-blue-600
  },
  bubbleOther: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
  },
  textSelf: {
    color: '#ffffff',
  },
  textOther: {
    color: '#000000',
  },
});
