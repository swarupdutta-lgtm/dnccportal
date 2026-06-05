import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Modal,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'NewHolding'>;

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 4;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

const STEP_LABELS = ['ব্যক্তিগত', 'যোগাযোগ', 'সম্পত্তি', 'সংযুক্তি'];

// ─── Cascading Dropdown Data ───────────────────────────────────────────────────
const GENDER_OPTIONS   = ['পুরুষ', 'মহিলা', 'অন্যান্য'];
const LAND_USE_OPTIONS = ['খালি', 'আবাসিক', 'বাণিজ্যিক', 'শিল্প', 'মিশ্র'];
const ATTACHMENT_OPTIONS = ['মালিকানা দলিল', 'ক্রয় দলিল', 'ওয়ারিশ সনদ', 'অন্যান্য'];

// ─── Attachment Types ──────────────────────────────────────────────────────────
interface AttachmentEntry {
  id: string;
  type: string;       // selected from ATTACHMENT_OPTIONS
  uri: string;        // file uri
  name: string;       // file display name
  isImage: boolean;
}

// Zone → Ward → Sector → Area → Road  (cascading)
const CASCADE: Record<string, Record<string, Record<string, Record<string, string[]>>>> = {
  'অঞ্চল ১': {
    'ওয়ার্ড ১': {
      'সেক্টর এ': { 'ব্লক ১': ['রোড ১', 'রোড ২'], 'ব্লক ২': ['রোড ৩', 'রোড ৪'] },
      'সেক্টর বি': { 'ব্লক ৩': ['রোড ৫', 'রোড ৬'] },
    },
    'ওয়ার্ড ২': {
      'সেক্টর সি': { 'ব্লক ৪': ['রোড ৭', 'রোড ৮'] },
    },
  },
  'অঞ্চল ২': {
    'ওয়ার্ড ৩': {
      'সেক্টর ডি': { 'ব্লক ৫': ['রোড ৯', 'রোড ১০'] },
      'সেক্টর ই': { 'ব্লক ৬': ['রোড ১১'] },
    },
    'ওয়ার্ড ৪': {
      'সেক্টর এফ': { 'ব্লক ৭': ['রোড ১২', 'রোড ১৩'] },
    },
  },
  'অঞ্চল ৩': {
    'ওয়ার্ড ৫': {
      'সেক্টর জি': { 'ব্লক ৮': ['রোড ১৪'] },
    },
  },
  'অঞ্চল ৪': {
    'ওয়ার্ড ৬': {
      'সেক্টর এইচ': { 'ব্লক ৯': ['রোড ১৫', 'রোড ১৬'] },
    },
  },
};

const zonesOf = () => Object.keys(CASCADE);
const wardsOf  = (z: string) => z ? Object.keys(CASCADE[z] ?? {}) : [];
const sectorsOf = (z: string, w: string) => (z && w) ? Object.keys(CASCADE[z]?.[w] ?? {}) : [];
const areasOf  = (z: string, w: string, s: string) => (z && w && s) ? Object.keys(CASCADE[z]?.[w]?.[s] ?? {}) : [];
const roadsOf  = (z: string, w: string, s: string, a: string) => (z && w && s && a) ? (CASCADE[z]?.[w]?.[s]?.[a] ?? []) : [];

// ─── Reusable Components ───────────────────────────────────────────────────────

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {text}
      {required && <Text style={styles.required}> (*)</Text>}
    </Text>
  );
}

function StyledInput({
  value, onChangeText, placeholder, keyboardType, multiline, prefix,
}: {
  value: string; onChangeText: (v: string) => void;
  placeholder?: string; keyboardType?: any; multiline?: boolean; prefix?: string;
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
  value, options, onSelect, placeholder, disabled,
}: {
  value: string; options: string[]; onSelect: (v: string) => void;
  placeholder?: string; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ zIndex: open ? 99 : 1 }}>
      <TouchableOpacity
        style={[styles.dropdownTrigger, disabled && styles.dropdownDisabled]}
        onPress={() => !disabled && options.length > 0 && setOpen((v) => !v)}
        activeOpacity={disabled ? 1 : 0.8}
      >
        <Text style={[styles.dropdownValue, !value && styles.dropdownPlaceholder]}>
          {value || placeholder || 'নির্বাচন করুন'}
        </Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color={disabled ? Colors.gray300 : Colors.gray500}
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

function Divider() { return <View style={styles.divider} />; }

// ─── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <View style={styles.stepIndicatorWrapper}>
      {STEP_LABELS.map((label, idx) => {
        const stepNum = idx + 1;
        const done    = stepNum < current;
        const active  = stepNum === current;
        return (
          <React.Fragment key={stepNum}>
            {/* connector line */}
            {idx > 0 && (
              <View style={[styles.stepLine, (done || active) && styles.stepLineActive]} />
            )}
            <View style={styles.stepCol}>
              <View style={[
                styles.stepCircle,
                active && styles.stepCircleActive,
                done   && styles.stepCircleDone,
              ]}>
                {done
                  ? <MaterialIcons name="check" size={14} color={Colors.white} />
                  : <Text style={[styles.stepNum, active && styles.stepNumActive]}>{stepNum}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export function HoldingApplicationScreen({ navigation }: Props) {
  const [activeTab, setActiveTab]         = useState('holding');
  const [step, setStep]                   = useState(1);
  const scrollRef                         = useRef<ScrollView>(null);

  // Attachment state
  const [attachments, setAttachments]     = useState<AttachmentEntry[]>([]);
  const [pendingType, setPendingType]     = useState('');
  const [showTypeSheet, setShowTypeSheet] = useState(false);
  const [showPickerSheet, setShowPickerSheet] = useState(false);
  const [previewEntry, setPreviewEntry]   = useState<AttachmentEntry | null>(null);

  const [form, setForm] = useState({
    // Step 1 — Personal
    ownerNameBn: '', ownerNameEn: '',
    fatherNameBn: '', fatherNameEn: '',
    motherNameBn: '', motherNameEn: '',
    spouseNameBn: '', spouseNameEn: '',
    occupation: '', applicationDate: '', gender: '', address: '',
    // Step 2 — Contact
    mobile: '', altMobile: '', completionDate: '',
    nid: '', email: '', altEmail: '', otherId: '',
    // Step 3 — Property location
    eTin: '', propertyDesc: '',
    zone: '', ward: '', sector: '', area: '', road: '',
    landUse: '', totalArea: '',
    // Step 4 — Attachment
    remark: '',
  });

  const set = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Cascading reset helpers
  const setZone = (v: string) =>
    setForm((p) => ({ ...p, zone: v, ward: '', sector: '', area: '', road: '' }));
  const setWard = (v: string) =>
    setForm((p) => ({ ...p, ward: v, sector: '', area: '', road: '' }));
  const setSector = (v: string) =>
    setForm((p) => ({ ...p, sector: v, area: '', road: '' }));
  const setArea = (v: string) =>
    setForm((p) => ({ ...p, area: v, road: '' }));

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

  const validateStep = (): boolean => {
    if (step === 1 && (!form.ownerNameBn || !form.ownerNameEn || !form.applicationDate)) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে বাধ্যতামূলক (*) ক্ষেত্রগুলো পূরণ করুন।');
      return false;
    }
    if (step === 2 && (!form.mobile || !form.altMobile)) {
      Alert.alert('ত্রুটি', 'মোবাইল নম্বর পূরণ করুন।');
      return false;
    }
    if (step === 3 && (!form.zone || !form.ward || !form.sector || !form.area || !form.road)) {
      Alert.alert('ত্রুটি', 'সম্পত্তির সকল অবস্থান ক্ষেত্র পূরণ করুন।');
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    scrollToTop();
  };

  const goPrev = () => {
    setStep((s) => Math.max(s - 1, 1));
    scrollToTop();
  };

  const handleSubmit = () => {
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

  // ── Attachment helpers ────────────────────────────────────────────────────
  const openTypeSheet = () => setShowTypeSheet(true);

  const onTypeSelected = (type: string) => {
    setPendingType(type);
    setShowTypeSheet(false);
    setTimeout(() => setShowPickerSheet(true), 300);
  };

  const pickFromGallery = async () => {
    setShowPickerSheet(false);
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('অনুমতি প্রয়োজন', 'গ্যালারি অ্যাক্সেস অনুমতি দিন।'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      addAttachment(asset.uri, asset.fileName ?? 'image.jpg', true);
    }
  };

  const pickFromCamera = async () => {
    setShowPickerSheet(false);
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { Alert.alert('অনুমতি প্রয়োজন', 'ক্যামেরা অ্যাক্সেস অনুমতি দিন।'); return; }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      addAttachment(asset.uri, asset.fileName ?? 'photo.jpg', true);
    }
  };

  const pickDocument = async () => {
    setShowPickerSheet(false);
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      addAttachment(asset.uri, asset.name, false);
    }
  };

  const addAttachment = (uri: string, name: string, isImage: boolean) => {
    if (!pendingType) return;
    const entry: AttachmentEntry = {
      id: Date.now().toString(),
      type: pendingType,
      uri,
      name,
      isImage,
    };
    setAttachments((prev) => [...prev, entry]);
    setPendingType('');
  };

  const deleteAttachment = (id: string) => {
    Alert.alert('মুছুন', 'এই সংযুক্তিটি মুছতে চান?', [
      { text: 'না' },
      { text: 'হ্যাঁ', style: 'destructive', onPress: () =>
        setAttachments((prev) => prev.filter((a) => a.id !== id)) },
    ]);
  };

  // ── Step content renderers ──────────────────────────────────────────────────

  const renderStep1 = () => (
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
      <StyledInput value={form.applicationDate} onChangeText={set('applicationDate')} placeholder="dd/mm/yyyy" keyboardType="numeric" />

      <FieldLabel text="লিঙ্গ" />
      <SimpleDropdown value={form.gender} options={GENDER_OPTIONS} onSelect={set('gender')} placeholder="নির্বাচন করুন" />

      <FieldLabel text="ঠিকানা" />
      <StyledInput value={form.address} onChangeText={set('address')} multiline />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formCard}>
      <SectionHeader emoji="📞" title="যোগাযোগ তথ্য" />
      <Divider />

      <FieldLabel text="মোবাইল নম্বর" required />
      <StyledInput value={form.mobile} onChangeText={set('mobile')} keyboardType="phone-pad" prefix="+৮৮" />

      <FieldLabel text="বিকল্প যোগাযোগের নম্বর" required />
      <StyledInput value={form.altMobile} onChangeText={set('altMobile')} keyboardType="phone-pad" prefix="+৮৮" />

      <FieldLabel text="সমাপ্তির তারিখ" />
      <StyledInput value={form.completionDate} onChangeText={set('completionDate')} placeholder="dd/mm/yyyy" keyboardType="numeric" />

      <FieldLabel text="জাতীয় পরিচয়পত্র নম্বর" />
      <StyledInput value={form.nid} onChangeText={set('nid')} keyboardType="numeric" />

      <FieldLabel text="ই-মেইল আইডি (যদি থাকে)" />
      <StyledInput value={form.email} onChangeText={set('email')} keyboardType="email-address" />

      <FieldLabel text="বিকল্প ই-মেইল আইডি (যদি থাকে)" />
      <StyledInput value={form.altEmail} onChangeText={set('altEmail')} keyboardType="email-address" />

      <FieldLabel text="অন্যান্য পরিচয় পত্র নম্বর" />
      <StyledInput value={form.otherId} onChangeText={set('otherId')} />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formCard}>
      <SectionHeader emoji="👆" title="সম্পত্তির অবস্থান" />
      <Divider />

      <FieldLabel text="ই-টিন নম্বর (যদি থাকে)" />
      <StyledInput value={form.eTin} onChangeText={set('eTin')} />

      <FieldLabel text="সম্পত্তির সংক্ষিপ্ত বিবরণ" />
      <StyledInput value={form.propertyDesc} onChangeText={set('propertyDesc')} multiline />

      {/* Cascading dropdowns */}
      <FieldLabel text="অঞ্চল" required />
      <SimpleDropdown
        value={form.zone}
        options={zonesOf()}
        onSelect={setZone}
        placeholder="অঞ্চল নির্বাচন করুন"
      />

      <FieldLabel text="ওয়ার্ড" required />
      <SimpleDropdown
        value={form.ward}
        options={wardsOf(form.zone)}
        onSelect={setWard}
        placeholder={form.zone ? 'ওয়ার্ড নির্বাচন করুন' : 'আগে অঞ্চল নির্বাচন করুন'}
        disabled={!form.zone}
      />

      <FieldLabel text="সেক্টর/সেকশন" required />
      <SimpleDropdown
        value={form.sector}
        options={sectorsOf(form.zone, form.ward)}
        onSelect={setSector}
        placeholder={form.ward ? 'সেক্টর নির্বাচন করুন' : 'আগে ওয়ার্ড নির্বাচন করুন'}
        disabled={!form.ward}
      />

      <FieldLabel text="এরিয়া/ব্লক" required />
      <SimpleDropdown
        value={form.area}
        options={areasOf(form.zone, form.ward, form.sector)}
        onSelect={setArea}
        placeholder={form.sector ? 'এরিয়া নির্বাচন করুন' : 'আগে সেক্টর নির্বাচন করুন'}
        disabled={!form.sector}
      />

      <FieldLabel text="রোড" required />
      <SimpleDropdown
        value={form.road}
        options={roadsOf(form.zone, form.ward, form.sector, form.area)}
        onSelect={set('road')}
        placeholder={form.area ? 'রোড নির্বাচন করুন' : 'আগে এরিয়া নির্বাচন করুন'}
        disabled={!form.area}
      />

      <FieldLabel text="জমির ব্যবহারের ধরণ" />
      <SimpleDropdown value={form.landUse} options={LAND_USE_OPTIONS} onSelect={set('landUse')} placeholder="খালি" />

      <FieldLabel text="মোট আয়তন (বর্গফুট)" />
      <StyledInput value={form.totalArea} onChangeText={set('totalArea')} keyboardType="numeric" />
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.formCard}>
      <SectionHeader emoji="📎" title="সংযুক্তি" />
      <Divider />

      <FieldLabel text="মন্তব্য" />
      <StyledInput value={form.remark} onChangeText={set('remark')} multiline />

      {/* Add attachment button */}
      <TouchableOpacity style={styles.addAttachBtn} onPress={openTypeSheet} activeOpacity={0.8}>
        <MaterialIcons name="add-circle-outline" size={20} color={Colors.white} />
        <Text style={styles.addAttachBtnText}>সংযুক্তি যোগ করুন</Text>
      </TouchableOpacity>

      {/* Attachment list */}
      {attachments.length > 0 && (
        <View style={styles.attachList}>
          <Text style={styles.attachListTitle}>সংযুক্ত ফাইলসমূহ ({attachments.length})</Text>
          {attachments.map((entry) => (
            <View key={entry.id} style={styles.attachCard}>
              {/* Thumbnail or doc icon */}
              {entry.isImage ? (
                <TouchableOpacity onPress={() => setPreviewEntry(entry)}>
                  <Image source={{ uri: entry.uri }} style={styles.attachThumb} resizeMode="cover" />
                </TouchableOpacity>
              ) : (
                <View style={styles.attachDocIcon}>
                  <MaterialIcons name="insert-drive-file" size={28} color={Colors.primary} />
                </View>
              )}
              {/* Info */}
              <View style={styles.attachInfo}>
                <View style={styles.attachTypeBadge}>
                  <Text style={styles.attachTypeText}>{entry.type}</Text>
                </View>
                <Text style={styles.attachFileName} numberOfLines={1}>{entry.name}</Text>
              </View>
              {/* Delete */}
              <TouchableOpacity onPress={() => deleteAttachment(entry.id)} style={styles.attachDeleteBtn}>
                <MaterialIcons name="delete-outline" size={22} color={Colors.danger} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
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

      {/* ── Step indicator ── */}
      <View style={styles.stepWrapper}>
        <Text style={styles.formTitle}>নতুন হোল্ডিং এর আবেদন</Text>
        <StepIndicator current={step} />
        <Text style={styles.stepCounter}>ধাপ {step} / {TOTAL_STEPS}</Text>
      </View>

      {/* ── Scrollable form body ── */}
      <ScrollView
        ref={scrollRef}
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <View style={{ height: 12 }} />
      </ScrollView>

      {/* ── Wizard nav footer ── */}
      <View style={styles.wizardFooter}>
        {/* Previous */}
        <TouchableOpacity
          style={[styles.prevBtn, step === 1 && styles.btnDisabled]}
          onPress={goPrev}
          disabled={step === 1}
          activeOpacity={0.8}
        >
          <MaterialIcons name="chevron-left" size={20} color={step === 1 ? Colors.gray400 : Colors.primary} />
          <Text style={[styles.prevBtnText, step === 1 && styles.btnTextDisabled]}>পূর্ববর্তী</Text>
        </TouchableOpacity>

        {/* Step dots */}
        <View style={styles.dotRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View key={i} style={[styles.dot, i + 1 === step && styles.dotActive]} />
          ))}
        </View>

        {/* Next / Submit */}
        {step < TOTAL_STEPS ? (
          <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.8}>
            <Text style={styles.nextBtnText}>পরবর্তী</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>দাখিল করুন</Text>
            <MaterialIcons name="check" size={18} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>

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

      {/* ══ TYPE SELECTION BOTTOM SHEET ══ */}
      <Modal visible={showTypeSheet} transparent animationType="slide" onRequestClose={() => setShowTypeSheet(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowTypeSheet(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>সংযুক্তির ধরন নির্বাচন করুন</Text>
            {ATTACHMENT_OPTIONS.map((opt) => (
              <TouchableOpacity key={opt} style={styles.sheetOption} onPress={() => onTypeSelected(opt)} activeOpacity={0.7}>
                <MaterialIcons name="label-outline" size={20} color={Colors.primary} />
                <Text style={styles.sheetOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.sheetCancelBtn} onPress={() => setShowTypeSheet(false)}>
              <Text style={styles.sheetCancelText}>বাতিল</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ══ SOURCE PICKER BOTTOM SHEET ══ */}
      <Modal visible={showPickerSheet} transparent animationType="slide" onRequestClose={() => setShowPickerSheet(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowPickerSheet(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>ফাইল উৎস নির্বাচন করুন</Text>
            {pendingType ? (
              <View style={styles.pendingTypeBadge}>
                <MaterialIcons name="label" size={14} color={Colors.primary} />
                <Text style={styles.pendingTypeText}>{pendingType}</Text>
              </View>
            ) : null}

            <View style={styles.pickerIconRow}>
              {/* Gallery */}
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromGallery} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialIcons name="photo-library" size={30} color="#1565C0" />
                </View>
                <Text style={styles.pickerOptionLabel}>গ্যালারি</Text>
              </TouchableOpacity>

              {/* Camera */}
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromCamera} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialIcons name="camera-alt" size={30} color={Colors.primary} />
                </View>
                <Text style={styles.pickerOptionLabel}>ক্যামেরা</Text>
              </TouchableOpacity>

              {/* Document */}
              <TouchableOpacity style={styles.pickerOption} onPress={pickDocument} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialIcons name="folder-open" size={30} color="#E65100" />
                </View>
                <Text style={styles.pickerOptionLabel}>ফাইল</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sheetCancelBtn} onPress={() => setShowPickerSheet(false)}>
              <Text style={styles.sheetCancelText}>বাতিল</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ══ IMAGE PREVIEW MODAL ══ */}
      <Modal visible={!!previewEntry} transparent animationType="fade" onRequestClose={() => setPreviewEntry(null)}>
        <View style={styles.previewBackdrop}>
          <TouchableOpacity style={styles.previewClose} onPress={() => setPreviewEntry(null)}>
            <MaterialIcons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          {previewEntry?.isImage && (
            <Image source={{ uri: previewEntry.uri }} style={styles.previewImage} resizeMode="contain" />
          )}
          <View style={styles.previewFooter}>
            <Text style={styles.previewTypeBadge}>{previewEntry?.type}</Text>
            <Text style={styles.previewFileName}>{previewEntry?.name}</Text>
            <TouchableOpacity
              style={styles.previewDeleteBtn}
              onPress={() => { deleteAttachment(previewEntry!.id); setPreviewEntry(null); }}
            >
              <MaterialIcons name="delete" size={20} color={Colors.white} />
              <Text style={styles.previewDeleteText}>মুছুন</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

  // Step wrapper
  stepWrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  formTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepCounter: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },

  // Step Indicator
  stepIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  stepCol: { alignItems: 'center', gap: 4 },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.gray300,
    marginBottom: 18,
    marginHorizontal: 2,
  },
  stepLineActive: { backgroundColor: Colors.primary },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  stepCircleDone:   { borderColor: Colors.primary, backgroundColor: Colors.primary },
  stepNum: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.gray400 },
  stepNumActive: { color: Colors.white },
  stepLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', maxWidth: 52 },
  stepLabelActive: { color: Colors.primary, fontWeight: '700' },

  // Body
  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 8 },

  // Card
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // Section header
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  sectionHeaderEmoji: { fontSize: 20 },
  sectionHeaderText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  // Field label
  fieldLabel: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', marginTop: Spacing.sm, marginBottom: 4,
  },
  required: { color: Colors.danger, fontWeight: '700' },

  // Input
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.gray200, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300, minHeight: 44,
    marginBottom: 2, overflow: 'hidden',
  },
  inputWrapperMulti: { alignItems: 'flex-start', minHeight: 72 },
  prefixBox: {
    paddingHorizontal: 12, paddingVertical: 10,
    backgroundColor: Colors.gray200, justifyContent: 'center',
    alignSelf: 'stretch', alignItems: 'center',
    borderRightWidth: 1, borderRightColor: Colors.gray300,
  },
  prefixText: { fontSize: FontSizes.md, color: Colors.textPrimary, fontWeight: '600' },
  textInput: {
    flex: 1, paddingHorizontal: Spacing.sm,
    paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary,
  },
  textInputMulti: { textAlignVertical: 'top', paddingTop: 10 },

  // Dropdown
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.gray200, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    paddingHorizontal: Spacing.sm, paddingVertical: 12, marginBottom: 2,
  },
  dropdownDisabled: { backgroundColor: Colors.gray100, borderColor: Colors.gray200 },
  dropdownValue: { fontSize: FontSizes.md, color: Colors.textPrimary, flex: 1 },
  dropdownPlaceholder: { color: Colors.gray500 },
  dropdownList: {
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.gray300,
    borderRadius: BorderRadius.md, marginBottom: 4, overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 11, paddingHorizontal: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200,
  },
  dropdownOptionSelected: { backgroundColor: Colors.primaryLight },
  dropdownOptionText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  dropdownOptionTextSelected: { color: Colors.primary, fontWeight: '600' },

  // File
  fileRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm, gap: 8 },
  chooseFileBtn: {
    backgroundColor: Colors.gray200, paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gray300,
  },
  chooseFileBtnText: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '600' },
  fileNameBox: {
    flex: 1, backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.sm,
    borderWidth: 1, borderColor: Colors.gray300, paddingVertical: 10, paddingHorizontal: 10,
  },
  fileNameText: { fontSize: FontSizes.sm, color: Colors.gray500 },
  attachBtn: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 13, alignItems: 'center', marginTop: Spacing.md,
  },
  attachBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Wizard footer
  wizardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  prevBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    paddingVertical: 10, paddingHorizontal: 14,
    borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  prevBtnText: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },
  btnDisabled: { borderColor: Colors.gray300 },
  btnTextDisabled: { color: Colors.gray400 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: BorderRadius.md,
  },
  nextBtnText: { fontSize: FontSizes.sm, color: Colors.white, fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: BorderRadius.md,
  },
  submitBtnText: { fontSize: FontSizes.sm, color: Colors.white, fontWeight: '700' },
  dotRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.gray300 },
  dotActive: { backgroundColor: Colors.primary, width: 18 },

  // Bottom Tab
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },

  // ── Add Attachment Button ────────────────────────────────────────────────
  addAttachBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 13, marginTop: Spacing.md,
  },
  addAttachBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // ── Attachment List ───────────────────────────────────────────────────────
  attachList: { marginTop: Spacing.md },
  attachListTitle: {
    fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  attachCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    padding: Spacing.sm, marginBottom: Spacing.sm, gap: Spacing.sm,
  },
  attachThumb: { width: 52, height: 52, borderRadius: BorderRadius.sm },
  attachDocIcon: {
    width: 52, height: 52, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray100, justifyContent: 'center', alignItems: 'center',
  },
  attachInfo: { flex: 1, gap: 4 },
  attachTypeBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.primary + '22',
    borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2,
  },
  attachTypeText: { fontSize: FontSizes.xs, color: Colors.primary, fontWeight: '600' },
  attachFileName: { fontSize: FontSizes.sm, color: Colors.textPrimary },
  attachDeleteBtn: { padding: 4 },

  // ── Bottom Sheet ──────────────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: Spacing.lg, paddingBottom: 32, paddingTop: 12,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: Colors.gray300, alignSelf: 'center', marginBottom: 16,
  },
  sheetTitle: {
    fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: Spacing.md, textAlign: 'center',
  },
  pendingTypeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'center', backgroundColor: Colors.primaryLight,
    borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 12,
  },
  pendingTypeText: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },
  sheetOption: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200,
  },
  sheetOptionText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  sheetCancelBtn: {
    marginTop: Spacing.md, backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.md, paddingVertical: 13, alignItems: 'center',
  },
  sheetCancelText: { fontSize: FontSizes.md, color: Colors.textSecondary, fontWeight: '600' },

  // ── Picker Icon Row ───────────────────────────────────────────────────────
  pickerIconRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginVertical: Spacing.lg,
  },
  pickerOption: { alignItems: 'center', gap: 8 },
  pickerIconCircle: {
    width: 72, height: 72, borderRadius: 36,
    justifyContent: 'center', alignItems: 'center',
  },
  pickerOptionLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500' },

  // ── Image Preview ─────────────────────────────────────────────────────────
  previewBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center', alignItems: 'center',
  },
  previewClose: {
    position: 'absolute', top: 48, right: 20, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 4,
  },
  previewImage: { width: '92%', height: '65%' },
  previewFooter: {
    position: 'absolute', bottom: 40, left: 0, right: 0,
    alignItems: 'center', gap: 8,
  },
  previewTypeBadge: {
    backgroundColor: Colors.primary, borderRadius: 6,
    paddingHorizontal: 12, paddingVertical: 4,
    color: Colors.white, fontSize: FontSizes.sm, fontWeight: '700',
  },
  previewFileName: { color: Colors.white, fontSize: FontSizes.sm },
  previewDeleteBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.danger, borderRadius: BorderRadius.md,
    paddingVertical: 10, paddingHorizontal: 20, marginTop: 4,
  },
  previewDeleteText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
});