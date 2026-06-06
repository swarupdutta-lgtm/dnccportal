import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Animated,
  Pressable,
  Easing,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes } from '../theme/colors';
import { Sidebar } from '../components/Sidebar';

const USER_MAP: Record<string, { name: string; pfp: any }> = {
  admin: {
    name: 'Admin',
    pfp: require('../assets/pfp/admin.png'),
  },
  'syedsohel.parvez@atnrk.com': {
    name: 'Syed Sohel Parvez',
    pfp: require('../assets/pfp/syed.png'),
  },
};

interface ServiceItem {
  label: string;
  icon: string;
  color: string;
  screen: string;
}

interface ServiceGroup {
  title: string;
  icon: string;
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    title: 'হোল্ডিং ট্যাক্স আবেদন',
    icon: 'home-city',
    items: [
      { label: 'নতুন হোল্ডিং', icon: 'home-plus', color: '#E91E63', screen: 'NewHolding' },
      { label: 'নামজারি', icon: 'file-document-edit', color: '#009688', screen: 'Namjari' },
      { label: 'নয়াবাদি', icon: 'home-group', color: '#FF9800', screen: 'Nayabadi' },
      { label: 'মুক্তিযোদ্ধা', icon: 'medal', color: '#2196F3', screen: 'FreedomFighter' },
    ],
  },
  {
    title: 'ট্রেড লাইসেন্স আবেদন',
    icon: 'store',
    items: [
      { label: 'নতুন ট্রেড লাইসেন্স', icon: 'briefcase-plus', color: '#9C27B0', screen: 'NewTradeLicense' },
      { label: 'পুরাতন ট্রেড লাইসেন্স', icon: 'briefcase-check', color: '#607D8B', screen: 'OldTradeLicense' },
      { label: 'পরিবর্তন/সংশোধন', icon: 'autorenew', color: '#E91E63', screen: 'TradeLicenseChange' },
    ],
  },
  {
    title: 'হোল্ডিং ট্যাক্স অনুসন্ধান',
    icon: 'home-search',
    items: [
      { label: 'নতুন হোল্ডিং\nঅনুসন্ধান', icon: 'home-search', color: '#009688', screen: 'HoldingSearch' },
      { label: 'নামজারি\nঅনুসন্ধান', icon: 'file-search', color: '#FF9800', screen: 'NamjariSearch' },
      { label: 'নয়াবাদি\nঅনুসন্ধান', icon: 'map-search', color: '#4CAF50', screen: 'NayabadiSearch' },
      { label: 'মুক্তিযোদ্ধা\nঅনুসন্ধান', icon: 'account-search', color: '#2196F3', screen: 'FreedomFighterSearch' },
    ],
  },
  {
    title: 'ট্রেড লাইসেন্স অনুসন্ধান',
    icon: 'store-search',
    items: [
      { label: 'নতুন ট্রেড লাইসেন্স\nঅনুসন্ধান', icon: 'briefcase-search', color: '#9C27B0', screen: 'NewTLSearch' },
      { label: 'পুরাতন ট্রেড লাইসেন্স\nঅনুসন্ধান', icon: 'clipboard-search', color: '#607D8B', screen: 'OldTLSearch' },
      { label: 'পরিবর্তন/সংশোধন\nঅনুসন্ধান', icon: 'database-search', color: '#E91E63', screen: 'ChangeTLSearch' },
    ],
  },
];

interface Props {
  navigation: any;
  route?: any;
}

export function DashboardScreen({ navigation, route }: Props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeBottomTab, setActiveBottomTab] = React.useState<'home' | 'holding' | 'trade' | 'hotel'>('home');
  const [profileMenuVisible, setProfileMenuVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
  const profileMenuAnim = React.useRef(new Animated.Value(0)).current;

  const userEmail = route?.params?.email || 'admin';
  const userInfo = USER_MAP[userEmail] || USER_MAP.admin;

  const openProfileMenu = () => {
    setProfileMenuVisible(true);
    Animated.timing(profileMenuAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeProfileMenu = () => {
    Animated.timing(profileMenuAnim, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setProfileMenuVisible(false);
      }
    });
  };

  const handleProfileMenuAction = (action: 'profile' | 'settings' | 'help' | 'language' | 'logout') => {
    closeProfileMenu();
    if (action === 'logout') {
      navigation.replace('Login');
      return;
    }
    if (action === 'profile') {
      Alert.alert('প্রোফাইল', 'প্রোফাইল ফিচারটি শীঘ্রই যুক্ত হবে।');
      return;
    }
    if (action === 'settings') {
      Alert.alert('সেটিংস', 'সেটিংস ফিচারটি শীঘ্রই যুক্ত হবে।');
      return;
    }
    if (action === 'help') {
      Alert.alert('সহায়তা', 'সহায়তা ফিচারটি শীঘ্রই যুক্ত হবে।');
      return;
    }
    Alert.alert('ভাষা', 'ভাষা পরিবর্তন ফিচারটি শীঘ্রই যুক্ত হবে।');
  };

  const profileMenuItems: Array<{
    key: 'profile' | 'settings' | 'help' | 'language' | 'logout';
    icon: string;
    label: string;
  }> = [
    { key: 'profile', icon: 'account-outline', label: 'প্রোফাইল' },
    { key: 'settings', icon: 'cog-outline', label: 'সেটিংস' },
    { key: 'help', icon: 'phone-outline', label: 'সহায়তা' },
    { key: 'language', icon: 'web', label: 'ভাষা' },
    { key: 'logout', icon: 'logout', label: 'লগ আউট' },
  ];

  const bottomNavItems: Array<{
    key: 'home' | 'holding' | 'trade' | 'hotel';
    label: string;
    icon: string;
    onPress: () => void;
  }> = [
    {
      key: 'home',
      label: 'হোম',
      icon: 'home-outline',
      onPress: () => {
        setActiveBottomTab('home');
      },
    },
    {
      key: 'holding',
      label: 'হোল্ডিং ট্যাক্স',
      icon: 'file-document-outline',
      onPress: () => {
        setActiveBottomTab('holding');
        navigation.navigate('HoldingSearch');
      },
    },
    {
      key: 'trade',
      label: 'ট্রেড লাইসেন্স',
      icon: 'briefcase-outline',
      onPress: () => {
        setActiveBottomTab('trade');
        navigation.navigate('NewTLSearch');
      },
    },
    {
      key: 'hotel',
      label: 'হোটেল ট্যাক্স',
      icon: 'office-building-outline',
      onPress: () => {
        setActiveBottomTab('hotel');
        Alert.alert('শীঘ্রই আসছে', 'হোটেল ট্যাক্স ফিচারটি শীঘ্রই যুক্ত হবে।');
      },
    },
  ];

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top', 'bottom']} style={{ backgroundColor: Colors.primary }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => setSidebarOpen(true)}>
            <MaterialCommunityIcons name="menu" size={24} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.userName} numberOfLines={1}>
              {userInfo.name}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => Alert.alert('Notifications', 'No new notifications')}
            >
              <MaterialCommunityIcons name="bell-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={profileMenuVisible ? closeProfileMenu : openProfileMenu}>
              <Image source={userInfo.pfp} style={styles.pfp} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={navigation}
        currentScreen="Dashboard"
        onViewChange={() => {}}
      />

      {profileMenuVisible && (
        <View style={styles.profileMenuOverlay} pointerEvents="box-none">
          <Pressable style={styles.profileMenuBackdrop} onPress={closeProfileMenu} />
          <Animated.View
            style={[
              styles.profileMenuPanel,
              {
                top: insets.top + 62,
                opacity: profileMenuAnim,
                transform: [
                  {
                    translateY: profileMenuAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-12, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {profileMenuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.profileMenuItem}
                onPress={() => handleProfileMenuAction(item.key)}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name={item.icon as any} size={20} color={Colors.white} />
                <Text style={styles.profileMenuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      )}

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: 96 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        {serviceGroups.map((group) => (
          <View key={group.title}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name={group.icon as any} size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>{group.title}</Text>
            </View>
            <View style={styles.gridCard}>
              <View style={styles.grid}>
                {group.items.map((item) => (
                  <TouchableOpacity
                    key={item.screen}
                    style={styles.gridItem}
                    onPress={() => navigation.navigate(item.screen)}
                    activeOpacity={0.6}
                  >
                    <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={30} color={Colors.white} />
                    </View>
                    <Text style={styles.gridLabel} numberOfLines={2}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNavGlassLayer} pointerEvents="none" />
        <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          {bottomNavItems.map((item) => {
            const isActive = activeBottomTab === item.key;
            return (
              <TouchableOpacity key={item.key} style={styles.navItem} onPress={item.onPress} activeOpacity={0.8}>
                <View style={styles.navIconWrap}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={19}
                    color={isActive ? Colors.gray700 : Colors.gray600}
                  />
                </View>
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]} numberOfLines={1}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  pfp: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  userName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileMenuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 120,
  },
  profileMenuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  profileMenuPanel: {
    position: 'absolute',
    right: Spacing.md,
    width: 210,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 133, 63, 0.95)',
    padding: Spacing.sm,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  profileMenuLabel: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '500',
  },

  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  gridCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 11,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },

  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(230, 230, 230, 0.8)',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  bottomNavGlassLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: Colors.gray400,
    fontWeight: '500',
  },
  navLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
