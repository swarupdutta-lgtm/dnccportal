import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  StatusBar, ScrollView, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
type Props = NativeStackScreenProps<any, 'NewTLSearch' | 'OldTLSearch' | 'ChangeTLSearch' | 'TradeLicenseSearch'>;

// ─── Config per screen type ───────────────────────────────────────────────────
interface FieldConfig { key: string; label: string; keyboardType?: any; }

interface ScreenConfig {
  title: string;
  fields: FieldConfig[];
  detailScreen: string | null;
}

const SCREEN_CONFIG: Record<string, ScreenConfig> = {
  NewTLSearch: {
    title: 'নতুন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',
    fields: [
      { key: 'appNo',         label: 'আবেদন নম্বর' },
      { key: 'applicantName', label: 'আবেদনকারীর নাম' },
    ],
    detailScreen: 'NewTradeLicense',
  },
  OldTLSearch: {
    title: 'পুরাতন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',
    fields: [
      { key: 'tlNo',         label: 'ট্রেড লাইসেন্স নং' },
      { key: 'issuedOldNo',  label: 'ইস্যুকৃত পুরাতন লাইসেন্স নং' },
    ],
    detailScreen: 'OldTradeLicense',
  },
  ChangeTLSearch: {
    title: 'পরিবর্তন/সংশোধন আবেদন অনুসন্ধান',
    fields: [
      { key: 'tlNo',     label: 'ট্রেড লাইসেন্স নং' },
      { key: 'docketNo', label: 'ডকেট নম্বর' },
    ],
    detailScreen: 'TradeLicenseChange',
  },
  TradeLicenseSearch: {
    title: 'ট্রেড লাইসেন্স অনুসন্ধান',
    fields: [
      { key: 'appNo',         label: 'আবেদন নম্বর' },
      { key: 'applicantName', label: 'আবেদনকারীর নাম' },
    ],
    detailScreen: 'NewTradeLicense',
  },
};

// ─── Result columns (same for all types) ─────────────────────────────────────
const MOCK_RESULTS = [
  {
    serial: '১',
    appNo: 'APPH/DNCC/000331/2025',
    applicantName: 'সুমিত সরকার',
    bizName: 'আয়াজ এন্টারপ্রাইজ',
    bizType: 'বুটিকস',
    date: '21 Apr 2026',
    status: 'Initiated',
  },
  {
    serial: '২',
    appNo: 'APPH/DNCC/000412/2025',
    applicantName: 'রাহেলা বেগম',
    bizName: 'রাহেলা ফার্মেসি',
    bizType: 'ফার্মেসি',
    date: '15 Mar 2026',
    status: 'Pending',
  },
  {
    serial: '৩',
    appNo: 'APPH/DNCC/000519/2025',
    applicantName: 'মোঃ করিম',
    bizName: 'করিম স্টোর',
    bizType: 'মুদি দোকান',
    date: '08 Feb 2026',
    status: 'Approved',
  },
];

const STATUS_COLOR: Record<string, string> = {
  Initiated: '#1565C0',
  Pending:   '#E65100',
  Approved:  '#2E7D32',
  Rejected:  '#C62828',
};

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Result Row ───────────────────────────────────────────────────────────────
function ResultRow({ label, value, isStatus, statusColor, isView, onView }: {
  label: string; value?: string;
  isStatus?: boolean; statusColor?: string;
  isView?: boolean; onView?: () => void;
}) {
  return (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}</Text>
      {isView ? (
        <TouchableOpacity style={styles.viewBtn} onPress={onView} activeOpacity={0.7}>
          <MaterialIcons name="visibility" size={18} color={Colors.white} />
        </TouchableOpacity>
      ) : isStatus ? (
        <View style={[styles.statusBadge, { backgroundColor: (statusColor ?? '#1565C0') + '22' }]}>
          <Text style={[styles.statusText, { color: statusColor ?? '#1565C0' }]}>{value}</Text>
        </View>
      ) : (
        <Text style={styles.dataValue}>{value}</Text>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function TradeLicenseSearchScreen({ navigation, route }: Props) {
  const screenType = route?.name ?? (route?.params as any)?.title ?? 'NewTLSearch';
  //(route?.params as any)?.title ?? route?.name ?? 'NewTLSearch';
  const config     = SCREEN_CONFIG[screenType] ?? SCREEN_CONFIG['NewTLSearch'];

  const [activeTab, setActiveTab] = useState('trade');
  const [loading, setLoading]     = useState(false);
  const [results, setResults]     = useState<typeof MOCK_RESULTS>([]);
  const [searched, setSearched]   = useState(false);

  // Dynamic field values keyed by field.key
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const setField = (key: string) => (val: string) =>
    setFieldValues(prev => ({ ...prev, [key]: val }));

  const handleSearch = () => {
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      setLoading(false);
      setResults(MOCK_RESULTS);
      setSearched(true);
    }, 900);
  };

  const handleView = (item: typeof MOCK_RESULTS[0]) => {
    if (!config.detailScreen) return;
    navigation.navigate(config.detailScreen, { appNo: item.appNo, readOnly: true });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>নাগরিক পোর্টাল</Text>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="more-vert" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* ── Search Card ── */}
        <View style={styles.card}>
          {/* Screen-specific title */}
          <Text style={styles.cardTitle}>{config.title}</Text>

          {/* Section header */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionEmoji}>🖐</Text>
            <Text style={styles.sectionHeaderText}>অনুসন্ধানের যায়গা</Text>
          </View>
          <View style={styles.divider} />

          {/* Dynamic search fields — changes per screen type */}
          {config.fields.map((field, idx) => (
            <View key={field.key}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={fieldValues[field.key] ?? ''}
                  onChangeText={setField(field.key)}
                  keyboardType={field.keyboardType ?? 'default'}
                  placeholderTextColor={Colors.gray400}
                  returnKeyType={idx < config.fields.length - 1 ? 'next' : 'search'}
                  onSubmitEditing={idx === config.fields.length - 1 ? handleSearch : undefined}
                />
              </View>
            </View>
          ))}

          {/* Search button */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} activeOpacity={0.8}>
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <>
                  <MaterialIcons name="search" size={20} color={Colors.white} />
                  <Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text>
                </>
            }
          </TouchableOpacity>
        </View>

        {/* ── Result Cards ── */}
        {results.map(item => (
          <View key={item.appNo} style={styles.resultCard}>
            <ResultRow label="ক্রমিক সংখ্যা"           value={item.serial} />
            <ResultRow label="আবেদন নম্বর"              value={item.appNo} />
            <ResultRow label="আবেদনকারীর নাম"           value={item.applicantName} />
            <ResultRow label="ব্যবসা প্রতিষ্ঠানের নাম"  value={item.bizName} />
            <ResultRow label="ব্যবসার ধরণ"              value={item.bizType} />
            <ResultRow label="আবেদনের তারিখ"            value={item.date} />
            <ResultRow label="আবেদনের স্থিতি"
              value={item.status} isStatus
              statusColor={STATUS_COLOR[item.status]} />
            <ResultRow label="আবেদনের স্থিতি"
              isView onView={() => handleView(item)} />
          </View>
        ))}

        {/* Empty state */}
        {searched && results.length === 0 && !loading && (
          <View style={styles.emptyBox}>
            <MaterialIcons name="search-off" size={44} color={Colors.gray400} />
            <Text style={styles.emptyText}>কোনো ফলাফল পাওয়া যায়নি।</Text>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom Tabs */}
      {/* <View style={styles.tabBar}>
        {BOTTOM_TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tabItem} activeOpacity={0.7}
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === 'home') navigation.navigate('Dashboard');
              }}>
              <MaterialCommunityIcons name={tab.icon as any} size={22}
                color={active ? Colors.primary : Colors.gray500} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
      <BottomTabBar navigation={navigation} activeKey="trade" />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 12,
  },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },

  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 16 },

  // Search card
  card: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  cardTitle: {
    fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary,
    textAlign: 'center', marginBottom: Spacing.md,
  },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  sectionEmoji: { fontSize: 20 },
  sectionHeaderText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  fieldLabel: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', marginBottom: 6, marginTop: Spacing.xs,
  },
  inputWrapper: {
    backgroundColor: Colors.gray200, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    minHeight: 48, justifyContent: 'center',
    marginBottom: Spacing.sm, overflow: 'hidden',
  },
  textInput: {
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    fontSize: FontSizes.md, color: Colors.textPrimary,
  },
  searchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 14, marginTop: Spacing.sm,
  },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Result card
  resultCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    overflow: 'hidden', marginBottom: Spacing.sm,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  dataRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200, gap: 8,
  },
  dataLabel: {
    fontSize: FontSizes.sm, color: Colors.textSecondary,
    fontWeight: '600', flex: 1.2,
  },
  dataValue: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', flex: 1.4, textAlign: 'right',
  },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: FontSizes.xs, fontWeight: '700' },
  viewBtn: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.sm, padding: 7,
  },

  // Empty
  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, gap: 10 },
  emptyText: { fontSize: FontSizes.md, color: Colors.gray500 },

  // Bottom tabs
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
