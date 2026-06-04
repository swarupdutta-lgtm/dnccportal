import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<any, 'Registration'>;

export function RegistrationScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo size="large" />
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Registration</Text>
          </View>
          <View style={styles.form}>
            <Input placeholder="Email" keyboardType="email-address" />
            <Input placeholder="Mobile No" keyboardType="phone-pad" />
            <Button
              title="Next"
              onPress={() => navigation.navigate('Registration2')}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                Already have an account?{' '}
                <Text style={styles.linkHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.xl,
    fontWeight: '600',
  },
  form: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  link: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  linkHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
