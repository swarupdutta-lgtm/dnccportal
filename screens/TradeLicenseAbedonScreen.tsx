import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
type Props = NativeStackScreenProps<any, 'TradeLicenseAbedon'>;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

const ABEDON_ITEMS = [
  { id: '1', label: 'নতুন',              icon: 'file-document-plus-outline', route: 'NewTradeLicense' },
  { id: '2', label: 'পুরাতন',            icon: 'file-document-outline',      route: 'OldTradeLicense' },
  { id: '3', label: 'পরিবর্তন/\nসংশোধন', icon: 'file-document-edit-outline', route: 'TradeLicenseChange' },
];

export function TradeLicenseAbedonScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('trade');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>নাগরিক পোর্টাল</Text>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="more-vert" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>ট্রেড লাইসেন্স আবেদন</Text>

        <View style={styles.grid}>
          {ABEDON_ITEMS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.cardIconCircle}>
                <MaterialCommunityIcons name={item.icon as any} size={36} color={Colors.primary} />
              </View>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      {/* <View style={styles.tabBar}>
        {BOTTOM_TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tabItem} activeOpacity={0.7}
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === 'home') navigation.navigate('Dashboard');
              }}>
              <MaterialCommunityIcons name={tab.icon as any} size={22} color={active ? Colors.primary : Colors.gray500} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
      <BottomTabBar navigation={navigation} activeKey="trade" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 12,
  },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, paddingBottom: Spacing.xl },
  sectionTitle: {
    fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary,
    textAlign: 'center', marginBottom: Spacing.lg, letterSpacing: 0.3,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  card: { width: '33.33%', alignItems: 'center', marginBottom: Spacing.lg, paddingHorizontal: 4 },
  cardIconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.gray200, justifyContent: 'center', alignItems: 'center',
    marginBottom: 8, borderWidth: 1.5, borderColor: Colors.gray200,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },
  cardLabel: {
    fontSize: FontSizes.xs, color: Colors.textPrimary,
    textAlign: 'center', fontWeight: '500', lineHeight: 16,
  },
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
