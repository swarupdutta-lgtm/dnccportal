import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { DateInput } from '../components/DateInput';
import { FileUpload } from '../components/FileUpload';
import { Button } from '../components/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import { BottomTabBar } from '../components/BottomTabBar';
// ─── DROPDOWN CONFIG DATA ────────────────────────────────────────────────────
const GEOLOCATION_DATA = {
  zones: [
    { value: 'zone3', label: 'অঞ্চল-৩' },
    { value: 'zone5', label: 'অঞ্চল-৫' },
  ],
  wards: [
    { value: 'w18', label: 'ওয়ার্ড নং ১৮' },
    { value: 'w19', label: 'ওয়ার্ড নং ১৯' },
    { value: 'w20', label: 'ওয়ার্ড নং ২০' },
  ],
  mohuja: [
    { value: 'm1', label: 'গুলশান ও বনানী' },
    { value: 'm2', label: 'মহাখালী ও বাড্ডা' },
  ],
};

const PROPERTY_TYPES = [
  { value: 'residential', label: 'আবাসিক (Residential)' },
  { value: 'commercial', label: 'বাণিজ্যিক (Commercial)' },
  { value: 'mixed', label: 'মিশ্র ব্যবহার (Mixed Use)' },
  { value: 'industrial', label: 'শিল্পকারখানা (Industrial)' },
];

export default function HoldingApplicationScreen({ navigation }: { navigation: any }) {
  // Stepper State management (1: Location & Ownership, 2: Infrastructure & Docs)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // ─── STEP 1 FORM STATE FIELDS ──────────────────────────────────────────────
  const [zone, setZone] = useState('');
  const [ward, setWard] = useState('');
  const [mohuja, setMohuja] = useState('');
  const [roadNo, setRoadNo] = useState('');
  const [holdingNo, setHoldingNo] = useState('');
  
  const [ownerName, setOwnerName] = useState('');
  const [fatherHusbandName, setFatherHusbandName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  // ─── STEP 2 FORM STATE FIELDS ──────────────────────────────────────────────
  const [propertyType, setPropertyType] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [buildingArea, setBuildingArea] = useState('');
  const [constructionYear, setConstructionYear] = useState<Date | undefined>(undefined);
  
  const [nidDoc, setNidDoc] = useState<{ name: string; uri: string } | null>(null);
  const [deedDoc, setDeedDoc] = useState<{ name: string; uri: string } | null>(null);
  const [khationDoc, setKhationDoc] = useState<{ name: string; uri: string } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── VALIDATION INTERFACES ─────────────────────────────────────────────────
  const validateStep1 = () => {
    if (!zone || !ward || !mohuja || !roadNo || !holdingNo) {
      Alert.alert('ত্রুটি', 'দয়া করে হোল্ডিং বা ভৌগলিক অবস্থানের সকল তথ্য প্রদান করুন।');
      return false;
    }
    if (!ownerName || !fatherHusbandName || !mobileNo || !nidNumber) {
      Alert.alert('ত্রুটি', 'মালিকের সাধারণ তথ্যের চিহ্নিত বাধ্যতামূলক ক্ষেত্রগুলো পূরণ করুন।');
      return false;
    }
    if (mobileNo.length < 11) {
      Alert.alert('ত্রুটি', 'সঠিক ১১ ডিজিটের মোবাইল নম্বরটি প্রবেশ করান।');
      return false;
    }
    return true;
  };

  const handleFinalSubmission = async () => {
    if (!propertyType || !totalFloors || !buildingArea) {
      Alert.alert('ত্রুটি', 'স্থাপনার বিবরণ ও কাঠামোর বিবরণ সঠিকভাবে পূরণ করুন।');
      return;
    }
    if (!nidDoc || !deedDoc) {
      Alert.alert('ফাইল প্রয়োজন', 'জাতীয় পরিচয়পত্র এবং দলিলের কপি সংযুক্ত করা বাধ্যতামূলক।');
      return;
    }

    setIsSubmitting(true);
    // Simulate API storage transaction pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'সফল আবেদন',
        'আপনার নতুন হোল্ডিং ট্যাক্স নির্ধারণের আবেদনটি সফলভাবে গৃহীত হয়েছে।',
        [{ text: 'ড্যাশবোর্ডে ফিরে যান', onPress: () => navigation.popToTop() }]
      );
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#00853F" />

      {/* ─── HEADER APP BAR ─── */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => (currentStep === 2 ? setCurrentStep(1) : navigation.goBack())}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitleText}>নতুন হোল্ডিং ট্যাক্স আবেদন এন্ট্রি</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ─── STEPPER BAR DISPLAY PROGRESS ─── */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepNodeRow}>
          <View style={[styles.stepCircle, styles.stepActive]}>
            <Text style={styles.stepCircleText}>১</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>মালিক ও অবস্থান বিবরণ</Text>
        </View>
        <View style={[styles.stepConnector, currentStep === 2 && styles.stepConnectorActive]} />
        <View style={styles.stepNodeRow}>
          <View style={[styles.stepCircle, currentStep === 2 ? styles.stepActive : styles.stepInactive]}>
            <Text style={[styles.stepCircleText, currentStep !== 2 && styles.stepTextInactive]}>২</Text>
          </View>
          <Text style={[styles.stepLabel, currentStep === 2 && styles.stepLabelActive]}>স্থাপনা ও সংযুক্তি</Text>
        </View>
      </View>

      {/* ─── ACTIVE MULTIPHASE FORM WRAPPER ─── */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardContainer}>
        <ScrollView style={styles.scrollerBody} contentContainerStyle={styles.scrollerContent} showsVerticalScrollIndicator={false}>
          
          {currentStep === 1 ? (
            /* ──────────────────────────────────────────────────────── */
            /* ─── PHASE 1: GEOLOCATION MAP AREA & OWNER DATA ACCORDION ── */
            /* ──────────────────────────────────────────────────────── */
            <View>
              {/* Card Sector A: Property Address Metrics */}
              <View style={styles.formSectionCard}>
                <View style={styles.sectionFormHeader}>
                  <MaterialCommunityIcons name="map-marker-outline" size={20} color="#00853F" />
                  <Text style={styles.sectionHeaderText}>হোল্ডিং এর ভৌগলিক অবস্থান বিবরণ</Text>
                </View>

                <Select label="অঞ্চল (Zone) *" options={GEOLOCATION_DATA.zones} value={zone} onChange={setZone} />
                <Select label="ওয়ার্ড নং (Ward) *" options={GEOLOCATION_DATA.wards} value={ward} onChange={setWard} />
                <Select label="মৌজা/এলাকা *" options={GEOLOCATION_DATA.mohuja} value={mohuja} onChange={setMohuja} />
                
                <View style={styles.inputRow}>
                  <View style={styles.halfCol}>
                    <Input label="রোড নং / নাম *" placeholder="উদা: ১২/এ" value={roadNo} onChangeText={setRoadNo} />
                  </View>
                  <View style={styles.halfCol}>
                    <Input label="প্রস্তাবিত হোল্ডিং নং *" placeholder="উদা: ৪২৭/বি" value={holdingNo} onChangeText={setHoldingNo} />
                  </View>
                </View>
              </View>

              {/* Card Sector B: Applicant Identity Demographics */}
              <View style={styles.formSectionCard}>
                <View style={styles.sectionFormHeader}>
                  <Ionicons name="person-outline" size={20} color="#00853F" />
                  <Text style={styles.sectionHeaderText}>মালিকের সাধারণ তথ্য বিবরণী</Text>
                </View>

                <Input label="মালিকের পূর্ণ নাম (বাংলা অথবা ইংরেজি) *" placeholder="উদা: সৈয়দ সোহেল পারভেজ" value={ownerName} onChangeText={setOwnerName} />
                <Input label="পিতা বা স্বামীর নাম *" placeholder="পিতা অথবা স্বামীর নাম লিখুন" value={fatherHusbandName} onChangeText={setFatherHusbandName} />
                
                <Input 
                  label="মোবাইল নম্বর (SMS নোটিফিকেশনের জন্য) *" 
                  placeholder="উদা: 017XXXXXXXX" 
                  keyboardType="phone-pad" 
                  maxLength={11}
                  value={mobileNo} 
                  onChangeText={setMobileNo} 
                />
                <Input 
                  label="জাতীয় পরিচয়পত্র নম্বর (NID) *" 
                  placeholder="১০ অথবা ১৭ ডিজিট নম্বর" 
                  keyboardType="number-pad" 
                  value={nidNumber} 
                  onChangeText={setNidNumber} 
                />
                <Input 
                  label="ইমেইল আইডি (ঐচ্ছিক)" 
                  placeholder="example@domain.com" 
                  keyboardType="email-address" 
                  value={ownerEmail} 
                  onChangeText={setOwnerEmail} 
                />
              </View>
            </View>
          ) : (
            /* ──────────────────────────────────────────────────────── */
            /* ─── PHASE 2: STRUCTURAL METRICS & UPLOAD ATTACHMENTS ─── */
            /* ──────────────────────────────────────────────────────── */
            <View>
              {/* Card Sector C: Property Infrastructure Layout */}
              <View style={styles.formSectionCard}>
                <View style={styles.sectionFormHeader}>
                  <MaterialCommunityIcons name="office-building" size={20} color="#00853F" />
                  <Text style={styles.sectionHeaderText}>স্থাপনা ও অবকাঠামোগত বিবরণ</Text>
                </View>

                <Select label="স্থাপনার ধরন ও ব্যবহার *" options={PROPERTY_TYPES} value={propertyType} onChange={setPropertyType} />
                
                <View style={styles.inputRow}>
                  <View style={styles.halfCol}>
                    <Input label="মোট তলার সংখ্যা *" placeholder="উদা: ৫" keyboardType="number-pad" value={totalFloors} onChangeText={setTotalFloors} />
                  </View>
                  <View style={styles.halfCol}>
                    <Input label="মোট স্কয়ার ফিট (Area) *" placeholder="উদা: ২৪৫০" keyboardType="number-pad" value={buildingArea} onChangeText={setBuildingArea} />
                  </View>
                </View>

                <DateInput 
                  label="নির্মাণ কাজ সম্পন্ন হওয়ার আনুমানিক তারিখ" 
                  value={constructionYear} 
                  onChange={setConstructionYear} 
                  placeholder="দিন/মাস/বছর নির্বাচন করুন"
                />
              </View>

              {/* Card Sector D: Hardcopy Mandatory Verification Upload Attachments */}
              <View style={styles.formSectionCard}>
                <View style={styles.sectionFormHeader}>
                  <MaterialIcons name="cloud-upload" size={20} color="#00853F" />
                  <Text style={styles.sectionHeaderText}>প্রয়োজনীয় দলিলাদি ও ফাইল সংযুক্তি</Text>
                </View>
                <Text style={styles.docNoticeText}>সর্বোচ্চ ৫ মেগাবাইট সাইজের PDF বা JPG ফাইল আপলোড করতে পারবেন।</Text>

                <FileUpload 
                  label="মালিকের এনআইডি কার্ডের কপি (NID Card) *" 
                  value={nidDoc?.name} 
                  onFileSelected={(name, uri) => setNidDoc({ name, uri })} 
                />
                <FileUpload 
                  label="জমির মূল দলিলের স্ক্যান কপি (Deed Document) *" 
                  value={deedDoc?.name} 
                  onFileSelected={(name, uri) => setDeedDoc({ name, uri })} 
                />
                <FileUpload 
                  label="হালনাগাদ খতিয়ান ও দাখিলা রসিদ (Khation Copy)" 
                  value={khationDoc?.name} 
                  onFileSelected={(name, uri) => setKhationDoc({ name, uri })} 
                />
              </View>

              {/* Final Summary Meta Check Frame */}
              <View style={styles.summaryReviewCard}>
                <MaterialCommunityIcons name="shield-check-outline" size={22} color="#1565C0" />
                <Text style={styles.summaryText}>
                  আমি ঘোষণা করছি যে এই ফরমে প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। কোন অসত্য বা ভুল তথ্য প্রদান করা হলে আমার আবেদন বাতিল বলে গণ্য হবে।
                </Text>
              </View>
            </View>
          )}

          {/* ─── ACTION CONTROL FOOTER STEERING BAR ─── */}
          <View style={styles.actionFooterRow}>
            {currentStep === 2 && (
              <TouchableOpacity style={styles.previousBtnOutline} onPress={() => setCurrentStep(1)}>
                <Text  style={styles.previousBtnText}>পূর্ববর্তী ধাপ</Text>
              </TouchableOpacity>
            )}

            <Button
              title={currentStep === 1 ? 'পরবর্তী ধাপে যান' : 'আবেদন দাখিল করুন'}
              loading={isSubmitting}            
              style={[styles.stepperActionSubmitBtn, currentStep === 1 ? { width: '100%' } : { flex: 1.4 }]}
              onPress={() => {
                if (currentStep === 1) {
                  if (validateStep1()) setCurrentStep(2);
                } else {
                  handleFinalSubmission();
                }
              }}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── LOOK AND FEEL STYLES COORDINATES ─────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  keyboardContainer: { flex: 1 },
  
  // App Bar Setup
  headerBar: {
    height: 62,
    backgroundColor: '#00853F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    elevation: 3,
  },
  backBtn: { padding: 4 },
  headerTitleText: { color: Colors.white, fontSize: 16, fontWeight: '700' },

  // Progress Stepper Styles Coordination
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  stepNodeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepCircle: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#00853F' },
  stepInactive: { backgroundColor: '#E2E8F0' },
  stepCircleText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  stepTextInactive: { color: Colors.gray600 },
  stepLabel: { fontSize: 12, fontWeight: '500', color: Colors.gray500 },
  stepLabelActive: { color: '#00853F', fontWeight: '700' },
  stepConnector: { flex: 0.3, height: 2, backgroundColor: '#E2E8F0', marginHorizontal: 10 },
  stepConnectorActive: { backgroundColor: '#00853F' },

  // Canvas View Body Context
  scrollerBody: { flex: 1 },
  scrollerContent: { padding: Spacing.md, paddingBottom: 40 },
  
  // Clean Form Section Blueprint Containers
  formSectionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: Spacing.md,
  },
  sectionHeaderText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  
  inputRow: { flexDirection: 'row', gap: Spacing.md },
  halfCol: { flex: 1 },
  docNoticeText: { fontSize: 11, color: Colors.textSecondary, marginBottom: Spacing.md, fontStyle: 'italic' },

  // Declaration Notice Box Layout
  summaryReviewCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  summaryText: { fontSize: 11, color: '#1565C0', flex: 1, lineHeight: 16, fontWeight: '500' },

  // Split Control Navigation Buttons Bar
  actionFooterRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center', marginTop: Spacing.xs },
  previousBtnOutline: {
    flex: 0.8,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#00853F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  previousBtnText: { color: '#00853F', fontSize: 14, fontWeight: '600' },
  stepperActionSubmitBtn: { height: 48, backgroundColor: '#00853F', borderRadius: BorderRadius.md },
});