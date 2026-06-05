import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, StatusBar, ScrollView, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BokeyaBiboroni'>;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Mock result data ──────────────────────────────────────────────────────────
interface BokeyaResult {
  quarter:       string;
  holdingTax:    string;
  wasteTax:      string;
  roadTax:       string;
  totalTax:      string;
  rebate:        string;
  fine:          string;
  interest:      string;
  totalFee:      string;
  receivedFee:   string;
  totalDueFee:   string;
}

const MOCK_DATA: BokeyaResult = {
  quarter:     '1/2025-2026',
  holdingTax:  '87.50',
  wasteTax:    '25.00',
  roadTax:     '37.50',
  totalTax:    '150.00',
  rebate:      '0.00',
  fine:        '0.00',
  interest:    '0',
  totalFee:    '150.00',
  receivedFee: '0.00',
  totalDueFee: '150.00',
};

// ─── Result row component ─────────────────────────────────────────────────────
function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={[styles.resultRow, highlight && styles.resultRowHighlight]}>
      <Text style={[styles.resultLabel, highlight && styles.resultLabelHighlight]}>{label}</Text>
      <Text style={[styles.resultValue, highlight && styles.resultValueHighlight]}>{value}</Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function BokeyaBiboroniScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('holding');
  const [holdingNo, setHoldingNo] = useState('');
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<BokeyaResult | null>(null);
  const [searched, setSearched]   = useState(false);

  const handleSearch = () => {
    if (!holdingNo.trim()) return;
    setLoading(true);
    setResult(null);
    // Simulate network call
    setTimeout(() => {
      setLoading(false);
      setResult(MOCK_DATA);
      setSearched(true);
    }, 1000);
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

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Search Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>বকেয়া বিবরণী</Text>
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
              : <>
                  <MaterialIcons name="search" size={20} color={Colors.white} />
                  <Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text>
                </>
            }
          </TouchableOpacity>
        </View>

        {/* ── Result Table ── */}
        {result && (
          <View style={styles.resultCard}>
            <ResultRow label="কোয়ার্টার"             value={result.quarter} />
            <ResultRow label="হোল্ডিং কর"            value={result.holdingTax} />
            <ResultRow label="ময়লা ও নিষ্কাশন রেইট" value={result.wasteTax} />
            <ResultRow label="সড়ক বাড়ি রেইট"        value={result.roadTax} />
            <ResultRow label="মোট কর"                value={result.totalTax} />
            <ResultRow label="রিবেট"                  value={result.rebate} />
            <ResultRow label="জরিমানা"               value={result.fine} />
            <ResultRow label="সুদ"                    value={result.interest} />
            <ResultRow label="মোট ফী"                value={result.totalFee} />
            <ResultRow label="প্রাপ্ত ফী"             value={result.receivedFee} />
            <ResultRow label="মোট বকেয়া ফী"          value={result.totalDueFee} highlight />
          </View>
        )}

        {/* No result */}
        {searched && !result && !loading && (
          <View style={styles.emptyBox}>
            <MaterialIcons name="search-off" size={44} color={Colors.gray400} />
            <Text style={styles.emptyText}>কোনো তথ্য পাওয়া যায়নি।</Text>
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
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === 'home') navigation.navigate('Dashboard');
              }}>
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

  fieldLabel: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', marginBottom: 6,
  },
  inputWrapper: {
    backgroundColor: Colors.gray200, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    minHeight: 48, justifyContent: 'center',
    marginBottom: Spacing.md, overflow: 'hidden',
  },
  textInput: {
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    fontSize: FontSizes.md, color: Colors.textPrimary,
  },
  searchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 14,
  },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Result card — full-width table
  resultCard: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    overflow: 'hidden', marginBottom: Spacing.md,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  resultRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13, paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray200,
    backgroundColor: Colors.white,
  },
  resultRowHighlight: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 0,
  },
  resultLabel: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', flex: 1.4,
  },
  resultLabelHighlight: { color: Colors.white, fontWeight: '700' },
  resultValue: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '600', flex: 1, textAlign: 'right',
  },
  resultValueHighlight: { color: Colors.white, fontWeight: '700' },

  // Empty state
  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, gap: 10 },
  emptyText: { fontSize: FontSizes.md, color: Colors.gray500 },

  // Bottom Tabs
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
