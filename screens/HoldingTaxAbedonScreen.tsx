import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'HoldingTaxAbedon'>;

// ─── Bottom Tabs (same as Dashboard) ──────────────────────────────────────────
const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Abedon Items ──────────────────────────────────────────────────────────────
const ABEDON_ITEMS = [
  {
    id: '1',
    label: 'নতুন',
    icon: 'file-document-plus-outline',   // new application
    screen: 'NewHolding',
  },
  {
    id: '2',
    label: 'নামজারি',
    icon: 'account-switch-outline', 
    screen:'Namjari',       // name transfer / mutation
  },
  {
    id: '3',
    label: 'নয়াবাদি',
    icon: 'home-plus-outline',             // new settlement
    screen:'Nayabadi', 
  },
  {
    id: '4',
    label: 'মুক্তিযোদ্ধার সুবিধা',
    icon: 'shield-star-outline',           // freedom fighter benefit
  },
];

// ─── Icon Card Component ───────────────────────────────────────────────────────
function AbedonCard({ item, onPress }: { item: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardIconCircle}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={36}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.cardLabel} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export function HoldingTaxAbedonScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = React.useState('holding');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>নাগরিক পোর্টাল</Text>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="more-vert" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* ── Body ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <Text style={styles.sectionTitle}>হোল্ডিং ট্যাক্স আবেদন</Text>

        {/* Icon Grid */}
        <View style={styles.grid}>
          {ABEDON_ITEMS.map((item) => (
            <AbedonCard
              key={item.id}
              item={item}
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  Alert.alert('তথ্য', `${item.label} মডিউলটি প্রক্রিয়াধীন রয়েছে।`);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.tabBar}>
        {BOTTOM_TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === 'home') navigation.navigate('Dashboard');
              }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color={active ? Colors.primary : Colors.gray500}
              />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Header
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },

  // Body
  body: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Section title
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 0.3,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  // Card
  card: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: 4,
  },
  cardIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    // subtle shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
  },

  // Bottom Tab
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 9,
    color: Colors.gray500,
    textAlign: 'center',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
