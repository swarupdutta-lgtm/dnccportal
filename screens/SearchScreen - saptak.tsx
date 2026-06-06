import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '../components/Input';
import { DateInput } from '../components/DateInput';
import { Button } from '../components/Button';
import { Colors, Spacing, FontSizes, BorderRadius } from '../theme/colors';
import {
  searchHolding,
  searchNamjari,
  searchNayabadi,
  searchFreedomFighter,
  searchNewTL,
  searchOldTL,
  searchChangeTL,
  getStatusColor,
  SearchResultRow,
} from '../data/mockData';

interface Props {
  navigation: any;
  route: {
    params: {
      title: string;
      searchFields: string[];
    };
  };
}

function getSearchConfig(screen: string): { title: string; fields: string[] } {
  const configs: Record<string, { title: string; fields: string[] }> = {
    HoldingSearch: {
      title: 'নতুন হোল্ডিং এর আবেদন অনুসন্ধান',
      fields: ['তারিখ থেকে', 'তারিখ পর্যন্ত', 'অনুসন্ধানের যায়গা', 'দরখাস্ত নম্বর'],
    },
    NamjariSearch: {
      title: 'নামজারির আবেদন অনুসন্ধান',
      fields: ['তারিখ থেকে', 'তারিখ পর্যন্ত', 'অনুসন্ধানের যায়গা', 'দরখাস্ত নম্বর'],
    },
    NayabadiSearch: {
      title: 'নয়াবাদি আবেদন অনুসন্ধান',
      fields: ['তারিখ থেকে', 'তারিখ পর্যন্ত', 'অনুসন্ধানের যায়গা', 'দরখাস্ত নম্বর'],
    },
    FreedomFighterSearch: {
      title: 'মুক্তিযোদ্ধার সুবিধার আবেদন অনুসন্ধান',
      fields: ['তারিখ থেকে', 'তারিখ পর্যন্ত', 'অনুসন্ধানের যায়গা', 'দরখাস্ত নম্বর'],
    },
    NewTLSearch: {
      title: 'নতুন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',
      fields: ['অনুসন্ধানের যায়গা', 'আবেদন নম্বর', 'আবেদনকারীর নাম'],
    },
    OldTLSearch: {
      title: 'পুরাতন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান',
      fields: ['অনুসন্ধানের যায়গা', 'ট্রেড লাইসেন্স নং', 'ইস্যূকৃত পুরাতন লাইসেন্স নং'],
    },
    ChangeTLSearch: {
      title: 'পরিবর্তন/সংশোধন আবেদন অনুসন্ধান',
      fields: ['অনুসন্ধানের যায়গা', 'ট্রেড লাইসেন্স নম্বর', 'ডকেট নম্বর'],
    },
  };
  return configs[screen] || configs.HoldingSearch;
}

function doSearch(screenName: string, textValues: Record<string, string>): SearchResultRow[] {
  const area = textValues['অনুসন্ধানের যায়গা'];
  switch (screenName) {
    case 'HoldingSearch':
      return searchHolding('', area, textValues['দরখাস্ত নম্বর']);
    case 'NamjariSearch':
      return searchNamjari('', area, textValues['দরখাস্ত নম্বর']);
    case 'NayabadiSearch':
      return searchNayabadi('', area, textValues['দরখাস্ত নম্বর']);
    case 'FreedomFighterSearch':
      return searchFreedomFighter('', area, textValues['দরখাস্ত নম্বর']);
    case 'NewTLSearch':
      return searchNewTL(area, textValues['আবেদন নম্বর'], textValues['আবেদনকারীর নাম']);
    case 'OldTLSearch':
      return searchOldTL(area, textValues['ট্রেড লাইসেন্স নং'], textValues['ইস্যূকৃত পুরাতন লাইসেন্স নং']);
    case 'ChangeTLSearch':
      return searchChangeTL(area, textValues['ট্রেড লাইসেন্স নম্বর'], textValues['ডকেট নম্বর']);
    default:
      return searchHolding('', area, textValues['দরখাস্ত নম্বর']);
  }
}

export function SearchScreen({ navigation, route }: Props) {
  const screenName = route?.params?.title || 'HoldingSearch';
  const config = getSearchConfig(screenName);
  const insets = useSafeAreaInsets();
  const [textValues, setTextValues] = React.useState<Record<string, string>>({});
  const [dateValues, setDateValues] = React.useState<Record<string, Date>>({});
  const [results, setResults] = React.useState<SearchResultRow[] | null>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const isDateField = (field: string) => field.includes('তারিখ');

  const handleSearch = () => {
    const res = doSearch(screenName, textValues);
    setResults(res);
    setExpandedId(null);
  };

  const statusColors: Record<string, string> = {
    green: '#2E7D32',
    orange: '#E65100',
    red: '#C62828',
    blue: '#1565C0',
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
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Spacing.lg + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          <View style={styles.searchCard}>
            <Text style={styles.searchTitle}>অনুসন্ধান ফরম</Text>
            {config.fields.map((field, i) => {
              if (isDateField(field)) {
                return (
                  <DateInput
                    key={i}
                    label={field}
                    placeholder="mm/dd/yyyy"
                    value={dateValues[field]}
                    onChange={(date) =>
                      setDateValues((prev) => ({
                        ...prev,
                        [field]: date,
                      }))
                    }
                  />
                );
              }

              return (
                <Input
                  key={i}
                  label={field}
                  placeholder={field}
                  value={textValues[field] ?? ''}
                  onChangeText={(text) =>
                    setTextValues((prev) => ({
                      ...prev,
                      [field]: text,
                    }))
                  }
                />
              );
            })}
            <Button title="অনুসন্ধান করুন" onPress={handleSearch} />
          </View>

          {results !== null && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>
                অনুসন্ধান ফলাফল ({results.length} টি পাওয়া গেছে)
              </Text>

              {results.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>কোনো ফলাফল পাওয়া যায়নি</Text>
                </View>
              ) : (
                results.map((row, i) => {
                  const isExpanded = expandedId === row.applicationNumber;
                  const sc = statusColors[getStatusColor(row.status)] || '#666';
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[styles.resultCard, isExpanded && styles.resultCardExpanded]}
                      onPress={() => setExpandedId(isExpanded ? null : row.applicationNumber)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.resultHeader}>
                        <View style={styles.resultHeaderLeft}>
                          <Text style={styles.resultAppNo}>{row.applicationNumber}</Text>
                          <Text style={styles.resultName}>{row.applicantName}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: sc + '18', borderColor: sc }]}>
                          <Text style={[styles.statusText, { color: sc }]}>{row.status}</Text>
                        </View>
                      </View>

                      <View style={styles.resultMeta}>
                        <Text style={styles.resultMetaText}>📍 {row.area}</Text>
                        <Text style={styles.resultMetaText}>📅 {row.date}</Text>
                      </View>

                      {isExpanded && (
                        <View style={styles.resultDetails}>
                          <View style={styles.detailDivider} />
                          {Object.entries(row.details).map(([key, value], di) => (
                            <View key={di} style={styles.detailRow}>
                              <Text style={styles.detailLabel}>{key}:</Text>
                              <Text style={styles.detailValue}>{value}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          )}
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
    padding: Spacing.lg,
  },
  searchCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  searchTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  resultsSection: {
    marginTop: Spacing.lg,
  },
  resultsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  emptyState: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resultCardExpanded: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resultHeaderLeft: {
    flex: 1,
  },
  resultAppNo: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  resultName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  resultMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  resultMetaText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  resultDetails: {
    marginTop: Spacing.sm,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginBottom: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  detailLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    width: 140,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    flex: 1,
  },
});
