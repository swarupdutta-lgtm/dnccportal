import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  StatusBar, ScrollView, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'OnlinePaymentDetails'>;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_RECORDS = [
  {
    serial:      '১',
    date:        '১৮-০৯-২০২৮\n০০:০০:০০',
    txnNo:       '328077212',
    txnType:     'Holding Tax',
    holdingNo:   '30990004988572017',
    totalFee:    '56760.00',
    txnStatus:   '6811.20',
    type:        'DUTCH AGENT',
  },
  {
    serial:      '২',
    date:        '২২-১১-২০২৭\n১৪:৩০:০০',
    txnNo:       '219084561',
    txnType:     'Holding Tax',
    holdingNo:   '30990004988572017',
    totalFee:    '48500.00',
    txnStatus:   '4850.00',
    type:        'ONLINE',
  },
];

// ─── Row component ─────────────────────────────────────────────────────────────
function DataRow({
  label, value, isLink, isHighlight,
}: {
  label: string; value: string; isLink?: boolean; isHighlight?: boolean;
}) {
  return (
    <View style={[styles.dataRow, isHighlight && styles.dataRowHighlight]}>
      <Text style={[styles.dataLabel, isHighlight && styles.dataLabelHL]}>{label}</Text>
      <Text
        style={[
          styles.dataValue,
          isLink      && styles.dataValueLink,
          isHighlight && styles.dataValueHL,
        ]}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function OnlinePaymentDetailsScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('holding');
  const [holdingNo, setHoldingNo] = useState('');
  const [loading, setLoading]     = useState(false);
  const [records, setRecords]     = useState<typeof MOCK_RECORDS>([]);
  const [searched, setSearched]   = useState(false);

  const handleSearch = () => {
    if (!holdingNo.trim()) return;
    setLoading(true);
    setRecords([]);
    setTimeout(() => {
      setLoading(false);
      setRecords(MOCK_RECORDS);
      setSearched(true);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
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

      <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* ── Search Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>অনলাইন কর পরিশোধের বিবরণ</Text>
          <View style={styles.divider} />

          <Text style={styles.fieldLabel}>ই-হোল্ডিং নম্বর</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={holdingNo}
              onChangeText={setHoldingNo}
              keyboardType="numeric"
              placeholderTextColor={Colors.gray400}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} activeOpacity={0.8}>
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <><MaterialIcons name="search" size={20} color={Colors.white} /><Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text></>
            }
          </TouchableOpacity>
        </View>

        {/* ── Result Cards ── */}
        {records.map((rec, idx) => (
          <View key={rec.txnNo} style={styles.resultCard}>

            {/* Card header — serial badge */}
            <View style={styles.resultCardHeader}>
              <Text style={styles.resultCardHeaderText}>লেনদেন # {rec.serial}</Text>
            </View>

            <DataRow label="ক্রমিক নং"        value={rec.serial} />
            <DataRow label="তারিখ"             value={rec.date} />
            <DataRow label="লেনদেন নম্বর"      value={rec.txnNo}    isLink />
            <DataRow label="লেনদেনের ধরণ"      value={rec.txnType} />
            <DataRow label="ই-হোল্ডিং নম্বর"   value={rec.holdingNo} />
            <DataRow label="মোট ফি"            value={rec.totalFee} />
            <DataRow label="লেনদেনের স্থিতি"   value={rec.txnStatus} isHighlight />
            <DataRow label="ধরণ"               value={rec.type} />
          </View>
        ))}

        {/* Empty state */}
        {searched && records.length === 0 && !loading && (
          <View style={styles.emptyBox}>
            <MaterialIcons name="receipt-long" size={44} color={Colors.gray400} />
            <Text style={styles.emptyText}>কোনো পরিশোধের তথ্য পাওয়া যায়নি।</Text>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
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
      </View>
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
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },
  fieldLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', marginBottom: 6 },
  inputWrapper: {
    backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    minHeight: 48, justifyContent: 'center',
    marginBottom: Spacing.md, overflow: 'hidden',
  },
  textInput: { paddingHorizontal: Spacing.md, paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary },
  searchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 14,
  },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Result card
  resultCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    overflow: 'hidden', marginBottom: Spacing.md,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  resultCardHeader: {
    backgroundColor: Colors.primary,
    paddingVertical: 10, paddingHorizontal: Spacing.md,
  },
  resultCardHeaderText: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '700' },

  // Data rows
  dataRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray200,
    backgroundColor: Colors.white,
    gap: 12,
  },
  dataRowHighlight: { backgroundColor: Colors.primaryLight },
  dataLabel: {
    fontSize: FontSizes.sm, color: Colors.textSecondary,
    fontWeight: '600', flex: 1.2,
  },
  dataLabelHL: { color: Colors.primary, fontWeight: '700' },
  dataValue: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', flex: 1.4, textAlign: 'right',
  },
  dataValueLink: { color: '#1565C0', fontWeight: '600', textDecorationLine: 'underline' },
  dataValueHL:   { color: Colors.primary, fontWeight: '700' },

  // Empty
  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, gap: 10 },
  emptyText: { fontSize: FontSizes.md, color: Colors.gray500 },

  // Tabs
  tabBar: { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
