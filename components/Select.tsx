import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  type ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  error?: string;
  enabled?: boolean;
  onChange: (value: string) => void;
}

export function Select({
  label,
  options,
  value,
  placeholder = 'নির্বাচন করুন',
  containerStyle,
  error,
  enabled = true,
  onChange,
}: Props) {
  const [showPicker, setShowPicker] = React.useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputWrapper,
          error && styles.inputError,
          !enabled && styles.inputDisabled,
        ]}
        activeOpacity={enabled ? 0.8 : 1}
        onPress={() => enabled && options.length > 0 && setShowPicker(true)}
      >
        <Text style={[styles.valueText, !selectedLabel && styles.placeholderText]} numberOfLines={1}>
          {selectedLabel || placeholder}
        </Text>
        <MaterialIcons
          name={enabled ? 'arrow-drop-down' : 'block'}
          size={20}
          color={enabled ? Colors.gray500 : Colors.gray300}
        />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal visible={showPicker} transparent animationType="slide" onRequestClose={() => setShowPicker(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.modalActionText}>বাতিল</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={[styles.modalActionText, styles.modalActionConfirm]}>ঠিক আছে</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, item.value === value && styles.optionSelected]}
                  onPress={() => {
                    onChange(item.value);
                    setShowPicker(false);
                  }}
                >
                  <Text style={[styles.optionText, item.value === value && styles.optionTextSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  inputDisabled: {
    backgroundColor: Colors.gray100,
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    maxHeight: '60%',
    paddingBottom: Spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray300,
  },
  modalActionText: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  modalActionConfirm: {
    color: Colors.primary,
  },
  option: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray200,
  },
  optionSelected: {
    backgroundColor: Colors.primaryLight,
  },
  optionText: {
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
