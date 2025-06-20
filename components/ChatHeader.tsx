import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react-native';

// Image icons
import editIcon from '../assets/images/pencil.png';
import membersIcon from '../assets/images/Members-2.png';
import shareIcon from '../assets/images/Call.png';
import reportIcon from '../assets/images/Report Message.png';
import tripImage from '../assets/images/Profile.png'; // static image near From/To

interface ChatHeaderProps {
  title: string;
  from: string;
  to: string;
}

export default function ChatHeader({ title, from, to }: ChatHeaderProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={styles.container}>
      {/* Title and Pencil icon */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {title?.replace(/No\.?\s*/i, '') || 'Trip'}
        </Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={editIcon} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* From/To info with image and menu */}
      <View style={styles.rowBetween}>
        {/* Image + From/To block */}
        <View style={styles.leftSection}>
          <Image source={tripImage} style={styles.tripImage} resizeMode="cover" />
          <View>
            <Text style={styles.text}>
              From <Text style={styles.bold}>{from || '—'}</Text>
            </Text>
            <Text style={styles.text}>
              To <Text style={styles.bold}>{to || '—'}</Text>
            </Text>
          </View>
        </View>

        {/* Menu icon */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowOptions(prev => !prev)}>
            <MoreVertical size={20} />
          </TouchableOpacity>

          {showOptions && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.option}>
                <Image source={membersIcon} style={styles.optionIcon} />
                <Text style={styles.optionText}>Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Image source={shareIcon} style={styles.optionIcon} />
                <Text style={styles.optionText}>Share Number</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Image source={reportIcon} style={styles.optionIcon} />
                <Text style={styles.optionText}>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 48,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: '#FAFAF5',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
    },
    text: {
      fontSize: 16,
      color: '#444',
    },
    bold: {
      fontWeight: 'bold',
      color: '#111',
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    tripImage: {
      width: 48,
      height: 48,
      borderRadius: 20,
      marginRight: 8,
    },
    iconButton: {
      marginLeft: 8,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    iconImage: {
      width: 20,
      height: 20,
    },
    dropdown: {
      position: 'absolute',
      top: 30,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 12,
      paddingVertical: 8,
      width: 180,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 5,
      zIndex: 100,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    optionIcon: {
      width: 20,
      height: 20,
      marginRight: 12,
    },
    optionText: {
      fontSize: 16,
      color: '#111',
    },
  });
  