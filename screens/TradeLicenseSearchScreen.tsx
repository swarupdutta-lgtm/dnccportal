import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// ─── Theme ───────────────────────────────────────────────────────────────────
const Colors = {
  primary:      '#00853F',
  primaryDark:  '#006B33',
  primaryLight: '#E8F5E9',
  white:        '#FFFFFF',
  background:   '#F4F6F5',
  textPrimary:  '#212121',
  textSecondary:'#666666',
  border:       '#E0E0E0',
  gray100:      '#F5F5F5',
};

const Spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };
const FontSizes = { xs: 11, sm: 12, md: 13, base: 14, lg: 16, xl: 18 };

// ─── Screen config per route ──────────────────────────────────────────────────
const SCREEN_CONFIG: Record<string, {
  title: string;
  viewTarget: string;
}> = {
  NewTLSearch:    { title: 'নতুন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',        viewTarget: 'NewTradeLicense'    },
  OldTLSearch:    { title: 'পুরাতন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',     viewTarget: 'OldTradeLicense'    },
  ChangeTLSearch: { title: 'পরিবর্তন/সংশোধন ট্রেড লাইসেন্স অনুসন্ধান',    viewTarget: 'TradeLicenseChange' },
  TradeLicenseSearch: { title: 'ট্রেড লাইসেন্স অনুসন্ধান',                 viewTarget: 'NewTradeLicense'    },
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_RESULTS = [
  {
    id: '1',
    serial:    '১',
    appNo:     'APPH/DNCC/000331/2025',
    name:      'সুমিত সরকার',
    bizName:   'আয়াজ এন্টারপ্রাইজ',
    bizType:   'বুটিকস',
    date:      '21 Apr 2026',
    status:    'Initiated',
  },
  {
    id: '2',
    serial:    '২',
    appNo:     'APPH/DNCC/000412/2025',
    name:      'রাহেলা বেগম',
    bizName:   'রাহেলা স্টোর',
    bizType:   'মুদি দোকান',
    date:      '15 Mar 2026',
    status:    'Pending',
  },
  {
    id: '3',
    serial:    '৩',
    appNo:     'APPH/DNCC/000519/2025',
    name:      'করিম উদ্দিন',
    bizName:   'করিম ট্রেডার্স',
    bizType:   'পাইকারী',
    date:      '02 Feb 2026',
    status:    'Approved',
  },
];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Initiated: { bg: '#E3F2FD', text: '#1565C0' },
  Pending:   { bg: '#FFF3E0', text: '#E65100' },
  Approved:  { bg: '#E8F5E9', text: '#2E7D32' },
  Rejected:  { bg: '#FFEBEE', text: '#C62828' },
};

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
function BottomTabBar({ navigation }: { navigation: any }) {
  const tabs = [
    { icon: 'home-outline',              label: 'হোম',           screen: 'Dashboard'         },
    { icon: 'office-building-outline',   label: 'হোল্ডিং ট্যাক্স', screen: 'HoldingTaxAbedon' },
    { icon: 'file-document-outline',     label: 'ট্রেড লাইসেন্স', screen: 'TradeLicenseAbedon'},
    { icon: 'store-outline',             label: 'হোটেল ট্যাক্স',  screen: 'Dashboard'         },
  ];
  return (
    <View style={styles.bottomBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.screen}
          style={styles.tabItem}
          onPress={() => navigation.navigate(tab.screen)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name={tab.icon as any} size={22} color={Colors.white} />
          <Text style={styles.tabLabel}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({
  item,
  onView,
}: {
  item: typeof MOCK_RESULTS[0];
  onView: () => void;
}) {
  const statusStyle = STATUS_COLOR[item.status] ?? STATUS_COLOR['Initiated'];

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'ক্রমিক সংখ্যা',           value: item.serial  },
    { label: 'আবেদন নম্বর',              value: item.appNo   },
    { label: 'আবেদনকারীর নাম',           value: item.name    },
    { label: 'ব্যবসা প্রতিষ্ঠানের নাম',  value: item.bizName },
    { label: 'ব্যবসার ধরণ',              value: item.bizType },
    { label: 'আবেদনের তারিখ',            value: item.date    },
    {
      label: 'আবেদনের স্থিতি',
      value: (
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{item.status}</Text>
        </View>
      ),
    },
    {
      label: 'আবেদনের স্থিতি',
      value: (
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={onView}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="eye-outline" size={18} color={Colors.white} />
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <View style={styles.card}>
      {rows.map((row, idx) => (
        <View
          key={idx}
          style={[
            styles.row,
            idx === rows.length - 1 && { borderBottomWidth: 0 },
          ]}
        >
          <Text style={styles.rowLabel}>{row.label}</Text>
          {typeof row.value === 'string' ? (
            <Text style={styles.rowValue}>{row.value}</Text>
          ) : (
            <View style={styles.rowValueContainer}>{row.value}</View>
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
type Props = {
  navigation: any;
  route: any;
};

export function TradeLicenseSearchScreen({ navigation, route }: Props) {
  const routeName: string = route?.name ?? 'NewTLSearch';
  const config = SCREEN_CONFIG[routeName] ?? SCREEN_CONFIG['NewTLSearch'];

  const [appNo,   setAppNo]   = useState('');
  const [appName, setAppName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof MOCK_RESULTS>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setSearched(true);
      setLoading(false);
    }, 1200);
  };

  const handleView = (item: typeof MOCK_RESULTS[0]) => {
    navigation.navigate(config.viewTarget, { applicationData: item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>নাগরিক পোর্টাল</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialCommunityIcons name="dots-vertical" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page Title ── */}
        <Text style={styles.pageTitle}>{config.title}</Text>

        {/* ── Search Section ── */}
        <View style={styles.section}>
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="tune" size={16} color={Colors.primary} />
            <Text style={styles.sectionHeaderText}>অনুসন্ধানের যায়গা</Text>
          </View>

          {/* আবেদন নম্বর */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>আবেদন নম্বর</Text>
            <TextInput
              style={styles.input}
              value={appNo}
              onChangeText={setAppNo}
              placeholder=""
              placeholderTextColor="#BDBDBD"
            />
          </View>

          {/* আবেদনকারীর নাম */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>আবেদনকারীর নাম</Text>
            <TextInput
              style={styles.input}
              value={appName}
              onChangeText={setAppName}
              placeholder=""
              placeholderTextColor="#BDBDBD"
            />
          </View>

          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={handleSearch}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Results ── */}
        {searched && !loading && (
          <View style={styles.resultsContainer}>
            {results.length === 0 ? (
              <View style={styles.emptyBox}>
                <MaterialCommunityIcons name="file-search-outline" size={40} color={Colors.primary} />
                <Text style={styles.emptyText}>কোনো ফলাফল পাওয়া যায়নি</Text>
              </View>
            ) : (
              results.map((item) => (
                <ResultCard
                  key={item.id}
                  item={item}
                  onView={() => handleView(item)}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <BottomTabBar navigation={navigation} />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  // Header
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },

  // Scroll
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },

  // Page title
  pageTitle: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  // Section card
  section: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionHeaderText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Field
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Search button
  searchBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  searchBtnText: {
    color: Colors.white,
    fontSize: FontSizes.base,
    fontWeight: '700',
  },

  // Results
  resultsContainer: {
    gap: Spacing.md,
  },

  // Result card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    minHeight: 42,
  },
  rowLabel: {
    flex: 1.1,
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
    paddingRight: Spacing.xs,
  },
  rowValue: {
    flex: 1.4,
    fontSize: FontSizes.xs,
    color: Colors.textPrimary,
    fontWeight: '500',
    textAlign: 'right',
  },
  rowValueContainer: {
    flex: 1.4,
    alignItems: 'flex-end',
  },

  // Badge
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },

  // View button
  viewBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty
  emptyBox: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    color: Colors.white,
    fontSize: FontSizes.xs - 1,
    fontWeight: '500',
  },
});

export default TradeLicenseSearchScreen;