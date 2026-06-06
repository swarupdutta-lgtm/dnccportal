import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert, StatusBar, Modal, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
type Props = NativeStackScreenProps<any, 'HoldingSearch'>;

// ─── Config per screen type ───────────────────────────────────────────────────
const SCREEN_CONFIG: Record<string, {
  title: string;
  sectionTitle: string;
  detailScreen: string | null;
}> = {
  HoldingSearch:       { title: 'নতুন হোল্ডিং এর আবেদন অনুসন্ধান', sectionTitle: 'অনুসন্ধানের যায়গা', detailScreen: 'NewHolding' },
  NamjariSearch:       { title: 'নামজারির আবেদন অনুসন্ধান',         sectionTitle: 'অনুসন্ধানের যায়গা', detailScreen: 'Namjari' },
  NayabadiSearch:      { title: 'নয়াবাদি আবেদন অনুসন্ধান',          sectionTitle: 'অনুসন্ধানের যায়গা', detailScreen: 'Nayabadi' },
  FreedomFighterSearch:{ title: 'মুক্তিযোদ্ধার সুবিধার আবেদন অনুসন্ধান', sectionTitle: 'অনুসন্ধানের যায়গা', detailScreen: null },
};

// ─── Mock result data ──────────────────────────────────────────────────────────
const MOCK_RESULTS = [
  { serial: '১', appNo: 'APPH/DNCC/000331/2025', name: 'সুমিত সরকার',    date: '21 Apr 2026', status: 'Initiated' },
  { serial: '২', appNo: 'APPH/DNCC/000412/2025', name: 'রাহেলা বেগম',    date: '18 Mar 2026', status: 'Pending' },
  { serial: '৩', appNo: 'APPH/DNCC/000519/2025', name: 'মোঃ করিম',       date: '05 Feb 2026', status: 'Approved' },
  { serial: '৪', appNo: 'APPH/DNCC/000623/2025', name: 'সুফিয়া খানম',    date: '12 Jan 2026', status: 'Rejected' },
];

const STATUS_COLOR: Record<string, string> = {
  Initiated: '#1565C0',
  Pending:   '#E65100',
  Approved:  '#2E7D32',
  Rejected:  '#C62828',
};

// ─── Bottom Tabs ──────────────────────────────────────────────────────────────
const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Date field component ─────────────────────────────────────────────────────
function DateField({ label, value, onChange }: {
  label: string;
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const [show, setShow] = useState(false);
  const [iosDraft, setIosDraft] = useState(value ?? new Date());

  const formatted = value
    ? `${String(value.getMonth() + 1).padStart(2, '0')}/${String(value.getDate()).padStart(2, '0')}/${value.getFullYear()}`
    : '';

  const handleAndroid = (_: DateTimePickerEvent, d?: Date) => {
    setShow(false);
    if (d) onChange(d);
  };

  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShow(true)} activeOpacity={0.8}>
        <Text style={[styles.dateText, !value && styles.datePlaceholder]}>
          {formatted || 'mm/dd/yyyy'}
        </Text>
        <MaterialIcons name="calendar-today" size={18} color={Colors.gray500} />
      </TouchableOpacity>

      {/* Android picker */}
      {show && Platform.OS === 'android' && (
        <DateTimePicker value={value ?? new Date()} mode="date" display="default" onChange={handleAndroid} />
      )}

      {/* iOS modal picker */}
      {Platform.OS === 'ios' && (
        <Modal visible={show} transparent animationType="slide" onRequestClose={() => setShow(false)}>
          <View style={styles.iosPickerBackdrop}>
            <View style={styles.iosPickerSheet}>
              <View style={styles.iosPickerActions}>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={styles.iosPickerCancel}>বাতিল</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onChange(iosDraft); setShow(false); }}>
                  <Text style={styles.iosPickerDone}>ঠিক আছে</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={iosDraft} mode="date" display="spinner"
                onChange={(_, d) => d && setIosDraft(d)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function SearchScreen({ navigation, route }: Props) {
  const screenType = (route?.params as any)?.title ?? 'HoldingSearch';
  const config     = SCREEN_CONFIG[screenType] ?? SCREEN_CONFIG['HoldingSearch'];

  const [activeTab, setActiveTab]   = useState('holding');
  const [fromDate, setFromDate]     = useState<Date | null>(null);
  const [toDate, setToDate]         = useState<Date | null>(null);
  const [appNo, setAppNo]           = useState('');
  const [results, setResults]       = useState<typeof MOCK_RESULTS>([]);
  const [searched, setSearched]     = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে তারিখ থেকে এবং তারিখ পর্যন্ত নির্বাচন করুন।');
      return;
    }
    // Simulate API call — show mock data
    setResults(MOCK_RESULTS);
    setSearched(true);
    setShowResult(true);
  };

  const handleView = (item: typeof MOCK_RESULTS[0]) => {
    if (!config.detailScreen) {
      Alert.alert('তথ্য', 'এই বিভাগের জন্য বিস্তারিত পৃষ্ঠা এখনো তৈরি হয়নি।');
      return;
    }
    navigation.navigate(config.detailScreen, { appNo: item.appNo, readOnly: true });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
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
          {/* Screen title */}
          <Text style={styles.screenTitle}>{config.title}</Text>

          {/* Section header */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderEmoji}>🖐</Text>
            <Text style={styles.sectionHeaderText}>{config.sectionTitle}</Text>
          </View>
          <View style={styles.divider} />

          {/* Date fields */}
          <DateField label="তারিখ থেকে" value={fromDate} onChange={setFromDate} />
          <DateField label="তারিখ পর্যন্ত" value={toDate} onChange={setToDate} />

          {/* Application number */}
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>দরখাস্ত নম্বর</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={appNo}
                onChangeText={setAppNo}
                placeholder="আবেদন নম্বর লিখুন"
                placeholderTextColor={Colors.gray400}
              />
            </View>
          </View>

          {/* Search button */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} activeOpacity={0.8}>
            <MaterialIcons name="search" size={20} color={Colors.white} />
            <Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text>
          </TouchableOpacity>
        </View>

        {/* ── Results ── */}
        {showResult && (
          <View style={styles.card}>
            <Text style={styles.resultsTitle}>অনুসন্ধান করুন</Text>
            <View style={styles.divider} />

            {results.length === 0 ? (
              <View style={styles.emptyBox}>
                <MaterialIcons name="search-off" size={40} color={Colors.gray400} />
                <Text style={styles.emptyText}>কোনো ফলাফল পাওয়া যায়নি।</Text>
              </View>
            ) : (
              results.map((item, idx) => (
                <View key={item.appNo} style={[styles.resultRow, idx === results.length - 1 && styles.resultRowLast]}>

                  {/* ── Left col — info ── */}
                  <View style={styles.resultInfo}>
                    {/* Serial */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>ক্রমিক সংখ্যা</Text>
                      <Text style={styles.resultFieldVal}>{item.serial}</Text>
                    </View>
                    {/* App no */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>আবেদন নম্বর</Text>
                      <Text style={styles.resultFieldVal}>{item.appNo}</Text>
                    </View>
                    {/* Name */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>আবেদনকারীর নাম</Text>
                      <Text style={styles.resultFieldVal}>{item.name}</Text>
                    </View>
                    {/* Date */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>আবেদনের তারিখ</Text>
                      <Text style={styles.resultFieldVal}>{item.date}</Text>
                    </View>
                    {/* Status */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>আবেদনের স্থিতি</Text>
                      <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[item.status] + '22' }]}>
                        <Text style={[styles.statusText, { color: STATUS_COLOR[item.status] }]}>{item.status}</Text>
                      </View>
                    </View>
                    {/* View row */}
                    <View style={styles.resultField}>
                      <Text style={styles.resultFieldKey}>বিস্তারিত</Text>
                      <TouchableOpacity
                        style={styles.viewBtn}
                        onPress={() => handleView(item)}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons name="visibility" size={20} color={Colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Bottom Tabs ── */}
      {/* <View style={styles.tabBar}>
        {BOTTOM_TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tabItem} activeOpacity={0.7}
              onPress={() => { setActiveTab(tab.key); if (tab.key === 'home') navigation.navigate('Dashboard'); }}>
              <MaterialCommunityIcons name={tab.icon as any} size={22} color={active ? Colors.primary : Colors.gray500} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
      <BottomTabBar navigation={navigation} activeKey="holding" />
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
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 12 },

  // Card
  card: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginBottom: Spacing.sm,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },

  screenTitle: {
    fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary,
    textAlign: 'center', marginBottom: Spacing.md,
  },

  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  sectionHeaderEmoji: { fontSize: 20 },
  sectionHeaderText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  // Field
  fieldBlock: { marginBottom: Spacing.sm },
  fieldLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', marginBottom: 6 },

  // Date input
  dateInput: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    paddingHorizontal: Spacing.sm, paddingVertical: 13,
  },
  dateText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  datePlaceholder: { color: Colors.gray400 },

  // Text input
  inputWrapper: {
    backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300, minHeight: 44, overflow: 'hidden',
  },
  textInput: { paddingHorizontal: Spacing.sm, paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary },

  // Search button
  searchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 13, marginTop: Spacing.sm,
  },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Results
  resultsTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.sm },

  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, gap: 10 },
  emptyText: { fontSize: FontSizes.md, color: Colors.gray500 },

  resultRow: {
    borderBottomWidth: 1, borderBottomColor: Colors.gray200,
    paddingVertical: Spacing.md,
  },
  resultRowLast: { borderBottomWidth: 0 },

  resultInfo: { gap: 8 },
  resultField: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', gap: 8,
  },
  resultFieldKey: {
    fontSize: FontSizes.sm, color: Colors.textSecondary,
    fontWeight: '600', flex: 1,
  },
  resultFieldVal: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', flex: 1.4, textAlign: 'right',
  },

  // Status badge
  statusBadge: {
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-end',
  },
  statusText: { fontSize: FontSizes.xs, fontWeight: '700' },

  // View button
  viewBtn: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.sm,
    padding: 6, alignSelf: 'flex-end',
  },

  // iOS date picker
  iosPickerBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  iosPickerSheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  iosPickerActions: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray300,
  },
  iosPickerCancel: { fontSize: FontSizes.md, color: Colors.textSecondary, fontWeight: '600' },
  iosPickerDone:   { fontSize: FontSizes.md, color: Colors.primary,       fontWeight: '700' },

  // Bottom Tabs
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
