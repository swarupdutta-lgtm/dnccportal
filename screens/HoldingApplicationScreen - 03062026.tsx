import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'NewHolding'>;

// ─── Bottom Tabs ───────────────────────────────────────────────────────────────
const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Dropdown Options ──────────────────────────────────────────────────────────
const GENDER_OPTIONS    = ['পুরুষ', 'মহিলা', 'অন্যান্য'];
const ZONE_OPTIONS      = ['অঞ্চল ১', 'অঞ্চল ২', 'অঞ্চল ৩', 'অঞ্চল ৪'];
const WARD_OPTIONS      = ['ওয়ার্ড ১', 'ওয়ার্ড ২', 'ওয়ার্ড ৩'];
const SECTOR_OPTIONS    = ['সেক্টর ১', 'সেক্টর ২', 'সেক্টর ৩'];
const AREA_OPTIONS      = ['এরিয়া/ব্লক ১', 'এরিয়া/ব্লক ২', 'এরিয়া/ব্লক ৩'];
const ROAD_OPTIONS      = ['রোড ১', 'রোড ২', 'রোড ৩'];
const LAND_USE_OPTIONS  = ['খালি', 'আবাসিক', 'বাণিজ্যিক', 'শিল্প', 'মিশ্র'];
const ATTACHMENT_OPTIONS = ['মালিকানা দলিল', 'ক্রয় দলিল', 'ওয়ারিশ সনদ', 'অন্যান্য'];

// ─── Reusable Field Components ─────────────────────────────────────────────────

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {text}
      {required && <Text style={styles.required}> (*)</Text>}
    </Text>
  );
}

function StyledInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  prefix,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
  prefix?: string;
}) {
  return (
    <View style={[styles.inputWrapper, multiline && styles.inputWrapperMulti]}>
      {prefix ? (
        <View style={styles.prefixBox}>
          <Text style={styles.prefixText}>{prefix}</Text>
        </View>
      ) : null}
      <TextInput
        style={[styles.textInput, multiline && styles.textInputMulti]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray400}
        keyboardType={keyboardType ?? 'default'}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );
}

function SimpleDropdown({
  value,
  options,
  onSelect,
  placeholder,
}: {
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.8}
      >
        <Text style={[styles.dropdownValue, !value && styles.dropdownPlaceholder]}>
          {value || placeholder || 'নির্বাচন করুন'}
        </Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color={Colors.gray500}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownList}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.dropdownOption, opt === value && styles.dropdownOptionSelected]}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[styles.dropdownOptionText, opt === value && styles.dropdownOptionTextSelected]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionHeaderEmoji}>{emoji}</Text>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export function HoldingApplicationScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('holding');
  const [fileName, setFileName]   = useState('No File Chosen');

  const [form, setForm] = useState({
    // Personal
    ownerNameBn:    '',
    ownerNameEn:    '',
    fatherNameBn:   '',
    fatherNameEn:   '',
    motherNameBn:   '',
    motherNameEn:   '',
    spouseNameBn:   '',
    spouseNameEn:   '',
    occupation:     '',
    applicationDate:'',
    gender:         '',
    address:        '',
    // Contact
    mobile:         '',
    altMobile:      '',
    completionDate: '',
    nid:            '',
    email:          '',
    altEmail:       '',
    otherId:        '',
    // Property location
    eTin:           '',
    propertyDesc:   '',
    zone:           '',
    ward:           '',
    sector:         '',
    area:           '',
    road:           '',
    // Property details & attachment
    landUse:        '',
    totalArea:      '',
    attachmentDesc: '',
    remark:         '',
  });

  const set = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!form.ownerNameBn || !form.ownerNameEn || !form.mobile || !form.applicationDate) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে সকল বাধ্যতামূলক (*) ক্ষেত্র পূরণ করুন।');
      return;
    }
    Alert.alert('সফল', 'আপনার আবেদন সফলভাবে জমা দেওয়া হয়েছে।', [
      { text: 'ঠিক আছে', onPress: () => navigation.goBack() },
    ]);
  };

  const handleCancel = () => {
    Alert.alert('বাতিল', 'আপনি কি আবেদন বাতিল করতে চান?', [
      { text: 'না' },
      { text: 'হ্যাঁ', onPress: () => navigation.goBack() },
    ]);
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

      {/* ── Form Body ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form title */}
        <Text style={styles.formTitle}>নতুন হোল্ডিং এর আবেদন</Text>

        {/* ══════════════════════════════════════════
            SECTION 1 — ব্যক্তিগত বিবরণ
        ══════════════════════════════════════════ */}
        <View style={styles.formCard}>
          <SectionHeader emoji="🖐" title="ব্যক্তিগত বিবরণ" />
          <Divider />

          <FieldLabel text="এসেসি - মালিক / দখলকারের নাম (বাংলা)" required />
          <StyledInput value={form.ownerNameBn} onChangeText={set('ownerNameBn')} />

          <FieldLabel text="এসেসি - মালিক / দখলকারের নাম (ইংরেজি)" required />
          <StyledInput value={form.ownerNameEn} onChangeText={set('ownerNameEn')} />

          <FieldLabel text="পিতার নাম (বাংলা)" />
          <StyledInput value={form.fatherNameBn} onChangeText={set('fatherNameBn')} />

          <FieldLabel text="পিতার নাম (ইংরেজি)" />
          <StyledInput value={form.fatherNameEn} onChangeText={set('fatherNameEn')} />

          <FieldLabel text="মাতার নাম (বাংলা)" />
          <StyledInput value={form.motherNameBn} onChangeText={set('motherNameBn')} />

          <FieldLabel text="মাতার নাম (ইংরেজি)" />
          <StyledInput value={form.motherNameEn} onChangeText={set('motherNameEn')} />

          <FieldLabel text="স্বামীর / স্ত্রীর নাম (বাংলা)" />
          <StyledInput value={form.spouseNameBn} onChangeText={set('spouseNameBn')} />

          <FieldLabel text="স্বামীর / স্ত্রীর নাম (ইংরেজি)" />
          <StyledInput value={form.spouseNameEn} onChangeText={set('spouseNameEn')} />

          <FieldLabel text="পেশা" />
          <StyledInput value={form.occupation} onChangeText={set('occupation')} />

          <FieldLabel text="আবেদনের তারিখ" required />
          <StyledInput
            value={form.applicationDate}
            onChangeText={set('applicationDate')}
            placeholder="dd/mm/yyyy"
            keyboardType="numeric"
          />

          <FieldLabel text="লিঙ্গ" />
          <SimpleDropdown
            value={form.gender}
            options={GENDER_OPTIONS}
            onSelect={set('gender')}
            placeholder="নির্বাচন করুন"
          />

          <FieldLabel text="ঠিকানা" />
          <StyledInput value={form.address} onChangeText={set('address')} multiline />
        </View>

        {/* ══════════════════════════════════════════
            SECTION 2 — যোগাযোগ তথ্য
        ══════════════════════════════════════════ */}
        <View style={styles.formCard}>
          <SectionHeader emoji="📞" title="যোগাযোগ তথ্য" />
          <Divider />

          <FieldLabel text="মোবাইল নম্বর" required />
          <StyledInput
            value={form.mobile}
            onChangeText={set('mobile')}
            keyboardType="phone-pad"
            prefix="+৮৮"
          />

          <FieldLabel text="বিকল্প যোগাযোগের নম্বর" required />
          <StyledInput
            value={form.altMobile}
            onChangeText={set('altMobile')}
            keyboardType="phone-pad"
            prefix="+৮৮"
          />

          <FieldLabel text="সমাপ্তির তারিখ" />
          <StyledInput
            value={form.completionDate}
            onChangeText={set('completionDate')}
            placeholder="dd/mm/yyyy"
            keyboardType="numeric"
          />

          <FieldLabel text="জাতীয় পরিচয়পত্র নম্বর" />
          <StyledInput value={form.nid} onChangeText={set('nid')} keyboardType="numeric" />

          <FieldLabel text="ই-মেইল আইডি (যদি থাকে)" />
          <StyledInput value={form.email} onChangeText={set('email')} keyboardType="email-address" />

          <FieldLabel text="বিকল্প ই-মেইল আইডি (যদি থাকে)" />
          <StyledInput value={form.altEmail} onChangeText={set('altEmail')} keyboardType="email-address" />

          <FieldLabel text="অন্যান্য পরিচয় পত্র নম্বর" />
          <StyledInput value={form.otherId} onChangeText={set('otherId')} />
        </View>

        {/* ══════════════════════════════════════════
            SECTION 3 — সম্পত্তির অবস্থান
        ══════════════════════════════════════════ */}
        <View style={styles.formCard}>
          <SectionHeader emoji="👆" title="সম্পত্তির অবস্থান" />
          <Divider />

          <FieldLabel text="ই-টিন নম্বর (যদি থাকে)" />
          <StyledInput value={form.eTin} onChangeText={set('eTin')} />

          <FieldLabel text="সম্পত্তির সংক্ষিপ্ত বিবরণ" />
          <StyledInput value={form.propertyDesc} onChangeText={set('propertyDesc')} multiline />

          <FieldLabel text="অঞ্চল" required />
          <SimpleDropdown value={form.zone} options={ZONE_OPTIONS} onSelect={set('zone')} placeholder="অঞ্চল" />

          <FieldLabel text="ওয়ার্ড" required />
          <SimpleDropdown value={form.ward} options={WARD_OPTIONS} onSelect={set('ward')} placeholder="ওয়ার্ড" />

          <FieldLabel text="সেক্টর/সেকশন" required />
          <SimpleDropdown value={form.sector} options={SECTOR_OPTIONS} onSelect={set('sector')} placeholder="সেক্টর" />

          <FieldLabel text="এরিয়া/ব্লক" required />
          <SimpleDropdown value={form.area} options={AREA_OPTIONS} onSelect={set('area')} placeholder="এরিয়া/ব্লক" />

          <FieldLabel text="রোড" required />
          <SimpleDropdown value={form.road} options={ROAD_OPTIONS} onSelect={set('road')} placeholder="রোড" />

          <FieldLabel text="জমির ব্যবহারের ধরণ" />
          <SimpleDropdown value={form.landUse} options={LAND_USE_OPTIONS} onSelect={set('landUse')} placeholder="খালি" />

          <FieldLabel text="মোট আয়তন (বর্গফুট)" />
          <StyledInput value={form.totalArea} onChangeText={set('totalArea')} keyboardType="numeric" />
        </View>

        {/* ══════════════════════════════════════════
            SECTION 4 — সংযুক্তি
        ══════════════════════════════════════════ */}
        <View style={styles.formCard}>
          <SectionHeader emoji="👆" title="সংযুক্তি" />
          <Divider />

          <FieldLabel text="সংযুক্তির বর্ণনা" />
          <SimpleDropdown
            value={form.attachmentDesc}
            options={ATTACHMENT_OPTIONS}
            onSelect={set('attachmentDesc')}
            placeholder="মালিকানা দলিল"
          />

          <FieldLabel text="মন্তব্য" />
          <StyledInput value={form.remark} onChangeText={set('remark')} multiline />

          {/* File Chooser Row */}
          <View style={styles.fileRow}>
            <TouchableOpacity style={styles.chooseFileBtn}>
              <Text style={styles.chooseFileBtnText}>Choose File</Text>
            </TouchableOpacity>
            <View style={styles.fileNameBox}>
              <Text style={styles.fileNameText} numberOfLines={1}>{fileName}</Text>
            </View>
          </View>

          {/* Attach Button */}
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.8}>
            <Text style={styles.attachBtnText}>সংযুক্ত করুন</Text>
          </TouchableOpacity>
        </View>

        {/* ══════════════════════════════════════════
            ACTION BUTTONS — দাখিল করুন / বাতিল করুন
        ══════════════════════════════════════════ */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>দাখিল করুন</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>বাতিল করুন</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
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
  root: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },

  // Body
  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.lg },

  // Form title
  formTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  // Card
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // Section header
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  sectionHeaderEmoji: { fontSize: 20 },
  sectionHeaderText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginBottom: Spacing.md,
  },

  // Field label
  fieldLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  required: { color: Colors.danger, fontWeight: '700' },

  // Input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray300,
    minHeight: 44,
    marginBottom: 2,
    overflow: 'hidden',
  },
  inputWrapperMulti: {
    alignItems: 'flex-start',
    minHeight: 72,
  },
  prefixBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.gray200,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.gray300,
  },
  prefixText: { fontSize: FontSizes.md, color: Colors.textPrimary, fontWeight: '600' },
  textInput: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 10,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  textInputMulti: { textAlignVertical: 'top', paddingTop: 10 },

  // Dropdown
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray300,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 12,
    marginBottom: 2,
  },
  dropdownValue: { fontSize: FontSizes.md, color: Colors.textPrimary, flex: 1 },
  dropdownPlaceholder: { color: Colors.gray500 },
  dropdownList: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    marginBottom: 4,
    overflow: 'hidden',
    zIndex: 99,
  },
  dropdownOption: {
    paddingVertical: 11,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray200,
  },
  dropdownOptionSelected: { backgroundColor: Colors.primaryLight },
  dropdownOptionText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  dropdownOptionTextSelected: { color: Colors.primary, fontWeight: '600' },

  // File chooser
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 8,
  },
  chooseFileBtn: {
    backgroundColor: Colors.gray200,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  chooseFileBtnText: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '600' },
  fileNameBox: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.gray300,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fileNameText: { fontSize: FontSizes.sm, color: Colors.gray500 },

  // Attach button
  attachBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  attachBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 4,
    marginBottom: 4,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
  cancelBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Bottom Tab
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
