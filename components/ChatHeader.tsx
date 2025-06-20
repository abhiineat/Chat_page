import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { MoreVertical, Pencil } from 'lucide-react-native';
import editIcon from '../assets/images/pencil.png';

interface ChatHeaderProps {
  title: string;
  from: string;
  to: string;
}

export default function ChatHeader({ title, from, to }: ChatHeaderProps) {
    return (
      <View style={styles.container}>
        {/* Title and Pencil icon in one row */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {title?.replace(/No\.?\s*/i, '') || 'Trip'}
          </Text>
          <TouchableOpacity style={styles.iconButton}>
  <Image source={editIcon} style={styles.iconImage} resizeMode="contain" />
</TouchableOpacity>
        </View>
  
        {/* From / To info and More icon */}
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.text}>
              From <Text style={styles.bold}>{from || '—'}</Text>
            </Text>
            <Text style={styles.text}>
              To <Text style={styles.bold}>{to || '—'}</Text>
            </Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <MoreVertical size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FAFAF5',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4, // same as original title marginBottom
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  
});
