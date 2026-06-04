import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';

interface Props {
  label: string;
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  error?: string;
  onFileSelected: (fileName: string, uri: string) => void;
}

export function FileUpload({
  label,
  value,
  placeholder = 'ফাইল নির্বাচন করুন',
  containerStyle,
  error,
  onFileSelected,
}: Props) {
  const handlePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        onFileSelected(file.name, file.uri);
      }
    } catch {
      // User cancelled or error
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={[styles.inputWrapper, error && styles.inputError]} activeOpacity={0.8} onPress={handlePick}>
        <MaterialIcons name="attach-file" size={20} color={value ? Colors.primary : Colors.gray400} />
        <Text style={[styles.valueText, !value && styles.placeholderText]} numberOfLines={1}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
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
    minHeight: 48,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  valueText: {
    flex: 1,
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  placeholderText: {
    color: Colors.gray400,
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: Colors.danger,
    marginTop: Spacing.xs,
  },
});
