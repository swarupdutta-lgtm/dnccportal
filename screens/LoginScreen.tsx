import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';

type Props = NativeStackScreenProps<any, 'Login'>;

const ALLOWED_CREDENTIALS = [
  { email: 'admin', password: 'admin' },
  { email: 'syedsohel.parvez@atnrk.com', password: '123456' },
];

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('ইমেইল প্রয়োজন');
      return;
    }

    if (!password.trim()) {
      setPasswordError('পাসওয়ার্ড প্রয়োজন');
      return;
    }

    const match = ALLOWED_CREDENTIALS.find(
      (c) =>
        c.email.toLowerCase() === email.trim().toLowerCase() &&
        c.password === password
    );

    if (!match) {
      Alert.alert('ত্রুটি', 'ভুল ইমেইল আইডি বা পাসওয়ার্ড');
      return;
    }

    navigation.replace('Dashboard', { email: match.email });
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo & Title ── */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appTitle}>Citizen's Portal</Text>
          </View>

          {/* ── Card ── */}
          <View style={styles.card}>

            {/* Green Header Tab */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Sign In</Text>
            </View>

            {/* White Body */}
            <View style={styles.cardBody}>

              {/* Email Input */}
              <Input
                placeholder="User or Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                error={emailError}
                containerStyle={styles.inputNoMargin}
              />

              {/* Password Input with show/hide toggle */}
              <Input
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                error={passwordError}
                containerStyle={styles.inputNoMargin}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={20}
                      color="#9E9E9E"
                    />
                  </TouchableOpacity>
                }
              />

              {/* Log In Button */}
              <Button
                title="Log In"
                onPress={handleLogin}
                style={styles.loginButton}
              />

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                activeOpacity={0.7}
                style={styles.linkRow}
              >
                <Text style={styles.linkText}>
                  Forgot your password?{' '}
                  <Text style={styles.linkHighlight}>Click Here</Text>
                </Text>
              </TouchableOpacity>

              {/* Register */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                activeOpacity={0.7}
                style={styles.linkRow}
              >
                <Text style={styles.linkText}>
                  Do not have an account?{' '}
                  <Text style={styles.linkHighlight}>Create One</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },

  // ── Logo ────────────────────────────────────────────────────────────────
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#188754",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  appTitle: {
    color: Colors.white,
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // ── Card ────────────────────────────────────────────────────────────────
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.primaryLight, // #E8F5E9 — light green tint matching PNG
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    backgroundColor: Colors.primary, // #00853F
    paddingVertical: 14,
    alignItems: 'center',
  },
  
  cardHeaderText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardBody: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
    gap: 14,
    backgroundColor: Colors.primaryLight, // #E8F5E9
  },

  // ── Fix: remove Input's own marginBottom (avoid double spacing with gap) ──
  inputNoMargin: {
    marginBottom: 0,
  },

  // ── Button ──────────────────────────────────────────────────────────────
  loginButton: {
    marginTop: 4,
  },

  // ── Links ───────────────────────────────────────────────────────────────
  linkRow: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  linkText: {
    fontSize: FontSizes.sm,
    color: "#E8F0FD",
    textAlign: 'center',
  },
  linkHighlight: {
    color:"#E8F0FD",
    fontWeight: '700',
  },
});