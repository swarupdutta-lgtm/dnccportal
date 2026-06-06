import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '../components/Input';
import { DateInput } from '../components/DateInput';
import { Select } from '../components/Select';
import { FileUpload } from '../components/FileUpload';
import { Button } from '../components/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import { ADDRESS_DROPDOWN_DATA } from '../data/dropdownData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
  route: {
    params: {
      title: string;
      fields: FormSection[];
    };
  };
}

interface FormSection {
  title: string;
  fields: string[];
}

interface SavedApplication {
  id: string;
  type: string;
  data: Record<string, string>;
  savedAt: string;
}

type FieldType = 'text' | 'date' | 'dropdown' | 'file';

interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  dropdownKey?: string;
}

const ADDRESS_FIELDS: FieldConfig[] = [
  { key: 'houseNo', label: 'হাউস নম্বর', type: 'text' },
  { key: 'zone', label: 'অঞ্চল', type: 'dropdown', dropdownKey: 'zone' },
  { key: 'ward', label: 'ওয়ার্ড', type: 'dropdown', dropdownKey: 'ward' },
  { key: 'sector', label: 'সেক্টর/সেকশন', type: 'dropdown', dropdownKey: 'sector' },
  { key: 'area', label: 'এরিয়া/ব্লক', type: 'dropdown', dropdownKey: 'area' },
  { key: 'road', label: 'রোড', type: 'dropdown', dropdownKey: 'road' },
];

function getFieldConfig(label: string): FieldConfig {
  const addressField = ADDRESS_FIELDS.find(
    (f) => f.label === label || label.startsWith(f.label)
  );
  if (addressField) return addressField;
  if (label.includes('তারিখ')) return { key: label, label, type: 'date' };
  if (label === 'সংযুক্ত করুন') return { key: 'attachment', label: 'সংযুক্ত করুন', type: 'file' };
  return { key: label, label, type: 'text' };
}

function getFormConfig(screen: string): { title: string; sections: FormSection[] } {
  const configs: Record<string, { title: string; sections: FormSection[] }> = {
    NewHolding: {
      title: 'নতুন হোল্ডিং এর আবেদন',
      sections: [
        {
          title: 'ব্যক্তিগত বিবরণ',
          fields: [
            'এসেসি - মালিক / দখলকারের নাম (বাংলা) *',
            'মাতার নাম (বাংলা)',
            'স্বামীর / স্ত্রীর নাম (বাংলা)',
            'মোবাইল নম্বর',
            'জাতীয় পরিচয় পত্র নম্বর',
            'ইমেইল',
          ],
        },
        {
          title: 'সম্পত্তির অবস্থান',
          fields: [
            'হাউস নম্বর',
            'অঞ্চল',
            'ওয়ার্ড',
            'সেক্টর/সেকশন',
            'এরিয়া/ব্লক',
            'রোড',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    Namjari: {
      title: 'নামজারির আবেদন',
      sections: [
        {
          title: 'সম্পত্তির অবস্থান',
          fields: [
            'হাউস নম্বর',
            'আবেদনের তারিখ *',
            'অঞ্চল',
            'ওয়ার্ড',
            'সেক্টর/সেকশন',
            'এরিয়া/ব্লক',
            'রোড',
          ],
        },
        {
          title: 'ব্যক্তিগত বিবরণ',
          fields: [
            'আবেদনকারীর নাম',
            'পিতার নাম',
            'মাতার নাম',
            'মোবাইল নম্বর',
            'এনআইডি নম্বর',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    Nayabadi: {
      title: 'নয়াবাদি আবেদন',
      sections: [
        {
          title: 'সম্পত্তির অবস্থান',
          fields: [
            'হাউস নম্বর',
            'আবেদনের তারিখ *',
            'অঞ্চল',
            'ওয়ার্ড',
            'সেক্টর/সেকশন',
            'এরিয়া/ব্লক',
            'রোড',
          ],
        },
        {
          title: 'ব্যক্তিগত বিবরণ',
          fields: [
            'আবেদনকারীর নাম',
            'পিতার নাম',
            'মাতার নাম',
            'মোবাইল নম্বর',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    FreedomFighter: {
      title: 'মুক্তিযোদ্ধার সুবিধার আবেদন',
      sections: [
        {
          title: 'ব্যক্তিগত বিবরণ',
          fields: [
            'আবেদনকারীর নাম',
            'পিতার নাম',
            'মাতার নাম',
            'মোবাইল নম্বর',
            'মুক্তিযোদ্ধা সনদ নম্বর',
          ],
        },
        {
          title: 'সম্পত্তির অবস্থান',
          fields: [
            'হাউস নম্বর',
            'অঞ্চল',
            'ওয়ার্ড',
            'সেক্টর/সেকশন',
            'এরিয়া/ব্লক',
            'রোড',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    NewTradeLicense: {
      title: 'নতুন ট্রেড লাইসেন্সের আবেদন',
      sections: [
        {
          title: 'সম্পত্তির অবস্থান',
          fields: [
            'ব্যবসার ধরণ ১',
            'ব্যবসার ধরণ ২',
            'ব্যবসার নাম',
            'ব্যবসার ঠিকানা',
            'হাউস নম্বর',
            'অঞ্চল',
            'ওয়ার্ড',
            'সেক্টর/সেকশন',
            'এরিয়া/ব্লক',
            'রোড',
          ],
        },
        {
          title: 'লাইসেন্স তথ্য',
          fields: ['লাইসেন্স ফি', 'অর্থ বছর', 'ক্যাপিটাল'],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    OldTradeLicense: {
      title: 'পুরাতন ট্রেড লাইসেন্সের আবেদন',
      sections: [
        {
          title: 'লাইসেন্স তথ্য',
          fields: [
            'পুরাতন লাইসেন্স নম্বর',
            'ব্যবসার ধরণ ১',
            'ব্যবসার ধরণ ২',
            'ব্যবসার নাম',
            'ব্যবসার ঠিকানা',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
    TradeLicenseChange: {
      title: 'পরিবর্তন/সংশোধন আবেদন',
      sections: [
        {
          title: 'আবেদন তথ্য',
          fields: [
            'ট্রেড লাইসেন্স নং',
            'সংশোধনের কারণ',
            'নাম পরিবর্তন',
            'ব্যবসা প্রতিষ্ঠানের ঠিকানা পরিবর্তন',
          ],
        },
        {
          title: 'সংযুক্তি',
          fields: ['সংযুক্ত করুন'],
        },
      ],
    },
  };
  return configs[screen] || configs.NewHolding;
}

const STORAGE_KEY = '@dncc_applications';

async function saveApplication(type: string, data: Record<string, string>) {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const applications: SavedApplication[] = existing ? JSON.parse(existing) : [];
    const newApp: SavedApplication = {
      id: Date.now().toString(),
      type,
      data,
      savedAt: new Date().toISOString(),
    };
    applications.unshift(newApp);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch {
    return false;
  }
}

export function ApplicationFormScreen({ navigation, route }: Props) {
  const screenName = route?.params?.title || 'NewHolding';
  const config = getFormConfig(screenName);
  const insets = useSafeAreaInsets();
  const [textValues, setTextValues] = React.useState<Record<string, string>>({});
  const [dateValues, setDateValues] = React.useState<Record<string, Date>>({});
  const [dropdownValues, setDropdownValues] = React.useState<Record<string, string>>({});
  const [fileValues, setFileValues] = React.useState<Record<string, { name: string; uri: string }>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const handleDropdownChange = (key: string, value: string) => {
    setDropdownValues((prev) => {
      const next = { ...prev, [key]: value };
      // Clear child dropdowns when parent changes
      if (key === 'zone') {
        delete next.ward;
        delete next.sector;
        delete next.area;
        delete next.road;
      } else if (key === 'ward') {
        delete next.sector;
        delete next.area;
        delete next.road;
      } else if (key === 'sector') {
        delete next.area;
        delete next.road;
      } else if (key === 'area') {
        delete next.road;
      }
      return next;
    });
  };

  const getDropdownOptions = (dropdownKey: string) => {
    const { zones, wardsByZone, sectorsByWard, areasBySector, roadsByArea } = ADDRESS_DROPDOWN_DATA;
    switch (dropdownKey) {
      case 'zone':
        return zones;
      case 'ward': {
        const zone = dropdownValues.zone;
        return zone ? (wardsByZone[zone] || []) : [];
      }
      case 'sector': {
        const ward = dropdownValues.ward;
        return ward ? (sectorsByWard[ward] || []) : [];
      }
      case 'area': {
        const sector = dropdownValues.sector;
        return sector ? (areasBySector[sector] || []) : [];
      }
      case 'road': {
        const area = dropdownValues.area;
        return area ? (roadsByArea[area] || []) : [];
      }
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const allData: Record<string, string> = {};
    for (const [k, v] of Object.entries(textValues)) {
      const label = k.split('-').slice(2).join('-');
      allData[label] = v;
    }
    for (const [k, v] of Object.entries(dateValues)) {
      const label = k.split('-').slice(2).join('-');
      allData[label] = v.toLocaleDateString('bn-BD');
    }
    for (const [k, v] of Object.entries(dropdownValues)) {
      allData[k] = v;
    }
    for (const [k, v] of Object.entries(fileValues)) {
      allData[k] = v.name;
    }

    const saved = await saveApplication(screenName, allData);

    setSubmitting(false);

    if (saved) {
      Alert.alert(
        'সফল হয়েছে',
        'আপনার আবেদন সফলভাবে জমা হয়েছে।',
        [
          {
            text: 'ঠিক আছে',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } else {
      Alert.alert(
        'ত্রুটি',
        'আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        [{ text: 'ঠিক আছে' }]
      );
    }
  };

  const renderField = (field: string, inputKey: string) => {
    const fieldConfig = getFieldConfig(field);

    switch (fieldConfig.type) {
      case 'date':
        return (
          <DateInput
            key={inputKey}
            label={field}
            placeholder="mm/dd/yyyy"
            value={dateValues[inputKey]}
            onChange={(date) =>
              setDateValues((prev) => ({
                ...prev,
                [inputKey]: date,
              }))
            }
          />
        );
      case 'file':
        return (
          <FileUpload
            key={inputKey}
            label={field}
            value={fileValues[inputKey]?.name}
            onFileSelected={(name, uri) =>
              setFileValues((prev) => ({
                ...prev,
                [inputKey]: { name, uri },
              }))
            }
          />
        );
      case 'dropdown':
        return (
          <Select
            key={`${inputKey}-${dropdownValues.zone}-${dropdownValues.ward}-${dropdownValues.sector}-${dropdownValues.area}`}
            label={fieldConfig.label}
            options={getDropdownOptions(fieldConfig.dropdownKey!)}
            value={dropdownValues[fieldConfig.dropdownKey!]}
            onChange={(value) => handleDropdownChange(fieldConfig.dropdownKey!, value)}
          />
        );
      default:
        return (
          <Input
            key={inputKey}
            label={field}
            placeholder={field}
            value={textValues[inputKey] ?? ''}
            onChangeText={(text) =>
              setTextValues((prev) => ({
                ...prev,
                [inputKey]: text,
              }))
            }
          />
        );
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.root}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← ড্যাশবোর্ড</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{config.title}</Text>
          <View />
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Spacing.xxl + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          {config.sections.map((section, si) => (
            <View key={si} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.sectionContent}>
                {section.fields.map((field, fi) => {
                  const inputKey = `${si}-${fi}-${field}`;
                  return renderField(field, inputKey);
                })}
              </View>
            </View>
          ))}

          <View style={styles.actions}>
            <Button
              title="জমা দিন"
              onPress={handleSubmit}
              loading={submitting}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  headerSafeArea: {
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  backButton: {
    color: Colors.white,
    fontSize: FontSizes.md,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
  },
  sectionContent: {
    padding: Spacing.lg,
  },
  actions: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xxl,
  },
});
