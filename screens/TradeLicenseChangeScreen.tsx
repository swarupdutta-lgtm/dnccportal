import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, StatusBar, Modal, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
type Props = NativeStackScreenProps<any, 'TradeLicenseChange'>;

// ─── Light tint (primaryLight is too dark in theme, use local) ───────────────
const LIGHT_GREEN = '#E8F5E9';

// ─── Reason checkboxes ────────────────────────────────────────────────────────
const CHANGE_REASONS = [
  { id: 'name',         label: 'নাম পরিবর্তন' },
  { id: 'address',      label: 'ব্যবসা প্রতিষ্ঠানের ঠিকানা পরিবর্তন' },
  { id: 'bizType',      label: 'ব্যবসার ধরণ পরিবর্তন' },
  { id: 'signboard',    label: 'সাইনবোর্ড ফি বর্মিতকরণ' },
  { id: 'bizNature',    label: 'ব্যবসার প্রকৃতি পরিবর্তন' },
  { id: 'bizName',      label: 'ব্যবসা প্রতিষ্ঠানের নাম পরিবর্তন' },
];

// ─── Attachment options ───────────────────────────────────────────────────────
const ATTACHMENT_OPTIONS = [
  'মালিকের সত্যায়িত ছবি ০৩ (তিন) কপি',
  'ট্রেড লাইসেন্সের কপি',
  'জাতীয় পরিচয়পত্রের কপি',
  'ভাড়া চুক্তির কপি',
  'অন্যান্য',
];

// ─── Bottom tabs ──────────────────────────────────────────────────────────────
const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── File entry type ──────────────────────────────────────────────────────────
interface FileEntry { id: string; uri: string; name: string; isImage: boolean; }

// ─── Shared UI components ─────────────────────────────────────────────────────
function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {text}{required && <Text style={styles.required}> (*)</Text>}
    </Text>
  );
}

function StyledInput({
  value, onChangeText, placeholder, keyboardType, multiline, editable = true,
}: {
  value: string; onChangeText?: (v: string) => void; placeholder?: string;
  keyboardType?: any; multiline?: boolean; editable?: boolean;
}) {
  return (
    <View style={[styles.inputWrapper, multiline && styles.inputMulti, !editable && styles.inputDisabled]}>
      <TextInput
        style={[styles.textInput, multiline && styles.textMulti]}
        value={value} onChangeText={onChangeText} placeholder={placeholder ?? ''}
        placeholderTextColor={Colors.gray400} keyboardType={keyboardType ?? 'default'}
        multiline={multiline} numberOfLines={multiline ? 3 : 1} editable={editable}
      />
    </View>
  );
}

function SimpleDropdown({
  value, options, onSelect, placeholder,
}: {
  value: string; options: string[]; onSelect: (v: string) => void; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ zIndex: open ? 99 : 1 }}>
      <TouchableOpacity
        style={styles.dropTrigger}
        onPress={() => setOpen(v => !v)}
        activeOpacity={0.8}
      >
        <Text style={[styles.dropValue, !value && styles.dropPlaceholder]} numberOfLines={1}>
          {value || placeholder || 'নির্বাচন করুন'}
        </Text>
        <MaterialIcons
          name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20} color={Colors.gray500}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropList}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.dropOption, opt === value && styles.dropOptionSel]}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[styles.dropOptionText, opt === value && styles.dropOptionTextSel]}>
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
    <View style={styles.secHeaderRow}>
      <Text style={styles.secHeaderEmoji}>{emoji}</Text>
      <Text style={styles.secHeaderText}>{title}</Text>
    </View>
  );
}

function Divider() { return <View style={styles.divider} />; }

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function TradeLicenseChangeScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('trade');

  // Phase: 'search' → 'form'
  const [phase, setPhase] = useState<'search' | 'form'>('search');

  // Search state
  const [licenseNo, setLicenseNo] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<Set<string>>(new Set());

  // Form state
  const [applicantName,  setApplicantName]  = useState('');
  const [fatherName,     setFatherName]     = useState('');
  const [motherName,     setMotherName]     = useState('');
  const [spouseName,     setSpouseName]     = useState('');
  const [relationship,   setRelationship]   = useState('');

  // Attachment state
  const [attachDesc,     setAttachDesc]     = useState('');
  const [attachRemark,   setAttachRemark]   = useState('');
  const [attachFiles,    setAttachFiles]    = useState<FileEntry[]>([]);
  const [showPicker,     setShowPicker]     = useState(false);
  const [previewEntry,   setPreviewEntry]   = useState<FileEntry | null>(null);

  // Fee state
  const [licenseTaka,    setLicenseTaka]    = useState('৩০০০');
  const [amendCharge,    setAmendCharge]    = useState('৩০০');
  const [vat,            setVat]            = useState('৪৫');
  const [totalTaka,      setTotalTaka]      = useState('৩৪৫');
  const [feeRemark,      setFeeRemark]      = useState('');

  // ── helpers ──────────────────────────────────────────────────────────────
  const toggleReason = (id: string) => {
    setSelectedReasons(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSearch = () => {
    if (!licenseNo.trim()) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে ট্রেড লাইসেন্স নং দিন।');
      return;
    }
    if (selectedReasons.size === 0) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে কমপক্ষে একটি সংশোধনের কারণ নির্বাচন করুন।');
      return;
    }
    setPhase('form');
  };

  const handleSubmit = () => {
    Alert.alert('সফল', 'আপনার পরিবর্তন/সংশোধনের আবেদন সফলভাবে জমা দেওয়া হয়েছে।', [
      { text: 'ঠিক আছে', onPress: () => navigation.goBack() },
    ]);
  };

  // ── form title from first selected reason ─────────────────────────────────
  const formTitle = selectedReasons.size > 0
    ? CHANGE_REASONS.find(r => selectedReasons.has(r.id))?.label ?? 'সংশোধন'
    : 'সংশোধন';

  // ── file pickers ──────────────────────────────────────────────────────────
  const addFile = (uri: string, name: string, isImage: boolean) => {
    setAttachFiles(prev => [...prev, { id: Date.now().toString(), uri, name, isImage }]);
  };

  const pickFromGallery = async () => {
    setShowPicker(false);
    const p = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!p.granted) return;
    const r = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!r.canceled && r.assets[0]) addFile(r.assets[0].uri, r.assets[0].fileName ?? 'image.jpg', true);
  };

  const pickFromCamera = async () => {
    setShowPicker(false);
    const p = await ImagePicker.requestCameraPermissionsAsync();
    if (!p.granted) return;
    const r = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!r.canceled && r.assets[0]) addFile(r.assets[0].uri, r.assets[0].fileName ?? 'photo.jpg', true);
  };

  const pickDocument = async () => {
    setShowPicker(false);
    const r = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
    if (!r.canceled && r.assets[0]) addFile(r.assets[0].uri, r.assets[0].name, false);
  };

  const deleteFile = (fid: string) => {
    Alert.alert('মুছুন', 'এই ফাইলটি মুছতে চান?', [
      { text: 'না' },
      { text: 'হ্যাঁ', style: 'destructive', onPress: () => setAttachFiles(prev => prev.filter(f => f.id !== fid)) },
    ]);
  };

  // ── auto-calc total ───────────────────────────────────────────────────────
  const calcTotal = () => {
    const charge = parseFloat(amendCharge || '0');
    const v      = parseFloat(vat       || '0');
    setTotalTaka((charge + v).toString());
  };

  // ─── Search Phase ─────────────────────────────────────────────────────────
  const renderSearch = () => (
    <View style={styles.card}>
      <SectionHeader emoji="🔑" title="অনুসন্ধানের যায়গা" />
      <Divider />

      <FieldLabel text="ট্রেড লাইসেন্স নং" />
      <StyledInput value={licenseNo} onChangeText={setLicenseNo} />

      {/* Reason checkboxes */}
      <View style={styles.reasonBox}>
        <Text style={styles.reasonTitle}>সংশোধনের কারণ</Text>
        {CHANGE_REASONS.map(reason => (
          <TouchableOpacity
            key={reason.id}
            style={styles.checkRow}
            onPress={() => toggleReason(reason.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, selectedReasons.has(reason.id) && styles.checkboxChecked]}>
              {selectedReasons.has(reason.id) && (
                <MaterialIcons name="check" size={13} color={Colors.white} />
              )}
            </View>
            <Text style={styles.checkLabel}>{reason.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={handleSearch} activeOpacity={0.85}>
        <Text style={styles.primaryBtnText}>অনুসন্ধান করুন</Text>
      </TouchableOpacity>
    </View>
  );

  // ─── Form Phase ───────────────────────────────────────────────────────────
  const renderForm = () => (
    <>
      {/* Page title strip */}
      <View style={styles.formTitleStrip}>
        <Text style={styles.formTitleText}>{formTitle}</Text>
      </View>

      {/* ── Personal details ── */}
      <View style={styles.card}>
        <SectionHeader emoji="🖐" title="ব্যক্তিগত বিবরণ" />
        <Divider />
        <FieldLabel text="আবেদনকারীর নাম" />
        <StyledInput value={applicantName} onChangeText={setApplicantName} />
        <FieldLabel text="আবেদনকারীর পিতার নাম" />
        <StyledInput value={fatherName} onChangeText={setFatherName} />
        <FieldLabel text="আবেদনকারীর মাতার নাম" />
        <StyledInput value={motherName} onChangeText={setMotherName} />
        <FieldLabel text="স্বামী / স্ত্রীর নাম" />
        <StyledInput value={spouseName} onChangeText={setSpouseName} />
        <FieldLabel text="প্রতিষ্ঠানের সাথে আবেদনকারীর সম্পর্ক" />
        <StyledInput value={relationship} onChangeText={setRelationship} />
      </View>

      {/* ── Attachment ── */}
      <View style={styles.card}>
        <SectionHeader emoji="🔑" title="সংযুক্তি" />
        <Divider />

        <FieldLabel text="সংযুক্তির বর্ণনা" />
        <SimpleDropdown
          value={attachDesc}
          options={ATTACHMENT_OPTIONS}
          onSelect={setAttachDesc}
          placeholder="মালিকের সত্যায়িত ছবি ০৩ (তিন) কপি"
        />

        <FieldLabel text="মন্তব্য" />
        <StyledInput value={attachRemark} onChangeText={setAttachRemark} multiline />

        {/* File list */}
        {attachFiles.length > 0 && (
          <View style={styles.fileList}>
            {attachFiles.map(fi => (
              <View key={fi.id} style={styles.fileCard}>
                {fi.isImage
                  ? <TouchableOpacity onPress={() => setPreviewEntry(fi)}>
                      <Image source={{ uri: fi.uri }} style={styles.fileThumb} resizeMode="cover" />
                    </TouchableOpacity>
                  : <View style={styles.fileDocIcon}>
                      <MaterialIcons name="insert-drive-file" size={26} color={Colors.primary} />
                    </View>
                }
                <Text style={styles.fileName} numberOfLines={1}>{fi.name}</Text>
                <TouchableOpacity onPress={() => deleteFile(fi.id)} style={styles.fileDeleteBtn}>
                  <MaterialIcons name="delete-outline" size={22} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Choose File row */}
        <View style={styles.chooseFileRow}>
          <TouchableOpacity style={styles.chooseFileBtn} onPress={() => setShowPicker(true)}>
            <Text style={styles.chooseFileBtnText}>Choose File</Text>
          </TouchableOpacity>
          <View style={styles.fileNameBox}>
            <Text style={styles.fileNameText} numberOfLines={1}>
              {attachFiles.length > 0 ? attachFiles[attachFiles.length - 1].name : 'No File Chosen'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowPicker(true)} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>সংযুক্ত করুন</Text>
        </TouchableOpacity>
      </View>

      {/* ── Amendment Fee ── */}
      <View style={styles.card}>
        <SectionHeader emoji="🔑" title="সংশোধন ফী" />
        <Divider />

        <FieldLabel text="ট্রেড লাইসেন্স টাকা" />
        <StyledInput value={licenseTaka} onChangeText={setLicenseTaka} keyboardType="numeric" editable={false} />

        <FieldLabel text="সংশোধিত চার্জ" />
        <StyledInput value={amendCharge} onChangeText={v => { setAmendCharge(v); }} keyboardType="numeric" />

        <FieldLabel text="ভ্যাট" />
        <StyledInput value={vat} onChangeText={v => { setVat(v); }} keyboardType="numeric" />

        <FieldLabel text="মোট টাকা" />
        <StyledInput value={totalTaka} onChangeText={setTotalTaka} keyboardType="numeric" editable={false} />

        <FieldLabel text="মন্তব্য" />
        <StyledInput value={feeRemark} onChangeText={setFeeRemark} multiline />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>পরিশোধ করুন</Text>
        </TouchableOpacity>
      </View>

      {/* Back to search */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setPhase('search')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="chevron-left" size={18} color={Colors.primary} />
        <Text style={styles.backBtnText}>পূর্ববর্তী ধাপে ফিরুন</Text>
      </TouchableOpacity>
    </>
  );

  // ─── Main JSX ─────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* Header */}
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

      {/* Page title */}
      <View style={styles.pageTitleBar}>
        <Text style={styles.pageTitleText}>পরিবর্তন/সংশোধন এর আবেদন</Text>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {phase === 'search' ? renderSearch() : renderForm()}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom Tabs */}
      <BottomTabBar navigation={navigation} activeKey="trade" />
      {/* <View style={styles.tabBar}>
        {BOTTOM_TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => {
                setActiveTab(tab.key);
                if (tab.key === 'home') navigation.navigate('Dashboard');
              }}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color={active ? Colors.primary : Colors.gray500}
              />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View> */}

      {/* Source Picker Sheet */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>ফাইল উৎস নির্বাচন করুন</Text>
            <View style={styles.pickerRow}>
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromGallery} activeOpacity={0.7}>
                <View style={[styles.pickerCircle, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialIcons name="photo-library" size={30} color="#1565C0" />
                </View>
                <Text style={styles.pickerLabel}>গ্যালারি</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={pickFromCamera} activeOpacity={0.7}>
                <View style={[styles.pickerCircle, { backgroundColor: LIGHT_GREEN }]}>
                  <MaterialIcons name="camera-alt" size={30} color={Colors.primary} />
                </View>
                <Text style={styles.pickerLabel}>ক্যামেরা</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerOption} onPress={pickDocument} activeOpacity={0.7}>
                <View style={[styles.pickerCircle, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialIcons name="folder-open" size={30} color="#E65100" />
                </View>
                <Text style={styles.pickerLabel}>ফাইল</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sheetCancelBtn} onPress={() => setShowPicker(false)}>
              <Text style={styles.sheetCancelText}>বাতিল</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={!!previewEntry}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewEntry(null)}
      >
        <View style={styles.previewBackdrop}>
          <TouchableOpacity style={styles.previewClose} onPress={() => setPreviewEntry(null)}>
            <MaterialIcons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          {previewEntry?.isImage && (
            <Image
              source={{ uri: previewEntry.uri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          <View style={styles.previewFooter}>
            <Text style={styles.previewFileName}>{previewEntry?.name}</Text>
            <TouchableOpacity
              style={styles.previewDeleteBtn}
              onPress={() => {
                const e = previewEntry!;
                setPreviewEntry(null);
                setAttachFiles(prev => prev.filter(fi => fi.id !== e.id));
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

export default TradeLicenseChangeScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:            { flex: 1, backgroundColor: Colors.background },

  // Header
  header:          { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 12 },
  headerTitle:     { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '700' },

  // Page title bar (green band below header)
  pageTitleBar:    { backgroundColor: Colors.white, paddingVertical: 10, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.gray200, alignItems: 'center' },
  pageTitleText:   { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary },

  // Body
  body:            { flex: 1 },
  scrollContent:   { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: 8 },

  // Card
  card:            { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },

  // Section header
  secHeaderRow:    { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  secHeaderEmoji:  { fontSize: 18 },
  secHeaderText:   { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },

  divider:         { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.md },

  // Form title strip (shown inside form phase)
  formTitleStrip:  { alignItems: 'center', marginBottom: Spacing.sm },
  formTitleText:   { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary },

  // Field label
  fieldLabel:      { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500', marginTop: Spacing.sm, marginBottom: 4 },
  required:        { color: Colors.danger, fontWeight: '700' },

  // Input
  inputWrapper:    { backgroundColor: Colors.gray200, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, minHeight: 44, marginBottom: 2, overflow: 'hidden' },
  inputMulti:      { minHeight: 72 },
  inputDisabled:   { backgroundColor: Colors.gray100, borderColor: Colors.gray200 },
  textInput:       { flex: 1, paddingHorizontal: Spacing.sm, paddingVertical: 10, fontSize: FontSizes.md, color: Colors.textPrimary },
  textMulti:       { textAlignVertical: 'top', paddingTop: 10 },

  // Dropdown
  dropTrigger:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.gray200, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.gray300, paddingHorizontal: Spacing.sm, paddingVertical: 12, marginBottom: 2 },
  dropValue:       { fontSize: FontSizes.md, color: Colors.textPrimary, flex: 1 },
  dropPlaceholder: { color: Colors.gray500 },
  dropList:        { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.gray300, borderRadius: BorderRadius.md, marginBottom: 4, overflow: 'hidden' },
  dropOption:      { paddingVertical: 11, paddingHorizontal: Spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray200 },
  dropOptionSel:   { backgroundColor: LIGHT_GREEN },
  dropOptionText:  { fontSize: FontSizes.md, color: Colors.textPrimary },
  dropOptionTextSel: { color: Colors.primary, fontWeight: '600' },

  // Reason box
  reasonBox:       { marginTop: Spacing.md, marginBottom: Spacing.sm },
  reasonTitle:     { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  checkRow:        { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 10 },
  checkbox:        { width: 20, height: 20, borderRadius: 3, borderWidth: 1.5, borderColor: Colors.gray400, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkLabel:      { fontSize: FontSizes.sm, color: Colors.textPrimary, flex: 1 },

  // Primary button
  primaryBtn:      { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 13, alignItems: 'center', marginTop: Spacing.md },
  primaryBtnText:  { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Choose File row
  chooseFileRow:   { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm, gap: 6 },
  chooseFileBtn:   { backgroundColor: Colors.gray200, paddingVertical: 10, paddingHorizontal: 12, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gray300 },
  chooseFileBtnText: { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '600' },
  fileNameBox:     { flex: 1, backgroundColor: Colors.gray100, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gray300, paddingVertical: 10, paddingHorizontal: 8 },
  fileNameText:    { fontSize: FontSizes.sm, color: Colors.gray500 },

  // File list
  fileList:        { marginTop: Spacing.sm, gap: 6 },
  fileCard:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.white, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gray300, padding: 8 },
  fileThumb:       { width: 44, height: 44, borderRadius: 6 },
  fileDocIcon:     { width: 44, height: 44, borderRadius: 6, backgroundColor: Colors.gray100, justifyContent: 'center', alignItems: 'center' },
  fileName:        { flex: 1, fontSize: FontSizes.sm, color: Colors.textPrimary },
  fileDeleteBtn:   { padding: 4 },

  // Back button
  backBtn:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: Spacing.sm, marginBottom: Spacing.sm },
  backBtnText:     { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },

  // Bottom tabs
  tabBar:          { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6 },
  tabItem:         { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel:        { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive:  { color: Colors.primary, fontWeight: '700' },

  // Picker sheet
  modalBackdrop:   { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  bottomSheet:     { backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: Spacing.lg, paddingBottom: 32, paddingTop: 12 },
  sheetHandle:     { width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.gray300, alignSelf: 'center', marginBottom: 16 },
  sheetTitle:      { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md, textAlign: 'center' },
  pickerRow:       { flexDirection: 'row', justifyContent: 'space-around', marginVertical: Spacing.lg },
  pickerOption:    { alignItems: 'center', gap: 8 },
  pickerCircle:    { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center' },
  pickerLabel:     { fontSize: FontSizes.sm, color: Colors.textPrimary, fontWeight: '500' },
  sheetCancelBtn:  { marginTop: Spacing.md, backgroundColor: Colors.gray100, borderRadius: BorderRadius.md, paddingVertical: 13, alignItems: 'center' },
  sheetCancelText: { fontSize: FontSizes.md, color: Colors.textSecondary, fontWeight: '600' },

  // Preview modal
  previewBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center' },
  previewClose:    { position: 'absolute', top: 48, right: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 4 },
  previewImage:    { width: '92%', height: '65%' },
  previewFooter:   { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', gap: 8 },
  previewFileName: { color: Colors.white, fontSize: FontSizes.sm },
  previewDeleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.danger, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 20, marginTop: 4 },
  previewDeleteText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
});
