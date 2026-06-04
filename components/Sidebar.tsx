import React from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes } from '../theme/colors';
import { Logo } from './Logo';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(width * 0.8, 320);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface MenuItem {
  label: string;
  icon: string;
  screen?: string;
  hubView?: string;
  children?: Array<{
    label: string;
    screen: string;
    icon: string;
  }>;
}

const menuData: MenuItem[] = [
  {
    icon: 'view-dashboard-outline',
    label: 'ড্যাশবোর্ড',
    screen: 'Dashboard',
  },
  {
    icon: 'home-city-outline',
    label: 'হোল্ডিং ট্যাক্স আবেদন',
    hubView: 'holdingTax',
    children: [
      { label: 'নতুন হোল্ডিং এর আবেদন', screen: 'NewHolding', icon: 'home-plus-outline' },
      { label: 'নামজারি আবেদন', screen: 'Namjari', icon: 'file-document-edit-outline' },
      { label: 'নামাদি আবেদন', screen: 'Nayabadi', icon: 'map-marker-path' },
      { label: 'মুক্তিযোদ্ধার সুবিধার জন্য আবেদন', screen: 'FreedomFighter', icon: 'medal-outline' },
    ],
  },
  {
    icon: 'home-search-outline',
    label: 'হোল্ডিং ট্যাক্স অনুসন্ধান',
    hubView: 'holdingSearch',
    children: [
      { label: 'হোল্ডিং অনুসন্ধান', screen: 'HoldingSearch', icon: 'home-search' },
      { label: 'নামজারি অনুসন্ধান', screen: 'NamjariSearch', icon: 'file-search-outline' },
      { label: 'নামাদি অনুসন্ধান', screen: 'NayabadiSearch', icon: 'map-search-outline' },
    ],
  },
  {
    icon: 'briefcase-outline',
    label: 'ট্রেড লাইসেন্স আবেদন',
    hubView: 'tradeLicense',
    children: [
      { label: 'আবেদন এবং অনুসন্ধান', screen: 'NewTradeLicense', icon: 'file-send-outline' },
    ],
  },
  {
    icon: 'magnify',
    label: 'ট্রেড লাইসেন্স অনুসন্ধান',
    hubView: 'tradeLicenseSearch',
    children: [
      { label: 'অনুসন্ধান', screen: 'NewTLSearch', icon: 'text-search' },
    ],
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  currentScreen: string;
  onViewChange?: (view: string) => void;
}

export function Sidebar({ visible, onClose, navigation, currentScreen, onViewChange }: Props) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const insets = useSafeAreaInsets();
  const [isRendered, setIsRendered] = React.useState(visible);
  const translateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  React.useEffect(() => {
    if (visible) {
      setIsRendered(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }

    if (isRendered) {
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setIsRendered(false);
      });
    }
  }, [visible, isRendered, translateX]);

  if (!isRendered) return null;

  const toggleSection = (idx: number, item: MenuItem) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === idx ? null : idx);
    if (item.hubView && onViewChange) {
      onViewChange(item.hubView);
    }
  };

  const hasActiveChild = (item: MenuItem) => item.children?.some((child) => child.screen === currentScreen);

  return (
    <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1}>
      <AnimatedTouchableOpacity
        style={[
          styles.drawer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            transform: [{ translateX }],
          },
        ]}
        activeOpacity={1}
      >
        <View style={styles.drawerHeader}>
          <Logo size="small" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>DNCC</Text>
            <Text style={styles.headerSub}>Citizen Portal</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />

        <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
          {menuData.map((item, idx) => (
            <View key={idx}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  (currentScreen === item.screen || hasActiveChild(item)) && styles.menuItemActive,
                ]}
                onPress={() => {
                  if (item.children) {
                    toggleSection(idx, item);
                  } else if (item.screen) {
                    onClose();
                    navigation.navigate(item.screen);
                  }
                }}
                activeOpacity={0.8}
              >
                <View style={styles.menuItemLeft}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color="rgba(255,255,255,0.92)"
                  />
                  <Text
                    style={[styles.menuLabel, (currentScreen === item.screen || hasActiveChild(item)) && styles.menuLabelActive]}
                    numberOfLines={2}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.children && (
                  <MaterialCommunityIcons
                    name={expandedIndex === idx ? 'chevron-down' : 'chevron-right'}
                    size={20}
                    color="rgba(255,255,255,0.75)"
                  />
                )}
              </TouchableOpacity>

              {expandedIndex === idx && item.children?.map((child, ci) => (
                <TouchableOpacity
                  key={ci}
                  style={[styles.subMenuItem, currentScreen === child.screen && styles.subMenuItemActive]}
                  onPress={() => {
                    onClose();
                    navigation.navigate(child.screen);
                  }}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons
                    name={child.icon as any}
                    size={17}
                    color={currentScreen === child.screen ? Colors.white : 'rgba(255,255,255,0.78)'}
                  />
                  <Text
                    style={[styles.subMenuLabel, currentScreen === child.screen && styles.subMenuLabelActive]}
                    numberOfLines={2}
                  >
                    {child.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            পরিকল্পনা ও বাস্তবায়নে{'\n'}ICT Cell Dhaka North City Corporation
          </Text>
        </View>
      </AnimatedTouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.42)',
    zIndex: 100,
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: Colors.primaryDark,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FontSizes.xs,
  },
  closeBtn: {
    color: Colors.white,
    fontSize: 20,
    padding: Spacing.xs,
  },
  menuScroll: {
    flex: 1,
    paddingTop: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm + 6,
    paddingHorizontal: Spacing.lg,
    minHeight: 46,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.white,
  },
  menuLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: FontSizes.md + 1,
    flex: 1,
    fontWeight: '600',
  },
  menuLabelActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    minHeight: 42,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl + Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  subMenuItemActive: {
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  subMenuLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSizes.sm,
    flex: 1,
  },
  subMenuLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: FontSizes.xs,
    textAlign: 'center',
    lineHeight: 16,
  },
});
