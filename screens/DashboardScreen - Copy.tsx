import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<any, 'Dashboard'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH  = SCREEN_WIDTH * 0.78;  // hamburger — left
const KEBAB_WIDTH    = SCREEN_WIDTH * 0.60;  // kebab panel — right

// ─── Dashboard Grid Data ───────────────────────────────────────────────────────
const HOLDING_TAX_ITEMS = [
  { id: '1', label: 'আবেদন',            icon: 'file-document-outline' },
  { id: '2', label: 'অনুসন্ধান',         icon: 'file-search-outline' },
  { id: '3', label: 'নগর সঞ্চয়',        icon: 'calculator-variant-outline' },
  { id: '4', label: 'বকেয়া বিবরণী',     icon: 'clipboard-list-outline' },
  { id: '5', label: 'কুইক পে',          icon: 'timer-outline' },
  { id: '6', label: 'পরিশোধের বিবরণ',   icon: 'credit-card-outline' },
];
const TRADE_LICENSE_ITEMS = [
  { id: '1', label: 'আবেদন',       icon: 'file-document-outline' },
  { id: '2', label: 'অনুসন্ধান',    icon: 'file-search-outline' },
  { id: '3', label: 'ফি অনুসন্ধান', icon: 'cash-multiple' },
  { id: '4', label: 'প্রিন্ট',      icon: 'printer-outline' },
  { id: '5', label: 'রিনিউ',       icon: 'refresh' },
];
const HOTEL_TAX_ITEMS = [
  { id: '1', label: 'নম্বর নিবন্ধীকরণ', icon: 'home-city-outline' },
  { id: '2', label: 'ড্যাশবোর্ড',        icon: 'view-dashboard-outline' },
  { id: '3', label: 'পেমেন্ট জেনারেট',   icon: 'receipt' },
];
const BOTTOM_TABS = [
  { key: 'home',    label: 'হোম',            icon: 'home-outline' },
  { key: 'holding', label: 'হোল্ডিং ট্যাক্স', icon: 'office-building-outline' },
  { key: 'trade',   label: 'ট্রেড লাইসেন্স',  icon: 'license' },
  { key: 'hotel',   label: 'হোটেল ট্যাক্স',   icon: 'bed-outline' },
];

// ─── Kebab Menu Items ──────────────────────────────────────────────────────────
const KEBAB_ITEMS = [
  { id: 'profile',  label: 'প্রোফাইল', icon: 'person-outline',   family: 'ionicon' },
  { id: 'settings', label: 'সেটিংস',  icon: 'settings-outline', family: 'ionicon' },
  { id: 'help',     label: 'সাহায্য',  icon: 'call-outline',     family: 'ionicon' },
  { id: 'language', label: 'ভাষা',     icon: 'language',         family: 'material' },
  { id: 'logout',   label: 'লগ আউট',  icon: 'log-out-outline',  family: 'ionicon' },
];

// ─── Sidebar Nav Data ──────────────────────────────────────────────────────────
const SIDEBAR_NAV = [
  {
    id: 'holding', type: 'section', label: 'হোল্ডিং ট্যাক্স',
    children: [
      {
        id: 'h_apply_group', type: 'accordion', label: 'আবেদন এবং অনুসন্ধান',
        children: [
          { id: 'h_apply',  label: 'আবেদন' },
          { id: 'h_search', label: 'অনুসন্ধান' },
        ],
      },
      { id: 'h_enum',   type: 'item', label: 'ই-হোল্ডিং নাম্বার সংযুক্ত করুন' },
      { id: 'h_due',    type: 'item', label: 'বকেয়া বিবরণী' },
      { id: 'h_quick',  type: 'item', label: 'কুইক পে' },
      { id: 'h_online', type: 'item', label: 'অনলাইন কর পরিশোধের বিবরণ' },
    ],
  },
  {
    id: 'trade', type: 'section', label: 'ট্রেড লাইসেন্স',
    children: [
      {
        id: 't_apply_group', type: 'accordion', label: 'আবেদন এবং অনুসন্ধান',
        children: [
          { id: 't_apply',  label: 'আবেদন' },
          { id: 't_search', label: 'অনুসন্ধান' },
        ],
      },
      {
        id: 't_fee_group', type: 'accordion', label: 'ফি অনুসন্ধান',
        children: [
          { id: 't_fee_renew', label: 'নতুন / নবায়ন ফি' },
          { id: 't_fee_amend', label: 'সংশোধনী ফি' },
        ],
      },
      { id: 't_list',  type: 'item', label: 'ট্রেড লাইসেন্স লিস্ট' },
      { id: 't_renew', type: 'item', label: 'ট্রেড লাইসেন্স রিনিউ' },
    ],
  },
  {
    id: 'hotel', type: 'section', label: 'হোটেল ট্যাক্স',
    children: [
      { id: 'ht_reg',     type: 'item', label: 'ই-হোটেল নম্বর নিবন্ধীকরণ' },
      { id: 'ht_dash',    type: 'item', label: 'ই-হোটেল ড্যাশবোর্ড' },
      { id: 'ht_payment', type: 'item', label: 'হোটেল পেমেন্ট জেনারেট' },
    ],
  },
];

// ─── Small Sub-components ──────────────────────────────────────────────────────
function ServiceIcon({ item }: { item: any }) {
  return (
    <TouchableOpacity style={styles.iconItem} activeOpacity={0.7}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={item.icon as any} size={28} color={Colors.primary} />
      </View>
      <Text style={styles.iconLabel} numberOfLines={2}>{item.label}</Text>
    </TouchableOpacity>
  );
}

function ServiceSection({ title, items }: { title: string; items: any[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.iconGrid}>
        {items.map((item) => <ServiceIcon key={item.id} item={item} />)}
      </View>
    </View>
  );
}

function SidebarAccordion({ item }: { item: any }) {
  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };
  return (
    <View>
      <TouchableOpacity style={styles.sidebarAccordionRow} onPress={toggle} activeOpacity={0.7}>
        <View style={styles.sidebarRowLeft}>
          <MaterialIcons name="grid-view" size={16} color={Colors.white} style={styles.sidebarRowIcon} />
          <Text style={styles.sidebarItemLabel}>{item.label}</Text>
        </View>
        <MaterialIcons name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color={Colors.white} />
      </TouchableOpacity>
      {open && item.children?.map((child: any) => (
        <TouchableOpacity key={child.id} style={styles.sidebarChildRow} activeOpacity={0.7}>
          <MaterialIcons name="chevron-right" size={16} color={Colors.primaryLight} style={styles.sidebarRowIcon} />
          <Text style={styles.sidebarChildLabel}>{child.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function SidebarSection({ section }: { section: any }) {
  return (
    <View>
      <View style={styles.sidebarSectionHeader}>
        <MaterialCommunityIcons name="chevron-double-right" size={18} color={Colors.white} />
        <Text style={styles.sidebarSectionLabel}>{section.label}</Text>
      </View>
      {section.children?.map((child: any) => {
        if (child.type === 'accordion') return <SidebarAccordion key={child.id} item={child} />;
        return (
          <TouchableOpacity key={child.id} style={styles.sidebarItemRow} activeOpacity={0.7}>
            <View style={styles.sidebarRowLeft}>
              <MaterialIcons name="grid-view" size={16} color={Colors.white} style={styles.sidebarRowIcon} />
              <Text style={styles.sidebarItemLabel}>{child.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export function DashboardScreen({ navigation, route }: Props) {
  const email = route?.params?.email ?? 'মোহাম্মদ রাশেদুল ইসলাম';
  const [activeTab, setActiveTab]   = React.useState('home');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [kebabOpen, setKebabOpen]   = React.useState(false);
  const [homeOpen, setHomeOpen]     = React.useState(false);

  // ── Hamburger (left) animation ──
  const sidebarAnim = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  // ── Kebab (right) animation ──
  const kebabAnim   = React.useRef(new Animated.Value(KEBAB_WIDTH)).current;
  // shared overlay opacity
  const overlayAnim = React.useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    if (kebabOpen) closeKebab(false);
    setSidebarOpen(true);
    Animated.parallel([
      Animated.timing(sidebarAnim, { toValue: 0,            duration: 280, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 1,            duration: 280, useNativeDriver: true }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarAnim, { toValue: -SIDEBAR_WIDTH, duration: 240, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0,              duration: 240, useNativeDriver: true }),
    ]).start(() => setSidebarOpen(false));
  };

  const openKebab = () => {
    if (sidebarOpen) closeSidebar();
    setKebabOpen(true);
    Animated.parallel([
      Animated.timing(kebabAnim,   { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
    ]).start();
  };

  const closeKebab = (animate = true) => {
    Animated.parallel([
      Animated.timing(kebabAnim,   { toValue: KEBAB_WIDTH, duration: animate ? 240 : 0, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: 0,           duration: animate ? 240 : 0, useNativeDriver: true }),
    ]).start(() => setKebabOpen(false));
  };

  const handleLogout = () => {
    closeSidebar();
    closeKebab();
    setTimeout(() => navigation.replace('Login'), 300);
  };

  const dismissAll = () => {
    if (sidebarOpen) closeSidebar();
    if (kebabOpen)   closeKebab();
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>নাগরিক পোর্টাল</Text>
        <TouchableOpacity onPress={openKebab} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="more-vert" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* ── Welcome ── */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeSmall}>স্বাগতম,</Text>
        <Text style={styles.welcomeName}>{email}</Text>
      </View>

      {/* ── Body ── */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ServiceSection title="হোল্ডিং ট্যাক্স" items={HOLDING_TAX_ITEMS} />
        <ServiceSection title="ট্রেড লাইসেন্স"  items={TRADE_LICENSE_ITEMS} />
        <ServiceSection title="হোটেল ট্যাক্স"   items={HOTEL_TAX_ITEMS} />
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.tabBar}>
        {BOTTOM_TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => setActiveTab(tab.key)} activeOpacity={0.7}>
              <MaterialCommunityIcons name={tab.icon as any} size={22} color={active ? Colors.primary : Colors.gray500} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Shared Overlay ── */}
      {(sidebarOpen || kebabOpen) && (
        <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} pointerEvents="auto">
          <TouchableOpacity style={{ flex: 1 }} onPress={dismissAll} activeOpacity={1} />
        </Animated.View>
      )}

      {/* ════════════════════════════════════════════════════
          LEFT SIDEBAR — Hamburger menu
      ════════════════════════════════════════════════════ */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {/* DNCC Top */}
          <View style={styles.sidebarTop}>
            <View style={styles.dnccLogoCircle}>
              <MaterialCommunityIcons name="shield-crown-outline" size={28} color={Colors.white} />
            </View>
            <Text style={styles.dnccTitle}>DNCC</Text>
          </View>

          {/* Username */}
          <TouchableOpacity style={styles.usernameRow} activeOpacity={0.8}>
            <View style={styles.sidebarRowLeft}>
              <Ionicons name="person-outline" size={18} color={Colors.white} />
              <Text style={[styles.usernameLabel, { marginLeft: 10 }]}>{email}</Text>
            </View>
          </TouchableOpacity>

          {/* হোম row */}
          <TouchableOpacity
            style={styles.homeRow}
            activeOpacity={0.8}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setHomeOpen((v) => !v);
            }}
          >
            <View style={styles.sidebarRowLeft}>
              <MaterialIcons name="grid-view" size={16} color={Colors.white} style={styles.sidebarRowIcon} />
              <Text style={styles.sidebarItemLabel}>হোম</Text>
            </View>
            <MaterialIcons name={homeOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color={Colors.white} />
          </TouchableOpacity>

          {SIDEBAR_NAV.map((section) => (
            <SidebarSection key={section.id} section={section} />
          ))}

          {/* Logout */}
          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={18} color="#FFF" />
            <Text style={styles.logoutLabel}>লগ আউট</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>

      {/* ════════════════════════════════════════════════════
          RIGHT PANEL — Kebab (3-dot) menu
      ════════════════════════════════════════════════════ */}
      <Animated.View style={[styles.kebabPanel, { transform: [{ translateX: kebabAnim }] }]}>
        <View style={styles.kebabInner}>
          {KEBAB_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.kebabRow,
                item.id === 'logout' && styles.kebabRowLogout,
              ]}
              activeOpacity={0.75}
              onPress={item.id === 'logout' ? handleLogout : () => closeKebab()}
            >
              {/* Icon */}
              <View style={[styles.kebabIconBox, item.id === 'logout' && styles.kebabIconBoxLogout]}>
                {item.family === 'material' ? (
                  <MaterialIcons name={item.icon as any} size={18}
                    color={item.id === 'logout' ? '#FF6B6B' : Colors.white} />
                ) : (
                  <Ionicons name={item.icon as any} size={18}
                    color={item.id === 'logout' ? '#FF6B6B' : Colors.white} />
                )}
              </View>
              <Text style={[styles.kebabLabel, item.id === 'logout' && styles.kebabLabelLogout]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

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

  // Welcome
  welcomeBox: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, backgroundColor: '#188754' },
  welcomeSmall: { fontSize: FontSizes.sm, color: '#D3EAE0' },
  welcomeName:  { fontSize: FontSizes.lg, fontWeight: '700', color: '#D3EAE0', marginTop: 2 },

  // Body
  body: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.md },

  // Section
  section: { marginBottom: Spacing.sm, backgroundColor: Colors.white, paddingVertical: Spacing.md },
  sectionTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.primary, textAlign: 'center', marginBottom: Spacing.md, letterSpacing: 0.3 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.sm },
  iconItem: { width: '33.33%', alignItems: 'center', marginBottom: Spacing.md, paddingHorizontal: 4 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: 6, borderWidth: 1.5, borderColor: Colors.gray200 },
  iconLabel: { fontSize: FontSizes.xs, color: Colors.textPrimary, textAlign: 'center', fontWeight: '500', lineHeight: 15 },

  // Bottom Tab
  tabBar: { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: 8, paddingTop: 6 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel: { fontSize: 9, color: Colors.gray500, textAlign: 'center', fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },

  // Overlay
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.40)', zIndex: 10 },

  // ── Left Sidebar ──────────────────────────────────────────────────────────
  sidebar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: SIDEBAR_WIDTH, backgroundColor: Colors.primary, zIndex: 20, shadowColor: Colors.black, shadowOffset: { width: 4, height: 0 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 16 },
  sidebarTop: { backgroundColor: Colors.primaryDark, flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: 48, paddingBottom: Spacing.md, gap: Spacing.sm },
  dnccLogoCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.white },
  dnccTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '800', letterSpacing: 1 },
  usernameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.primaryDark },
  usernameLabel: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '600' },
  homeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: 13, backgroundColor: Colors.white + '22', marginHorizontal: Spacing.md, marginTop: Spacing.sm, borderRadius: BorderRadius.sm },
  sidebarSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: Spacing.md, paddingVertical: 10, marginTop: Spacing.sm },
  sidebarSectionLabel: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '700', letterSpacing: 0.3 },
  sidebarItemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: Spacing.md, backgroundColor: Colors.white + '15', marginHorizontal: Spacing.md, marginBottom: 4, borderRadius: BorderRadius.sm },
  sidebarRowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  sidebarRowIcon: { marginRight: 10,color: "#FFF" },
  sidebarItemLabel: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '500', flex: 1 },
  sidebarAccordionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: Spacing.md, backgroundColor: Colors.white + '15', marginHorizontal: Spacing.md, marginBottom: 4, borderRadius: BorderRadius.sm },
  sidebarChildRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: Spacing.xl + 4, paddingRight: Spacing.md, marginHorizontal: Spacing.md, marginBottom: 2 },
  sidebarChildLabel: { color: "#FFF", fontSize: FontSizes.sm, fontWeight: '400' },
  logoutRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingVertical: 14, marginTop: Spacing.md, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.primaryDark },
  logoutLabel: { color: '#FFF', fontSize: FontSizes.md, fontWeight: '600' },

  // ── Right Kebab Panel ─────────────────────────────────────────────────────
  kebabPanel: {
    position: 'absolute',
    top: 56,          // just below the header
    right: 0,
    width: KEBAB_WIDTH,
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  kebabInner: {
    marginHorizontal: Spacing.md,
    marginTop: 8,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 16,
  },
  kebabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.primaryDark,
    gap: Spacing.md,
  },
  kebabRowLogout: {
    borderBottomWidth: 0,
  },
  kebabIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.white + '55',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark + '66',
  },
  kebabIconBoxLogout: {
    borderColor: '#FF6B6B55',
    backgroundColor: 'transparent',
  },
  kebabLabel: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  kebabLabelLogout: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});