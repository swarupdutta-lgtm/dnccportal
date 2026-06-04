import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert, StatusBar, Modal, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'Nayabadi'>;

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_STEPS   = 2;
const STEP_LABELS   = ['আবেদন তথ্য', 'পেমেন্ট ও সংযুক্তি'];

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

const PAYMENT_METHODS = ['DBBL Nexus', 'bKash', 'Nagad', 'Rocket', 'Card'];

// ─── Cascading Data ───────────────────────────────────────────────────────────
const CASCADE: Record<string, Record<string, Record<string, Record<string, string[]>>>> = {
  '১ মিরপুর': {
    'ওয়ার্ড ১': { 'সেক্টর এ': { 'ব্লক ১': ['রোড ১', 'রোড ২'], 'ব্লক ২': ['রোড ৩'] } },
    'ওয়ার্ড ২': { 'সেক্টর বি': { 'ব্লক ৩': ['রোড ৪', 'রোড ৫'] } },
  },
  '২ মিরপুর': {
    'ওয়ার্ড ৩': { 'সেক্টর সি': { 'ব্লক ৪': ['রোড ৬', 'রোড ৭'] }, 'সেক্টর ডি': { 'ব্লক ৫': ['রোড ৮'] } },
    'ওয়ার্ড ৪': { 'সেক্টর ই': { 'ব্লক ৬': ['রোড ৯', 'রোড ১০'] } },
  },
  'কাফরুল': {
    'ওয়ার্ড ৫': { 'সেক্টর এফ': { 'ব্লক ৭': ['রোড ১১', 'রোড ১২'] } },
  },
  'পল্লবী': {
    'ওয়ার্ড ৬': { 'সেক্টর জি': { 'ব্লক ৮': ['রোড ১৩', 'রোড ১৪'] } },
  },
};

const zonesOf   = () => Object.keys(CASCADE);
const wardsOf   = (z: string) => z ? Object.keys(CASCADE[z] ?? {}) : [];
const sectorsOf = (z: string, w: string) => (z && w) ? Object.keys(CASCADE[z]?.[w] ?? {}) : [];
const areasOf   = (z: string, w: string, s: string) => (z && w && s) ? Object.keys(CASCADE[z]?.[w]?.[s] ?? {}) : [];
const roadsOf   = (z: string, w: string, s: string, a: string) => (z && w && s && a) ? (CASCADE[z]?.[w]?.[s]?.[a] ?? []) : [];

// ─── Attachment Types ─────────────────────────────────────────────────────────
interface AttachmentEntry {
  id: string; uri: string; name: string; isImage: boolean;
}

interface AttachmentSection {
  key: string; label: string;
  checked: boolean; expanded: boolean;
  aid: string; remark: string;
  files: AttachmentEntry[];
}

const INITIAL_SECTIONS: AttachmentSection[] = [
  { key: 'a1', label: 'ল্যান্ড ট্যাক্স/ভূমি কর রিশদ', checked: false, expanded: false, aid: '', remark: '', files: [] },
];

// ─── Reusable Components ──────────────────────────────────────────────────────
function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {text}{required && <Text style={styles.required}> (*)</Text>}
    </Text>
  );
}

function StyledInput({ value, onChangeText, placeholder, keyboardType, multiline, editable = true }: {
  value: string; onChangeText?: (v: string) => void; placeholder?: string;
  keyboardType?: any; multiline?: boolean; editable?: boolean;
}) {
  return (
    <View style={[styles.inputWrapper, multiline && styles.inputWrapperMulti, !editable && styles.inputDisabled]}>
      <TextInput
        style={[styles.textInput, multiline && styles.textInputMulti]}
        value={value} onChangeText={onChangeText}
        placeholder={placeholder} placeholderTextColor={Colors.gray400}
        keyboardType={keyboardType ?? 'default'}
        multiline={multiline} numberOfLines={multiline ? 3 : 1}
        editable={editable}
      />
    </View>
  );
}

function SimpleDropdown({ value, options, onSelect, placeholder, disabled }: {
  value: string; options: string[]; onSelect: (v: string) => void;
  placeholder?: string; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ zIndex: open ? 99 : 1 }}>
      <TouchableOpacity
        style={[styles.dropdownTrigger, disabled && styles.dropdownDisabled]}
        onPress={() => !disabled && options.length > 0 && setOpen(v => !v)}
        activeOpacity={disabled ? 1 : 0.8}
      >
        <Text style={[styles.dropdownValue, !value && styles.dropdownPlaceholder]}>
          {value || placeholder || 'নির্বাচন করুন'}
        </Text>
        <MaterialIcons name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20}
          color={disabled ? Colors.gray300 : Colors.gray500} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownList}>
          {options.map(opt => (
            <TouchableOpacity key={opt}
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

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <View style={styles.stepIndicatorWrapper}>
      {STEP_LABELS.map((label, idx) => {
        const stepNum = idx + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <React.Fragment key={stepNum}>
            {idx > 0 && <View style={[styles.stepLine, (done || active) && styles.stepLineActive]} />}
            <View style={styles.stepCol}>
              <View style={[styles.stepCircle, active && styles.stepCircleActive, done && styles.stepCircleDone]}>
                {done
                  ? <MaterialIcons name="check" size={14} color={Colors.white} />
                  : <Text style={[styles.stepNum, active && styles.stepNumActive]}>{stepNum}</Text>}
              </View>
              <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function NayabadiApplicationScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('holding');
  const [step, setStep]           = useState(1);
  const scrollRef                 = useRef<ScrollView>(null);

  // Step 1
  const [form, setForm] = useState({
    holdingNo: '', zone: '২ মিরপুর',
    ward: '', sector: '', area: '', road: '',
    houseNo: '', applicationDate: '', applicantName: '',
    applicantAddress: '', applicantHoldingNo: '',
    belaAna: '', landArea: '', landBoundary: '',
    // Step 2
    summary: '', fee: '৫০', paymentMethod: 'DBBL Nexus',
  });

  const set = (field: string) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const setZone   = (v: string) => setForm(p => ({ ...p, zone: v, ward: '', sector: '', area: '', road: '' }));
  const setWard   = (v: string) => setForm(p => ({ ...p, ward: v, sector: '', area: '', road: '' }));
  const setSector = (v: string) => setForm(p => ({ ...p, sector: v, area: '', road: '' }));
  const setArea   = (v: string) => setForm(p => ({ ...p, area: v, road: '' }));

  // Step 2 — attachment
  const [sections, setSections]           = useState<AttachmentSection[]>(INITIAL_SECTIONS);
  const [activeKey, setActiveKey]         = useState('');
  const [showPickerSheet, setShowPickerSheet] = useState(false);
  const [previewEntry, setPreviewEntry]   = useState<AttachmentEntry | null>(null);

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

  // Section helpers
  const updateSection = (key: string, patch: Partial<AttachmentSection>) =>
    setSections(prev => prev.map(s => s.key === key ? { ...s, ...patch } : s));

  const toggleChecked = (key: string) =>
    setSections(prev => prev.map(s =>
      s.key === key ? { ...s, checked: !s.checked, expanded: !s.checked } : s
    ));

  const toggleExpanded = (key: string) =>
    setSections(prev => prev.map(s =>
      s.key === key ? { ...s, expanded: !s.expanded } : s
    ));

  const openPickerFor = (key: string) => { setActiveKey(key); setShowPickerSheet(true); };

  const addFile = (uri: string, name: string, isImage: boolean) => {
    const entry: AttachmentEntry = { id: Date.now().toString(), uri, name, isImage };
    setSections(prev => prev.map(s =>
      s.key === activeKey ? { ...s, files: [...s.files, entry] } : s
    ));
    setActiveKey('');
  };

  const deleteFile = (sectionKey: string, fileId: string) => {
    Alert.alert('মুছুন', 'এই ফাইলটি মুছতে চান?', [
      { text: 'না' },
      { text: 'হ্যাঁ', style: 'destructive', onPress: () =>
        setSections(prev => prev.map(s =>
          s.key === sectionKey ? { ...s, files: s.files.filter(f => f.id !== fileId) } : s
        ))
      },
    ]);
  };

  const pickFromGallery = async () => {
    setShowPickerSheet(false);
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('অনুমতি প্রয়োজন', 'গ্যালারি অ্যাক্সেস অনুমতি দিন।'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!result.canceled && result.assets.length > 0) {
      const a = result.assets[0]; addFile(a.uri, a.fileName ?? 'image.jpg', true);
    }
  };

  const pickFromCamera = async () => {
    setShowPickerSheet(false);
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { Alert.alert('অনুমতি প্রয়োজন', 'ক্যামেরা অনুমতি দিন।'); return; }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets.length > 0) {
      const a = result.assets[0]; addFile(a.uri, a.fileName ?? 'photo.jpg', true);
    }
  };

  const pickDocument = async () => {
    setShowPickerSheet(false);
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
    if (!result.canceled && result.assets.length > 0) {
      const a = result.assets[0]; addFile(a.uri, a.name, false);
    }
  };

  const validateStep = () => {
    if (step === 1 && (!form.applicationDate || !form.applicantName)) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে বাধ্যতামূলক (*) ক্ষেত্রগুলো পূরণ করুন।');
      return false;
    }
    return true;
  };

  const goNext = () => { if (!validateStep()) return; setStep(s => Math.min(s + 1, TOTAL_STEPS)); scrollToTop(); };
  const goPrev = () => { setStep(s => Math.max(s - 1, 1)); scrollToTop(); };

  const handleSubmit = () =>
    Alert.alert('সফল', 'আপনার নয়াবাদি আবেদন সফলভাবে জমা দেওয়া হয়েছে।', [
      { text: 'ঠিক আছে', onPress: () => navigation.goBack() },
    ]);

  const handleCancel = () =>
    Alert.alert('বাতিল', 'আপনি কি আবেদন বাতিল করতে চান?', [
      { text: 'না' },
      { text: 'হ্যাঁ', onPress: () => navigation.goBack() },
    ]);

  // ── Step 1 ────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <>
      {/* Enquiry */}
      <View style={styles.formCard}>
        <SectionHeader emoji="🖐" title="অনুসন্ধানের যায়গা" />
        <Divider />
        <FieldLabel text="ই-হোল্ডিং নম্বর" required />
        <StyledInput value={form.holdingNo} onChangeText={set('holdingNo')} keyboardType="numeric" />
        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}
          onPress={() => Alert.alert('অনুসন্ধান', `হোল্ডিং: ${form.holdingNo}`)}>
          <MaterialIcons name="search" size={20} color={Colors.white} />
          <Text style={styles.searchBtnText}>অনুসন্ধান করুন</Text>
        </TouchableOpacity>
      </View>

      {/* Property location */}
      <View style={styles.formCard}>
        <SectionHeader emoji="🖐" title="সম্পত্তির অবস্থান" />
        <Divider />

        <FieldLabel text="অঞ্চল" required />
        <SimpleDropdown value={form.zone} options={zonesOf()} onSelect={setZone} placeholder="অঞ্চল নির্বাচন করুন" />

        <FieldLabel text="ওয়ার্ড" required />
        <SimpleDropdown value={form.ward} options={wardsOf(form.zone)} onSelect={setWard}
          placeholder={form.zone ? 'ওয়ার্ড নির্বাচন করুন' : 'আগে অঞ্চল নির্বাচন করুন'} disabled={!form.zone} />

        <FieldLabel text="সেক্টর/সেকশন" required />
        <SimpleDropdown value={form.sector} options={sectorsOf(form.zone, form.ward)} onSelect={setSector}
          placeholder={form.ward ? 'সেক্টর নির্বাচন করুন' : 'আগে ওয়ার্ড নির্বাচন করুন'} disabled={!form.ward} />

        <FieldLabel text="এরিয়া/ব্লক" required />
        <SimpleDropdown value={form.area} options={areasOf(form.zone, form.ward, form.sector)} onSelect={setArea}
          placeholder={form.sector ? 'এরিয়া নির্বাচন করুন' : 'আগে সেক্টর নির্বাচন করুন'} disabled={!form.sector} />

        <FieldLabel text="রোড" required />
        <SimpleDropdown value={form.road} options={roadsOf(form.zone, form.ward, form.sector, form.area)}
          onSelect={set('road')}
          placeholder={form.area ? 'রোড নির্বাচন করুন' : 'আগে এরিয়া নির্বাচন করুন'} disabled={!form.area} />

        <FieldLabel text="হাউস নম্বর" />
        <StyledInput value={form.houseNo} onChangeText={set('houseNo')} />

        <FieldLabel text="আবেদনের তারিখ" required />
        <StyledInput value={form.applicationDate} onChangeText={set('applicationDate')} placeholder="dd/mm/yyyy" keyboardType="numeric" />

        <FieldLabel text="আবেদনকারীর নাম" />
        <StyledInput value={form.applicantName} onChangeText={set('applicantName')} />

        <FieldLabel text="আবেদনকারীর বর্তমান ঠিকানা" />
        <StyledInput value={form.applicantAddress} onChangeText={set('applicantAddress')} multiline />

        <FieldLabel text="আবেদনকারীর ই-হোল্ডিং নম্বর" />
        <StyledInput value={form.applicantHoldingNo} onChangeText={set('applicantHoldingNo')} keyboardType="numeric" />

        <FieldLabel text="বেলা আনা / আংশিক" />
        <StyledInput value={form.belaAna} onChangeText={set('belaAna')} />

        <FieldLabel text="জমির পরিমাণ" />
        <StyledInput value={form.landArea} onChangeText={set('landArea')} keyboardType="numeric" />

        <FieldLabel text="জমির চৌহিদি" />
        <StyledInput value={form.landBoundary} onChangeText={set('landBoundary')} multiline />
      </View>
    </>
  );

  // ── Step 2 ────────────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <>
      {/* Payment section */}
      <View style={styles.formCard}>
        <SectionHeader emoji="💳" title="পেমেন্ট তথ্য" />
        <Divider />

        <FieldLabel text="সংক্ষিপ্ত বিবরণ" />
        <StyledInput value={form.summary} onChangeText={set('summary')} multiline />

        <FieldLabel text="ফী" />
        <StyledInput value={form.fee} onChangeText={set('fee')} keyboardType="numeric" editable={false} />

        <FieldLabel text="পেমেন্ট মেথড" />
        <SimpleDropdown value={form.paymentMethod} options={PAYMENT_METHODS} onSelect={set('paymentMethod')} placeholder="পেমেন্ট মেথড নির্বাচন করুন" />
      </View>

      {/* Attachment section */}
      <View style={styles.formCard}>
        <SectionHeader emoji="📎" title="সংযুক্তি" />
        <Divider />

        {sections.map(section => (
          <View key={section.key} style={styles.attachSection}>
            {/* Checkbox row */}
            <TouchableOpacity style={styles.checkRow} onPress={() => toggleChecked(section.key)} activeOpacity={0.7}>
              <View style={[styles.checkbox, section.checked && styles.checkboxChecked]}>
                {section.checked && <MaterialIcons name="check" size={14} color={Colors.white} />}
              </View>
              <Text style={styles.checkLabel}>{section.label}</Text>
              {section.checked && (
                <TouchableOpacity onPress={() => toggleExpanded(section.key)} style={styles.expandBtn}>
                  <MaterialIcons
                    name={section.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={22} color={Colors.primary}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {/* Expanded body */}
            {section.checked && section.expanded && (
              <View style={styles.attachBody}>
                <FieldLabel text="আইডি" />
                <StyledInput value={section.aid} onChangeText={v => updateSection(section.key, { aid: v })} />

                <FieldLabel text="মন্তব্য" />
                <StyledInput value={section.remark} onChangeText={v => updateSection(section.key, { remark: v })} multiline />

                {/* Uploaded file list */}
                {section.files.length > 0 && (
                  <View style={styles.fileList}>
                    {section.files.map(f => (
                      <View key={f.id} style={styles.fileCard}>
                        {f.isImage ? (
                          <TouchableOpacity onPress={() => setPreviewEntry(f)}>
                            <Image source={{ uri: f.uri }} style={styles.fileThumb} resizeMode="cover" />
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.fileDocIcon}>
                            <MaterialIcons name="insert-drive-file" size={26} color={Colors.primary} />
                          </View>
                        )}
                        <Text style={styles.fileName} numberOfLines={1}>{f.name}</Text>
                        <TouchableOpacity onPress={() => deleteFile(section.key, f.id)} style={styles.fileDeleteBtn}>
                          <MaterialIcons name="delete-outline" size={22} color={Colors.danger} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {/* Upload button */}
                <TouchableOpacity style={styles.attachUploadBtn} onPress={() => openPickerFor(section.key)} activeOpacity={0.8}>
                  <MaterialIcons name="upload-file" size={18} color={Colors.white} />
                  <Text style={styles.attachUploadBtnText}>সংযুক্ত করুন</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </>
  );

  // ─── JSX ─────────────────────────────────────────────────────────────────
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

      {/* Step indicator */}
      <View style={styles.stepWrapper}>
        <Text style={styles.formTitle}>নয়াবাদি আবেদন</Text>
        <StepIndicator current={step} />
        <Text style={styles.stepCounter}>ধাপ {step} / {TOTAL_STEPS}</Text>
      </View>

      {/* Body */}
      <ScrollView ref={scrollRef} style={styles.body} contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        <View style={{ height: 12 }} />
      </ScrollView>

      {/* Wizard footer */}
      <View style={styles.wizardFooter}>
        <TouchableOpacity
          style={[styles.prevBtn, step === 1 && styles.btnDisabled]}
          onPress={goPrev} disabled={step === 1} activeOpacity={0.8}
        >
          <MaterialIcons name="chevron-left" size={20} color={step === 1 ? Colors.gray400 : Colors.primary} />
          <Text style={[styles.prevBtnText, step === 1 && styles.btnTextDisabled]}>পূর্ববর্তী</Text>
        </TouchableOpacity>

        <View style={styles.dotRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View key={i} style={[styles.dot, i + 1 === step && styles.dotActive]} />
          ))}
        </View>

        {step < TOTAL_STEPS ? (
          <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.8}>
            <Text style={styles.nextBtnText}>পরবর্তী</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.finalBtns}>
            <TouchableOpacity style={styles.paySubmitBtn} onPress={handleSubmit} activeOpacity={0.8}>
              <Text style={styles.paySubmitText}>পে এন্ড সাবমিট</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>বাতিল করুন</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom tabs */}
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

      {/* ══ Source Picker Bottom Sheet ══ */}
      <Modal visible={showPickerSheet} transparent animationType="slide" onRequestClose={() => setShowPickerSheet(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowPickerSheet(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>ফাইল উৎস নির্বাচন করুন</Text>
            <View style={styles.pickerIconRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromGallery} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialIcons name="photo-library" size={30} color="#1565C0" />
                </View>
                <Text style={styles.pickerOptionLabel}>গ্যালারি</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromCamera} activeOpacity={0.7}>
                <View style={[styles.pickerIconCircle, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialIcons name="camera-alt" size={30} color={Colors.primary} />
                </View>
                <Text style={styles.pickerOptionLabel}>ক্যামেরা</Text>
              </TouchableOpacity>
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

      {/* ══ Image Preview Modal ══ */}
      <Modal visible={!!previewEntry} transparent animationType="fade" onRequestClose={() => setPreviewEntry(null)}>
        <View style={styles.previewBackdrop}>
          <TouchableOpacity style={styles.previewClose} onPress={() => setPreviewEntry(null)}>
            <MaterialIcons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          {previewEntry?.isImage && (
            <Image source={{ uri: previewEntry.uri }} style={styles.previewImage} resizeMode="contain" />
          )}
          <View style={styles.previewFooter}>
            <Text style={styles.previewFileName}>{previewEntry?.name}</Text>
            <TouchableOpacity
              style={styles.previewDeleteBtn}
              onPress={() => {
                const entry = previewEntry!;
                setPreviewEntry(null);
                setSections(prev => prev.map(s => ({ ...s, files: s.files.filter(f => f.id !== entry.id) })));
              }}
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
  header: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 12 },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },

  stepWrapper: { backgroundColor: Colors.white, paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.gray200 },
  formTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary, textAlign: 'center', marginBottom: Spacing.sm },
  stepCounter: { fontSize: FontSizes.xs, color: Colors.textSecondary, textAlign: 'center', marginTop: 4 },

  stepIndicatorWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  stepCol: { alignItems: 'center', gap: 4 },
  stepLine: { flex: 1, height: 2, backgroundColor: Colors.gray300, marginBottom: 18, marginHorizontal: 4 },
  stepLineActive: { backgroundColor: Colors.primary },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: Colors.gray300, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  stepCircleActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  stepCircleDone: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  stepNum: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.gray400 },
  stepNumActive: { color: Colors.white },
  stepLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', maxWidth: 72 },
  stepLabelActive: { color: Colors.primary, fontWeight: '700' },

  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 8 },

  formCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  sectionHeaderEmoji: { fontSize: 20 },
  sectionHeaderText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  fieldLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', marginTop: Spacing.sm, marginBottom: 4 },
  required: { color: Colors.danger, fontWeight: '700' },

  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, minHeight: 44, marginBottom: 2, overflow: 'hidden' },
  inputWrapperMulti: { alignItems: 'flex-start', minHeight: 72 },
  inputDisabled: { backgroundColor: Colors.gray100 },
  textInput: { flex: 1, paddingHorizontal: Spacing.sm, paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary },
  textInputMulti: { textAlignVertical: 'top', paddingTop: 10 },

  dropdownTrigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, paddingHorizontal: Spacing.sm, paddingVertical: 12, marginBottom: 2 },
  dropdownDisabled: { backgroundColor: Colors.gray100, borderColor: Colors.gray200 },
  dropdownValue: { fontSize: FontSizes.md, color: Colors.textPrimary, flex: 1 },
  dropdownPlaceholder: { color: Colors.gray500 },
  dropdownList: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.gray300, borderRadius: BorderRadius.md, marginBottom: 4, overflow: 'hidden' },
  dropdownOption: { paddingVertical: 11, paddingHorizontal: Spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200 },
  dropdownOptionSelected: { backgroundColor: Colors.primaryLight },
  dropdownOptionText: { fontSize: FontSizes.md, color: Colors.textPrimary },
  dropdownOptionTextSelected: { color: Colors.primary, fontWeight: '600' },

  searchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 13, marginTop: Spacing.md },
  searchBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  attachSection: { borderWidth: 1, borderColor: Colors.gray200, borderRadius: BorderRadius.md, marginBottom: Spacing.sm, overflow: 'hidden' },
  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: Spacing.sm, backgroundColor: Colors.white, gap: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: Colors.gray400, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkLabel: { flex: 1, fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', lineHeight: 20 },
  expandBtn: { padding: 2 },
  attachBody: { backgroundColor: Colors.primaryLight, paddingHorizontal: Spacing.sm, paddingBottom: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.gray200 },

  fileList: { marginTop: Spacing.sm, gap: 6 },
  fileCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.white, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gray300, padding: 8 },
  fileThumb: { width: 44, height: 44, borderRadius: 6 },
  fileDocIcon: { width: 44, height: 44, borderRadius: 6, backgroundColor: Colors.gray100, justifyContent: 'center', alignItems: 'center' },
  fileName: { flex: 1, fontSize: FontSizes.sm, color: Colors.textPrimary },
  fileDeleteBtn: { padding: 4 },

  attachUploadBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 11, marginTop: Spacing.sm },
  attachUploadBtnText: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '700' },

  wizardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 10, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200 },
  prevBtn: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1.5, borderColor: Colors.primary, borderRadius: BorderRadius.md },
  prevBtnText: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },
  btnDisabled: { borderColor: Colors.gray300 },
  btnTextDisabled: { color: Colors.gray400 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 14, borderRadius: BorderRadius.md },
  nextBtnText: { fontSize: FontSizes.sm, color: Colors.white, fontWeight: '700' },
  dotRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.gray300 },
  dotActive: { backgroundColor: Colors.primary, width: 18 },
  finalBtns: { flexDirection: 'row', gap: 8 },
  paySubmitBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 14 },
  paySubmitText: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '700' },
  cancelBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 14 },
  cancelBtnText: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '700' },

  tabBar: { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: Spacing.lg, paddingBottom: 32, paddingTop: 12 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.gray300, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md, textAlign: 'center' },
  sheetCancelBtn: { marginTop: Spacing.md, backgroundColor: Colors.gray100, borderRadius: BorderRadius.md, paddingVertical: 13, alignItems: 'center' },
  sheetCancelText: { fontSize: FontSizes.md, color: Colors.textSecondary, fontWeight: '600' },
  pickerIconRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: Spacing.lg },
  pickerOption: { alignItems: 'center', gap: 8 },
  pickerIconCircle: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  pickerOptionLabel: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500' },

  previewBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center' },
  previewClose: { position: 'absolute', top: 48, right: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 4 },
  previewImage: { width: '92%', height: '65%' },
  previewFooter: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', gap: 8 },
  previewFileName: { color: Colors.white, fontSize: FontSizes.sm },
  previewDeleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.danger, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 20, marginTop: 4 },
  previewDeleteText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
});
