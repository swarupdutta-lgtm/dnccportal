import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  type ViewStyle,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';

interface Props {
  label: string;
  value?: Date;
  placeholder?: string;
  containerStyle?: ViewStyle;
  minimumDate?: Date;
  maximumDate?: Date;
  onChange: (date: Date) => void;
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export function DateInput({
  label,
  value,
  placeholder = 'mm/dd/yyyy',
  containerStyle,
  minimumDate,
  maximumDate,
  onChange,
}: Props) {
  const [showPicker, setShowPicker] = React.useState(false);
  const [iosDraftDate, setIosDraftDate] = React.useState<Date>(value ?? new Date());

  React.useEffect(() => {
    if (value) {
      setIosDraftDate(value);
    }
  }, [value]);

  const openPicker = () => {
    setIosDraftDate(value ?? new Date());
    setShowPicker(true);
  };

  const handleAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleIOSChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setIosDraftDate(selectedDate);
    }
  };

  const confirmIOSDate = () => {
    onChange(iosDraftDate);
    setShowPicker(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.inputWrapper} activeOpacity={0.8} onPress={openPicker}>
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <MaterialIcons name="calendar-today" size={18} color={Colors.gray500} />
      </TouchableOpacity>

      {showPicker && Platform.OS === 'android' ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={handleAndroidChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      ) : null}

      <Modal
        visible={showPicker && Platform.OS === 'ios'}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.modalActionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmIOSDate}>
                <Text style={[styles.modalActionText, styles.modalActionConfirm]}>Done</Text>
              </TouchableOpacity>
            </View>

            <DateTimePicker
              value={iosDraftDate}
              mode="date"
              display="spinner"
              onChange={handleIOSChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
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
  valueText: {
    fontSize: FontSizes.lg,
    color: Colors.textPrimary,
  },
  placeholderText: {
    color: Colors.gray400,
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
});
