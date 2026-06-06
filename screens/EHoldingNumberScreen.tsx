import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, StatusBar, Animated, Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '../components/BottomTabBar';
type Props = NativeStackScreenProps<any, 'EHoldingNumber'>;

const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Success checkmark animation component ────────────────────────────────────
function SuccessCheck() {
  const scaleAnim  = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1, friction: 5, tension: 60, useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, duration: 400, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.successContainer, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.checkCircleOuter}>
        <View style={styles.checkCircleInner}>
          <MaterialIcons name="check" size={72} color={Colors.primary} />
        </View>
      </View>
      <Text style={styles.successText}>ই-হোল্ডিং নাম্বারটি সংযুক্ত করা হেলো</Text>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export function EHoldingNumberScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('holding');
  const [step, setStep]           = useState(1);      // 1 = enter number, 2 = OTP, 3 = success
  const [holdingNo, setHoldingNo] = useState('');
  const [otp, setOtp]             = useState('');

  const handleNext = () => {
    if (!holdingNo.trim()) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে ই-হোল্ডিং নম্বর লিখুন।');
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!otp.trim()) {
      Alert.alert('ত্রুটি', 'অনুগ্রহ করে ওটিপি লিখুন।');
      return;
    }
    setStep(3);
  };

  const handleDone = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
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

      {/* Body */}
      <View style={styles.body}>

        {/* ── Step 1 & 2 card ── */}
        {step < 3 && (
          <View style={styles.card}>
            {/* Card title */}
            <Text style={styles.cardTitle}>ই-হোল্ডিং নাম্বার সংযুক্ত করুন</Text>
            <View style={styles.divider} />

            {/* Holding number field (both steps) */}
            <Text style={styles.fieldLabel}>ই-হোল্ডিং নম্বরটি লিখুন</Text>
            <View style={[styles.inputWrapper, step === 2 && styles.inputReadOnly]}>
              <TextInput
                style={styles.textInput}
                value={holdingNo}
                onChangeText={setHoldingNo}
                keyboardType="numeric"
                editable={step === 1}
                placeholderTextColor={Colors.gray400}
              />
            </View>

            {/* OTP field — step 2 only */}
            {step === 2 && (
              <>
                <Text style={styles.fieldLabel}>ও টি পি</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                    placeholderTextColor={Colors.gray400}
                    autoFocus
                  />
                </View>
                <Text style={styles.otpHint}>
                  আপনার নিবন্ধিত মোবাইলে একটি ৬ সংখ্যার ওটিপি পাঠানো হয়েছে।
                </Text>
              </>
            )}

            {/* Action button */}
            {step === 1 && (
              <TouchableOpacity style={styles.primaryBtn} onPress={handleNext} activeOpacity={0.8}>
                <Text style={styles.primaryBtnText}>পরবর্তী ধাপ</Text>
                <MaterialIcons name="chevron-right" size={20} color={Colors.white} />
              </TouchableOpacity>
            )}

            {step === 2 && (
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.outlineBtn}
                  onPress={() => { setStep(1); setOtp(''); }}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="chevron-left" size={18} color={Colors.primary} />
                  <Text style={styles.outlineBtnText}>পূর্ববর্তী</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
                  <Text style={styles.submitBtnText}>দাখিল করুন</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* ── Step 3 — Success ── */}
        {step === 3 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>ই-হোল্ডিং নাম্বার সংযুক্ত করুন</Text>
              <View style={styles.divider} />
              <SuccessCheck />
            </View>

            <TouchableOpacity style={styles.doneBtn} onPress={handleDone} activeOpacity={0.8}>
              <Text style={styles.doneBtnText}>হোমে ফিরুন</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Bottom Tab Bar */}
      {/* <View style={styles.tabBar}>
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

  body: {
    flex: 1, paddingHorizontal: Spacing.md, paddingTop: Spacing.lg,
  },

  // Card
  card: {
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginBottom: Spacing.md,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  cardTitle: {
    fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary,
    textAlign: 'center', marginBottom: Spacing.md,
  },
  divider: { height: 1, backgroundColor: Colors.gray200, marginBottom: Spacing.lg },

  // Field
  fieldLabel: {
    fontSize: FontSizes.sm, color: Colors.textPrimary,
    fontWeight: '500', marginBottom: 6,
  },
  inputWrapper: {
    backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.gray300,
    minHeight: 48, justifyContent: 'center',
    marginBottom: Spacing.md, overflow: 'hidden',
  },
  inputReadOnly: { backgroundColor: Colors.gray100, borderColor: Colors.gray200 },
  textInput: {
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    fontSize: FontSizes.md, color: Colors.textPrimary,
  },
  otpHint: {
    fontSize: FontSizes.xs, color: Colors.textSecondary,
    textAlign: 'center', marginBottom: Spacing.md, lineHeight: 18,
  },

  // Buttons
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 14, marginTop: Spacing.sm,
  },
  primaryBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  btnRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  outlineBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: BorderRadius.md, paddingVertical: 13,
  },
  outlineBtnText: { color: Colors.primary, fontSize: FontSizes.md, fontWeight: '600' },
  submitBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: 14,
  },
  submitBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  doneBtn: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: 14, alignItems: 'center',
  },
  doneBtnText: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },

  // Success
  successContainer: { alignItems: 'center', paddingVertical: Spacing.xl },
  checkCircleOuter: {
    width: 130, height: 130, borderRadius: 65,
    borderWidth: 3, borderColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  checkCircleInner: {
    width: 108, height: 108, borderRadius: 54,
    justifyContent: 'center', alignItems: 'center',
  },
  successText: {
    fontSize: FontSizes.md, fontWeight: '600', color: Colors.textPrimary,
    textAlign: 'center', marginTop: Spacing.lg,
  },

  // Bottom Tabs
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
});
