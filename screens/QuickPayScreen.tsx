import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  StatusBar, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'QuickPay'>;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

const PAYMENT_GATEWAYS = ['Sonali Bank', 'DBBL Nexus', 'bKash', 'Nagad', 'Rocket', 'Card'];

// ─── Mock result ──────────────────────────────────────────────────────────────
const MOCK_ROWS = [
  { serial: '1', quarter: '1/2025-2026', holdingTax: '87.50', wasteTax: '25.00', roadTax: '37.50', totalTax: '150.00', rebate: '0.00', fine: '0.00', interest: '0', payable: '172.50' },
  { serial: '2', quarter: '2/2025-2026', holdingTax: '87.50', wasteTax: '25.00', roadTax: '37.50', totalTax: '150.00', rebate: '0.00', fine: '5.00', interest: '2', payable: '157.00' },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────
function TableRow({ label, value, isHighlight }: { label: string; value: string; isHighlight?: boolean }) {
  return (
    <View style={[styles.tableRow, isHighlight && styles.tableRowHighlight]}>
      <Text style={[styles.tableLabel, isHighlight && styles.tableTextHighlight]}>{label}</Text>
      <Text style={[styles.tableValue, isHighlight && styles.tableTextHighlight]}>{value}</Text>
    </View>
  );
}

function SimpleDropdown({ value, options, onSelect }: { value: string; options: string[]; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ zIndex: open ? 99 : 1 }}>
      <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setOpen(v => !v)} activeOpacity={0.8}>
        <Text style={styles.dropdownValue}>{value}</Text>
        <MaterialIcons name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color={Colors.gray500} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownList}>
          {options.map(opt => (
            <TouchableOpacity key={opt} style={[styles.dropdownOption, opt === value && styles.dropdownOptionSelected]}
              onPress={() => { onSelect(opt); setOpen(false); }}>
              <Text style={[styles.dropdownOptionText, opt === value && styles.dropdownOptionTextSelected]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function QuickPayScreen({ navigation }: Props) {
  const [activeTab, setActiveTab]     = useState('holding');
  const [step, setStep]               = useState(1);   // 1=search, 2=results+payment
  const [holdingNo, setHoldingNo]     = useState('');
  const [loading, setLoading]         = useState(false);
  const [rows, setRows]               = useState<typeof MOCK_ROWS>([]);
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [showPayment, setShowPayment] = useState(false);
  const [gateway, setGateway]         = useState('Sonali Bank');
  const [taxAmount, setTaxAmount]     = useState('');
  const [totalPayable, setTotalPayable] = useState('');

  const handleSearch = () => {
    if (!holdingNo.trim()) { Alert.alert('ত্রুটি', 'ই-হোল্ডিং নম্বর লিখুন।'); return; }
    setLoading(true);
    setRows([]); setSelected(new Set()); setShowPayment(false);
    setTimeout(() => {
      setLoading(false);
      setRows(MOCK_ROWS);
      setStep(2);
    }, 900);
  };

  const toggleSelect = (serial: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(serial)) { next.delete(serial); } else { next.add(serial); }
      // Auto-calc total
      const total = MOCK_ROWS
        .filter(r => next.has(r.serial))
        .reduce((sum, r) => sum + parseFloat(r.payable), 0);
      setTaxAmount(total > 0 ? total.toFixed(2) : '');
      setTotalPayable(total > 0 ? total.toFixed(2) : '');
      return next;
    });
  };

  const handleNext = () => {
    if (selected.size === 0) { Alert.alert('ত্রুটি', 'অনুগ্রহ করে অন্তত একটি কোয়ার্টার নির্বাচন করুন।'); return; }
    setShowPayment(true);
    setTimeout(() => {}, 100);
  };

  const handleSubmit = () => {
    if (!gateway) { Alert.alert('ত্রুটি', 'পেমেন্ট গেটওয়ে নির্বাচন করুন।'); return; }
    Alert.alert('সফল', 'আপনার পেমেন্ট সফলভাবে জমা দেওয়া হয়েছে।', [
      { text: 'ঠিক আছে', onPress: () => navigation.navigate('Dashboard') },
    ]);
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

        {/* ── Search card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>কুইক পে</Text>
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

        {/* ── Results ── */}
        {rows.length > 0 && rows.map(row => (
          <View key={row.serial} style={styles.resultCard}>
            <TableRow label="ক্রমিক নং"            value={row.serial} />
            <TableRow label="কোয়ার্টার"             value={row.quarter} />
            <TableRow label="হোল্ডিং কর"            value={row.holdingTax} />
            <TableRow label="ময়লা ও নিষ্কাশন রেইট" value={row.wasteTax} />
            <TableRow label="সড়ক বাড়ি রেইট"        value={row.roadTax} />
            <TableRow label="মোট কর"                value={row.totalTax} />
            <TableRow label="রিবেট"                  value={row.rebate} />
            <TableRow label="জরিমানা"               value={row.fine} />
            <TableRow label="সুদ"                    value={row.interest} />
            <TableRow label="প্রদেয়"                value={row.payable} isHighlight />

            {/* Select row with checkbox */}
            <View style={styles.selectRow}>
              <Text style={styles.selectLabel}>নির্বাচন করুন</Text>
              <TouchableOpacity
                style={[styles.checkbox, selected.has(row.serial) && styles.checkboxChecked]}
                onPress={() => toggleSelect(row.serial)}
                activeOpacity={0.7}
              >
                {selected.has(row.serial) && <MaterialIcons name="check" size={14} color={Colors.white} />}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ── পরবর্তী ধাপ button ── */}
        {rows.length > 0 && !showPayment && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextBtnText}>পরবর্তী ধাপ</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.white} />
          </TouchableOpacity>
        )}

        {/* ── Payment section ── */}
        {showPayment && (
          <View style={styles.card}>
            <Text style={styles.sectionSubTitle}>পেমেন্ট তথ্য</Text>
            <View style={styles.divider} />

            {/* Selected summary */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>নির্বাচিত কোয়ার্টার</Text>
              <Text style={styles.summaryValue}>{selected.size} টি</Text>
            </View>

            <Text style={styles.fieldLabel}>Payment Gateway</Text>
            <SimpleDropdown value={gateway} options={PAYMENT_GATEWAYS} onSelect={setGateway} />

            <Text style={styles.fieldLabel}>Tax Amount</Text>
            <View style={[styles.inputWrapper, styles.inputReadOnly]}>
              <TextInput
                style={styles.textInput}
                value={taxAmount}
                onChangeText={setTaxAmount}
                keyboardType="numeric"
                placeholderTextColor={Colors.gray400}
                editable={false}
              />
            </View>

            <Text style={styles.fieldLabel}>মোট প্রদেয়</Text>
            <View style={[styles.inputWrapper, styles.inputReadOnly]}>
              <TextInput
                style={styles.textInput}
                value={totalPayable}
                onChangeText={setTotalPayable}
                keyboardType="numeric"
                placeholderTextColor={Colors.gray400}
                editable={false}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
              <MaterialIcons name="payment" size={20} color={Colors.white} />
              <Text style={styles.submitBtnText}>জমা করুন</Text>
            </TouchableOpacity>
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
  header: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 12 },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },

  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 16 },

  // Card
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary, textAlign: 'center', marginBottom: Spacing.md },
  sectionSubTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary, textAlign: 'center', marginBottom: Spacing.md },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  // Field
  fieldLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', marginBottom: 6, marginTop: Spacing.sm },
  inputWrapper: { backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, minHeight: 48, justifyContent: 'center', marginBottom: 4, overflow: 'hidden' },
  inputReadOnly: { backgroundColor: Colors.gray100, borderColor: Colors.gray200 },
  textInput: { paddingHorizontal: Spacing.md, paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary },

  // Search btn
  searchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 14, marginTop: Spacing.sm },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Result card (per quarter)
  resultCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, overflow: 'hidden', marginBottom: Spacing.sm, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },

  // Table rows
  tableRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: Spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200, backgroundColor: Colors.white },
  tableRowHighlight: { backgroundColor: Colors.primary },
  tableLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', flex: 1.4 },
  tableValue: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '600', flex: 1, textAlign: 'right' },
  tableTextHighlight: { color: Colors.white, fontWeight: '700' },

  // Select row
  selectRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: Spacing.md, backgroundColor: Colors.white },
  selectLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '600' },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: Colors.gray400, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },

  // Next btn
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 14, marginBottom: Spacing.md },
  nextBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Summary
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.sm, marginBottom: Spacing.sm },
  summaryLabel: { fontSize: FontSizes.sm, color: Colors.textSecondary, fontWeight: '500' },
  summaryValue: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '700' },

  // Dropdown
  dropdownTrigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, paddingHorizontal: Spacing.sm, paddingVertical: 12, marginBottom: 2 },
  dropdownValue: { fontSize: FontSizes.md, color: Colors.textPrimary, flex: 1 },
  dropdownList: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.gray300, borderRadius: BorderRadius.md, marginBottom: 4, overflow: 'hidden', zIndex: 99 },
  dropdownOption: { paddingVertical: 11, paddingHorizontal: Spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200 },
  dropdownOptionSelected: { backgroundColor: Colors.primaryLight },
  dropdownOptionText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  dropdownOptionTextSelected: { color: Colors.primary, fontWeight: '600' },

  // Submit
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 14, marginTop: Spacing.md },
  submitBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Bottom Tabs
  tabBar: { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
