import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextInputProps,
} from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  containerStyle,
  rightIcon,
  ...textInputProps
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.gray400}
          {...textInputProps}
        />
        {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  rightIcon: {
    paddingRight: Spacing.md,
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: Colors.danger,
    marginTop: Spacing.xs,
  },
});
