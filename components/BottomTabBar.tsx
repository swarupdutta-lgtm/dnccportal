import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, FontSizes } from '../theme/colors';

const TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline',              screen: 'Dashboard'          },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline',   screen: 'HoldingTaxAbedon'   },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license',                   screen: 'TradeLicenseAbedon' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline',               screen: 'Dashboard'          },
];

interface Props {
  navigation: any;
  activeKey?: string;   // pass 'home' | 'holding' | 'trade' | 'hotel'
}

export function BottomTabBar({ navigation, activeKey = 'home' }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map(tab => {
        const active = activeKey === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(tab.screen)}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={22}
              color={active ? Colors.primary : Colors.gray500}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 9,
    color: '#9E9E9E',
    textAlign: 'center',
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
